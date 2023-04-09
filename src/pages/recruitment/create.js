import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {Box, Grid, Typography} from "@mui/material";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import {useSnackbar} from "notistack";
import moment from 'moment';

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

import { PERMISSION_PAGES } from '@/config'
import {
  useCreateRecruitmentMutation,
  useUpdateRecruitmentDraftMutation,
  useUpdateRecruitmentOfficialMutation
} from "@/sections/recruitment";

import {PATH_DASHBOARD} from "@/routes/paths";
import ConfirmModal from "@/components/BaseComponents/ConfirmModal";
import {DraftIcon, SendIcon} from "@/sections/recruitment-form/icon/HeaderIcon";
import {STYLE_CONSTANT as style} from "@/theme/palette";

import {cleanObject} from "@/utils/function";
import {FormValidate} from "@/sections/recruitment-form/form/Validate";
import {TabContext, useTabContext} from "@mui/lab";
import {useGetOrganizationInfoQuery} from "@/sections/organizationdetail/OrganizationDetailSlice";
import {isEmpty} from "lodash";

CreateRecruitment.getLayout = function getLayout(pageProps, page) {
  return <Layout permissions={PERMISSION_PAGES.createRecruitment} {...pageProps}>{page}</Layout>
}

const TabPanel = ({children, value}) => {
  const {value: contextValue} = useTabContext() || {};
  return (
      <Box sx={{display: value === contextValue ? 'block' : 'none'}} key={value}>
        {children}
      </Box>
  );
}

export default function CreateRecruitment() {
  const dispatch = useDispatch();
  const {enqueueSnackbar} = useSnackbar();
  const router = useRouter();
  const {query} = router;

  const stateOpenForm = useSelector((state) => state.modalReducer.openState);
  const {openSaveDraft, openPreview, openSaveApprove} = stateOpenForm;

  const [valueTab, setValueTab] = useState('1');
  const [pipelineStateDatas, setPipelineStateDatas] = useState([]);
  const [hasExamination, setHasExamination] = useState({
    hasValue: false,
    size: 0,
  });

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };

  const handleSetPipelineStateDatas = (data) => {
    setPipelineStateDatas(data);
  }

  const handleOpenConfirm = (data) => {
    dispatch(modalSlice.actions.openStateModal(data));
  };
  const handleCloseConfirm = () => dispatch(modalSlice.actions.closeModal());

  const [createRecruitment] = useCreateRecruitmentMutation();
  const [updateRecruitmentOfficial] = useUpdateRecruitmentOfficialMutation();
  const [updateRecruitmentDraft] = useUpdateRecruitmentDraftMutation();
  const {data: defaultOrganization = {}} = useGetOrganizationInfoQuery();

  const defaultValues = {
    id: '',
    name: '',
    organizationId: defaultOrganization?.id || '',
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
    candidateLevelId: '',
    recruitmentCouncilIds: [],
    recruitmentJobCategoryIds: [],
    recruitmentAddressIds: [],
    recruitmentWorkingForms: [],
    organizationPipelineId: '',
  }

  const methods = useForm({
    mode: 'all',
    resolver: openSaveDraft ? null : yupResolver(FormValidate),
    defaultValues: defaultValues,
    shouldUnregister: false,
  });

  const {handleSubmit, getValues, setValue, formState: {isValid}} = methods;

  useEffect(() => {
    if (!isEmpty(defaultOrganization)) {
      setValue('organizationId', defaultOrganization.id);
    }
  }, [defaultOrganization])


  const onSubmit = async (data) => {
    const body = {
      ...data,
      coOwnerIds: data?.coOwnerIds,
      startDate: moment(data?.startDate).toISOString(),
      endDate: moment(data?.endDate).toISOString(),
      recruitmentWorkingForms: data?.recruitmentWorkingForms.map(item => Number(item)),
      recruitmentCreationType: openSaveDraft ? 0 : 1,
      organizationPipelineStateDatas: pipelineStateDatas?.map(item => ({
        organizationPipelineStateId: item.organizationPipelineStateId,
        examinationId: item.examinationId,
        examinationExpiredDays: Number(item.expiredTime),
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
            autoHideDuration: 1000,
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
      <Page title='Đăng tin tuyển dụng'>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <TabContext value={valueTab}>
            <Grid container>
              <Header
                  title={'Đăng tin tuyển dụng'}
                  onOpenConfirm={handleOpenConfirm}
                  errors={(isValid && !hasExamination.hasValue) || isValid && (hasExamination.hasValue === true && hasExamination.size === pipelineStateDatas.length)}
              />
              <TabList onChange={handleChangeTab}/>
            </Grid>
            <Content>
              <Grid container columnSpacing={3}>
                <Grid item md={12} className="profile-content">
                  <TabPanel value="1">
                    <Information />
                  </TabPanel>
                  <TabPanel value="2">
                    <Pipeline
                        pipelineStateDatas={pipelineStateDatas}
                        onSetPipelineStateDatas={handleSetPipelineStateDatas}
                        onSetHasExamination={setHasExamination}
                      />
                    </TabPanel>
                  </Grid>
                </Grid>
            </Content>
          </TabContext>
        </FormProvider>
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
