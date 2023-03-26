import React, {memo, useState} from "react";
import {Box, DialogContent, Divider, Tab, Tabs, Typography} from "@mui/material";
import {FormProvider, RHFTextField} from "@/components/hook-form";
import {useFieldArray, useForm} from "react-hook-form";
import RHFDropdown from "@/components/hook-form/RHFDropdown";
import {useGetRoleGroupQuery} from "@/sections/organization/OrganizationSlice";
import {AddIcon, DeleteIcon} from "@/assets/ActionIcon";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import TreeMultiSelect from "@/sections/organization/component/TreeSelectMultiple";
import {useSnackbar} from "notistack";
import {
    useGetListInviteUserQuery,
    useInviteUserMutation
} from "@/sections/organization/override/OverrideOrganizationSlice";
import OrganizationUserInviteCard from "@/sections/organization/component/OrganizationUserInviteCard";
import {DialogActionsStyle, DialogStyle, MuiDialogTitle} from "@/components/BaseComponents/ConfirmModal";
import MuiButton from "@/components/BaseComponents/MuiButton";

function TabPanel(props) {
    const {children, value, index, ...other} = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>{children}</Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const OrganizationInviteForm = ({ListOrganization, isOpenInviteForm, setIsOpenInviteForm}) => {
    const [valueTab, setValueTab] = useState(0);

    const onClose = () => {
        setIsOpenInviteForm(false);
    }

    const handleChange = (event, newValue) => {
        setValueTab(newValue);
    };

    const [inviteUser] = useInviteUserMutation();
    const {enqueueSnackbar} = useSnackbar();

    const defaultValues = {
        email: "",
        fullName: "",
        roleGroupId: "",
        organizationIds: []
    }

    const FieldSchema = {
        email: Yup.string().email("Email không đúng định dạng").required("Email không được bỏ trống"),
        fullName: Yup.string().required("Họ và tên không được bỏ trống"),
        roleGroupId: Yup.string().required("Vai trò không được bỏ trống"),
        organizationIds: Yup.array().nullable().min(1, "Đơn vị không được bỏ trống"),
    };

    const OrganizationFormInviteSchema = Yup.object().shape({
        invite: Yup.array().of(Yup.object().shape(FieldSchema))
    });

    // form
    const methods = useForm({
        mode: 'all',
        resolver: yupResolver(OrganizationFormInviteSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        control,
        formState: {isValid}
    } = methods;

    const {fields, append, remove} = useFieldArray({
        control,
        name: "invite"
    });

    const onSubmit = async (data) => {
        const dataSubmit = data.invite;
        try {
            await inviteUser({organizationUserInvites: dataSubmit}).unwrap();
            enqueueSnackbar("Mời người dùng thành công!", {
                autoHideDuration: 1000
            });
            setIsOpenInviteForm(false)
        } catch (e) {
            enqueueSnackbar("Mời người dùng không thành công!", {
                autoHideDuration: 1000,
                variant: 'error',
            });
            throw e;
        }
    };

    const {data: {items: ListRoleGroup = []} = {}, isLoading} = useGetRoleGroupQuery();
    const {data: {items: ListUserInvite = []} = {}, isLoading: loadingUser} = useGetListInviteUserQuery();
    if (isLoading || loadingUser) return null;

    return (
        <DialogStyle
            open={isOpenInviteForm}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className="dialog-confirm"
            maxWidth={'1000px'}
        >
            <MuiDialogTitle onClose={onClose}>
                <Typography variant="body1" sx={{fontSize: '16px', fontWeight: 600, color: "#455570"}}>
                    Mời người dùng
                </Typography>
            </MuiDialogTitle>
            <Divider/>
            <Box sx={{padding: 3}}>
                <Tabs
                    value={valueTab}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    sx={{
                        "& .MuiTab-root": {
                            minHeight: '36px',
                            textTransform: 'unset',
                            padding: "8px 12px",
                        },
                        "& .Mui-selected": {
                            color: "white !important",
                            backgroundColor: "#455570",
                            borderRadius: "6px",
                        },
                        "& .MuiTabs-indicator": {
                            display: "none",
                        },
                    }}
                >
                    <Tab
                        label="Mời người dùng"
                        {...a11yProps(0)}
                        sx={{
                            "&:not(:last-of-type)": {
                                marginRight: "16px",
                            },
                            '& button': {
                                fontSize: '14px'
                            }
                        }}
                    />
                    <Tab
                        label="Danh sách mời"
                        {...a11yProps(1)}
                        sx={{
                            "&:not(:last-of-type)": {
                                marginRight: "16px",
                            },
                            '& button': {
                                fontSize: '14px'
                            }
                        }}
                    />
                </Tabs>
            </Box>
            <TabPanel value={valueTab} index={0}>
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        px: 3,
                        py: 0
                    }}>
                        <Box className="box-content-wrapper" sx={{width: '100%'}}>
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
                                                <Box sx={{minWidth: '276px'}}>
                                                    <RHFTextField
                                                        name={`invite.${index}.email`}
                                                        isRequired
                                                        title="Email"
                                                        placeholder="Nhập email người được mời"
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
                                                <Box sx={{minWidth: '276px'}}>
                                                    <RHFTextField
                                                        name={`invite.${index}.fullName`}
                                                        isRequired
                                                        title="Họ và tên"
                                                        placeholder="Họ và tên người được mời"
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
                                                <Box sx={{minWidth: '276px'}}>
                                                    <RHFDropdown
                                                        options={ListRoleGroup?.map(item => ({
                                                            ...item,
                                                            value: item?.id,
                                                            label: item?.name
                                                        }))}
                                                        name={`invite.${index}.roleGroupId`}
                                                        isRequired
                                                        title="Vai trò"
                                                        placeholder="Chọn 1 vai trò"
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
                                            <TreeMultiSelect
                                                options={ListOrganization}
                                                name={`invite.${index}.organizationIds`}
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
                                title={"Thêm lời mời"}
                                startIcon={<AddIcon />}
                                onClick={() => append({ ...defaultValues })}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActionsStyle sx={{padding: 2}}>
                        <MuiButton
                            title={"Hủy"}
                            color={"default"}
                            onClick={onClose}
                        />
                        <MuiButton
                            title={"Gửi lời mời"}
                            disabled={!isValid || fields.length === 0}
                            type={"submit"}
                        />
                    </DialogActionsStyle>
                </FormProvider>
            </TabPanel>
            <TabPanel value={valueTab} index={1}><DialogContent sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                px: 3,
                py: 0
            }}>
                <Box className="box-content-wrapper" sx={{width: '100%'}}>
                    <Box sx={{width: '100%', padding: 2, mb: 2}}>
                        {ListUserInvite.map((item, index) => {
                            return (
                                <OrganizationUserInviteCard
                                    key={index}
                                    item={item}
                                />
                            )
                        })}
                    </Box>
                </Box>
            </DialogContent>
            </TabPanel>
        </DialogStyle>
    )
}

export default memo(OrganizationInviteForm);