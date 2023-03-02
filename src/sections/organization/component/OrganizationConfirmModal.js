import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Divider,
  Typography
} from "@mui/material";
import {AlertIcon} from "@/sections/organization/component/Icon";
import {styled} from "@mui/styles";
import OrganizationDialogTitle from "@/sections/organization/component/OrganizationDialogTitle";
import {useDeleteOrganizationMutation} from "@/sections/organization/override/OverrideOrganizationSlice";
import {useSnackbar} from "notistack";
const DialogStyle = styled(Dialog)(({theme}) => ({
  "& .dialog-delete": {
    boxShadow: ' 0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)',
    borderRadius: '6px',
    backgroundColor: "#FDFDFD",
    padding: theme.spacing(3)
  },
  "& .MuiDialog-container": {
    "& .MuiPaper-root": {
      padding: theme.spacing(0, 2),
      borderRadius: '6px',
      width: "100%",
      maxWidth: '600px !important',
      top: -200
    },
  },
}))
const TitleAlertStyle = styled(Typography)(({theme}) => ({
  "&.title-delete": {
    textAlign: 'center',
    width: '100%',
    fontSize: '16px',
    fontWeight: 600,
    color: '#E53935',
    marginTop: theme.spacing(2),
  }
}))

const DialogContentTextStyle = styled(DialogContentText)(({theme}) => ({
  "&.subtite-delete": {
    textAlign: 'center',
    width: '100%',
    fontSize: '14px',
    fontWeight: 400,
    display: 'block',
    marginTop: theme.spacing(2),
    "& .subtitle-delete-name": {
      fontWeight: 600
    }
  }
}))

const ButtonCancelStyle = styled(Button)(({}) => ({
  "&.button-cancel": {
    fontSize: 14,
    fontWeight: 600,
    color: '#455570',
    backgroundColor: 'transparent',
    borderRadius: 6,
    ":hover": {
      color: '#455570',
      backgroundColor: 'transparent',
    }
  }
}));
const ButtonDeleteStyle = styled(Button)(({}) => ({
  "&.button-delete": {
    fontSize: 14,
    fontWeight: 600,
    color: '#FDFDFD',
    backgroundColor: '#D32F2F',
    borderRadius: 6,
    ":hover": {
      color: '#FDFDFD',
      backgroundColor: '#D32F2F',
    }
  }
}));

const OrganizationConfirmModal = ({showDelete, setShowDelete, node}) => {
  const {enqueueSnackbar} = useSnackbar();
  const [deleteOrganization] = useDeleteOrganizationMutation();

  const onClose = () => {
    setShowDelete(false);
  }

  const handleDeleteOrganization = async () => {
    try {
      await deleteOrganization({ id: node?.id }).unwrap();
      enqueueSnackbar("Xóa đơn vị thành công!");
      onClose();
    } catch (err) {
      console.log(err)
    }
  }
  return (
      <DialogStyle
          open={showDelete}
          onClose={() => setShowDelete(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="dialog-delete"
      >
        <OrganizationDialogTitle onClose={onClose} />
        <DialogContent sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', mt: 3}}>
          <AlertIcon/>
          <TitleAlertStyle className="title-delete">
            Xác nhận xóa đơn vị
          </TitleAlertStyle>
          <DialogContentTextStyle id="alert-dialog-description" className="subtite-delete">
            Xóa đơn vị đồng nghĩa xóa hết các đơn vị và người dùng trực thuộc. Bạn có chắc chắn muốn xóa đơn vị <span
              className="subtitle-delete-name">{node?.name}</span>?
          </DialogContentTextStyle>
          <Divider/>
        </DialogContent>
        <DialogActions sx={{borderTop: '1px solid #E7E9ED'}}>
          <ButtonCancelStyle className="button-cancel" onClick={onClose}>Hủy</ButtonCancelStyle>
          <ButtonDeleteStyle className="button-delete" onClick={handleDeleteOrganization} autoFocus>
            Xóa
          </ButtonDeleteStyle>
        </DialogActions>
      </DialogStyle>
  )
}

export default OrganizationConfirmModal;