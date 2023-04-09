import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import {Grid, Typography} from "@mui/material";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import {useSnackbar} from "notistack";
import {TabContext} from "@mui/lab";
import TabPanel from "@/sections/recruitment-form/components/TabPanel";

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

import {PERMISSION_PAGES} from '@/config'
import {useGetOrganizationInfoQuery} from "@/sections/organizationdetail/OrganizationDetailSlice";
import {
    useGetRecruitmentByIdQuery,
    useUpdateRecruitmentDraftMutation,
    useUpdateRecruitmentOfficialMutation
} from "@/sections/recruitment";

import {PATH_DASHBOARD} from "@/routes/paths";
import ConfirmModal from "@/components/BaseComponents/ConfirmModal";
import {DraftIcon, SendIcon} from "@/sections/recruitment-form/icon/HeaderIcon";
import {STYLE_CONSTANT as style} from "@/theme/palette";

import {FormValidate} from "@/sections/recruitment-form/form/Validate";
import moment from "moment/moment";
import LoadingScreen from "@/components/LoadingScreen";
import {isEmpty} from "lodash";

UpdateRecruitment.getLayout = function getLayout(pageProps, page) {
    return <Layout permissions={PERMISSION_PAGES.editRecruitment} {...pageProps}>{page}</Layout>
}

export default function UpdateRecruitment() {
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();
    const router = useRouter();
    const {query} = router;
    const [valueTab, setValueTab] = useState('1');

    const stateOpenForm = useSelector((state) => state.modalReducer.openState);
    const {openSaveDraft, openPreview, openSaveApprove} = stateOpenForm;

    const examinationDataRef = useRef(null);

    const handleChangeTab = (event, newValue) => {
        setValueTab(newValue);
    };

    const handleOpenConfirm = (data) => {
        dispatch(modalSlice.actions.openStateModal(data));
    };
    const handleCloseConfirm = () => dispatch(modalSlice.actions.closeModal());

    const [updateRecruitmentOfficial] = useUpdateRecruitmentOfficialMutation();
    const [updateRecruitmentDraft] = useUpdateRecruitmentDraftMutation();
    const {data: defaultOrganization = {}} = useGetOrganizationInfoQuery();
    const {data: Recruitment = {}, isLoading} = useGetRecruitmentByIdQuery({Id: query.id}, {skip: !query.id})

    const defaultValues = {
        id: '',
        name: '',
        organizationId: defaultOrganization?.id,
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
        isAutomaticStepChange: false,
    }

    const methods = useForm({
        mode: 'all',
        resolver: openSaveDraft ? null : yupResolver(FormValidate),
        defaultValues: defaultValues,
    });

    const {handleSubmit, getValues, setValue, formState: {isValid}} = methods;

    useEffect(() => {
        for (let i in defaultValues) {
            setValue(i, Recruitment[i]);
            setValue('organizationId', Recruitment?.organizationId || defaultOrganization?.id);
            setValue('recruitmentAddressIds', Recruitment?.recruitmentAddresses?.map(item => item?.provinceId));
            setValue('recruitmentJobCategoryIds', Recruitment?.recruitmentJobCategories?.map(item => item?.jobCategoryId));
            setValue('recruitmentWorkingForms', Recruitment?.recruitmentWorkingForms?.map(item => item?.workingForm));
            setValue('jobPositionId', Recruitment?.jobPosition?.id);
            setValue('recruitmentCouncilIds', Recruitment?.recruitmentCouncils?.map(item =>  item?.councilUserId));
            setValue('coOwnerIds', Recruitment?.coOwners?.map(item => item?.id));
            setValue('recruitmentLanguageIds', Recruitment?.recruitmentLanguages?.map(item => item?.languageId));
            setValue('organizationPipelineId', Recruitment?.recruitmentPipeline?.organizationPipelineId);
        }
    }, [Recruitment, defaultOrganization])

    const onSubmit = async (data) => {
        const hasExaminationValue = examinationDataRef.current.getHasValue();
        const examinationSize = examinationDataRef.current?.getSize();
        const pipelineStateDatas = examinationDataRef.current?.getPipeLineStateData();
        const pipelineStateDatasSize = pipelineStateDatas?.filter(item => item.pipelineStateType === 1 && !isEmpty(item.examinationId)).length;
        if (hasExaminationValue && examinationSize !== pipelineStateDatasSize) {
            enqueueSnackbar("Cập nhật tin tuyển dụng không thành công. Vui lòng chọn đề thi!", {
                variant: 'error',
            });
            setValueTab('2');
            return;
        }
        const body = {
            ...data,
            startDate: moment(data?.startDate).toISOString(),
            endDate: moment(data?.endDate).toISOString(),
            recruitmentWorkingForms: data?.recruitmentWorkingForms.map(item => Number(item)),
            recruitmentCreationType: openSaveDraft ? 0 : 1,
            organizationPipelineStateDatas: !hasExaminationValue ? [] : pipelineStateDatas?.filter(item => item?.examinationId !== null)?.map(item => ({
                organizationPipelineStateId: item.organizationPipelineStateId,
                examinationId: item.examinationId,
                examinationExpiredDays: Number(item.expiredTime),
            }))
        }
        if (data.recruitmentCreationType === 0) {
            try {
                await updateRecruitmentDraft({
                    ...body,
                    recruitmentCreationType: 0
                }).unwrap();
                handleCloseConfirm();
                enqueueSnackbar("Cập nhật tin tuyển dụng thành công!");
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
                await updateRecruitmentOfficial(body).unwrap();
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
    }

    if (isLoading) {
        return <LoadingScreen />
    }

    return (
        <Page title='Cập nhật tin tuyển dụng'>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <TabContext value={valueTab}>
                    <Grid container>
                        <Header title={'Cập nhật tin tuyển dụng'} onOpenConfirm={handleOpenConfirm} errors={isValid}/>
                        <TabList onChange={handleChangeTab}/>
                    </Grid>
                    <Content>
                        <TabPanel value={'1'}>
                            <Information recruitment={Recruitment}/>
                        </TabPanel>
                        <TabPanel value={'2'}>
                            <Pipeline recruitment={Recruitment} ref={examinationDataRef}/>
                        </TabPanel>
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
