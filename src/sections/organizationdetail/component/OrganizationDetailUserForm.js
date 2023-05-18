import React, {useEffect} from "react";
import {get, isEmpty} from "lodash";
import * as Yup from "yup";
import {useForm, useWatch} from "react-hook-form";
import {Box, Drawer, Stack, Typography, useTheme} from "@mui/material";
import {FormProvider, RHFSelect, RHFSwitch} from "@/components/hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {AvatarDS} from "@/components/DesignSystem";
import RHFTreeSelect from "@/components/hook-form/RHFTreeSelect";
import {
    useGetListOrganizationWithChildQuery,
    useUpdateRoleUserMutation
} from "@/sections/organization/override/OverrideOrganizationSlice";
import {LabelStyle} from "@/components/hook-form/style";
import {useSnackbar} from "notistack";
import {useGetRoleGroupListQuery} from "@/sections/rolegroup";
import FormModalHead from "@/components/BaseComponents/form-modal/FormModalHead";
import FormModalBottom from "@/components/BaseComponents/form-modal/FormModalBottom";
import {drawerPaperStyle} from "@/components/drawer-edit-form/styles";

const OrganizationUserForm = ({isOpen, onClose, data}) => {
    const {enqueueSnackbar} = useSnackbar();
    const theme = useTheme();
    const [updateUser] = useUpdateRoleUserMutation();

    const {data: {items: ListRoleGroup = []} = {}} = useGetRoleGroupListQuery();
    const {data: {items: ListOrganization = []} = {}} = useGetListOrganizationWithChildQuery();

    const defaultValues = {
        roleGroupId: '',
        organizationIds: [],
        isActive: true
    };

    const OrganizationFormSchema = Yup.object().shape({
        roleGroupId: Yup.string().nullable().required("Vai trò không được bỏ trống"),
        organizationIds: Yup.array().nullable().min(1, 'Đơn vị không được bỏ trống'),
    });

    // form
    const methods = useForm({
        mode: 'all',
        resolver: yupResolver(OrganizationFormSchema),
        defaultValues,
    });

    const {control, handleSubmit, setValue, formState: {isSubmitting}} = methods;
    const watchActive = useWatch({name: 'isActive', control})

    useEffect(() => {
        if (!isEmpty(data)) {
            setValue('roleGroupId', get(data, 'applicationUserRoleGroups[0].id'));
            setValue('organizationIds', get(data, 'organizations')?.map(item => item.id));
            setValue('isActive', get(data, 'isActive'));
        } else {
            methods.reset(defaultValues)
        }
    }, [data])

    const onSubmit = async (formData) => {
        try {
            await updateUser({
                userId: data?.id,
                roleGroupId: formData?.roleGroupId,
                organizationIds: formData?.organizationIds,
                isActive: formData?.isActive,
            }).unwrap();
            onClose();
            enqueueSnackbar("Chỉnh sửa người dùng thành công!", {
                autoHideDuration: 1000
            });
        } catch (e) {
            const {data} = e;
            if (data?.code === 'AUE_01') {
                enqueueSnackbar("Người dùng không hoạt động.", {
                    autoHideDuration: 1000,
                    variant: 'error',
                });
                return;
            }
            enqueueSnackbar("Chỉnh sửa người dùng không thành công. Vui lòng kiểm tra dữ liệu và thử lại!", {
                autoHideDuration: 1000,
                variant: 'error',
            });
            return e;
        }
    }

    return (
        <>
            <Drawer
                open={isOpen}
                onClose={onClose}
                anchor="right"
                PaperProps={{
                    sx: drawerPaperStyle({...theme, width: 800}),
                }}
                componentsProps={{
                    backdrop: {
                        sx: {
                            background: 'transparent !important',
                            boxShadow: 'none !important'
                        }
                    }
                }}
            >
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <FormModalHead title={'Chỉnh sửa người dùng'} onClose={onClose}/>
                    {/* content form */}
                    <div className="edit-container">
                        <Box>
                            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                                <AvatarDS
                                    sx={{height: "40px", width: "40px", borderRadius: "10px", fontSize: "10px"}}
                                    name={`${data?.lastName ? data?.lastName : ''}`}
                                />
                                <Stack sx={{ml: 1.5}}>
                                    <Typography sx={{color: theme.palette.common.neutral800, fontSize: 16, fontWeight: 600}}>
                                        {get(data, 'lastName') && get(data, 'lastName') || ''}
                                        {' '}
                                        {get(data, 'firstName') && get(data, 'firstName')}
                                    </Typography>
                                    {
                                        get(data, 'email') || get(data, 'phoneNumber') && (
                                            <Typography sx={{
                                                color: theme.palette.common.neutral700,
                                                fontSize: 12,
                                                fontWeight: 400,
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}>
                                                {get(data, 'email') && get(data, 'email')}
                                                <Typography component={"span"} sx={{
                                                    display: 'inline-block',
                                                    width: '3px',
                                                    height: '3px',
                                                    background: theme.palette.common.neutral700,
                                                    borderRadius: '50%',
                                                    mx: 0.5
                                                }}></Typography>
                                                {get(data, 'phoneNumber') && get(data, 'phoneNumber')}
                                            </Typography>
                                        )
                                    }
                                </Stack>
                            </Box>
                            <Box className="box-content-wrapper" sx={{width: '100%', mt: 4}}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        width: '100%',
                                        backgroundColor: theme.palette.common.bgrMaster,
                                        padding: 2,
                                        mb: 2
                                    }}
                                >
                                    <Box className="box-content-inner" sx={{flex: 1}}>
                                        <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 2, flex: 1}}>
                                            <Box sx={{minWidth: '452px'}}>
                                                <LabelStyle required>Vai trò</LabelStyle>
                                                <RHFSelect
                                                    options={ListRoleGroup?.map(item => ({
                                                        value: item?.id,
                                                        label: item?.name
                                                    }))}
                                                    name={`roleGroupId`}
                                                    placeholder="Chọn vai trò"
                                                    sx={{
                                                        minWidth: '452px',
                                                        backgroundColor: theme.palette.common.white,
                                                        '& .MuiFormHelperText-root.Mui-error': {
                                                            backgroundColor: theme.palette.common.bgrMaster,
                                                            marginTop: 0,
                                                            paddingTop: 1.5
                                                        }
                                                    }}
                                                />
                                            </Box>
                                        </Box>
                                        <RHFTreeSelect
                                            options={ListOrganization.map(item => ({
                                                id: item.id,
                                                value: item.id,
                                                label: item.name,
                                                parentOrganizationId: item.parentOrganizationId
                                            }))}
                                            name={`organizationIds`}
                                            isRequired
                                            title="Đơn vị"
                                            multiple
                                            placeholder="Chọn 1 hoặc nhiều đơn vị"
                                            sx={{
                                                minWidth: '276px',
                                                backgroundColor: theme.palette.common.white ,
                                                '& .MuiFormHelperText-root.Mui-error': {
                                                    backgroundColor: theme.palette.common.bgrMaster,
                                                    marginTop: 0,
                                                    paddingTop: 1.5
                                                }
                                            }}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </div>
                    <FormModalBottom
                        onClose={onClose}
                        loading={isSubmitting}
                        btnConfirm={{
                            title: 'Lưu',
                            type: "submit",
                        }}
                        otherAction={<>
                            <RHFSwitch
                                name="isActive"
                                label={watchActive ? "Đang hoạt động" : "Không hoạt động"}
                                sx={{
                                    '& .MuiSwitch-switchBase.Mui-checked': {
                                        color: '#388E3C',
                                    },
                                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                        backgroundColor: theme.palette.common.green200,
                                    },
                                }}
                            />
                        </>}
                    />
                </FormProvider>
            </Drawer>
        </>
    )
}

export default OrganizationUserForm;