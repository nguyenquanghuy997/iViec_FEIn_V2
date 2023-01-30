// components
import Iconify from "@/components/Iconify";
import {
  FormProvider,
  RHFCheckbox,
  RHFTextField,
} from "@/components/hook-form";
// hooks
import useAuth from "@/hooks/useAuth";
import useIsMountedRef from "@/hooks/useIsMountedRef";
import { PATH_AUTH } from "@/routes/paths";
// form
import { yupResolver } from "@hookform/resolvers/yup";
// next
// import NextLink from 'next/link'
// import Link from 'next/link'
// @mui
import { LoadingButton } from "@mui/lab";
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

// routes
// import { PATH_AUTH } from '@/routes/paths'

export default function LoginForm() {
  const { login } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const defaultValues = {
    email: "FTI.iVIEC@gmail.com",
    password: "mk1.iviec@1234",
    // email: "",
    // password: "",
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
      enqueueSnackbar("Login success!");
    } catch (error) {
      if (isMountedRef.current) {
        const message =
          error?.validation?.body?.message ||
          error?.data?.message ||
          error?.message;
        setError("afterSubmit", { ...error, message });
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}

        <RHFTextField name="email" label="Tên đăng nhập" />

        <RHFTextField
          name="password"
          label="Mật khẩu"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        <RHFCheckbox name="remember" label="Duy trì đăng nhập" />
        <Typography variant="body2" align="center">
          <NextLink href={PATH_AUTH.resetPassword} passHref>
            <Link variant="subtitle2">Quên mật khẩu </Link>
          </NextLink>
        </Typography>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        ĐĂNG NHẬP
      </LoadingButton>
    </FormProvider>
  );
}
