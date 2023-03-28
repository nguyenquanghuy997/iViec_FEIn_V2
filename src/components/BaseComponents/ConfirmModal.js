import React from 'react';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Typography
} from "@mui/material";
import MuiButton from "@/components/BaseComponents/MuiButton";
import CloseIcon from "@/assets/CloseIcon";
import {isEmpty} from "lodash";
import {styled} from "@mui/styles";

// style
export const DialogStyle = styled(Dialog)(({theme, minHeight = '288px', minWidth = '600px', maxWidth = '600px'}) => ({
  "& .dialog-confirm": {
    boxShadow: ' 0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)',
    borderRadius: theme.spacing(0.75),
    backgroundColor: "#FDFDFD",
    minHeight: minHeight,
    minWidth: minWidth,
  },
  "& .MuiDialog-container": {
    "& .MuiPaper-root": {
      borderRadius: theme.spacing(0.75),
      width: "100%",
      maxWidth: maxWidth || minWidth,
      top: -200
    },
  },
}))

export const DialogContentStyle = styled(DialogContent)(({theme}) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  padding: theme.spacing(0, 2),
  marginTop: theme.spacing(3)
}))

export const DialogActionsStyle = styled(DialogActions)(({theme}) => ({
  borderTop: '1px solid #E7E9ED',
  marginTop: theme.spacing(1),
  padding: theme.spacing(0, 2),
}))

export const TitleAlertStyle = styled(Typography)(({theme, fontSize = 16, fontWeight = 600, color = '#E53935'}) => ({
  textAlign: 'center',
  width: '100%',
  fontSize: fontSize,
  fontWeight: fontWeight,
  color: color,
  padding: theme.spacing(0)
}))

export const DialogContentTextStyle = styled(DialogContentText)(({theme}) => ({
  textAlign: 'center',
  width: '100%',
  fontSize: '14px',
  fontWeight: 400,
  display: 'block',
  marginTop: theme.spacing(2),
  "& strong": {
    fontWeight: 600,
    marginLeft: theme.spacing(0.5)
  },
  "& span": {
    fontWeight: 600,
    marginLeft: theme.spacing(0.5)
  }
}))

export const MuiDialogTitle = ({children, onClose, ...other}) => {
  return (
      <DialogTitle
          id="customized-dialog-title"
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            m: 0,
            px: 3,
            py: 2,
            borderBottom: '1px solid #E7E9ED',
            minHeight: '68px'
          }} {...other}
      >
        {children}
        {onClose ? (
            <IconButton
                size={"small"}
                aria-label="close"
                onClick={onClose}
                sx={{
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: (theme) => theme.palette.grey[500],
                }}
            >
              <CloseIcon/>
            </IconButton>
        ) : null}
      </DialogTitle>
  );
}

const ConfirmModal = (
    {
      data,   // list id
      open,
      icon,
      title,
      subtitle,
      onClose,
      onSubmit,
      titleProps,
      btnCancelProps,
      btnConfirmProps,
      ...props
    }) => {

  const {title: btnTitleCancel, ...otherCancel} = btnCancelProps;
  const {title: btnTitleConfirm, ...otherConfirm} = btnConfirmProps;

  const handleSubmit = (data) => {
    if (!isEmpty(data)) {
      onSubmit(data);
    } else {
      onSubmit();
    }
  }

  return (
      <DialogStyle
          open={open}
          onClose={onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="dialog-confirm"
          {...props}
      >
        <MuiDialogTitle onClose={onClose}/>
        <DialogContentStyle>
          <Box sx={{py: 2}}>
            {icon}
          </Box>
          <TitleAlertStyle {...titleProps}>
            {title}
          </TitleAlertStyle>
          <DialogContentTextStyle id="alert-dialog-description" className="subtitle-confirm">
            {subtitle}
          </DialogContentTextStyle>
          <Divider/>
        </DialogContentStyle>
        <DialogActionsStyle>
          <MuiButton
              title={btnTitleCancel}
              color="basic"
              onClick={onClose}
              {...otherCancel}
          />
          <MuiButton
              title={btnTitleConfirm}
              color={"primary"}
              onClick={() => handleSubmit(data)}
              {...otherConfirm}
          />
        </DialogActionsStyle>
      </DialogStyle>
  )
}

export default React.memo(ConfirmModal);