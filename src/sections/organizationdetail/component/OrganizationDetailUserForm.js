import React, {useEffect, useState} from "react";
import {isEmpty, get} from "lodash";
import * as Yup from "yup";
import {useForm, useWatch} from "react-hook-form";
import {Box, Divider, Drawer, IconButton, Stack, Typography} from "@mui/material";
import {FormProvider, RHFSelect, RHFSwitch} from "@/components/hook-form";
import Iconify from "@/components/Iconify";
import Scrollbar from "@/components/Scrollbar";
import {OrganizationFromHeadStyle} from "@/sections/organization/style";
import {yupResolver} from "@hookform/resolvers/yup";
import MuiButton from "@/components/BaseComponents/MuiButton";
import {AvatarDS} from "@/components/DesignSystem";
import RHFTreeSelect from "@/components/hook-form/RHFTreeSelect";
import {
    useGetListOrganizationWithChildQuery,
    useUpdateRoleUserMutation
} from "@/sections/organization/override/OverrideOrganizationSlice";
import {LabelStyle} from "@/components/hook-form/style";
import {useSnackbar} from "notistack";
import {useGetRoleGroupListQuery} from "@/sections/rolegroup";

const OrganizationUserForm = ({isOpen, onClose, data}) => {
    const {enqueueSnackbar} = useSnackbar();
    const [updateUser] = useUpdateRoleUserMutation();

    const {data: {items: ListRoleGroup = []} = {}} = useGetRoleGroupListQuery();
    const {data: {items: ListOrganization = []} = {}} = useGetListOrganizationWithChildQuery();

    const [, setIsScrolled] = useState(false);
    const defaultValues = {
        roleGroupId: '',
        organizationIds: [],
        isActive: true
    };

    const handleScroll = (e) => {
        setIsScrolled(e.target.scrollTop > 10);
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

    useEffect(()=>{
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
                    sx: {
                        width: {xs: 1, sm: 560, md: 800},
                        boxShadow: '-3px 0px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)',
                        position: 'fixed',
                        top: '64px',
                        right: 0
                    },
                    onScroll: handleScroll
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
                <Scrollbar sx={{zIndex: 9999, "& label": {zIndex: 0}}}>
                    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                        <OrganizationFromHeadStyle className="organization-form-head" width={800}>
                            <Typography variant="body1" sx={{fontSize: '16px', fontWeight: 600, color: "#455570"}}>
                                Chỉnh sửa người dùng
                            </Typography>
                            <IconButton size="small" onClick={onClose}><Iconify icon="ic:baseline-close"/></IconButton>
                        </OrganizationFromHeadStyle>
                        <Divider/>
                        {/* content form */}
                        <Box sx={{py: 2, px: 3, mb: 8}}>
                            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                                <AvatarDS
                                    sx={{height: "40px", width: "40px", borderRadius: "10px", fontSize: "10px"}}
                                    name={`${data?.lastName ? data?.lastName : ''}`}
                                />
                                <Stack sx={{ml: 1.5}}>
                                    <Typography sx={{color: '#172B4D', fontSize: 16, fontWeight: 600}}>
                                        {get(data, 'lastName') && get(data, 'lastName') || ''}
                                        {' '}
                                        {get(data, 'firstName') && get(data, 'firstName')}
                                    </Typography>
                                    {
                                        get(data, 'email') || get(data, 'phoneNumber') && (
                                            <Typography sx={{
                                                color: '#455570',
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
                                                    background: '#455570',
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
                                        backgroundColor: '#F2F4F5',
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
                                                        backgroundColor: '#FDFDFD',
                                                        '& .MuiFormHelperText-root.Mui-error': {
                                                            backgroundColor: '#F2F4F5',
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
                                                backgroundColor: '#FDFDFD',
                                                '& .MuiFormHelperText-root.Mui-error': {
                                                    backgroundColor: '#F2F4F5',
                                                    marginTop: 0,
                                                    paddingTop: 1.5
                                                }
                                            }}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: 12,
                                position: "fixed",
                                bottom: 0,
                                width: "800px",
                                padding: "16px 24px",
                                border: "1px solid #EFF3F6",
                                zIndex: 1001,
                            }}
                        >
                            <Stack flexDirection="row">
                                <MuiButton
                                    type="submit"
                                    loading={isSubmitting}
                                    title="Lưu"
                                    sx={{height: 36, minWidth: 24}}
                                />
                                <MuiButton
                                    title={"Hủy"}
                                    onClick={onClose}
                                    color={"basic"}
                                    sx={{
                                        height: 36,
                                        color: '#455570',
                                        fontWeight: 600,
                                        ml: 1,
                                        "&:hover": {backgroundColor: 'transparent', boxShadow: 'none'}
                                    }}
                                />
                            </Stack>
                            <RHFSwitch
                                name="isActive"
                                label={watchActive ? "Đang hoạt động" : "Không hoạt động"}
                                sx={{
                                    '& .MuiSwitch-switchBase.Mui-checked': {
                                        color: '#388E3C',
                                    },
                                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                        backgroundColor: '#A5D6A7',
                                    },
                                }}
                            />
                        </div>
                        {/* end content form */}
                        {/*<OrganizationFromFooterStyle className="organization-form-footer" width={800}>*/}
                        {/*    <Stack flexDirection="row">*/}
                        {/*        <MuiButton*/}
                        {/*            type="submit"*/}
                        {/*            loading={isSubmitting}*/}
                        {/*            title="Lưu"*/}
                        {/*            sx={{px: 2, py: 1, minWidth: 24}}*/}
                        {/*        />*/}
                        {/*        <MuiButton*/}
                        {/*            title={"Hủy"}*/}
                        {/*            onClick={onClose}*/}
                        {/*            color={"basic"}*/}
                        {/*            sx={{*/}
                        {/*                color: '#455570',*/}
                        {/*                fontWeight: 600,*/}
                        {/*                ml: 1,*/}
                        {/*                "&:hover": {backgroundColor: 'transparent', boxShadow: 'none'}*/}
                        {/*            }}*/}
                        {/*        />*/}
                        {/*    </Stack>*/}
                        {/*    <RHFSwitch*/}
                        {/*        name="isActive"*/}
                        {/*        label={watchActive ? "Đang hoạt động" : "Không hoạt động"}*/}
                        {/*    />*/}
                        {/*</OrganizationFromFooterStyle>*/}
                    </FormProvider>
                </Scrollbar>
            </Drawer>
        </>
    )
}

export default OrganizationUserForm;