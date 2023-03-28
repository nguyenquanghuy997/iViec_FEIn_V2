import React, {useEffect, useMemo, useState} from "react";
// mui
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
// component
import {View} from "@/components/FlexStyled";
import Content from "@/components/BaseComponents/Content";
import JobCreateHeader from "@/sections/recruitment-create/component/header/RecruitmentCreateHeader";
import JobCreateSubHeader from "@/sections/recruitment-create/component/header/RecruitmentCreateSubHeader";
import {BoxFlex} from "@/sections/emailform/style";
import {DraftIcon, OrangeAlertIcon, SendIcon} from "@/sections/recruitment-create/component/icon/HeaderIcon";
import RecruitmentInformation from '@/sections/recruitment-create/component/other/RecruitmentInformation';
import RecruitmentPipeLine from '@/sections/recruitment-create/component/other/RecruitmentPipeLine';
import RecruitmentChannel from '@/sections/recruitment-create/component/other/RecruitmentChannel';
import {useForm, useWatch} from "react-hook-form";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {FormProvider} from "@/components/hook-form";
import {
  useCreateRecruitmentMutation,
  useUpdateRecruitmentDraftMutation,
  useUpdateRecruitmentOfficialMutation
} from "@/sections/recruitment";
import {useSnackbar} from "notistack";
import {isEmpty} from "lodash";
import {useGetOrganizationInfoQuery} from "@/sections/organizationdetail/OrganizationDetailSlice";
import {cleanObject} from "@/utils/function";
import {useDebounce} from "@/hooks/useDebounce";
import {useRouter} from "next/router";
import {PATH_DASHBOARD} from "@/routes/paths";
import {RecruitmentWorkingForm} from "@/utils/enum";
import {useGetJobPositionByIdQuery} from "@/sections/jobtype";
import {Typography} from "@mui/material";
import {STYLE_CONSTANT as style} from "@/theme/palette";
import ConfirmModal from "@/components/BaseComponents/ConfirmModal";
import RecruitmentPreviewCreate from "@/sections/recruitment-create/component/other/RecruitmentPreviewCreate";

const RecruitmentCreateContent = ({Recruitment}) => {
  const router = useRouter();
  const { query } = router;
  const {enqueueSnackbar} = useSnackbar();
  const {data: OrganizationOfUser = {}} = useGetOrganizationInfoQuery();
  const [createRecruitment] = useCreateRecruitmentMutation();
  const [updateRecruitmentOfficial] = useUpdateRecruitmentOfficialMutation();
  const [updateRecruitmentDraft] = useUpdateRecruitmentDraftMutation();

  // modal
  const [isOpenSaveDraft, setIsOpenSaveDraft] = useState(false);
  const [isOpenSubmitApprove, setIsOpenSubmitApprove] = useState(false);
  const [isOpenAlertBack, setIsOpenAlertBack] = useState(false);
  const [isOpenPreview, setIsOpenPreview] = useState(false);

  const defaultValues = useMemo(() => {
    return {
      id: "",
      name: '',
      organizationId: OrganizationOfUser.id,
      description: '',
      benefit: '',
      requirement: '',
      numberPosition: '',
      minSalary: '',
      maxSalary: '',
      salaryDisplayType: '',
      sex: '',
      startDate: null,
      endDate: null,
      address: '',
      recruitmentLanguageIds: [],
      coOwnerIds: [],
      tags: [],
      jobPositionId: '',
      ownerId: '',
      workExperience: '',
      currencyUnit: 0,
      candidateLevelId: "",
      organizationPipelineId: '',
      isAutomaticStepChange: false,
      recruitmentCouncilIds: [],
      recruitmentJobCategoryIds: [],
      recruitmentAddressIds: [],
      recruitmentWorkingForms: [],
      organizationPipelineStateDatas: [
        {
          organizationPipelineStateId: "",
          examinationId: ""
        }
      ]
    }
  }, [OrganizationOfUser])

  // yup & handle form
  const FormSchema = Yup.object().shape({
    // common
    name: Yup.string().required("Tiêu đề tin tuyển dụng không được bỏ trống").max(255, "Tiêu đề tin tuyển dụng tối đa 255 ký tự"),
    address: Yup.string().required("Địa điểm làm việc không được bỏ trống").max(255, "Địa điểm làm việc tối đa 255 ký tự"),
    recruitmentAddressIds: Yup.array().nullable().min(1, "Khu vực đăng tin không được bỏ trống").max(3, "Chọn tối đa 3 khu vực đăng tin"),
    candidateLevelId: Yup.string().required("Chức danh không được bỏ trống"),
    workExperience: Yup.string().required("Số năm kinh nghiệm không được bỏ trống"),
    recruitmentJobCategoryIds: Yup.array().nullable().min(1, "Ngành nghề không được bỏ trống").max(3, "Chọn tối đa 3 ngành nghề"),
    recruitmentWorkingForms: Yup.array().nullable().min(1, "Hình thức làm việc không được bỏ trống").max(3, "Chọn tối đa 3 hình thức làm việc"),
    numberPosition: Yup.number().min(1, 'Số lượng nhân viên cần tuyển tối thiểu là 1').transform(value => (isNaN(value) ? undefined : value)).max(9999, 'Số lượng nhân viên cần tuyển tối đa 9999').required("Số lượng nhân viên cần tuyển không được bỏ trống"),
    sex: Yup.number().transform(value => (isNaN(value) ? undefined : value)).required('Giới tính không được bỏ trống'),
    recruitmentLanguageIds: Yup.array().nullable().min(1, "Ngôn ngữ làm việc không được bỏ trống").max(3, "Chọn tối đa 3 ngôn ngữ làm việc"),
    // date
    startDate: Yup.date().typeError("Ngày bắt đầu không đúng định dạng").transform(value => (!value ? new Date().toISOString() : value)).required('Ngày bắt đầu không được bỏ trống'),
    endDate: Yup.date().transform(value => (!value ? new Date().toISOString() : value)).typeError("Ngày kết thúc không đúng định dạng").min(Yup.ref('startDate'), "Ngày kết thúc phải lớn hơn ngày bắt đầu").required('Ngày kết thúc không được bỏ trống'),
    // detail description
    description: Yup.string().required("Mô tả công việc không được bỏ trống"),
    requirement: Yup.string().required("Yêu cầu công việc không được bỏ trống"),
    benefit: Yup.string().required("Quyền lợi không được bỏ trống"),
    // owner & council
    ownerId: Yup.string().required("Cán bộ tuyển dụng không được bỏ trống"),
    // pipeline
    organizationPipelineId: Yup.string().required("Quy trình tuyển dụng không được bỏ trống"),
    // salary
    salaryDisplayType: Yup.number().transform(value => (isNaN(value) ? undefined : value)).required('Cách hiển thị không được bỏ trống'),
    currencyUnit: Yup.number()
        .transform(value => (isNaN(value) ? undefined : value))
        .when("salaryDisplayType", (salaryDisplayType, schema) => {
          if (salaryDisplayType === 2)
            return schema.required("Loại tiền tệ không được bỏ trống")
          return schema
        }),
    minSalary: Yup.number()
        .min(1000000, 'Mức lương tối thiểu ít nhất 7 chữ số')
        .transform(value => (isNaN(value) ? undefined : value))
        .when("salaryDisplayType", (salaryDisplayType, schema) => {
          if (salaryDisplayType === 2)
            return schema.required("Mức lương tối thiểu không được bỏ trống")
          return schema
        }),
    maxSalary: Yup.number()
        .min(1000000, 'Mức lương tối đa ít nhất 7 chữ số')
        .transform(value => (isNaN(value) ? undefined : value))
        .min(Yup.ref('minSalary'), 'Mức lương tối đa cần lớn hơn hoặc bằng mức lương tối thiểu')
        .when("salaryDisplayType", (salaryDisplayType, schema) => {
          if (salaryDisplayType === 2)
            return schema.required("Mức lương tối đa không được bỏ trống")
          return schema
        }),
  });

  const methods = useForm({
    mode: 'all',
    resolver: isOpenSaveDraft ? null : yupResolver(FormSchema),
    defaultValues,
  });

  const {control, handleSubmit, setValue, reset, formState: {errors, isValid}} = methods;

  const watchAllFields = useWatch({ control })

  const watchName = useWatch({ control, name: 'name' });
  const watchNameDebounce = useDebounce(watchName, 500);
  const watchOrganization = useWatch({ control, name: 'organizationId' });
  const watchSalaryDisplayType = useWatch({ control, name: 'salaryDisplayType' });
  const watchCurrencyType = useWatch({ control, name: 'currencyUnit' });
  const watchOrganizationPipelineId = useWatch({ control, name: 'organizationPipelineId' });
  const watchJobPositionId = useWatch({ control, name: 'jobPositionId' });

  // validate
  const watchRecruitmentAddressIds = useWatch({ control, name: 'recruitmentAddressIds' });
  const watchRecruitmentJobCategoryIds = useWatch({ control, name: 'recruitmentJobCategoryIds' });
  const watchRecruitmentWorkingForms = useWatch({ control, name: 'recruitmentWorkingForms' });
  const watchRecruitmentWorkingLanguages = useWatch({ control, name: 'recruitmentLanguageIds' });
  const watchStartDate = useWatch({ control, name: 'startDate' });

  const { data: JobPosition = {} } = useGetJobPositionByIdQuery({ Id: watchJobPositionId }, { skip: !watchJobPositionId })

  useEffect(() => {
    if (!isEmpty(JobPosition)) {
      reset({
        ...watchAllFields,
        description: JobPosition?.description,
        requirement: JobPosition?.requirement,
        benefit: JobPosition?.benefit,
      })
    }
  }, [JobPosition])

  useEffect(() => {
    if (!isEmpty(Recruitment)) {
      for (let i in defaultValues) {
        setValue(i, Recruitment[i]);
        setValue('organizationId', Recruitment?.organizationId)
        setValue('recruitmentAddressIds', Recruitment?.recruitmentAddresses?.map(item => ({ ...item, value: item?.provinceId, label: item?.provinceName })))
        setValue('recruitmentJobCategoryIds', Recruitment?.recruitmentJobCategories?.map(item => ({ ...item, value: item?.jobCategoryId, label: item?.name })))
        setValue('recruitmentWorkingForms', Recruitment?.recruitmentWorkingForms?.map(item => ({ value: item?.workingForm, label: RecruitmentWorkingForm(item?.workingForm) })))
        setValue('jobPositionId', Recruitment?.jobPosition?.id)
        setValue('recruitmentCouncilIds', Recruitment?.recruitmentCouncils?.map(item => ({ ...item, value: item?.councilUserId, label: item.email || item.councilName })))
        setValue('coOwnerIds', Recruitment?.coOwners?.map(item => ({ ...item, value: item?.id, label: item.email || item.name })))
        setValue('recruitmentLanguageIds', Recruitment?.recruitmentLanguages?.map(item => ({ ...item, value: item?.id, label: item?.name })))
        setValue('organizationPipelineId', Recruitment?.recruitmentPipeline?.organizationPipelineId);
        setValue('currencyUnit', Recruitment?.currencyUnit);
      }
    }
  }, [Recruitment])

  useEffect(() => {
    if (!isEmpty(OrganizationOfUser) && isEmpty(Recruitment)) {
      setValue('organizationId', OrganizationOfUser.id);
    }
  }, [OrganizationOfUser, Recruitment])

  useEffect(() => {
    if (watchSalaryDisplayType) {
      methods.resetField('currencyUnit');
      methods.resetField('minSalary');
      methods.resetField('maxSalary');
    }
  }, [watchSalaryDisplayType])

  const [valueTab, setValueTab] = useState(errors.organizationPipelineId ? '2' : '1');
  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };

  const onSubmit = async (data) => {
    if (!isEmpty(errors)) {
      enqueueSnackbar(Object.entries(errors)[0]?.message, {
        autoHideDuration: 1000,
        variant: 'error',
      });
      return;
    }
    const body = {
      id: data?.id,
      name: data?.name,
      organizationId: data?.organizationId,
      description: data?.description,
      benefit: data?.benefit,
      requirement: data?.requirement,
      numberPosition: data?.numberPosition,
      minSalary: data?.minSalary || null,
      maxSalary: data?.maxSalary || null,
      salaryDisplayType: data?.salaryDisplayType,
      sex: data?.sex,
      startDate: data?.startDate,
      endDate: data?.endDate,
      address: data?.address,
      recruitmentLanguageIds: data?.recruitmentLanguageIds?.map(item => item.value),
      coOwnerIds: data?.coOwnerIds?.map(item => item.value),
      tags: data?.tags,
      jobPositionId: data?.jobPositionId,
      ownerId: data?.ownerId,
      workExperience: data?.workExperience,
      currencyUnit: data?.currencyUnit || 0,
      candidateLevelId: data?.candidateLevelId,
      organizationPipelineId: data?.organizationPipelineId,
      isAutomaticStepChange: data?.isAutomaticStepChange,
      recruitmentCouncilIds: data?.recruitmentCouncilIds.map(item => item.value),
      recruitmentJobCategoryIds: data?.recruitmentJobCategoryIds.map(item => item.value),
      recruitmentAddressIds: data?.recruitmentAddressIds.map(item => item.value),
      recruitmentWorkingForms: data?.recruitmentWorkingForms.map(item => Number(item.value)),
      recruitmentCreationType: isOpenSaveDraft ? 0 : 1,
    }
    if (data?.id && !query?.type) {
      if(data.recruitmentCreationType === 0) {
        try {
          await updateRecruitmentDraft(cleanObject({
            ...body,
            recruitmentCreationType: 0
          })).unwrap();
          setIsOpenSubmitApprove(false);
          enqueueSnackbar("Cập nhật tin tuyển dụng thành công!", {
            autoHideDuration: 1000
          });
          await router.push(PATH_DASHBOARD.recruitment.root);
        } catch (e) {
          enqueueSnackbar("Cập nhật tin tuyển dụng không thành công. Vui lòng kiểm tra dữ liệu và thử lại!", {
            autoHideDuration: 1000,
            variant: 'error',
          });
          setIsOpenSubmitApprove(false);
          throw e;
        }
      } else {
        try {
          await updateRecruitmentOfficial(cleanObject(body)).unwrap();
          setIsOpenSubmitApprove(false);
          enqueueSnackbar("Cập nhật tin tuyển dụng thành công!", {
            autoHideDuration: 1000
          });
          await router.push(PATH_DASHBOARD.recruitment.root);
        } catch (e) {
          enqueueSnackbar("Cập nhật tin tuyển dụng không thành công. Vui lòng kiểm tra dữ liệu và thử lại!", {
            autoHideDuration: 1000,
            variant: 'error',
          });
          setIsOpenSubmitApprove(false);
          throw e;
        }
      }
    } else {
      try {
        await createRecruitment(cleanObject({
          ...body,
          id: null,
          recruitmentCreationType: isOpenSaveDraft ? 0 : 1
        })).unwrap();
        setIsOpenSubmitApprove(false);
        enqueueSnackbar("Thêm tin tuyển dụng thành công!", {
          autoHideDuration: 1000
        });
        reset(defaultValues);
        await router.push(PATH_DASHBOARD.recruitment.root);
      } catch (e) {
        enqueueSnackbar("Thêm tin tuyển dụng không thành công. Vui lòng kiểm tra dữ liệu và thử lại!", {
          autoHideDuration: 1000,
          variant: 'error',
        });
        setIsOpenSubmitApprove(false);
        throw e;
      }
    }
  }

  const handleOpenPreview = () => {
    setIsOpenPreview(true);
  }

  const handleClosePreview = () => {
    setIsOpenPreview(false);
  }
  
  return (
      <View>
        <JobCreateHeader
            setIsOpenSubmitApprove={setIsOpenSubmitApprove}
            setIsOpenSaveDraft={setIsOpenSaveDraft}
            style={{padding: '18px 0', boxShadow: 'none', borderBottom: '1px solid #E7E9ED'}}
            errors={isValid}
            watchName={watchNameDebounce}
            processStatus={Recruitment?.processStatus}
            title={!isEmpty(Recruitment) && !query?.type ? 'Cập nhật tin tuyển dụng' : 'Đăng tin tuyển dụng'}
            onOpenPreview={handleOpenPreview}
        />
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <TabContext value={valueTab}>
            <JobCreateSubHeader handleChange={handleChange}/>
            <Content>
              <View mt={'168px'}>
                <TabPanel value="1">
                  <BoxFlex>
                    <RecruitmentInformation
                        recruitment={Recruitment}
                        startDate={watchStartDate}
                        organizationId={watchOrganization}
                        salaryDisplayType={watchSalaryDisplayType}
                        currencyUnit={watchCurrencyType}
                        recruitmentAddressIds={watchRecruitmentAddressIds}
                        recruitmentJobCategoryIds={watchRecruitmentJobCategoryIds}
                        recruitmentWorkingForms={watchRecruitmentWorkingForms}
                        recruitmentWorkingLanguages={watchRecruitmentWorkingLanguages}
                    />
                  </BoxFlex>
                </TabPanel>
                <TabPanel value="2">
                  <RecruitmentPipeLine
                      watchOrganization={watchOrganization}
                      watchOrganizationPipelineId={watchOrganizationPipelineId}
                  />
                </TabPanel>
                <TabPanel value="3">
                  <RecruitmentChannel/>
                </TabPanel>
              </View>
            </Content>
          </TabContext>
        </FormProvider>
        {
            isOpenSaveDraft && <ConfirmModal
                open={isOpenSaveDraft}
                onClose={() => setIsOpenSaveDraft(false)}
                icon={<DraftIcon height={45} width={50}/>}
                title={<Typography sx={{textAlign: 'center', width: '100%', fontSize: style.FONT_BASE, fontWeight: style.FONT_SEMIBOLD, color: style.COLOR_PRIMARY, marginTop: 2,}}>Lưu nháp tin tuyển dụng</Typography>}
                subtitle={"Bạn có chắc chắn muốn lưu nháp tin tuyển dụng này?"}
                data={watchAllFields}
                onSubmit={onSubmit}
                btnCancelProps={{
                  title: 'Hủy',
                }}
                btnConfirmProps={{
                  title: 'Xác nhận'
                }}
            />
        }
        {
            isOpenSubmitApprove && <ConfirmModal
                open={isOpenSubmitApprove}
                onClose={() => setIsOpenSubmitApprove(false)}
                icon={<SendIcon/>}
                title={<Typography sx={{textAlign: 'center', width: '100%', fontSize: style.FONT_BASE, fontWeight: style.FONT_SEMIBOLD, color: style.COLOR_PRIMARY, marginTop: 2}}>Gửi phê duyệt tin tuyển dụng</Typography>}
                subtitle={"Bạn có chắc chắn muốn lưu nháp tin tuyển dụng này?"}
                data={watchAllFields}
                onSubmit={onSubmit}
                btnCancelProps={{
                  title: 'Hủy',
                }}
                btnConfirmProps={{
                  title: 'Gửi phê duyệt'
                }}
            />
        }
        {
            isOpenAlertBack && <ConfirmModal
                open={isOpenAlertBack}
                onClose={() => setIsOpenAlertBack(false)}
                icon={<OrangeAlertIcon />}
                title={<Typography sx={{textAlign: 'center', width: '100%', fontSize: style.FONT_BASE, fontWeight: style.FONT_SEMIBOLD, color: style.COLOR_MAIN, marginTop: 2}}>Trở về danh sách tin tuyển dụng</Typography>}
                subtitle={"Các thao tác trước đó sẽ không được lưu, Bạn có chắc chắn muốn trở lại?"}
                data={watchAllFields}
                onSubmit={() => setIsOpenAlertBack(false)}
                btnCancelProps={{
                  title: 'Hủy',
                }}
                btnConfirmProps={{
                  title: 'Trở lại'
                }}
            />
        }
        {
            isOpenPreview && <RecruitmentPreviewCreate
                onClose={handleClosePreview}
                data={{
                  // header
                  name: watchAllFields?.name,
                  organizationId: watchAllFields?.organizationId,
                  // summary
                  numberPosition: watchAllFields?.numberPosition,
                  address: watchAllFields?.address,
                  recruitmentJobCategories: watchAllFields?.recruitmentJobCategoryIds?.map(item => ({
                    name: item?.label,
                    jobCategoryId: item?.value
                  })),
                  recruitmentWorkingForms: watchAllFields?.recruitmentWorkingForms?.map(item => ({
                    workingForm: item?.value,
                    id: item?.value
                  })),
                  salaryDisplayType: watchAllFields?.salaryDisplayType,
                  minSalary: watchAllFields?.minSalary,
                  maxSalary: watchAllFields?.maxSalary,
                  currencyUnit: watchAllFields?.currencyUnit,
                  // description
                  description: watchAllFields?.description,
                  requirement: watchAllFields?.requirement,
                  benefit: watchAllFields?.benefit,
                }}
                open={isOpenPreview}
            />
        }
      </View>
  )
}

export default RecruitmentCreateContent;