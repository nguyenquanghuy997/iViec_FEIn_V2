import React from 'react'
import Iconify from "@/components/Iconify";
import { DialogTitle, IconButton } from "@mui/material";

const OrganizationDialogTitle = (props) => {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle id="customized-dialog-title"  {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Iconify icon="ic:baseline-close" />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default OrganizationDialogTitle;