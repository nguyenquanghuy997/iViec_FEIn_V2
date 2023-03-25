import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Divider,
  Link,
  Typography
} from "@mui/material";
import {styled} from "@mui/styles";
import OrganizationDialogTitle from "@/sections/organization/component/OrganizationDialogTitle";
import NextLink from "next/link";
import {PATH_DASHBOARD} from "@/routes/paths";
import {AlertBlueIcon} from "@/sections/recruitment/others/Icon";

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
  "&.title-active": {
    textAlign: 'center',
    width: '100%',
    fontSize: '16px',
    fontWeight: 600,
    color: '#1976D2',
    marginTop: theme.spacing(2),
    "&.title-inactive": {
      color: '#455570 !important'
    }
  }
}))

const DialogContentTextStyle = styled(DialogContentText)(({theme}) => ({
  "&.subtitle-active": {
    textAlign: 'center',
    width: '100%',
    fontSize: '14px',
    fontWeight: 400,
    display: 'block',
    marginTop: theme.spacing(2),
    "& .subtitle-active-name": {
      fontWeight: 600
    }
  }
}))

const ButtonCancelStyle = styled(Button)(() => ({
  "&.button-cancel": {
    fontSize: 14,
    fontWeight: 600,
    color: '#455570',
    backgroundColor: 'transparent',
    borderRadius: 6,
    "&:hover": {
      color: '#455570',
      backgroundColor: 'transparent',
    }
  }
}));
const ButtonActiveStyle = styled(Button)(() => ({
  "&.button-active": {
    fontSize: 14,
    fontWeight: 600,
    color: '#FDFDFD',
    backgroundColor: '#1976D2',
    borderRadius: 6,
    "&:hover": {
      color: '#FDFDFD',
      backgroundColor: '#1976D2',
    }
  }
}));

const OrganizationSettingModal = ({isOpenSettingOrganization, onClose}) => {

  return (
      <DialogStyle
          open={isOpenSettingOrganization}
          onClose={onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="dialog-delete"
      >
        <OrganizationDialogTitle onClose={onClose}/>
        <DialogContent
            sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', mt: 3}}>
          <AlertBlueIcon />
          <TitleAlertStyle className={`title-active`}>
            Chưa thể đăng tin tuyển dụng
          </TitleAlertStyle>
          <DialogContentTextStyle id="alert-dialog-description" className="subtitle-active">
            Bạn cần thiết lập thông tin công ty để mở tính năng đăng tin tuyển dụng!
          </DialogContentTextStyle>
          <Divider/>
        </DialogContent>
        <DialogActions sx={{borderTop: '1px solid #E7E9ED'}}>
          <ButtonCancelStyle className="button-cancel" onClick={onClose}>Hủy</ButtonCancelStyle>
          <NextLink href={PATH_DASHBOARD.company.root} passHref>
            <Link sx={{ textDecoration: 'none !important' }}>
              <ButtonActiveStyle className="button-active">
                Thiết lập thông tin công ty
              </ButtonActiveStyle>
            </Link>
          </NextLink>
        </DialogActions>
      </DialogStyle>
  )
}

export default React.memo(OrganizationSettingModal);