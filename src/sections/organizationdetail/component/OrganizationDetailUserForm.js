import React, {useState} from "react";
import {Box, Divider, Drawer, IconButton, Stack, Typography} from "@mui/material";
import {FormProvider, RHFSwitch} from "@/components/hook-form";
import Iconify from "@/components/Iconify";
import Scrollbar from "@/components/Scrollbar";
import {useFieldArray, useForm, useWatch} from "react-hook-form";
import {OrganizationFromFooterStyle, OrganizationFromHeadStyle} from "@/sections/organization/style";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import MuiButton from "@/components/BaseComponents/MuiButton";
import {AvatarDS} from "@/components/DesignSystem";
import _ from "lodash";
import RHFDropdown from "@/components/hook-form/RHFDropdown";
import TreeMultiSelect from "@/sections/organization/component/TreeSelectMultiple";
import {AddIcon, DeleteIcon} from "@/assets/ActionIcon";
import {useGetRoleGroupQuery} from "@/sections/organization/OrganizationSlice";
import {useGetListOrganizationWithChildQuery} from "@/sections/organization/override/OverrideOrganizationSlice";

// const InputStyle = {
//     minHeight: 44,
//     minWidth: 552,
//     marginBottom: 24
// }
//
// const SelectStyle = {
//     minHeight: 44,
//     width: 264,
// }

const OrganizationUserForm = ({isOpen, onClose, data}) => {

    const {data: {items: ListRoleGroup = []} = {}} = useGetRoleGroupQuery();
    const {data: {items: ListOrganization = []} = {}} = useGetListOrganizationWithChildQuery();

    const [, setIsScrolled] = useState(false);
    const defaultValues = {
        id: "",
        isActive: true
    };

    const handleScroll = (e) => {
        setIsScrolled(e.target.scrollTop > 10);
    };

    const OrganizationFormSchema = Yup.object().shape({
        name: Yup.string().nullable().required("Tên đơn vị không được bỏ trống").max(50, "Tên đơn vị tối đa 50 ký tự"),
    });

    // form
    const methods = useForm({
        mode: 'all',
        resolver: yupResolver(OrganizationFormSchema),
        defaultValues,
    });

    const { control, handleSubmit, formState: {isSubmitting} } = methods;

    const {fields, append, remove} = useFieldArray({
        control,
        name: "user"
    });

    const watchActive = useWatch({ name: 'isActive', control })

    // useEffect(()=>{
    //     if (organization && actionType === 1) {
    //         for(let i in defaultValues) {
    //             methods.setValue(i, organization[i]);
    //         }
    //     } else {
    //         methods.reset(defaultValues)
    //     }
    // }, [organization, actionType])

    const onSubmit = async (data) => {
        const body = {...data};
        return body;
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
                        top: 'calc(100%-64px)'
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
                        <Box sx={{py: 2, px: 2, my: 8}}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                <AvatarDS
                                    sx={{height: "40px", width: "40px", borderRadius: "10px", fontSize: "10px"}}
                                    name={`${data?.lastName ? data?.lastName : ''}`}
                                />
                                <Stack sx={{ml: 1.5}}>
                                    <Typography sx={{color: '#172B4D', fontSize: 16, fontWeight: 600}}>
                                        {_.get(data, 'lastName') && _.get(data, 'lastName') || ''}
                                        {' '}
                                        {_.get(data, 'firstName') && _.get(data, 'firstName')}
                                    </Typography>
                                    {
                                        _.get(data, 'email') || _.get(data, 'phoneNumber') && (
                                            <Typography sx={{color: '#455570', fontSize: 12, fontWeight: 400, display: 'flex', alignItems: 'center'}}>
                                                {_.get(data, 'email') && _.get(data, 'email')}
                                                <Typography component={"span"} sx={{ display: 'inline-block', width: '3px', height: '3px', background: '#455570', borderRadius: '50%', mx: 0.5 }}></Typography>
                                                {_.get(data, 'phoneNumber') && _.get(data, 'phoneNumber')}
                                            </Typography>
                                        )
                                    }
                                </Stack>
                            </Box>
                                <Box className="box-content-wrapper" sx={{width: '100%', mt: 4}}>
                                    {fields.map((item, index) => {
                                        return (
                                            <Box key={item.id} sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                width: '100%',
                                                backgroundColor: '#F2F4F5',
                                                padding: 2,
                                                mb: 2
                                            }}>
                                                <Box className="box-content-inner" sx={{flex: 1}}>
                                                    <Box
                                                        sx={{display: 'flex', justifyContent: 'space-between', mb: 2, flex: 1}}>
                                                        <Box sx={{minWidth: '452px'}}>
                                                            <RHFDropdown
                                                                options={ListRoleGroup?.map(item => ({
                                                                    ...item,
                                                                    value: item?.id,
                                                                    label: item?.name
                                                                }))}
                                                                name={`user.${index}.email`}
                                                                isRequired
                                                                title={`Vai trò ${index + 1}`}
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
                                                    <TreeMultiSelect
                                                        options={ListOrganization}
                                                        name={`user.${index}.organizationIds`}
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
                                                <span
                                                    style={{marginLeft: 16, display: 'block', padding: 8, cursor: 'pointer'}}
                                                    onClick={() => remove(index)}
                                                ><DeleteIcon/>
                                    </span>
                                            </Box>
                                        );
                                    })}
                                    <MuiButton
                                        variant="outlined"
                                        title={"Thêm vai trò"}
                                        startIcon={<AddIcon />}
                                        onClick={() => append({ ...defaultValues })}
                                    />
                                </Box>
                        </Box>
                        {/* end content form */}
                        <OrganizationFromFooterStyle className="organization-form-footer" width={800}>
                            <Stack flexDirection="row">
                                <MuiButton
                                    type="submit"
                                    loading={isSubmitting}
                                    title="Lưu"
                                    sx={{ px: 2, py: 1, minWidth: 24 }}
                                />
                                <MuiButton
                                    title={"Hủy"}
                                    onClick={onClose}
                                    color={"basic"}
                                    sx={{ color: '#455570', fontWeight: 600, ml: 1, "&:hover": { backgroundColor: 'transparent', boxShadow: 'none' } }}
                                />
                            </Stack>

                            <RHFSwitch
                                name="isActive"
                                label={watchActive ? "Đang hoạt động" : "Dừng hoạt động"}
                            />
                        </OrganizationFromFooterStyle>
                    </FormProvider>
                </Scrollbar>
            </Drawer>
        </>
    )
}

export default React.memo(OrganizationUserForm);