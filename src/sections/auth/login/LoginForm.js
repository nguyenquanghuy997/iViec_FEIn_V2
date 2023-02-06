// components
import { STYLE_CONSTANT } from "../register/constants";
import { ButtonDS } from "@/components/DesignSystem";
import Iconify from "@/components/Iconify";
import {
  FormProvider,
  RHFCheckbox,
  RHFTextField,
} from "@/components/hook-form";
// hooks
import useAuth from "@/hooks/useAuth";
// import useIsMountedRef from "@/hooks/useIsMountedRef";
import { PATH_AUTH } from "@/routes/paths";
// form
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import  errorMessages from '@/utils/errorMessages'
// routes
// import { PATH_AUTH } from '@/routes/paths'

export default function LoginForm() {
  const { login } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  // const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email không đúng định dạng")
      .required("Email không được bỏ trống"),
    password: Yup.string().min(6, "Mật khẩu cần tối thiểu 6 ký tự").required("Mật khẩu không được bỏ trống"),
  });

  const defaultValues = {
    email: "quy.vu.0101@gmail.com",
    password: "Abcd@2021",
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password, data.remember);
      enqueueSnackbar("Đăng nhập thành công!");
    } catch (error) {
      const message =errorMessages[`${error.code}`] ||'Lỗi hệ thống'
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
            name="email"
            label="Email đăng nhập"
            placeholder="Bắt buộc"
            required
            style={{
              width: 440,
              minHeight: 44,
            }}
          />
        </Stack>

        <Stack>
          <RHFTextField
            style={{
              width: 440,
              minHeight: 44
            }}
            name="password"
            label="Mật khẩu"
            type={showPassword ? "text" : "password"}
            placeholder="Bắt buộc"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    <Iconify
                      icon={showPassword ? "ic:outline-remove-red-eye" : "mdi:eye-off-outline"}
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
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        <RHFCheckbox
          defaultChecked={false}
          name="remember"
          label="Duy trì đăng nhập"
        />
        <Typography variant="body2" align="right">
          <NextLink href={PATH_AUTH.resetPassword} passHref>
            <Link variant="subtitle2">Quên mật khẩu </Link>
          </NextLink>
        </Typography>
      </Stack>
      <ButtonDS
        width="440px"
        size="large"
        tittle="Đăng nhập"
        isSubmitting={isSubmitting}
        type="submit"
      />
    </FormProvider>
  );
}
