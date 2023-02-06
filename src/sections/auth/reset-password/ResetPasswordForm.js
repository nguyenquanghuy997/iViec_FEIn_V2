
// components
import { FormProvider, RHFTextField } from "@/components/hook-form";
// routes
import { useForgotPasswordMutation } from "@/sections/auth/authSlice";
// form
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import {
  ButtonDS,
} from "@/components/DesignSystem";
// import { LoadingButton } from "@mui/lab";
import { Stack,Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

export default function ResetPasswordForm() {
  const [forgotPassword] = useForgotPasswordMutation();
  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
    .email("Email không đúng định dạng")
    .required("Email không được bỏ trống"),
  });

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { email: "" },
  });
  const {
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      var body = JSON.stringify({
        "userName": data.email,
      });
      await forgotPassword(body).unwrap();
    } catch (error) {
      const message =
      error?.status
      setError("afterSubmit", { ...error, message });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}
        <RHFTextField name="email" label="Nhập Email muốn khôi phục mật khẩu" />
        <ButtonDS
        width="440px"
        size='large'
        tittle={'Khôi phục mật khẩu'}
        isSubmitting={isSubmitting}
        type="submit"
      />
      </Stack>
    </FormProvider>
  );
}
