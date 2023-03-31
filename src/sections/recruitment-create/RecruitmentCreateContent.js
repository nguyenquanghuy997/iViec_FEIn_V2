import {memo, useMemo, useState} from "react";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import {View} from "@/components/FlexStyled";
import Content from "@/components/BaseComponents/Content";
import JobCreateHeader from "@/sections/recruitment-create/component/header/RecruitmentCreateHeader";
import JobCreateSubHeader from "@/sections/recruitment-create/component/header/RecruitmentCreateSubHeader";
import {BoxFlex} from "@/sections/emailform/style";
import {DraftIcon, SendIcon} from "@/sections/recruitment-create/component/icon/HeaderIcon";
import RecruitmentInformation from '@/sections/recruitment-create/component/other/RecruitmentInformation';
import RecruitmentPipeLine from '@/sections/recruitment-create/component/other/RecruitmentPipeLine';
import {useForm} from "react-hook-form";
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
import {cleanObject} from "@/utils/function";
import {useRouter} from "next/router";
import {PATH_DASHBOARD} from "@/routes/paths";
import {Typography} from "@mui/material";
import {STYLE_CONSTANT as style} from "@/theme/palette";
import ConfirmModal from "@/components/BaseComponents/ConfirmModal";
import RecruitmentPreviewCreate from "@/sections/recruitment-create/component/other/RecruitmentPreviewCreate";

const RecruitmentCreateContent = ({Recruitment}) => {
  const router = useRouter();
  const {query} = router;
  const {enqueueSnackbar} = useSnackbar();
  const [createRecruitment] = useCreateRecruitmentMutation();
  const [updateRecruitmentOfficial] = useUpdateRecruitmentOfficialMutation();
  const [updateRecruitmentDraft] = useUpdateRecruitmentDraftMutation();

  // modal
  const [isOpenSaveDraft, setIsOpenSaveDraft] = useState(false);
  const [isOpenSubmitApprove, setIsOpenSubmitApprove] = useState(false);
  const [isOpenPreview, setIsOpenPreview] = useState(false);

  const defaultValues = useMemo(() => {
    return {
      id: "",
      name: '',
      organizationId: '',
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
      organizationPipelineStateDatas: [],
      examinationId: null,
      expiredTime: ''
    }
  }, [])

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

  const {handleSubmit, setValue, getValues, formState: {isValid}} = methods;

  // const watchOrganizationPipelineStateDatas = useWatch({name: 'organizationPipelineStateDatas'});
  // const watchExaminationId = useWatch({name: 'examinationId'});
  // const watchExpiredTime = useWatch({name: 'expiredTime'});

  // const [organizationPipelineStateDatas, setOrganizationPipelineStateDatas] = useState(watchOrganizationPipelineStateDatas);
  const [organizationPipelineStateDatas] = useState([]);

  const handleSetValuePipelineExamination = (data) => {
    return data;
    // const findIndex = organizationPipelineStateDatas?.map(item => item.id).indexOf(data.id);
    // if (findIndex !== -1) {
    //   const organizationPipelineStateDatasNext = [...organizationPipelineStateDatas].map(i => i.id === data.id ? { ...data, examinationId: watchExaminationId, expiredTime: watchExpiredTime } : { ...i })
    //   setOrganizationPipelineStateDatas(organizationPipelineStateDatasNext)
    // } else {
    //   const organizationPipelineStateDatasNext = [...organizationPipelineStateDatas, { ...data, examinationId: watchExaminationId, expiredTime: watchExpiredTime }]
    //   setOrganizationPipelineStateDatas(organizationPipelineStateDatasNext)
    // }
  }
  const handleClearDataExaminationForm = () => {
    setValue('examinationId', '');
    setValue('expiredTime', '');
  }

  const [valueTab, setValueTab] = useState('2');
  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };

  const onSubmit = async (data) => {
    const body = {
      ...data,
      id: data?.id,
      recruitmentLanguageIds: data?.recruitmentLanguageIds?.map(item => item.value),
      coOwnerIds: data?.coOwnerIds?.map(item => item.value),
      recruitmentCouncilIds: data?.recruitmentCouncilIds.map(item => item.value),
      recruitmentJobCategoryIds: data?.recruitmentJobCategoryIds.map(item => item.value),
      recruitmentAddressIds: data?.recruitmentAddressIds.map(item => item.value),
      recruitmentWorkingForms: data?.recruitmentWorkingForms.map(item => Number(item.value)),
      recruitmentCreationType: isOpenSaveDraft ? 0 : 1,
      organizationPipelineStateDatas: organizationPipelineStateDatas.map(item => ({
        organizationPipelineStateId: item.id,
        examinationId: item.examinationId?.examinationId,
        examinationExpiredTime: item.examinationId?.expiredTime,
      }))
    }
    if (data?.id && !query?.type) {
      if (data.recruitmentCreationType === 0) {
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
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <JobCreateHeader
            setIsOpenSubmitApprove={setIsOpenSubmitApprove}
            setIsOpenSaveDraft={setIsOpenSaveDraft}
            style={{padding: '18px 0', boxShadow: 'none', borderBottom: '1px solid #E7E9ED'}}
            errors={isValid}
            processStatus={Recruitment?.processStatus}
            title={!isEmpty(Recruitment) && !query?.type ? 'Cập nhật tin tuyển dụng' : 'Đăng tin tuyển dụng'}
            onOpenPreview={handleOpenPreview}
        />
          <TabContext value={valueTab}>
            <JobCreateSubHeader handleChange={handleChange}/>
            <Content>
              <View mt={'168px'}>
                <TabPanel value="1">
                  <BoxFlex>
                    <RecruitmentInformation recruitment={Recruitment}/>
                  </BoxFlex>
                </TabPanel>
                <TabPanel value="2">
                  <RecruitmentPipeLine
                      onSetValuePipelineExamination={handleSetValuePipelineExamination}
                      onClearDataExaminationForm={handleClearDataExaminationForm}
                      examinationFormValue={organizationPipelineStateDatas}
                      recruitment={Recruitment}
                  />
                </TabPanel>
                {/*<TabPanel value="3">*/}
                {/*  <RecruitmentChannel/>*/}
                {/*</TabPanel>*/}
              </View>
            </Content>
          </TabContext>
        </FormProvider>
        {
            isOpenSaveDraft && <ConfirmModal
                open={isOpenSaveDraft}
                onClose={() => setIsOpenSaveDraft(false)}
                icon={<DraftIcon height={45} width={50}/>}
                title={<Typography sx={{
                  textAlign: 'center',
                  width: '100%',
                  fontSize: style.FONT_BASE,
                  fontWeight: style.FONT_SEMIBOLD,
                  color: style.COLOR_PRIMARY,
                  marginTop: 2,
                }}>Lưu nháp tin tuyển dụng</Typography>}
                subtitle={"Bạn có chắc chắn muốn lưu nháp tin tuyển dụng này?"}
                data={getValues()}
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
                title={<Typography sx={{
                  textAlign: 'center',
                  width: '100%',
                  fontSize: style.FONT_BASE,
                  fontWeight: style.FONT_SEMIBOLD,
                  color: style.COLOR_PRIMARY,
                  marginTop: 2
                }}>Gửi phê duyệt tin tuyển dụng</Typography>}
                subtitle={"Bạn có chắc chắn muốn lưu nháp tin tuyển dụng này?"}
                data={getValues()}
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
            isOpenPreview && <RecruitmentPreviewCreate
                onClose={handleClosePreview}
                data={{
                  // header
                  name: getValues('name'),
                  organizationId: getValues('organizationId'),
                  // summary
                  numberPosition: getValues('numberPosition'),
                  address: getValues('address'),
                  recruitmentJobCategories: getValues('recruitmentJobCategoryIds')?.map(item => ({
                    name: item?.label,
                    jobCategoryId: item?.value
                  })),
                  recruitmentWorkingForms: getValues('recruitmentWorkingForms')?.map(item => ({
                    workingForm: item?.value,
                    id: item?.value
                  })),
                  salaryDisplayType: getValues('salaryDisplayType'),
                  minSalary: getValues('minSalary'),
                  maxSalary: getValues('maxSalary'),
                  currencyUnit: getValues('currencyUnit'),
                  // description
                  description: getValues('description'),
                  requirement: getValues('requirement'),
                  benefit: getValues('benefit'),
                }}
                open={isOpenPreview}
            />
        }
      </View>
  )
}

export default memo(RecruitmentCreateContent);