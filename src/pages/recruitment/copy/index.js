import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import {Grid} from "@mui/material";
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

import {PERMISSION_PAGES} from '@/config'
import {useGetOrganizationInfoQuery} from "@/sections/organizationdetail/OrganizationDetailSlice";
import {
    useCreateRecruitmentMutation,
    useGetRecruitmentByIdQuery,
} from "@/sections/recruitment";

import {PATH_DASHBOARD} from "@/routes/paths";
import ConfirmModal from "@/components/BaseComponents/ConfirmModal";
import {DraftIcon, OrangeAlertIcon, SendIcon} from "@/sections/recruitment-form/icon/HeaderIcon";
import {STYLE_CONSTANT as style} from "@/theme/palette";
import {FormValidate} from "@/sections/recruitment-form/form/Validate";
import TabPanel from "@/sections/recruitment-form/components/TabPanel";
import moment from "moment";
import LoadingScreen from "@/components/LoadingScreen";
import {TabContext} from "@mui/lab";
import {isEmpty} from "lodash";

CloneRecruitment.getLayout = function getLayout(pageProps, page) {
    return <Layout permissions={PERMISSION_PAGES.copyRecruitment} {...pageProps}>{page}</Layout>
}

export default function CloneRecruitment() {
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();
    const router = useRouter();
    const {query} = router;
    const [valueTab, setValueTab] = useState('1');

    const stateOpenForm = useSelector((state) => state.modalReducer.openState);
    const {openSaveDraft, openPreview, openSaveApprove} = stateOpenForm;

    const [showAlert, setShowAlert] = useState(false);
    const examinationDataRef = useRef(null);

    const goBackButtonHandler = () => {
        setShowAlert(true);
    }

    const onBackButtonEvent = (e) => {
        e.preventDefault();
        goBackButtonHandler();
    }

    useEffect(() => {
        window.addEventListener('popstate', onBackButtonEvent);
        return () => window.removeEventListener('popstate', onBackButtonEvent);
    }, []);

    useEffect(() => {
        const unloadCallback = (event) => {
            event.preventDefault();
            setShowAlert(true);
            if (event) {
                event.returnValue = ''
            }
            return "";
        };
        window.addEventListener('popstate', unloadCallback);
        return () => window.removeEventListener('popstate', unloadCallback);
    }, []);

    const handleChangeTab = (event, newValue) => {
        setValueTab(newValue);
    };
    const handleOpenConfirm = (data) => {
        dispatch(modalSlice.actions.openStateModal(data));
    };
    const handleCloseConfirm = () => dispatch(modalSlice.actions.closeModal());

    const [createRecruitment] = useCreateRecruitmentMutation();
    const {data: defaultOrganization = {}} = useGetOrganizationInfoQuery();
    const {data: Recruitment = {}, isLoading} = useGetRecruitmentByIdQuery({Id: query.source}, {skip: !query.source})

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
            setValue('organizationId', Recruitment?.organizationId || defaultOrganization?.id)
            setValue('recruitmentAddressIds', Recruitment?.recruitmentAddresses?.map(item => item?.provinceId))
            setValue('recruitmentJobCategoryIds', Recruitment?.recruitmentJobCategories?.map(item => item?.jobCategoryId))
            setValue('recruitmentWorkingForms', Recruitment?.recruitmentWorkingForms?.map(item => item?.workingForm))
            setValue('jobPositionId', Recruitment?.jobPosition?.id)
            setValue('recruitmentCouncilIds', Recruitment?.recruitmentCouncils?.map(item => item?.councilUserId))
            setValue('coOwnerIds', Recruitment?.coOwners?.map(item => item?.id))
            setValue('recruitmentLanguageIds', Recruitment?.recruitmentLanguages?.map(item => item?.languageId))
            setValue('organizationPipelineId', Recruitment?.recruitmentPipeline?.organizationPipelineId);
        }
    }, [Recruitment, defaultOrganization])

    const onSubmit = async (data) => {
        const hasExaminationValue = examinationDataRef.current.getHasValue();
        const examinationSize = examinationDataRef.current?.getSize();
        const pipelineStateDatas = examinationDataRef.current?.getPipeLineStateData()?.filter(item => item.pipelineStateType === 1 && !isEmpty(item.examinationId));
        const pipelineStateDatasSize = pipelineStateDatas.length;
        if (hasExaminationValue && examinationSize !== pipelineStateDatasSize) {
            enqueueSnackbar("Thêm tin tuyển dụng không thành công. Vui lòng chọn đề thi!", {
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
            minSalary: data.salaryDisplayType === 0 || data.salaryDisplayType === 1 ? 0 : Number(data.minSalary),
            maxSalary: data.salaryDisplayType === 0 || data.salaryDisplayType === 1 ? 0 : Number(data.maxSalary),
            recruitmentCreationType: openSaveDraft ? 0 : 1,
            organizationPipelineStateDatas: !hasExaminationValue ? [] : pipelineStateDatas?.filter(item => item?.examinationId !== null)?.map(item => ({
                organizationPipelineStateId: item.organizationPipelineStateId,
                examinationId: item.examinationId,
                examinationExpiredDays: Number(item.expiredTime),
            }))
        }
        try {
            await createRecruitment({
                ...body,
                id: null,
                recruitmentCreationType: openSaveDraft ? 0 : 1
            }).unwrap();
            handleCloseConfirm();
            enqueueSnackbar("Thêm tin tuyển dụng thành công!");
            await router.push(PATH_DASHBOARD.recruitment.root);
            } catch (e) {
                enqueueSnackbar("Thêm tin tuyển dụng không thành công. Vui lòng kiểm tra dữ liệu và thử lại!", {
                    variant: 'error',
                });
                handleCloseConfirm();
                throw e;
            }
    }

    if (isLoading) {
        return <LoadingScreen />
    }

    return (
        <Page title='Sao chép tin tuyển dụng'>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <TabContext value={valueTab}>
                    <Grid container>
                        <Header
                            title={'Sao chép tin tuyển dụng'}
                            onOpenConfirm={handleOpenConfirm}
                            errors={isValid}
                            setShowAlert={setShowAlert}
                        />
                        <TabList onChange={handleChangeTab}/>
                    </Grid>
                    <Content>
                        <TabPanel value={'1'}>
                            <Information recruitment={Recruitment}/>
                        </TabPanel>
                        <TabPanel value={'2'}>
                            <Pipeline
                                recruitment={Recruitment}
                                ref={examinationDataRef}
                            />
                        </TabPanel>
                    </Content>
                </TabContext>
            </FormProvider>
            {
                showAlert && <ConfirmModal
                    open={showAlert}
                    onClose={() => setShowAlert(false)}
                    icon={<OrangeAlertIcon />}
                    title={'Trở về danh sách tin tuyển dụng'}
                    titleProps={{
                        sx: {
                            color: style.COLOR_MAIN,
                            fontWeight: 600,
                            marginBottom: 1
                        }
                    }}
                    subtitle={"Các thao tác trước đó sẽ không được lưu, Bạn có chắc chắn muốn trở lại?"}
                    data={getValues()}
                    onSubmit={() => router.push(PATH_DASHBOARD.recruitment.root)}
                    btnCancelProps={{title: 'Hủy',}}
                    btnConfirmProps={{
                        title: 'Trở lại',
                        color: 'dark'
                    }}
                />
            }
            {
                openSaveDraft && <ConfirmModal
                    open={openSaveDraft}
                    onClose={handleCloseConfirm}
                    icon={<DraftIcon height={45} width={50}/>}
                    title={'Lưu nháp tin tuyển dụng'}
                    titleProps={{
                        sx: {
                            color: style.COLOR_TEXT_PRIMARY,
                            fontWeight: 600,
                            marginBottom: 1
                        }
                    }}
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
                    title={'Gửi phê duyệt tin tuyển dụng'}
                    titleProps={{
                        sx: {
                            color: style.COLOR_PRIMARY,
                            fontWeight: 600,
                            marginBottom: 1
                        }
                    }}
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
