import React from 'react';
import {Box, DialogTitle, Divider, IconButton} from "@mui/material";
import {
  DialogActionsStyle,
  DialogContentStyle,
  DialogContentTextStyle,
  DialogStyle,
  TitleAlertStyle
} from "@/sections/recruitment-create/style";
import MuiButton from "@/components/BaseComponents/MuiButton";
import CloseIcon from "@/assets/CloseIcon";
import {isEmpty} from "lodash";

const MuiDialogTitle = ({ children, onClose, ...other }) => {
  return (
      <DialogTitle id="customized-dialog-title" sx={{m: 0, px: 3, py: 2}} {...other}>
        {children}
        {onClose ? (
            <IconButton
                size={"small"}
                aria-label="close"
                onClick={onClose}
                sx={{
                  position: 'absolute',
                  right: 12,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
            >
              <CloseIcon />
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
        <MuiDialogTitle onClose={onClose} />
        <DialogContentStyle>
          <Box sx={{ py: 2 }}>
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