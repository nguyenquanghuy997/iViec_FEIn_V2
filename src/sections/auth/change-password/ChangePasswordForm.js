import {useChangePasswordMutation} from "../authSlice";
import {STYLE_CONSTANT} from "../register/constants";
import Iconify from "@/components/Iconify";
import {FormProvider, RHFTextField} from "@/components/hook-form";
import {errorMessages} from "@/utils/errorMessages";
import {yupResolver} from "@hookform/resolvers/yup";
import {LoadingButton} from "@mui/lab";
import {Alert, Divider, IconButton, InputAdornment, Stack, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import * as Yup from "yup";
import {useRouter} from "next/router";
import {useState} from "react";
import {LabelStyle} from "@/components/hook-form/style";

const InputStyle = {width: 440, minHeight: 44};

export default function ChangePasswordForm() {
  const router = useRouter();
  const [changePassword] = useChangePasswordMutation(); // result

  const [showPasswordCurrent, setShowPasswordCurrent] = useState(false);
  const [showPasswordNew, setShowPasswordNew] = useState(false);

  const VerifyCodeSchema = Yup.object().shape({
    currentPassword: Yup.string()
        .required("Mật khẩu không được bỏ trống")
        .min(6, "Mật khẩu cần tối thiểu 6 ký tự"),
    newPassword: Yup.string()
        .required("Mật khẩu không được bỏ trống")
        .min(6, "Mật khẩu cần tối thiểu 6 ký tự"),
    confirmPassword: Yup.string()
        .required("Mật khẩu xác nhận không được bỏ trống")
        .oneOf([Yup.ref("newPassword"), null], "Mật khẩu xác nhận không đúng"),
  });

  const defaultValues = {
    currentPassword: "",
    newPassword: "",
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
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      };
      await new Promise((resolve) => setTimeout(resolve, 500));
      await changePassword(body).unwrap();
      await router.push(`?status=success`)
    } catch (error) {
      const message = errorMessages[`${error.status}`] || 'Lỗi hệ thống'
      const {status} = error;
      if (status === "IDE_05") {
        setError('currentPassword', {type: "custom", message: "Mật khẩu cũ không chính xác"})
      } else setError("afterSubmit", {...error, message});
    }
  };

  return (
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
          <Stack>
            <LabelStyle required={true}>Mật khẩu cũ</LabelStyle>
            <RHFTextField
                name="currentPassword"
                placeholder="Bắt buộc"
                type={showPasswordCurrent ? "text" : "password"}
                style={{...InputStyle}}
                InputProps={{
                  endAdornment: (
                      <InputAdornment position="end" sx={{mr: 1}}>
                        <IconButton edge="end" onClick={() => setShowPasswordCurrent(!showPasswordCurrent)}>
                          <Iconify
                              icon={showPasswordCurrent ? "ic:outline-remove-red-eye" : "mdi:eye-off-outline"}/>
                        </IconButton>
                      </InputAdornment>
                  ),
                }}
            />
          </Stack>
          <Divider/>
          <Stack>
            <LabelStyle required={true}>Mật khẩu mới</LabelStyle>
            <RHFTextField
                name="newPassword"
                placeholder="Bắt buộc"
                type={showPasswordNew ? "text" : "password"}
                style={{...InputStyle}}
                InputProps={{
                  endAdornment: (
                      <InputAdornment position="end" sx={{mr: 1}}>
                        <IconButton edge="end" onClick={() => setShowPasswordNew(!showPasswordNew)}>
                          <Iconify
                              icon={showPasswordNew ? "ic:outline-remove-red-eye" : "mdi:eye-off-outline"}/>
                        </IconButton>
                      </InputAdornment>
                  ),
                }}
            />
            {!errors.newPassword && (
                <Typography
                    variant="body1"
                    sx={{
                      fontSize: STYLE_CONSTANT.FONT_XS,
                      color: STYLE_CONSTANT.COLOR_TEXT_SECONDARY,
                      fontWeight: STYLE_CONSTANT.FONT_NORMAL,
                      mt: 1,
                    }}
                >
                  Mật khẩu yêu cầu tối thiểu 6 ký tự
                </Typography>
            )}
          </Stack>
          <Stack>
            <LabelStyle required={true}>Xác nhận lại mật khẩu mới</LabelStyle>
            <RHFTextField
                name="confirmPassword"
                placeholder="Bắt buộc"
                type={showPasswordNew ? "text" : "password"}
                style={{...InputStyle}}
                InputProps={{
                  endAdornment: (
                      <InputAdornment position="end" sx={{mr: 1}}>
                        <IconButton edge="end" onClick={() => setShowPasswordNew(!showPasswordNew)}>
                          <Iconify
                              icon={showPasswordNew ? "ic:outline-remove-red-eye" : "mdi:eye-off-outline"}/>
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
                loadingPosition="end"
                variant="contained"
                loading={isSubmitting}
                sx={{
                  mt: 4,
                  backgroundColor: STYLE_CONSTANT.COLOR_PRIMARY,
                  textTransform: "none",
                  borderRadius: 0.75,
                }}
            >
              <span>Đổi mật khẩu</span>
            </LoadingButton>
          </Stack>
        </Stack>
      </FormProvider>
  );
}
