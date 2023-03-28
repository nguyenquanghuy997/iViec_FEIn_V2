import React from 'react';
import {
  DialogActionsStyle,
  DialogContentStyle,
  DialogStyle,
  MuiDialogTitle
} from "@/components/BaseComponents/ConfirmModal";

const FormModal = ({children, open, onClose, header, actions, ...props}) => {
  return (
      <DialogStyle
          open={open}
          onClose={onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="dialog-confirm"
          {...props}
      >
        <MuiDialogTitle onClose={onClose}>
          {header}
        </MuiDialogTitle>
        <DialogContentStyle>
          {children}
        </DialogContentStyle>
        <DialogActionsStyle>
          {actions}
        </DialogActionsStyle>
      </DialogStyle>
  )
}

export default FormModal;