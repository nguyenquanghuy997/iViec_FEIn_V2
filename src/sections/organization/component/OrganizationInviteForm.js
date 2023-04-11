import React, { memo, useRef, useState } from "react";
import { Box, Dialog, DialogActions, DialogContent, Divider, IconButton, Tab, Tabs, Typography } from "@mui/material";
import { FormProvider, RHFSelect, RHFTextField } from "@/components/hook-form";
import { useFieldArray, useForm } from "react-hook-form";
import { DeleteIcon } from "@/assets/ActionIcon";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import RHFTreeSelect from "@/components/hook-form/RHFTreeSelect";
import { useSnackbar } from "notistack";
import {
    useDeleteInviteUserMutation,
    useInviteUserMutation,
    useResendEmailMutation
} from "@/sections/organization/override/OverrideOrganizationSlice";
import ConfirmModal, { MuiDialogTitle } from "@/components/BaseComponents/ConfirmModal";
import MuiButton from "@/components/BaseComponents/MuiButton";
import { LabelStyle } from "@/components/hook-form/style";
import Iconify from "@/components/Iconify";
import OrganizationInviteResultCard from "@/sections/organization/component/OrganizationInviteResultCard";
import OrganizationUserInviteTab from "@/sections/organization/component/OrganizationUserInviteTab";
import { AlertIcon, EmailInviteIcon } from "@/sections/organization/component/Icon";
import { useGetRoleGroupListQuery } from "@/sections/rolegroup";

function TabPanel(props) {
    const { children, value, index, ...other } = props;
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

const OrganizationInviteForm = ({ ListOrganization, isOpenInviteForm, setIsOpenInviteForm, valueTabDefault, organizationId }) => {
    const [valueTab, setValueTab] = useState(valueTabDefault);

    const [isShowResult, setIsShowResult] = useState(false);
    const [invitesResult, setInviteResult] = useState([])

    const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
    const [openConfirmResend, setIsOpenConfirmResend] = useState(false);
    const [itemConfirm, setItemConfirm] = useState({});

    const dataSubmitRef = useRef();
    const selectRef = useRef();

    const onClose = () => {
        setIsOpenInviteForm(false);
    }

    const handleChange = (event, newValue) => {
        setValueTab(newValue);
    };

    const [inviteUser] = useInviteUserMutation();
    const [deleteInviteUser] = useDeleteInviteUserMutation();
    const [resendInviteUser] = useResendEmailMutation();
    const { enqueueSnackbar } = useSnackbar();

    const defaultValues = {
        invite: [
            {
                email: "",
                fullName: "",
                roleGroupId: "",
                organizationIds: organizationId?[organizationId]:[]
            }
        ]
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

    const { handleSubmit, control, formState: { isValid } } = methods;

    const { fields, append, remove } = useFieldArray({
        control,
        name: "invite",
    });

    const onSubmit = async (data) => {
        const dataSubmit = data.invite;
        dataSubmitRef.current = dataSubmit;
        try {
            const res = await inviteUser({ organizationUserInvites: dataSubmit }).unwrap();
            setInviteResult(res?.results)
            setIsShowResult(true);
        } catch (e) {
            enqueueSnackbar("Mời người dùng không thành công!", {
                autoHideDuration: 1000,
                variant: 'error',
            });
            setIsShowResult(true);
            throw e;
        }
    };

    const handleOpenConfirmDelete = (data) => {
        setOpenConfirmDelete(true)
        setItemConfirm(data);
    };
    const handleCloseConfirmDelete = () => {
        setOpenConfirmDelete(false);
        setItemConfirm({});
    };
    const handleOpenConfirmResend = (data) => {
        setIsOpenConfirmResend(true)
        setItemConfirm(data);
    };
    const handleCloseConfirmResend = () => {
        setIsOpenConfirmResend(false);
        setItemConfirm({});
    };
    const handleDeleteConfirm = async (data) => {
        try {
            await deleteInviteUser({ ids: [data?.id] }).unwrap();
            handleCloseConfirmDelete();
            enqueueSnackbar("Xóa lời mời thành công!", {
                autoHideDuration: 1000
            });
        } catch (e) {
            enqueueSnackbar("Xóa lời mời không thành công. Vui lòng kiểm tra dữ liệu và thử lại!", {
                autoHideDuration: 1000,
                variant: 'error',
            });
            throw e;
        }
    }
    const handleResendEmailConfirm = async (data) => {
        try {
            await resendInviteUser({ ids: [data?.id] }).unwrap();
            handleCloseConfirmResend();
            enqueueSnackbar("Gửi yêu cầu active tài khoản thành công!", {
                autoHideDuration: 1000
            });
        } catch (e) {
            enqueueSnackbar("Gửi yêu cầu active tài khoản không thành công. Vui lòng kiểm tra dữ liệu và thử lại!", {
                autoHideDuration: 1000,
                variant: 'error',
            });
            throw e;
        }
    }

    const { data: { items: ListRoleGroup = [] } = {} } = useGetRoleGroupListQuery();

    return (
        <Dialog
            open={isOpenInviteForm}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className="dialog-confirm"
            maxWidth={"md"}
            sx={{
                boxShadow: ' 0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)',
                borderRadius: '6px',
                minHeight: '600px',
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        borderRadius: '6px',
                        width: "100%",
                    },
                },
            }}
            scroll={"paper"}
        >
            <MuiDialogTitle onClose={onClose}>
                {isShowResult && <IconButton edge="start" size={"small"} sx={{ mr: 2 }} onClick={() => setIsShowResult(false)}>
                    <Iconify icon="material-symbols:arrow-back" />
                </IconButton>}
                <Typography variant="body1" sx={{ fontSize: '16px', fontWeight: 600, color: "#455570" }}>
                    {isShowResult ? 'Kết quả' : 'Mời người dùng'}
                </Typography>
            </MuiDialogTitle>
            <Divider />
            <Box sx={{ px: 3, pt: 3, pb: 0 }}>
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
                {
                    isShowResult ? (
                        <DialogContent sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}>
                            <Box className="box-content-wrapper" sx={{ width: '100%' }}>
                                {invitesResult?.map((item, index) => {
                                    const userItem = dataSubmitRef.current?.find((field) => field.email === item?.email);
                                    const roleGroup = ListRoleGroup.find(role => role.id === userItem?.roleGroupId);
                                    const organizations = ListOrganization.filter(organization => userItem?.organizationIds?.includes(organization?.id));
                                    return (
                                        <OrganizationInviteResultCard
                                            key={index}
                                            item={{
                                                name: userItem?.fullName,
                                                email: item?.email,
                                                roleGroup: roleGroup?.name,
                                                organizations,
                                                status: item?.isSucceed || false
                                            }}
                                        />
                                    )
                                })}
                            </Box>
                        </DialogContent>
                    ) : (
                        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                            <DialogContent sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                            }}>
                                <Box className="box-content-wrapper" sx={{ width: '100%' }}>
                                    {fields.map((item, index) => {
                                        return (
                                            <Box key={item.id} sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                width: '100%',
                                                backgroundColor: '#F2F4F5',
                                                padding: 2,
                                                mb: 2,
                                                borderRadius: .5
                                            }}>
                                                <Box className="box-content-inner">
                                                    <Box
                                                        sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, flex: 1 }}>
                                                        <Box>
                                                            <RHFTextField
                                                                name={`invite.${index}.email`}
                                                                isRequired
                                                                title="Email"
                                                                placeholder="Nhập email người được mời"
                                                                sx={{
                                                                    minWidth: '248px',
                                                                    backgroundColor: '#FDFDFD',
                                                                    '& .MuiFormHelperText-root.Mui-error': {
                                                                        backgroundColor: '#F2F4F5',
                                                                        marginTop: 0,
                                                                        paddingTop: 1
                                                                    }
                                                                }}
                                                            />
                                                        </Box>
                                                        <Box padding={'0 16px'}>
                                                            <RHFTextField
                                                                name={`invite.${index}.fullName`}
                                                                isRequired
                                                                title="Họ và tên"
                                                                placeholder="Họ và tên người được mời"
                                                                sx={{
                                                                    minWidth: '248px',
                                                                    backgroundColor: '#FDFDFD',
                                                                    '& .MuiFormHelperText-root.Mui-error': {
                                                                        backgroundColor: '#F2F4F5',
                                                                        marginTop: 0,
                                                                        paddingTop: 1
                                                                    }
                                                                }}
                                                            />
                                                        </Box>
                                                        <Box >
                                                            <LabelStyle required>Vai trò</LabelStyle>
                                                            <RHFSelect
                                                                options={ListRoleGroup?.map(item => ({
                                                                    ...item,
                                                                    value: item?.id,
                                                                    label: item?.name
                                                                }))}
                                                                ref={selectRef}
                                                                name={`invite.${index}.roleGroupId`}
                                                                placeholder="Chọn 1 vai trò"
                                                                sx={{
                                                                    minWidth: '248px',
                                                                    backgroundColor: '#FDFDFD',
                                                                    '& .MuiFormHelperText-root.Mui-error': {
                                                                        backgroundColor: '#F2F4F5',
                                                                        marginTop: 0,
                                                                        paddingTop: 1
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
                                                        name={`invite.${index}.organizationIds`}
                                                        isRequired
                                                        title="Đơn vị"
                                                        multiple
                                                        placeholder="Chọn 1 hoặc nhiều đơn vị"
                                                        sx={{
                                                            // minWidth: '276px',
                                                            backgroundColor: '#FDFDFD',
                                                            '& .MuiFormHelperText-root.Mui-error': {
                                                                backgroundColor: '#F2F4F5',
                                                                marginTop: 0,
                                                                paddingTop: 1.5
                                                            }
                                                        }}
                                                    />
                                                </Box>
                                                <span style={{ marginLeft: 16, display: 'block', padding: 8, cursor: 'pointer' }} onClick={() => remove(index)}>
                                                    <DeleteIcon />
                                                </span>
                                            </Box>
                                        );
                                    })}
                                    <MuiButton
                                        variant="outlined"
                                        title={"Thêm lời mời"}
                                        sx={{ mt: 3, fontWeight: 600 }}
                                        startIcon={<Iconify icon={'material-symbols:add'} width={20} height={20} />}
                                        onClick={() => append({ ...defaultValues })}
                                    />
                                </Box>
                            </DialogContent>
                            <DialogActions sx={{
                                minHeight: '68px',
                                borderTop: '1px solid #E7E9ED',
                                '& .btn-actions': {
                                    height: '36px',
                                },
                            }}>
                                <MuiButton
                                    title={"Hủy"}
                                    color={"basic"}
                                    onClick={onClose}
                                    className={'btn-actions btn-confirm'}
                                    sx={{
                                        "&:hover": {
                                            boxShadow: 'none',
                                            backgroundColor: 'transparent'
                                        }
                                    }}
                                />
                                <MuiButton
                                    title={"Gửi lời mời"}
                                    className={'btn-actions btn-confirm'}
                                    disabled={!isValid || fields.length === 0}
                                    type={"submit"}
                                />
                            </DialogActions>
                        </FormProvider>
                    )
                }
            </TabPanel>
            <TabPanel value={valueTab} index={1}><DialogContent sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                px: 3,
                py: 0
            }}>
                <OrganizationUserInviteTab
                    onOpenConfirmForm={handleOpenConfirmDelete}
                    onOpenConfirmResend={handleOpenConfirmResend}
                />
            </DialogContent>
            </TabPanel>
            {
                openConfirmDelete && (
                    <ConfirmModal
                        data={itemConfirm}
                        title={"Xác nhận xóa lời mời"}
                        titleProps={{
                            sx: {
                                color: '#E53935',
                                fontWeight: 600,
                                marginBottom: 1
                            }
                        }}
                        icon={<AlertIcon />}
                        subtitle={<>Bạn có chắc chắn muốn xóa lời mời tới<span>{itemConfirm?.email}</span>?</>}
                        onClose={handleCloseConfirmDelete}
                        open={openConfirmDelete}
                        onSubmit={handleDeleteConfirm}
                        btnConfirmProps={{
                            title: 'Xóa',
                            color: 'error'
                        }}
                        btnCancelProps={{
                            title: 'Hủy'
                        }}
                    />
                )
            }
            {
                openConfirmResend && (
                    <ConfirmModal
                        data={itemConfirm}
                        title={"Xác nhận gửi yêu cầu active tài khoản"}
                        titleProps={{
                            sx: {
                                color: '#1976D2',
                                fontWeight: 600,
                                marginBottom: 1
                            }
                        }}
                        icon={<EmailInviteIcon width={55} height={45} fill={"#1976D2"} />}
                        subtitle={<>Bạn có chắc chắn muốn gửi yêu cầu active tài khoản tới<span>{itemConfirm?.email}</span>?</>}
                        onClose={handleCloseConfirmResend}
                        open={openConfirmResend}
                        onSubmit={handleResendEmailConfirm}
                        btnConfirmProps={{
                            title: 'Gửi',
                        }}
                        btnCancelProps={{
                            title: 'Hủy'
                        }}
                    />
                )
            }
        </Dialog>
    )
}

export default memo(OrganizationInviteForm);