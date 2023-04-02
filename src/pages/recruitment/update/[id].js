import {useEffect, useMemo, useRef, useState} from "react";
import {useRouter} from "next/router";
import {Box, Grid, Typography} from "@mui/material";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import {useSnackbar} from "notistack";

import Layout from '@/layouts'
import Page from '@/components/Page'
import {FormProvider} from "@/components/hook-form";
import Content from "@/components/BaseComponents/Content";
import Information from "@/sections/recruitment-form/information";
import Pipeline from "@/sections/recruitment-form/pipeline";
import Header from "@/sections/recruitment-form/components/Header";
import TabList from "@/sections/recruitment-form/components/TabList";
import Preview from "@/sections/recruitment-form/preview/Preview";

import {useDispatch, useSelector} from "@/redux/store";
import {modalSlice} from "@/redux/common/modalSlice";

import {PAGES} from '@/config'
import {getRolesByPage} from '@/utils/role'
import {useGetOrganizationInfoQuery} from "@/sections/organizationdetail/OrganizationDetailSlice";
import {
  useCreateRecruitmentMutation,
  useGetRecruitmentByIdQuery, useUpdateRecruitmentDraftMutation,
  useUpdateRecruitmentOfficialMutation
} from "@/sections/recruitment";

import {PATH_DASHBOARD} from "@/routes/paths";
import ConfirmModal from "@/components/BaseComponents/ConfirmModal";
import {DraftIcon, SendIcon} from "@/sections/recruitment-form/icon/HeaderIcon";
import {STYLE_CONSTANT as style} from "@/theme/palette";

import {RecruitmentWorkingForm} from "@/utils/enum";
import {cleanObject} from "@/utils/function";
import {FormValidate} from "@/sections/recruitment-form/form/Validate";

UpdateRecruitment.getLayout = function getLayout({roles = []}, page) {
  return <Layout roles={roles}>{page}</Layout>
}

export async function getServerSideProps() {
  return {
    props: {
      roles: getRolesByPage(PAGES.Jobs),
    },
  }
}

export default function UpdateRecruitment() {
  const dispatch = useDispatch();
  const {enqueueSnackbar} = useSnackbar();
  const router = useRouter();
  const {query} = router;
  const [selected, setSelected] = useState(0);
  const _timeoutTab = useRef();

  const stateOpenForm = useSelector((state) => state.modalReducer.openState);
  const {openSaveDraft, openPreview, openSaveApprove} = stateOpenForm;
  const handleOpenConfirm = (data) => {
    dispatch(modalSlice.actions.openStateModal(data));
  };
  const handleCloseConfirm = () => dispatch(modalSlice.actions.closeModal());

  const [createRecruitment] = useCreateRecruitmentMutation();
  const [updateRecruitmentOfficial] = useUpdateRecruitmentOfficialMutation();
  const [updateRecruitmentDraft] = useUpdateRecruitmentDraftMutation();
  const {data: defaultOrganization = {}} = useGetOrganizationInfoQuery();
  const {data: Recruitment = {}} = useGetRecruitmentByIdQuery({ Id: query.id }, { skip: !query.id })

  const defaultValues = useMemo(() => {
    const { recruitmentLanguages = []} = Recruitment;
    return {
      id: Recruitment?.id,
      name: Recruitment?.name || '',
      organizationId: defaultOrganization?.id || Recruitment?.organizationId,
      description: Recruitment?.description || '',
      benefit: Recruitment?.benefit || '',
      requirement: Recruitment?.requirement || '',
      numberPosition: Recruitment?.numberPosition || '',
      minSalary: Recruitment?.minSalary || '',
      maxSalary: Recruitment?.maxSalary || '',
      salaryDisplayType: Recruitment?.salaryDisplayType || 0,
      sex: Recruitment?.sex || '',
      startDate: Recruitment?.startDate || null,
      endDate: Recruitment?.endDate || null,
      address: Recruitment?.address || '',
      recruitmentLanguageIds: recruitmentLanguages?.map(item => ({value: item?.languageId, label: item?.name})) || [],
      coOwnerIds: Recruitment?.coOwners?.map(item => ({value: item?.id, label: item.email || item.name})) || [],
      tags: Recruitment?.tags || [],
      jobPositionId: Recruitment?.jobPosition?.id || '',
      ownerId: Recruitment?.ownerId || '',
      workExperience: Recruitment?.workExperience || '',
      currencyUnit: Recruitment?.currencyUnit || 0,
      candidateLevelId: Recruitment?.candidateLevelId || '',
      recruitmentCouncilIds: Recruitment?.recruitmentCouncils?.map(item => ({value: item?.councilUserId, label: item.email || item.councilName})) || [],
      recruitmentJobCategoryIds: Recruitment?.recruitmentJobCategories?.map(item => ({value: item?.jobCategoryId, label: item?.name})) || [],
      recruitmentAddressIds: Recruitment?.recruitmentAddresses?.map(item => ({value: item?.provinceId, label: item?.provinceName})) || [],
      recruitmentWorkingForms: Recruitment?.recruitmentWorkingForms?.map(item => ({value: item?.workingForm, label: RecruitmentWorkingForm(item?.workingForm)})) || [],
      organizationPipelineId: Recruitment?.recruitmentPipeline?.organizationPipelineId || '',
      organizationPipelineStateDatas: [],
    }
  }, [Recruitment, defaultOrganization]);

  const methods = useForm({
    mode: 'all',
    resolver: openSaveDraft ? null : yupResolver(FormValidate),
    defaultValues: defaultValues,
  });

  const {handleSubmit, getValues, setValue, formState: {isValid}} = methods;

  useEffect(() => {
    for (let i in defaultValues) {
      setValue(i, Recruitment[i]);
      setValue('organizationId', Recruitment?.organizationId)
      setValue('recruitmentAddressIds', Recruitment?.recruitmentAddresses?.map(item => ({value: item?.provinceId, label: item?.provinceName})))
      setValue('recruitmentJobCategoryIds', Recruitment?.recruitmentJobCategories?.map(item => ({value: item?.jobCategoryId, label: item?.name})))
      setValue('recruitmentWorkingForms', Recruitment?.recruitmentWorkingForms?.map(item => ({value: item?.workingForm, label: RecruitmentWorkingForm(item?.workingForm)})))
      setValue('jobPositionId', Recruitment?.jobPosition?.id)
      setValue('recruitmentCouncilIds', Recruitment?.recruitmentCouncils?.map(item => ({value: item?.councilUserId, label: item.email || item.councilName})))
      setValue('coOwnerIds', Recruitment?.coOwners?.map(item => ({value: item?.id, label: item.email || item.name})))
      setValue('recruitmentLanguageIds', Recruitment?.recruitmentLanguages?.map(item => ({value: item?.id, label: item?.name})))
      setValue('organizationPipelineId', Recruitment?.recruitmentPipeline?.organizationPipelineId);
      setValue('currencyUnit', Recruitment?.currencyUnit);
      setValue('organizationPipelineStateDatas', Recruitment?.recruitmentPipeline?.recruitmentPipelineStates?.map(item => ({value: item?.id, label: item?.name})));
    }
  }, [Recruitment, setValue])

  const display = [
    {
      tab: <Information recruitment={Recruitment}/>,
      title: 'Thông tin tuyển dụng',
    },
    {
      id: 'pipeline',
      tab: <Pipeline recruitment={Recruitment}/>,
      title: 'Quy trình tuyển dụng',
    },
  ];

  const handleSelected = (index) => {
    setSelected(index);

    clearTimeout(_timeoutTab.current);
    _timeoutTab.current = setTimeout(() => {
      router.push({
        pathname: PATH_DASHBOARD.recruitment.update(query.id),
        hash: display[index].id || null,
      }, undefined, { shallow: true });
    }, 300);
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    let hash = window.location.hash;
    if (!hash) {
      return;
    }
    hash = hash.replace('#', '');
    let index = display.findIndex(d => d.id === hash);
    if (index < 0) {
      index = 0;
    }
    handleSelected(index);
  }, [router.isReady]);

  const TabDisplay = (props) => {
    const { children, value, index, ...other } = props;
    return (
        <Box role="tabDisplay" hidden={value !== index} {...other}>
          {value === index && (children)}
        </Box>
    );
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
      recruitmentCreationType: openSaveDraft ? 0 : 1,
      organizationPipelineStateDatas: data?.organizationPipelineStateDatas?.map(item => ({
        organizationPipelineStateId: item.id,
        examinationId: item.examinationId,
        // examinationExpiredTime: Number(item.expiredTime),
        examinationExpiredTime: '2023-04-02T03:00:04.811Z',
      }))
    }
    if (data?.id && !query?.type) {
      if (data.recruitmentCreationType === 0) {
        try {
          await updateRecruitmentDraft(cleanObject({
            ...body,
            recruitmentCreationType: 0
          })).unwrap();
          handleCloseConfirm();
          enqueueSnackbar("Cập nhật tin tuyển dụng thành công!", {
            autoHideDuration: 1000
          });
          await router.push(PATH_DASHBOARD.recruitment.root);
        } catch (e) {
          enqueueSnackbar("Cập nhật tin tuyển dụng không thành công. Vui lòng kiểm tra dữ liệu và thử lại!", {
            autoHideDuration: 1000,
            variant: 'error',
          });
          handleCloseConfirm();
          throw e;
        }
      } else {
        try {
          await updateRecruitmentOfficial(cleanObject(body)).unwrap();
          handleCloseConfirm();
          enqueueSnackbar("Cập nhật tin tuyển dụng thành công!", {
            autoHideDuration: 1000
          });
          await router.push(PATH_DASHBOARD.recruitment.root);
        } catch (e) {
          enqueueSnackbar("Cập nhật tin tuyển dụng không thành công. Vui lòng kiểm tra dữ liệu và thử lại!", {
            autoHideDuration: 1000,
            variant: 'error',
          });
          handleCloseConfirm();
          throw e;
        }
      }
    } else {
      try {
        await createRecruitment(cleanObject({
          ...body,
          id: null,
          recruitmentCreationType: openSaveDraft ? 0 : 1
        })).unwrap();
        handleCloseConfirm();
        enqueueSnackbar("Thêm tin tuyển dụng thành công!", {
          autoHideDuration: 1000
        });
        await router.push(PATH_DASHBOARD.recruitment.root);
      } catch (e) {
        enqueueSnackbar("Thêm tin tuyển dụng không thành công. Vui lòng kiểm tra dữ liệu và thử lại!", {
          autoHideDuration: 1000,
          variant: 'error',
        });
        handleCloseConfirm();
        throw e;
      }
    }
  }

  return (
      <Page title='Cập nhật tin tuyển dụng'>
        <Grid container>
          <Header
              title={'Cập nhật tin tuyển dụng'}
              onOpenConfirm={handleOpenConfirm}
              errors={isValid}
          />
          <TabList handleSelected={handleSelected} selected={selected} />
        </Grid>
        <Content>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container columnSpacing={3}>
              <Grid item md={12} className="profile-content">
                {display.map((d, index) =>
                    <TabDisplay value={selected} key={index} index={index} onSubmit={onSubmit}>
                      {d.tab}
                    </TabDisplay>
                )}
              </Grid>
            </Grid>
          </FormProvider>
        </Content>
        {
            openSaveDraft && <ConfirmModal
                open={openSaveDraft}
                onClose={handleCloseConfirm}
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
                btnCancelProps={{title: 'Hủy',}}
                btnConfirmProps={{title: 'Xác nhận'}}
            />
        }
        {
            openSaveApprove && <ConfirmModal
                open={openSaveApprove}
                onClose={handleCloseConfirm}
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
                btnCancelProps={{title: 'Hủy',}}
                btnConfirmProps={{title: 'Gửi phê duyệt'}}
            />
        }
        {
            openPreview && <Preview
                open={openPreview}
                onClose={handleCloseConfirm}
                data={{
                  name: getValues('name'),
                  organizationId: getValues('organizationId'),
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
                  description: getValues('description'),
                  requirement: getValues('requirement'),
                  benefit: getValues('benefit'),
                }}
            />
        }
      </Page>
  )
}
