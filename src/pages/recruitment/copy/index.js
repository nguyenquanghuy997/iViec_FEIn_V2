import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import {Box, Grid, Typography} from "@mui/material";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import {useSnackbar} from "notistack";
import * as Yup from "yup";

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
    useGetRecruitmentByIdQuery,
    useUpdateRecruitmentDraftMutation,
    useUpdateRecruitmentOfficialMutation
} from "@/sections/recruitment";

import {PATH_DASHBOARD} from "@/routes/paths";
import ConfirmModal from "@/components/BaseComponents/ConfirmModal";
import {DraftIcon, SendIcon} from "@/sections/recruitment-form/icon/HeaderIcon";
import {STYLE_CONSTANT as style} from "@/theme/palette";

import {RecruitmentWorkingForm} from "@/utils/enum";
import {cleanObject} from "@/utils/function";

CloneRecruitment.getLayout = function getLayout({roles = []}, page) {
    return <Layout roles={roles}>{page}</Layout>
}

export async function getStaticProps() {
    return {
        props: {
            roles: getRolesByPage(PAGES.Jobs),
        },
    }
}

export default function CloneRecruitment() {
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();
    const router = useRouter();
    const {query} = router;
    const [selected, setSelected] = useState(0);
    const _timeoutTab = useRef();

    const stateOpenForm = useSelector((state) => state.modalReducer.openState);
    const {openSaveDraft, openPreview, openSaveApprove} = stateOpenForm;

    const [pipelineStateDatas, setPipelineStateDatas] = useState([]);

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
    const {data: Recruitment = {}} = useGetRecruitmentByIdQuery({Id: query.source}, {skip: !query.source})

    const defaultValues = {
        id: '',
        name: '',
        organizationId: defaultOrganization?.id,
        description:'',
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

    const FormValidate = Yup.object().shape({
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
        startDate: Yup.date().typeError("Ngày bắt đầu không đúng định dạng").transform(value => (!value ? new Date().toISOString() : value)).required('Ngày bắt đầu không được bỏ trống'),
        endDate: Yup.date().transform(value => (!value ? new Date().toISOString() : value)).typeError("Ngày kết thúc không đúng định dạng").min(Yup.ref('startDate'), "Ngày kết thúc phải lớn hơn ngày bắt đầu").required('Ngày kết thúc không được bỏ trống'),
        description: Yup.string().required("Mô tả công việc không được bỏ trống"),
        requirement: Yup.string().required("Yêu cầu công việc không được bỏ trống"),
        benefit: Yup.string().required("Quyền lợi không được bỏ trống"),
        ownerId: Yup.string().required("Cán bộ tuyển dụng không được bỏ trống"),
        organizationPipelineId: Yup.string().required("Quy trình tuyển dụng không được bỏ trống"),
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
        resolver: openSaveDraft ? null : yupResolver(FormValidate),
        defaultValues: defaultValues,
    });

    const {handleSubmit, getValues, setValue, formState: {isValid}} = methods;

    useEffect(() => {
        for (let i in defaultValues) {
            setValue(i, Recruitment[i]);
            setValue('organizationId', Recruitment?.organizationId || defaultOrganization?.id)
            setValue('recruitmentAddressIds', Recruitment?.recruitmentAddresses?.map(item => ({value: item?.provinceId, label: item?.provinceName})))
            setValue('recruitmentJobCategoryIds', Recruitment?.recruitmentJobCategories?.map(item => ({value: item?.jobCategoryId, label: item?.name})))
            setValue('recruitmentWorkingForms', Recruitment?.recruitmentWorkingForms?.map(item => ({value: item?.workingForm, label: RecruitmentWorkingForm(item?.workingForm)})))
            setValue('jobPositionId', Recruitment?.jobPosition?.id)
            setValue('recruitmentCouncilIds', Recruitment?.recruitmentCouncils?.map(item => ({value: item?.councilUserId, label: item.email || item.councilName})))
            setValue('coOwnerIds', Recruitment?.coOwners?.map(item => ({value: item?.id, label: item.email || item.name})))
            setValue('recruitmentLanguageIds', Recruitment?.recruitmentLanguages?.map(item => ({value: item?.languageId, label: item?.name})))
            setValue('organizationPipelineId', Recruitment?.recruitmentPipeline?.organizationPipelineId);
            setValue('currencyUnit', Recruitment?.currencyUnit);
            setPipelineStateDatas(Recruitment?.recruitmentPipeline?.recruitmentPipelineStates?.map(item => (
                {
                    organizationPipelineId: Recruitment?.recruitmentPipeline?.organizationPipelineId,
                    expiredTime: item?.examinationExpiredTime,
                    examinationId: item?.examinationId,
                    examinationName: item?.examinationName,
                    pipelineStateType: item?.pipelineStateType,
                }
            )))
        }
    }, [Recruitment, defaultOrganization])

    const display = [
        {
            tab: <Information recruitment={Recruitment}/>,
            title: 'Thông tin tuyển dụng',
        },
        {
            id: 'pipeline',
            tab: <Pipeline
                recruitment={Recruitment}
                pipelineStateDatas={pipelineStateDatas}
                onSetPipelineStateDatas={handleSetPipelineStateDatas}
            />,
            title: 'Quy trình tuyển dụng',
        },
    ];

    const handleSelected = (index) => {
        setSelected(index);

        clearTimeout(_timeoutTab.current);
        _timeoutTab.current = setTimeout(() => {
            router.push({
                pathname: PATH_DASHBOARD.recruitment.copy,
                query: {...query},
                hash: display[index].id || null,
            }, undefined, {shallow: true});
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
        const {children, value, index, ...other} = props;
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
            organizationPipelineStateDatas: pipelineStateDatas?.map(item => ({
                organizationPipelineStateId: item.organizationPipelineStateId,
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
        <Page title='Sao chép tin tuyển dụng'>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container>
                <Header
                    title={'Sao chép tin tuyển dụng'}
                    onOpenConfirm={handleOpenConfirm}
                    errors={isValid}
                />
                <TabList handleSelected={handleSelected} selected={selected}/>
            </Grid>
            <Content>
                <Grid container columnSpacing={3}>
                    <Grid item md={12} className="profile-content">
                        {display.map((d, index) =>
                                <TabDisplay value={selected} key={index} index={index} onSubmit={onSubmit}>
                                    {d.tab}
                                </TabDisplay>
                            )}
                        </Grid>
                    </Grid>

            </Content>
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
