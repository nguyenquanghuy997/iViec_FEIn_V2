import CloseIcon from "../../assets/CloseIcon";
import WarningIcon from "../../assets/WarningIcon";
// import { FormProvider } from "@/components/hook-form";
import {
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import {ACTION_CONTENT} from './config'
// import { useForm } from "react-hook-form";
// import { Controller, useFormContext } from "react-hook-form";

const ConnectDialog = (props) => {
  const { onClose, open,type,onDelete } = props;
  return (
    <Dialog
      onClose={onClose}
      open={open}
      sx={{
        "& .MuiPaper-root": {
          width: "100%",
          borderRadius: "6px!important",
        },
      }}
    >
      <DialogTitle sx={{p:0, display: "flex", justifyContent: "end" }}>
        <DialogActions onClick={onClose} >
          {" "}
          <CloseIcon />
        </DialogActions>
      </DialogTitle>
      <DialogTitle sx={{p:0, display: "flex", justifyContent: "center" }}>
        <WarningIcon />
      </DialogTitle>

      <DialogTitle
        sx={{ color: ACTION_CONTENT[type].color, display: "flex", justifyContent: "center" }}
      >
       {ACTION_CONTENT[type].confirm}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {ACTION_CONTENT[type].text}
        </DialogContentText>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={onClose} sx={{ color: "#455570" }}>
          Hủy
        </Button>
        <Button
          onClick={onDelete}
          autoFocus
          sx={{ color: "white", background: ACTION_CONTENT[type].color,  }}
        >
           {ACTION_CONTENT[type].textButton}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConnectDialog;

ConnectDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};
