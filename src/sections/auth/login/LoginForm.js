// components
import {STYLE_CONSTANT} from "../register/constants";
import {ButtonDS} from "@/components/DesignSystem";
import Iconify from "@/components/Iconify";
import {FormProvider, RHFCheckbox, RHFTextField,} from "@/components/hook-form";
// hooks
import useAuth from "@/hooks/useAuth";
// import useIsMountedRef from "@/hooks/useIsMountedRef";
import {PATH_AUTH} from "@/routes/paths";
// form
import {yupResolver} from "@hookform/resolvers/yup";
import {Alert, IconButton, InputAdornment, Link, Stack, Typography,} from "@mui/material";
import NextLink from "next/link";
import {useSnackbar} from "notistack";
import {useState} from "react";
import {useForm} from "react-hook-form";
import * as Yup from "yup";
import errorMessages from '@/utils/errorMessages'
// routes
// import { PATH_AUTH } from '@/routes/paths'

export default function LoginForm() {
    const {login} = useAuth();
    const {enqueueSnackbar} = useSnackbar();

    // const isMountedRef = useIsMountedRef();

    const [showPassword, setShowPassword] = useState(false);

    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email("Email không đúng định dạng")
            .required("Email không được bỏ trống"),
        password: Yup.string().min(6, "Mật khẩu cần tối thiểu 6 ký tự").required("Mật khẩu không được bỏ trống"),
    });

    const defaultValues = {
        email: "thuybon1@gmail.com",
        password: "000000",
        remember: true,
    };

    const methods = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues,
    });

    const {
        setError,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = methods;

    const onSubmit = async (data) => {
        console.log(errors)
        try {
            await login(data.email, data.password, data.userLoginType, data.remember);
            enqueueSnackbar("Đăng nhập thành công!")
        } catch (error) {
            const message = errorMessages[`${error.code}`] || 'Lỗi hệ thống'
            const {code} = error;
            if (code === "AUE_01") {
                setError('email', {type: "custom", message: "Email đăng nhập không tồn tại"}, {shouldFocus: true})
            } else if (code === "IDE_12") {
                setError('email', {type: "custom", message: "Email chưa được xác thực"}, {shouldFocus: true})
            } else if (code === "IDE_06") {
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
                    <RHFTextField
                        name="email"
                        title="Email đăng nhập"
                        placeholder="Bắt buộc"
                        isRequired
                        sx={{width: 440, minHeight: 44}}
                    />
                </Stack>

                <Stack>
                    <RHFTextField
                        isRequired
                        sx={{width: 440, minHeight: 44}}
                        name="password"
                        title="Mật khẩu"
                        type={showPassword ? "text" : "password"}
                        placeholder="Bắt buộc"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end" sx={{ mr: 1.5 }}>
                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                        <Iconify icon={showPassword ? "ic:outline-remove-red-eye" : "mdi:eye-off-outline"}/>
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
                tittle="Đăng nhập"
                loading={isSubmitting}
                type="submit"
            />
        </FormProvider>
    );
}
