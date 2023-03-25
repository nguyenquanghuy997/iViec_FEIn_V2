import {useUserInviteSetPasswordMutation} from "../authSlice";
import {STYLE_CONSTANT} from "../register/constants";
import Iconify from "@/components/Iconify";
import {FormProvider, RHFTextField} from "@/components/hook-form";
import {errorMessages} from "@/utils/errorMessages";
import {yupResolver} from "@hookform/resolvers/yup";
import {LoadingButton} from "@mui/lab";
import {Alert, IconButton, InputAdornment, Stack, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import * as Yup from "yup";
import {useState} from "react";
import {useSnackbar} from "notistack";
import {useRouter} from "next/router";
import {PATH_AUTH} from "@/routes/paths";

const InputStyle = {width: 440, minHeight: 44};

export default function NewInivtePasswordForm({token}) {
  const {enqueueSnackbar} = useSnackbar();
  const router = useRouter();

  const [changePasswordWithToken] = useUserInviteSetPasswordMutation(); // result

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
    formState: {isSubmitting, errors},
  } = methods;

  const onSubmit = async (data) => {
    try {
      const body = {
        token: token,
        password: data.password,
      };
      await new Promise((resolve) => setTimeout(resolve, 500));
      await changePasswordWithToken(body).unwrap();
      await router.push(PATH_AUTH.login)
      enqueueSnackbar("Cập nhật mật khẩu thành công!", {
        autoHideDuration: 1000
      });
    } catch (error) {
      const message = errorMessages[`${error.status}`] || "Lỗi hệ thống";
      setError("afterSubmit", {...error, message});
      enqueueSnackbar("Cập nhật mật khẩu không thành công. Vui lòng kiểm tra dữ liệu và thử lại!", {
        autoHideDuration: 1000,
        variant: 'error',
      });
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
                title="Mật khẩu"
                placeholder="Bắt buộc"
                isRequired
                type={showPassword ? "text" : "password"}
                style={{...InputStyle}}
                InputProps={{
                  endAdornment: (
                      <InputAdornment position="end" sx={{mr: 1.5}}>
                        <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                          <Iconify
                              icon={showPassword ? "ic:outline-remove-red-eye" : "mdi:eye-off-outline"}/>
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
                title="Xác nhận lại mật khẩu mới"
                placeholder="Bắt buộc"
                isRequired
                type={showPassword ? "text" : "password"}
                style={{...InputStyle}}
                InputProps={{
                  endAdornment: (
                      <InputAdornment position="end" sx={{mr: 1.5}}>
                        <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                          <Iconify
                              icon={showPassword ? "ic:outline-remove-red-eye" : "mdi:eye-off-outline"}/>
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
