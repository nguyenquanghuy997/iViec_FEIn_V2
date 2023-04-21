import React, {memo, useState} from "react";
import {Box, CircularProgress} from "@mui/material";
import OrganizationUserInviteCard from "@/sections/organization/component/OrganizationUserInviteCard";
import {
  useDeleteInviteUserMutation,
  useGetListInviteUserQuery, useResendEmailMutation
} from "@/sections/organization/override/OverrideOrganizationSlice";
import {useDispatch, useSelector} from "@/redux/store";
import {modalSlice} from "@/redux/common/modalSlice";
import BottomNavModal from "@/components/BaseComponents/BottomNavModal";
import {AlertIcon, EmailInviteIcon, GuardIcon} from "@/sections/organization/component/Icon";
import {DeleteIcon} from "@/assets/ActionIcon";
import ConfirmModal from "@/components/BaseComponents/ConfirmModal";
import {useSnackbar} from "notistack";

const OrganizationUserInviteTab = ({ onOpenConfirmForm, onOpenConfirmResend }) => {
  const dispatch = useDispatch();

  const [deleteInviteUser] = useDeleteInviteUserMutation();
  const [resendInviteUser] = useResendEmailMutation();
  const {enqueueSnackbar} = useSnackbar();

  const [selected, setSelected] = useState([]);
  const toggleModalState = useSelector((state) => state.modalReducer.openState);

  const {openDeleteInvite, openResend} = toggleModalState;
  const handleOpenModalState = (data) => dispatch(modalSlice.actions.openStateModal(data));
  const handleCloseModal = () => dispatch(modalSlice.actions.closeModal());

  const handleOpenBottomNav = (data) => dispatch(modalSlice.actions.onBottomNavModal(data));

  const {data: {items: ListUserInvite = []} = {}, isLoading: loadingUser} = useGetListInviteUserQuery();

  const handleSelected = (data) => {
    let findIndex = selected.map(i => i.id).indexOf(data.id);
    if (findIndex !== -1) {
      const selectedNext = [...selected].filter(i => i.id !== data.id)
      setSelected(selectedNext);
    } else {
      const selectedNext = [...selected, {...data}]
      setSelected(selectedNext);
    }
  }
  const handleCloseBottomNav = () => {
    handleOpenBottomNav({data: {}, selectedData: []});
    setSelected([]);
  };

  const handleResendMulti = async (data) => {
    try {
      await resendInviteUser({ ids: data.map(item => item.id) }).unwrap();
      handleCloseModal();
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

  const handleDeleteMulti = async (data) => {
    try {
      await deleteInviteUser({ ids: data.map(item => item.id) }).unwrap();
      handleCloseModal();
      enqueueSnackbar("Xóa lời mời thành công!", {
        autoHideDuration: 1000
      });
    } catch (e) {
      enqueueSnackbar("Xóa lòi mời không thành công. Vui lòng kiểm tra dữ liệu và thử lại!", {
        autoHideDuration: 1000,
        variant: 'error',
      });
      throw e;
    }
  }

  if (loadingUser) return (
      <Box textAlign="center" my={1}>
        <CircularProgress size={18} />
      </Box>
  )

  return (
      <>
        <Box className="box-content-wrapper" sx={{width: '100%'}}>
          <Box sx={{width: '100%', padding: 2, mb: 2}}>
            {ListUserInvite.map((item, index) => {
              return (
                  <OrganizationUserInviteCard
                      key={index}
                      item={item}
                      onOpenConfirmForm={() => onOpenConfirmForm(item)}
                      onOpenConfirmResend={() => onOpenConfirmResend(item)}
                      checked={selected.map(i => i.id).includes(item.id)}
                      onChangeSelected={() => handleSelected(item)}
                      // onOpenConfirmDelete={() => handleOpenConfirm(item)}
                      // onOpenFormModal={() => handleOpenFormUser(item)}
                  />
              )
            })}
          </Box>
        </Box>
        {openResend && <ConfirmModal
            open={openResend}
            onClose={handleCloseModal}
            data={selected}
            onSubmit={handleResendMulti}
            title={"Xác nhận gửi yêu cầu active tài khoản"}
            titleProps={{
              sx: {
                color: '#1976D2',
                fontWeight: 600,
                marginBottom: 1
              }
            }}
            icon={<EmailInviteIcon width={55} height={45} fill={"#1976D2"} />}
            subtitle={
              selected.length > 1 ?
                  (
                      <>Bạn có chắc chắn muốn gửi yêu cầu active tài khoản tới <span>{selected.length} email</span> này?</>
                  ) : (
                      <>Bạn có chắc chắn muốn gửi yêu cầu active tài khoản tới <span>{selected[0]?.email}</span>?</>
                  )
            }
            btnCancelProps={{
              title: 'Huỷ',
              sx: {
                "&:hover": {
                  boxShadow: 'none',
                  backgroundColor: 'transparent'
                }
              }
            }}
            btnConfirmProps={{
              title: 'Gửi',
              sx: {
                "&:hover": {
                  boxShadow: 'none',
                }
              }
            }}
        />}
        {openDeleteInvite && <ConfirmModal
            open={openDeleteInvite}
            onClose={handleCloseModal}
            icon={<AlertIcon/>}
            data={selected}
            onSubmit={handleDeleteMulti}
            title={"Xác nhận xóa lời mời"}
            titleProps={{
              sx: {
                color: '#E53935',
                fontWeight: 600,
                marginBottom: 1
              }
            }}
            subtitle={
              selected.length > 1 ?
                  (
                      <>Bạn có chắc chắn muốn xóa lời mời tới <span>{selected.length} email</span> này?</>
                  ) : (
                      <>Bạn có chắc chắn muốn xóa lời mời tới <span>{selected[0]?.email}</span>?</>
                  )
            }
            btnCancelProps={{
              title: 'Huỷ',
              sx: {
                "&:hover": {
                  boxShadow: 'none',
                  backgroundColor: 'transparent'
                }
              }
            }}
            btnConfirmProps={{
              title: 'Xóa',
              color: 'error',
              sx: {
                "&:hover": {
                  boxShadow: 'none',
                }
              }
            }}
        />}
        {
            selected.length > 0 && (
                <BottomNavModal
                    data={selected}
                    onClose={handleCloseBottomNav}
                    open={selected.length > 0}
                    className={"bottom-nav"}
                    sx={{
                      "& .MuiPaper-root": {
                        width: '100%',
                        maxWidth: '100% !important',
                        borderRadius: '0px !important'
                      }
                    }}
                    actions={[
                      {
                        key: "resend",
                        title: "Gửi yêu cầu active tài khoản",
                        onClick: () => handleOpenModalState({ openResend: true }),
                        startIcon: <GuardIcon />,
                        sx: { padding: "8px 12px" },
                      },
                      {
                        key: 'delete',
                        icon: <DeleteIcon/>,
                        onClick: () => handleOpenModalState({ openDeleteInvite: true }),
                      }
                    ]}

                />
            )
        }
      </>
  )
}

export default memo(OrganizationUserInviteTab)