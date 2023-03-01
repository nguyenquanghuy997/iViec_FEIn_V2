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
const DialogStyle = styled(Dialog)(({theme}) => ({
  "& .dialog-delete": {
    boxShadow: ' 0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)',
    borderRadius: '6px',
    backgroundColor: "#FDFDFD",
    padding: theme.spacing(2)
  }
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

const ButtonDeleteStyle = styled(Button)(({}) => ({
  "&.button-delete": {
    fontSize: 14,
    fontWeight: 600,
    color: '#FDFDFD',
    backgroundColor: '#D32F2F',
    ":hover": {
      color: '#FDFDFD',
      backgroundColor: '#D32F2F',
    }
  }
}));

const OrganizationConfirmModal = ({showDelete, setShowDelete}) => {
  return (
      <DialogStyle
          open={showDelete}
          onClose={() => setShowDelete(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="dialog-delete"
      >
        <OrganizationDialogTitle onClose={() => setShowDelete(false)} />
        <DialogContent sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', mt: 3}}>
          <AlertIcon/>
          <TitleAlertStyle className="title-delete">
            Xác nhận xóa đơn vị
          </TitleAlertStyle>
          <DialogContentTextStyle id="alert-dialog-description" className="subtite-delete">
            Xóa đơn vị đồng nghĩa xóa hết các đơn vị và người dùng trực thuộc. Bạn có chắc chắn muốn xóa đơn vị <span
              className="subtitle-delete-name">FPT Head Office</span>?
          </DialogContentTextStyle>
          <Divider/>
        </DialogContent>
        <DialogActions sx={{padding: 2}}>
          <Button onClick={() => setShowDelete(false)}>Hủy</Button>
          <ButtonDeleteStyle className="button-delete" onClick={() => setShowDelete(false)} autoFocus>
            Xóa
          </ButtonDeleteStyle>
        </DialogActions>
      </DialogStyle>
  )
}

export default OrganizationConfirmModal;