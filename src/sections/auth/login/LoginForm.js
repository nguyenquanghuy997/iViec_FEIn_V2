import { ButtonDS } from "@/components/DesignSystem";
import Iconify from "@/components/Iconify";
import { FormProvider, RHFCheckbox, RHFTextField, } from "@/components/hook-form";
import { STYLE_CONSTANT } from "../register/constants";
import useAuth from "@/hooks/useAuth";
import { PATH_AUTH } from "@/routes/paths";
import { LabelStyle } from "@/components/hook-form/style";
import { errorMessages, AUTH_ERROR_TYPE } from '@/utils/errorMessages';
import { CHECK_EMAIL } from '@/utils/regex';
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, IconButton, Link, Stack, Typography, } from "@mui/material";
import NextLink from "next/link";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

export default function LoginForm() {
    const {login} = useAuth();
    const {enqueueSnackbar} = useSnackbar();
    const [showPassword, setShowPassword] = useState(false);

    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email("Email không đúng định dạng")
            .matches(CHECK_EMAIL, 'Email không đúng định dạng')
            .required("Email không được bỏ trống"),
        password: Yup.string().min(6, "Mật khẩu cần tối thiểu 6 ký tự").required("Mật khẩu không được bỏ trống"),
    });

    const defaultValues = {
        email: "",
        password: "",
        remember: true,
    };
    

    const methods = useForm({
        mode: 'onChange',
        resolver: yupResolver(LoginSchema),
        defaultValues,
    });

    const {
        setError,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = methods;

    const onSubmit = async (data) => {
        try {
            await login(data.email, data.password, data.userLoginType, data.remember);
            enqueueSnackbar("Đăng nhập thành công!")
        } catch (error) {
            const message = errorMessages[`${error.code}`] || 'Lỗi hệ thống'
            const {code} = error;
            if (code === AUTH_ERROR_TYPE.AUE_01) {
                setError('email', {type: "custom", message: "Email đăng nhập không tồn tại"})
            } else if (code === AUTH_ERROR_TYPE.IDE_12) {
                setError('email', {type: "custom", message: "Email chưa được kích hoạt"})
            } else if (code === AUTH_ERROR_TYPE.IDE_06) {
                setError('password', {type: "custom", message: "Mật khẩu không chính xác"})
            } else setError("afterSubmit", {...error, message});
        }
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                {!!errors.afterSubmit && (
                    <Alert severity="error">{errors.afterSubmit.message}</Alert>
                )}

                <Stack>
                    <LabelStyle required={true}>Email đăng nhập</LabelStyle>
                    <RHFTextField
                        name="email"
                        placeholder="Bắt buộc"
                    />
                </Stack>

                <Stack>
                    <LabelStyle required={true}>Mật khẩu</LabelStyle>
                    <RHFTextField
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Bắt buộc"
                        endIcon={
                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                <Iconify icon={showPassword ? "ic:outline-remove-red-eye" : "mdi:eye-off-outline"}/>
                            </IconButton>
                        }
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
                sx={{my: 2}}
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
                tittle={<span>Đăng nhập</span>}
                loading={isSubmitting}
                type="submit"
            />
        </FormProvider>
    );
}
