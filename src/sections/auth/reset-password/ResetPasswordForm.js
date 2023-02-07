import { ButtonDS } from "@/components/DesignSystem";
import { FormProvider, RHFTextField } from "@/components/hook-form";
import { useForgotPasswordMutation } from "@/sections/auth/authSlice";
import errorMessages from "@/utils/errorMessages";
import { yupResolver } from "@hookform/resolvers/yup";
import { Stack, Alert } from "@mui/material";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

export default function ResetPasswordForm({ setStatusResetPass }) {
  const router = useRouter();
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
        userName: data.email,
      });
      await forgotPassword(body).unwrap();
      setStatusResetPass(true);
      router.push(`?username=${data.email}`);
    } catch (error) {
      const message = errorMessages[`${error.code}`] || "Lỗi hệ thống";
      setError("afterSubmit", { ...error, message });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}
        <Stack sx={{ mb: 5 }}>
          <RHFTextField
            name="email"
            label="Email đăng nhập"
            placeholder="Nhập Email muốn khôi phục mật khẩu"
            required
          />
        </Stack>
        <Stack>
          <ButtonDS
            width="440px"
            size="large"
            tittle={"Khôi phục mật khẩu"}
            loading={isSubmitting}
            type="submit"
            sx={{ textTransform: "initial" }}
          />
        </Stack>
      </Stack>
    </FormProvider>
  );
}
