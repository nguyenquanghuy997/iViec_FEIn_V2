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
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
// import { useForm } from "react-hook-form";
// import { Controller, useFormContext } from "react-hook-form";

const ConnectForm = (props) => {
  const { onClose, open } = props;
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
      <DialogTitle
        sx={{ p: 0, display: "flex", justifyContent: "space-between" }}
      >
        <Typography>Thêm tài khoản TopCV</Typography>
        <DialogActions onClick={onClose}>
          <CloseIcon />
        </DialogActions>
      </DialogTitle>
      <DialogTitle sx={{ p: 0, display: "flex", justifyContent: "center" }}>
        <WarningIcon />
      </DialogTitle>

      <DialogTitle
        sx={{ color: "#E53935", display: "flex", justifyContent: "center" }}
      >
        Xác nhận xóa Fanpage
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          Bạn có chắc chắn muốn xóa Fanpage này không ?
        </DialogContentText>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={onClose} sx={{ color: "#455570" }}>
          Hủy
        </Button>
        <Button
          onClick={onClose}
          autoFocus
          sx={{ color: "white", background: "#D32F2F" }}
        >
          Xóa
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConnectForm;

ConnectForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};
