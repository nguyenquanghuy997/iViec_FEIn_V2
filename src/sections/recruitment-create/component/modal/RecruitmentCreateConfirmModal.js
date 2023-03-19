import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, Divider, Typography} from "@mui/material";
import {styled} from "@mui/styles";
import OrganizationDialogTitle from "@/sections/organization/component/OrganizationDialogTitle";
import { STYLE_CONSTANT as style } from "@/theme/palette";

const DialogStyle = styled(Dialog)(({theme}) => ({
  "& .dialog-delete": {
    boxShadow: ' 0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)',
    borderRadius: '6px',
    backgroundColor: style.BG_WHITE,
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
    fontSize: style.FONT_BASE,
    fontWeight: style.FONT_SEMIBOLD,
    color: style.COLOR_PRIMARY,
    marginTop: theme.spacing(2),
    "&.title-inactive": {
      color: style.COLOR_TEXT_PRIMARY
    }
  }
}))

const DialogContentTextStyle = styled(DialogContentText)(({theme}) => ({
  "&.subtitle-active": {
    textAlign: 'center',
    width: '100%',
    fontSize: style.FONT_SM,
    fontWeight: style.FONT_NORMAL,
    display: 'block',
    marginTop: theme.spacing(2),
    "& .subtitle-active-name": {
      fontWeight: style.FONT_SEMIBOLD,
    }
  }
}))

const ButtonCancelStyle = styled(Button)(({}) => ({
  "&.button-cancel": {
    fontSize: style.FONT_SM,
    fontWeight: style.FONT_SEMIBOLD,
    color: style.COLOR_TEXT_PRIMARY,
    backgroundColor: 'transparent',
    borderRadius: 6,
    "&:hover": {
      color: style.COLOR_TEXT_PRIMARY,
      backgroundColor: 'transparent',
    }
  }
}));
const ButtonActiveStyle = styled(Button)(({theme}) => ({
  "&.button-active": {
    fontSize: style.FONT_SM,
    fontWeight: style.FONT_SEMIBOLD,
    color: style.COLOR_WHITE,
    backgroundColor: style.BG_PRIMARY,
    borderRadius: 6,
    padding: theme.spacing(1, 2),
    "&:hover": {
      color: style.COLOR_WHITE,
      backgroundColor: style.BG_PRIMARY
    }
  }
}));

const RecruitmentCreateConfirmModal = ({isOpen, onClose, icon, title, subtitle, buttonTitle, onSubmit, handleSubmit}) => {
  return (
      <DialogStyle
          open={isOpen}
          onClose={onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="dialog-delete"
      >
        <OrganizationDialogTitle onClose={onClose}/>
        <DialogContent sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', mt: 3}}>
          {icon}
          <TitleAlertStyle className={`title-active`}>
            {title}
          </TitleAlertStyle>
          <DialogContentTextStyle id="alert-dialog-description" className="subtitle-active">
            {subtitle}
          </DialogContentTextStyle>
          <Divider/>
        </DialogContent>
        <DialogActions sx={{borderTop: '1px solid #E7E9ED'}}>
          <ButtonCancelStyle className="button-cancel" onClick={onClose}>Hủy</ButtonCancelStyle>
          <ButtonActiveStyle type="submit" className="button-active" onClick={handleSubmit(onSubmit)}>
            {buttonTitle}
          </ButtonActiveStyle>
        </DialogActions>
      </DialogStyle>
  )
}

export default React.memo(RecruitmentCreateConfirmModal);