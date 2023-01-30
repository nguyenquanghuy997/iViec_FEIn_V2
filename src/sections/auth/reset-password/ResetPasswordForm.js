// next
// components
import { FormProvider, RHFTextField } from "@/components/hook-form";
// routes
import { useForgotPasswordMutation } from "@/sections/auth/authSlice";
// form
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import * as qs from "qs";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

export default function ResetPasswordForm() {
  const [forgotPassword] = useForgotPasswordMutation();
  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
  });

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { email: "" },
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const body = {
        Email: data.email,
        FullName: "thang",
      };
      await forgotPassword(qs.stringify(body)).unwrap();
      // sessionStorage.setItem('email-recovery', data.email)

      // push(PATH_AUTH.newPassword)
    } catch (error) {
      // TODO
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="email" label="Email address" />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Đăng ký tạo mật khẩu mới
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
