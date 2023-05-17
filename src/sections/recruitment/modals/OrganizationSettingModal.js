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
    backgroundColor: theme.palette.common.white,
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
    color: theme.palette.common.blue700,
    marginTop: theme.spacing(2),
    "&.title-inactive": {
      color: theme.palette.common.neutral700 +  ' !important'
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

const ButtonCancelStyle = styled(Button)(({theme}) => ({
  "&.button-cancel": {
    fontSize: 14,
    fontWeight: 600,
    color: theme.palette.common.neutral700,
    backgroundColor: 'transparent',
    borderRadius: 6,
    "&:hover": {
      color: theme.palette.common.neutral700,
      backgroundColor: 'transparent',
    }
  }
}));
const ButtonActiveStyle = styled(Button)(({theme}) => ({
  "&.button-active": {
    fontSize: 14,
    fontWeight: 600,
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.blue700,
    borderRadius: 6,
    "&:hover": {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.common.blue700,
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