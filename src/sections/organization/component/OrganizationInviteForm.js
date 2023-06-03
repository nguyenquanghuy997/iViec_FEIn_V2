import { DeleteIcon } from "@/assets/ActionIcon";
import ConfirmModal, {
  MuiDialogTitle,
} from "@/components/BaseComponents/ConfirmModal";
import MuiButton from "@/components/BaseComponents/MuiButton";
import { View } from "@/components/FlexStyled";
import Iconify from "@/components/Iconify";
import SvgIcon from "@/components/SvgIcon";
import { FormProvider, RHFSelect, RHFTextField } from "@/components/hook-form";
import RHFTreeSelect from "@/components/hook-form/RHFTreeSelect";
import { LabelStyle } from "@/components/hook-form/style";
import {
  AlertIcon,
  EmailInviteIcon,
} from "@/sections/organization/component/Icon";
import OrganizationInviteResultCard from "@/sections/organization/component/OrganizationInviteResultCard";
import OrganizationUserInviteTab from "@/sections/organization/component/OrganizationUserInviteTab";
import {
  useDeleteInviteUserMutation,
  useInviteUserMutation,
  useResendEmailMutation,
} from "@/sections/organization/override/OverrideOrganizationSlice";
import { useGetRoleGroupListQuery } from "@/sections/rolegroup";
import { ButtonIcon } from "@/utils/cssStyles";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import { memo, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as Yup from "yup";

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
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const OrganizationInviteForm = ({
  ListOrganization,
  isOpenInviteForm,
  setIsOpenInviteForm,
  valueTabDefault,
  organizationId,
}) => {
  const [valueTab, setValueTab] = useState(valueTabDefault);
  const theme = useTheme();
  const [isShowResult, setIsShowResult] = useState(false);
  const [invitesResult, setInviteResult] = useState([]);

  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [openConfirmResend, setIsOpenConfirmResend] = useState(false);
  const [itemConfirm, setItemConfirm] = useState({});

  const dataSubmitRef = useRef();
  const selectRef = useRef();

  const onClose = () => {
    setIsOpenInviteForm(false);
  };

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
        organizationIds: organizationId ? [organizationId] : [],
      },
    ],
  };

  const FieldSchema = {
    email: Yup.string()
      .email("Email không đúng định dạng")
      .required("Email không được bỏ trống"),
    fullName: Yup.string().required("Họ và tên không được bỏ trống"),
    roleGroupId: Yup.string().required("Vai trò không được bỏ trống"),
    organizationIds: Yup.array()
      .nullable()
      .min(1, "Đơn vị không được bỏ trống"),
  };

  const OrganizationFormInviteSchema = Yup.object().shape({
    invite: Yup.array().of(Yup.object().shape(FieldSchema)),
  });

  // form
  const methods = useForm({
    mode: "all",
    resolver: yupResolver(OrganizationFormInviteSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "invite",
  });

  const onSubmit = async (data) => {
    const dataSubmit = data.invite;
    dataSubmitRef.current = dataSubmit;
    try {
      const res = await inviteUser({
        organizationUserInvites: dataSubmit,
      }).unwrap();
      setInviteResult(res?.results);
      setIsShowResult(true);
    } catch (e) {
      enqueueSnackbar("Mời người dùng không thành công!", {
        autoHideDuration: 1000,
        variant: "error",
      });
      setIsShowResult(true);
      throw e;
    }
  };

  const handleOpenConfirmDelete = (data) => {
    setOpenConfirmDelete(true);
    setItemConfirm(data);
  };
  const handleCloseConfirmDelete = () => {
    setOpenConfirmDelete(false);
    setItemConfirm({});
  };
  const handleOpenConfirmResend = (data) => {
    setIsOpenConfirmResend(true);
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
        autoHideDuration: 1000,
      });
    } catch (e) {
      enqueueSnackbar(
        "Xóa lời mời không thành công. Vui lòng kiểm tra dữ liệu và thử lại!",
        {
          autoHideDuration: 1000,
          variant: "error",
        }
      );
      throw e;
    }
  };
  const handleResendEmailConfirm = async (data) => {
    try {
      await resendInviteUser({ ids: [data?.id] }).unwrap();
      handleCloseConfirmResend();
      enqueueSnackbar("Gửi yêu cầu active tài khoản thành công!", {
        autoHideDuration: 1000,
      });
    } catch (e) {
      enqueueSnackbar(
        "Gửi yêu cầu active tài khoản không thành công. Vui lòng kiểm tra dữ liệu và thử lại!",
        {
          autoHideDuration: 1000,
          variant: "error",
        }
      );
      throw e;
    }
  };

  const { data: { items: ListRoleGroup = [] } = {} } =
    useGetRoleGroupListQuery();

  return (
    <Dialog
      open={isOpenInviteForm}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="dialog-confirm"
      maxWidth={"md"}
      sx={{
        boxShadow:
          " 0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)",
        borderRadius: "6px",
        minHeight: "600px",
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            borderRadius: "6px",
            width: "100%",
          },
        },
      }}
      scroll={"paper"}
    >
      <MuiDialogTitle onClose={onClose}>
        <View flex1 flexRow atCenter>
          {isShowResult && (
            <ButtonIcon
              sx={{
                textTransform: "none",
              }}
              onClick={() => setIsShowResult(false)}
              icon={
                <SvgIcon>
                  {
                    '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_9022_51686)"> <path d="M6.52398 9.16664H16.6673V10.8333H6.52398L10.994 15.3033L9.81565 16.4816L3.33398 9.99998L9.81565 3.51831L10.994 4.69664L6.52398 9.16664Z" fill="#172B4D"/> </g> <defs> <clipPath id="clip0_9022_51686"> <rect width="20" height="20" fill="white"/> </clipPath> </defs> </svg>'
                  }
                </SvgIcon>
              }
            />
          )}
          <Typography
            variant="body1"
            sx={{
              fontSize: "16px",
              fontWeight: 600,
              color: theme.palette.common.neutral700,
            }}
          >
            {isShowResult ? "Kết quả" : "Mời người dùng"}
          </Typography>
        </View>
      </MuiDialogTitle>
      <Divider />
      <Box sx={{ px: 3, pt: 3, pb: 0 }}>
        <Tabs
          value={valueTab}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            "& .MuiTab-root": {
              minHeight: "44px",
              textTransform: "unset",
              padding: "8px 12px",
            },
            "& .Mui-selected": {
              color: "white !important",
              backgroundColor: theme.palette.common.neutral700,
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
              fontWeight: 600,
              "&:not(:last-of-type)": {
                marginRight: "16px",
                // marginLeft:"15px",
              },
              "& button": {
                fontSize: "14px",
              },
            }}
          />
          <Tab
            label="Danh sách mời"
            {...a11yProps(1)}
            sx={{
              fontWeight: 600,
              "&:not(:last-of-type)": {
                marginRight: "16px",
              },
              "& button": {
                fontSize: "14px",
              },
            }}
          />
        </Tabs>
      </Box>
      <TabPanel value={valueTab} index={0}>
        {isShowResult ? (
          <DialogContent
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box
              className="box-content-wrapper"
              sx={{ width: "100%", height: "685px" }}
            >
              {invitesResult?.map((item, index) => {
                const userItem = dataSubmitRef.current?.find(
                  (field) => field.email === item?.email
                );
                const roleGroup = ListRoleGroup.find(
                  (role) => role.id === userItem?.roleGroupId
                );
                const organizations = ListOrganization.filter((organization) =>
                  userItem?.organizationIds?.includes(organization?.id)
                );
                return (
                  <OrganizationInviteResultCard
                    key={index}
                    item={{
                      name: userItem?.fullName,
                      email: item?.email,
                      roleGroup: roleGroup?.name,
                      organizations,
                      status: item?.isSucceed || false,
                    }}
                  />
                );
              })}
            </Box>
          </DialogContent>
        ) : (
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <DialogContent
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Box
                className="box-content-wrapper"
                sx={{ width: "100%", height: "600px" }}
              >
                {fields.map((item, index) => {
                  const disableDelete = fields.length < 2;
                  return (
                    <Box
                      key={item.id}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        backgroundColor: theme.palette.common.bgrMaster,
                        padding: 2,
                        mb: 2,
                        borderRadius: 0.5,
                      }}
                    >
                      <View flex1>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 2,
                          }}
                        >
                          <View flex1>
                            <RHFTextField
                              name={`invite.${index}.email`}
                              isRequired
                              title="Email"
                              placeholder="Nhập email người được mời"
                              sx={{
                                backgroundColor: theme.palette.common.bgrMaster,
                                "& .MuiFormHelperText-root.Mui-error": {
                                  backgroundColor:
                                    theme.palette.common.bgrMaster,
                                  marginTop: 0,
                                  paddingTop: 1,
                                },
                              }}
                            />
                          </View>
                          <View flex1 ml={16}>
                            <RHFTextField
                              name={`invite.${index}.fullName`}
                              isRequired
                              title="Họ và tên"
                              placeholder="Họ và tên người được mời"
                              sx={{
                                backgroundColor: theme.palette.common.white,
                                "& .MuiFormHelperText-root.Mui-error": {
                                  backgroundColor:
                                    theme.palette.common.bgrMaster,
                                  marginTop: 0,
                                  paddingTop: 1,
                                },
                              }}
                            />
                          </View>
                          <View flex1 ml={16}>
                            <LabelStyle required>Vai trò</LabelStyle>
                            <RHFSelect
                              options={ListRoleGroup?.filter(
                                (x) => x.isActivated
                              ).map((item) => ({
                                ...item,
                                value: item?.id,
                                label: item?.name,
                              }))}
                              ref={selectRef}
                              name={`invite.${index}.roleGroupId`}
                              placeholder="Chọn 1 vai trò"
                              sx={{
                                backgroundColor: theme.palette.common.white,
                                "& .MuiFormHelperText-root.Mui-error": {
                                  backgroundColor:
                                    theme.palette.common.bgrMaster,
                                  marginTop: 0,
                                  paddingTop: 1,
                                },
                              }}
                            />
                          </View>
                        </Box>
                        <RHFTreeSelect
                          options={ListOrganization.map((item) => ({
                            id: item.id,
                            value: item.id,
                            label: item.name,
                            parentOrganizationId: item.parentOrganizationId,
                          }))}
                          name={`invite.${index}.organizationIds`}
                          isRequired
                          title="Đơn vị"
                          multiple
                          placeholder="Chọn 1 hoặc nhiều đơn vị"
                          sx={{
                            // minWidth: '276px',
                            backgroundColor: theme.palette.common.white,
                            "& .MuiFormHelperText-root.Mui-error": {
                              backgroundColor: theme.palette.common.bgrMaster,
                              marginTop: 0,
                              paddingTop: 1.5,
                            },
                          }}
                        />
                      </View>
                      <View
                        contentCenter
                        ml={16}
                        size={44}
                        onPress={() => (disableDelete ? {} : remove(index))}
                      >
                        <DeleteIcon
                          fill={
                            disableDelete
                              ? theme.palette.common.neutral400
                              : theme.palette.common.red600
                          }
                        />
                      </View>
                    </Box>
                  );
                })}
                <MuiButton
                  variant="outlined"
                  title={"Thêm lời mời"}
                  sx={{ mt: 3, fontWeight: 600,  fontFamily:'Inter' }}
                  startIcon={
                    <Iconify
                      icon={"material-symbols:add"}
                      width={20}
                      height={20}
                    />
                  }
                  onClick={() => append({ ...defaultValues })}
                />
              </Box>
            </DialogContent>
            <DialogActions
              sx={{
                height: "85px",
                borderTop: "1px solid #E7E9ED",
                "& .btn-actions": {
                  height: "36px",
                },
              }}
            >
              <MuiButton
                title={"Hủy"}
                color={"basic"}
                onClick={onClose}
                className={"btn-actions btn-confirm"}
                sx={{
                  fontWeight:600,
                  fontSize:'14px',
                  "&:hover": {
                    boxShadow: "none",
                    backgroundColor: "transparent",
                  },
                }}
              />
              <MuiButton
                title={"Gửi lời mời"}
                className={"btn-actions btn-confirm"}
                disabled={!isValid || fields.length === 0}
                type={"submit"}
                sx={{
                  fontWeight:600,
                  fontSize:'14px',
                  color: theme.palette.common.white,
                }}
              />
            </DialogActions>
          </FormProvider>
        )}
      </TabPanel>
      <TabPanel value={valueTab} index={1}>
        <DialogContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            px: 3,
            pb: 3,
          }}
        >
          <OrganizationUserInviteTab
            onOpenConfirmForm={handleOpenConfirmDelete}
            onOpenConfirmResend={handleOpenConfirmResend}
          />
        </DialogContent>
      </TabPanel>
      {openConfirmDelete && (
        <ConfirmModal
          data={itemConfirm}
          title={"Xác nhận xóa lời mời"}
          titleProps={{
            sx: {
              color: theme.palette.common.red600,
              fontWeight: 600,
              marginBottom: 1,
            },
          }}
          icon={<AlertIcon />}
          subtitle={
            <>
              Bạn có chắc chắn muốn xóa lời mời tới
              <span>{itemConfirm?.email}</span>?
            </>
          }
          onClose={handleCloseConfirmDelete}
          open={openConfirmDelete}
          onSubmit={handleDeleteConfirm}
          btnCancelProps={{
            title: "Hủy",
            sx: {
              fontWeight: 600,
            },
          }}
          btnConfirmProps={{
            title: "Xóa",
            color: "error",
            sx: {
              fontWeight: 600,
            },
          }}
          dialogProps={{
            wrapperSx: {
              "& .MuiDialog-container": {
                paddingTop: "100px",
                alignItems: "flex-start",
                "& .MuiPaper-root": {
                  borderRadius: "6px",
                  width: "100%",
                },
              },
            },
          }}
        />
      )}
      {openConfirmResend && (
        <ConfirmModal
          data={itemConfirm}
          title={"Xác nhận gửi yêu cầu active tài khoản"}
          titleProps={{
            sx: {
              color: theme.palette.common.blue700,
              fontWeight: 600,
              marginBottom: 1,
            },
          }}
          icon={<EmailInviteIcon width={55} height={45} fill={"#1976D2"} />}
          subtitle={
            <>
              Bạn có chắc chắn muốn gửi yêu cầu active tài khoản tới
              <span>{itemConfirm?.email}</span>?
            </>
          }
          onClose={handleCloseConfirmResend}
          open={openConfirmResend}
          onSubmit={handleResendEmailConfirm}
          btnConfirmProps={{
            title: "Gửi",
          }}
          btnCancelProps={{
            title: "Hủy",
          }}
        />
      )}
    </Dialog>
  );
};

export default memo(OrganizationInviteForm);
