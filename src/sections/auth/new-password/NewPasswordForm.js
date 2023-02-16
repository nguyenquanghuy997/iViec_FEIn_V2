import { LogoHeader } from "@/components/BaseComponents";
import {
  CardInfoBody,
  CardInfoLabel,
} from "@/components/BaseComponents/CardInfo";
import Page from "@/components/Page";
// guards
import GuestGuard from "@/guards/GuestGuard";
import {NewPasswordSuccess} from "@/sections/auth/new-password";
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
  Box
} from "@mui/material";
// next
// import { useRouter } from "next/router";
// import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
// form
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { PATH_PAGE } from "@/routes/paths";
import { BoxInnerStyle, BoxWrapperStyle } from "@/sections/auth/style";
// import UserActiveFailure from "@/sections/auth/user-activate/UserActiveFailure";
// // @mui
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const InputStyle = { width: 440, minHeight: 44 };

export default function NewPasswordForm({ userName, otpCode }) {
  // const [statusActiveUser, setStatusActiveUser] = useState(false);
  const router = useRouter();
 
  // const { USER_NAME,OTPCode, SetPassword } = router.query;
  // const [confirmEmail] = useLazyConfirmEmailQuery();
  // let str = router.asPath;
  // const OTPCode = str.substring(str.indexOf('OTPCode') - 7);

  useEffect(() => {
    if (!userName && !otpCode) {
      router.push(PATH_PAGE.page404);
    }
  }, [userName, otpCode]);

  // const { push } = useRouter();
  const [newPass, setNewPass] = useState(false);
  // const { enqueueSnackbar } = useSnackbar();
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
      setNewPass(true)
      // enqueueSnackbar("Change password success!");
      // push(PATH_DASHBOARD.root);
    } catch (error) {
      // TODO

      const message = errorMessages[`${error.status}`] || "Lỗi hệ thống";
      setError("afterSubmit", { ...error, message });
    }
  };
  if(newPass){
    return (
      <GuestGuard>
      <Page
        title="Thiết lập mật khẩu mới"
      >
        <LogoHeader />
        <Box sx={{ ...BoxWrapperStyle }}>
  <NewPasswordSuccess/>
        </Box>
      </Page>
    </GuestGuard>
    )
  }

  return (
    
    <GuestGuard>
    <Page title="Thiết lập mật khẩu mới">
      <LogoHeader />
      <Box sx={{ ...BoxWrapperStyle }}>
          
            <Box sx={{ ...BoxInnerStyle, minHeight: "784px" }}>
            <Stack justifyContent="center" alignItems="center">
              <CardInfoBody>
                <CardInfoLabel
                  label="Thiết lập mật khẩu mới"
                  sx={{ textAlign: "left", mb: 5 }}
                />
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
              </CardInfoBody>
            </Stack>
          </Box> 
 
      </Box>
    </Page>
  </GuestGuard>
    
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
