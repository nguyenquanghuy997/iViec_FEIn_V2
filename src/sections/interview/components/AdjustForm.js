import CloseIcon from "@/assets/CloseIcon";
import { FormProvider } from "@/components/hook-form";
import { RHFDatePicker } from "@/components/hook-form";
import { RHFTextField } from "@/components/hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  Box,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const AdjustForm = (props) => {
  const { onClose, open } = props;
  const ConnectSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email không đúng định dạng")
      .required("Email không được bỏ trống"),
    password: Yup.string()
      .min(6, "Mật khẩu cần tối thiểu 6 ký tự")
      .required("Mật khẩu không được bỏ trống"),
  });

  const defaultValues = {
    email: "",
    password: "",
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(ConnectSchema),
    defaultValues,
  });

  const {
    // setError,
    handleSubmit,
  } = methods;
  const onSubmit = async () => {};
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
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
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", mb:2 }}>
          <Typography>Điều chỉnh hàng loạt</Typography>
          <CloseIcon />
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Box sx={{ mb: 2, width: "100%" }}>
            <Typography>
              Ngày phỏng vấn <span style={{ color: "red" }}>*</span>
            </Typography>

            <RHFDatePicker
              name={"test"}
              style={{
                background: "white",
                borderRadius: "6px",
              }}
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ mb: 2 }}>
              <Typography>
                Giờ phỏng vấn <span style={{ color: "red" }}>*</span>
              </Typography>
              <RHFTextField
                isRequired
                sx={{
                  minHeight: 44,
                  width: "100%",
                  background: "white",
                  border: "8px",
                }}
                name="detail "
                placeholder="Nhập số phút"
              />
            </Box>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ mb: 2 }}>
              <Typography>
                Thời lượng phỏng vấn <span style={{ color: "red" }}>*</span>
              </Typography>
              <RHFTextField
                isRequired
                sx={{
                  minHeight: 44,
                  width: "100%",
                  background: "white",
                  border: "8px",
                }}
                name="detail "
                placeholder="Nhập số phút"
              />
            </Box>
          </Box>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={onClose} sx={{ color: "#455570" }}>
            Hủy
          </Button>
          <Button autoFocus sx={{ color: "white", bgcolor: "#1976D2" , textTransform:'none'}}>
            Áp dụng
          </Button>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
};

export default AdjustForm;

AdjustForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};
