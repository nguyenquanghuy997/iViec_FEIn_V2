import CloseIcon from "../../assets/CloseIcon";
import Iconify from "@/components/Iconify";
import { FormProvider } from "@/components/hook-form";
import { RHFTextField } from "@/components/hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  InputAdornment,
  Stack,
  DialogActions,
  Button,
  Typography,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { Alert, IconButton } from "@mui/material";
import { styled } from "@mui/styles";
// import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
// import { Controller, useFormContext } from "react-hook-form";
import * as Yup from "yup";

const ActiveSwitch = styled(Switch)(() => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#388E3C",
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#388E3C",
  },
}));

const ConnectForm = (props) => {
  const { onClose, open } = props;

  //   const { enqueueSnackbar } = useSnackbar();

  // const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

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
    formState: { errors },
  } = methods;

  const onSubmit = async () => {
    // console.log(errors);
    // try {
    //   await login(data.email, data.password, data.userLoginType, data.remember);
    //   enqueueSnackbar("Đăng nhập thành công!");
    // } catch (error) {
    //   const message = errorMessages[`${error.code}`] || "Lỗi hệ thống";
    //   const { code } = error;
    //   if (code === "AUE_01") {
    //     setError(
    //       "email",
    //       { type: "custom", message: "Email đăng nhập không tồn tại" },
    //       { shouldFocus: true }
    //     );
    //   } else if (code === "IDE_12") {
    //     setError(
    //       "email",
    //       { type: "custom", message: "Email chưa được xác thực" },
    //       { shouldFocus: true }
    //     );
    //   } else if (code === "IDE_06") {
    //     setError("password", {
    //       type: "custom",
    //       message: "Mật khẩu không chính xác",
    //     });
    //   } else setError("afterSubmit", { ...error, message });
    // }
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Dialog
        onClose={onClose}
        open={open}
        sx={{
          "& .MuiPaper-root": {
            width: "499px",
            borderRadius: "6px!important",
          },
        }}
      >
        <DialogTitle
          sx={{ p: 0, display: "flex", justifyContent: "space-between" }}
        >
          <Typography
            variant="h5"
            component="h5"
            sx={{
              ml: 3,
              color: "#172B4D",
              display: "flex",
              alignItems: "center",
            }}
          >
            Thêm tài khoản TopCV
          </Typography>
          <DialogActions onClick={onClose}>
            <CloseIcon />
          </DialogActions>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Stack spacing={3}>
            {!!errors.afterSubmit && (
              <Alert severity="error">{errors.afterSubmit.message}</Alert>
            )}

            <Stack>
              <RHFTextField
                name="email"
                title="Tên đăng nhập"
                placeholder="Bắt buộc"
                isRequired
                sx={{ width: 440, minHeight: 44 }}
              />
            </Stack>

            <Stack>
              <RHFTextField
                isRequired
                sx={{ width: 440, minHeight: 44 }}
                name="password"
                title="Mật khẩu"
                type={showPassword ? "text" : "password"}
                placeholder="Bắt buộc"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" sx={{ mr: 2 }}>
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        <Iconify
                          icon={
                            showPassword
                              ? "ic:outline-remove-red-eye"
                              : "mdi:eye-off-outline"
                          }
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {/* {!errors.password && (
                <Typography
                  variant="body1"
                  sx={{
                    // fontSize: STYLE_CONSTANT.FONT_XS,
                    // color: STYLE_CONSTANT.COLOR_TEXT_SECONDARY,
                    // fontWeight: STYLE_CONSTANT.FONT_NORMAL,
                    mt: 1,
                  }}
                >
                  Mật khẩu cần tối thiểu 6 ký tự
                </Typography>
              )} */}
            </Stack>
          </Stack>
        </DialogContent>
        <Divider />
        <DialogActions>
          <FormControlLabel
            control={<ActiveSwitch defaultChecked />}
            label="Đang hoạt động"
          />
          <Button onClick={onClose} sx={{ color: "#455570" }}>
            Hủy
          </Button>
          <Button
            onClick={onClose}
            sx={{ color: "white", background: "#388E3C" }}
          >
            Kết nối
          </Button>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
};

export default ConnectForm;

ConnectForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};
