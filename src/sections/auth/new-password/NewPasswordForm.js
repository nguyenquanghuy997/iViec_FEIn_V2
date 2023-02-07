import { useChangePasswordWithTokenMutation } from "../authSlice";
import { STYLE_CONSTANT } from "../register/constants";
import Iconify from "@/components/Iconify";
// components
import { FormProvider, RHFTextField } from "@/components/hook-form";
import errorMessages from "@/utils/errorMessages";
// routes
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
// next
// import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import { useState } from "react";
// form
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const InputStyle = { width: 440, minHeight: 44 };

export default function NewPasswordForm({ userName, otpCode }) {
  // const { push } = useRouter();

  const { enqueueSnackbar } = useSnackbar();
  const [changePasswordWithToken] = useChangePasswordWithTokenMutation(); // result

  const [showPassword, setShowPassword] = useState(false);

  const VerifyCodeSchema = Yup.object().shape({
    password: Yup.string()
      .required("Mật khẩu không được bỏ trống")
      .min(6, "Mật khẩu cần tối thiểu 6 ký tự"),
    confirmPassword: Yup.string()
      .required("Mật khẩu xác nhận không được bỏ trống")
      .oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận không đúng"),
  });

  const defaultValues = {
    password: "",
    confirmPassword: "",
  };

  const methods = useForm({
    mode: "all",
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
  });

  const {
    setError,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const body = {
        email: userName,
        token: otpCode,
        newPassword: data.password,
      };
      console.log(body);
      await new Promise((resolve) => setTimeout(resolve, 500));
      await changePasswordWithToken(body).unwrap();
      enqueueSnackbar("Change password success!");
      // push(PATH_DASHBOARD.root);
    } catch (error) {
      // TODO
      const message = errorMessages[`${error.status}`] || "Lỗi hệ thống";
      setError("afterSubmit", { ...error, message });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}
        <Stack>
          <RHFTextField
            name="password"
            label="Mật khẩu"
            placeholder="Bắt buộc"
            required
            type={showPassword ? "text" : "password"}
            style={{ ...InputStyle }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword(!showPassword)}
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
          {!errors.password && (
            <Typography
              variant="body1"
              sx={{
                fontSize: STYLE_CONSTANT.FONT_XS,
                color: STYLE_CONSTANT.COLOR_TEXT_SECONDARY,
                fontWeight: STYLE_CONSTANT.FONT_NORMAL,
                mt: 1,
              }}
            >
              Mật khẩu cần tối thiểu 6 ký tự
            </Typography>
          )}
        </Stack>
        <Stack>
          <RHFTextField
            name="confirmPassword"
            label="Xác nhận lại mật khẩu mới"
            placeholder="Bắt buộc"
            required
            type={showPassword ? "text" : "password"}
            style={{ ...InputStyle }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword(!showPassword)}
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
        </Stack>
        <Stack>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            sx={{
              mt: 4,
              textTransform: "initial",
              backgroundColor: STYLE_CONSTANT.COLOR_PRIMARY,
              textTransform: "none",
              borderRadius: 0.75,
            }}
          >
            Xác nhận và đăng nhập
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );
}

NewPasswordForm.propTypes = {
  userName: PropTypes.string,
  otpCode: PropTypes.string,
};

NewPasswordForm.defaultProps = {
  userName: "",
  otpCode: "",
};
