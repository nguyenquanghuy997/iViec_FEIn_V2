import React, {useEffect, useState} from 'react';
import {RegisterFormSectionLabel} from ".";
import {STYLE_CONSTANT} from "./constants";
import Iconify from "@/components/Iconify";
import {FormProvider, RHFAutocomplete, RHFCheckbox, RHFTextField,} from "@/components/hook-form";
// hooks
import {PATH_AUTH} from "@/routes/paths";
import {useRegisterMutation,} from "@/sections/auth/authSlice";
import {
    useGetDistrictByProvinceIdQuery,
    useGetJobCategoriesQuery,
    useGetProvinceQuery,
} from "@/sections/companyinfor/companyInforSlice";
import {errorMessages} from "@/utils/errorMessages";
import {LIST_ORGANIZATION_SIZE} from "@/utils/formatString";
import {yupResolver} from "@hookform/resolvers/yup";
// @mui
import {LoadingButton} from "@mui/lab";
import {Alert, Box, Divider, FormHelperText, IconButton, InputAdornment, Link, Stack, Typography,} from "@mui/material";
// next
import NextLink from "next/link";
import {useRouter} from "next/router";
import {useForm} from "react-hook-form";
import * as Yup from "yup";
import RHFDropdown from "@/components/hook-form/RHFDropdown";
import {CHECK_EMAIL} from '@/utils/regex'

const InputStyle = {width: 440, minHeight: 44};

function RegisterForm() {
    const defaultValues = {
        userName: "",
        password: "",
        rePassword: "",
        organizationName: "",
        organizationPhoneNumber: "",
        jobCategoryIds: [],
        organizationSize: "",
        organizationProvinceId: "",
        organizationDistrictId: "",
        organizationAddress: "",
        acceptTerms: true,
    };

    const RegisterSchema = Yup.object().shape({
        userName: Yup.string().email("Email không đúng định dạng").matches(CHECK_EMAIL, 'Email không đúng định dạng').required("Email không được bỏ trống"),
        password: Yup.string().min(6, "Mật khẩu cần tối thiểu 6 ký tự").required("Mật khẩu không được bỏ trống"),
        rePassword: Yup.string().oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận không đúng").required("Mật khẩu xác nhận không được bỏ trống"),
        organizationName: Yup.string()
            .required("Tên doanh nghiệp không được bỏ trống")
            .transform(value => value.trim())
            .min(1, "Tên doanh nghiệp không được bỏ trống")
            .max(50, "Tên doanh nghiệp tối đa 50 ký tự"),
        organizationPhoneNumber: Yup.string().required("Số điện thoại không được bỏ trống").matches(/\d+\b/, "Số điện thoại không đúng định dạng"),
        jobCategoryIds: Yup.array().min(1, "Ngành nghề không được bỏ trống").max(3, "Chọn tối đa 3 ngành nghê"),
        organizationSize: Yup.string().required("Quy mô nhân sự không được bỏ trống"),
        organizationProvinceId: Yup.string().required("Tỉnh/Thành phố không được bỏ trống"),
        organizationDistrictId: Yup.string().required("Quận/Huyện không được bỏ trống"),
        organizationAddress: Yup.string().max(255, "Địa chỉ chi tiết doanh nghiệp tối đa 255 ký tự"),
        acceptTerms: Yup.bool().oneOf([true], "Vui lòng đồng ý với chính sách bảo mật"),
    });

    const methods = useForm({
        mode: 'all',
        resolver: yupResolver(RegisterSchema),
        defaultValues,
    });

    const router = useRouter();

    const [postRegister] = useRegisterMutation();

    const [showPassword, setShowPassword] = useState(false);

    const {
        setError,
        handleSubmit,
        watch,
        formState: {isSubmitting, errors},
    } = methods;

    const watchHasEmailValue = watch("userName");
    const watchProvinceId = watch("organizationProvinceId");

    const onSubmit = async (data) => {
        try {
            const body = {
                userName: data.userName.trim(),                                 // organization username (Email đăng nhập)
                password: data.password,                                        // organization password
                organizationName: data.organizationName.trim(),                 // organization name
                organizationPhoneNumber: data.organizationPhoneNumber.trim(),   // organization phone number
                jobCategoryIds: data.jobCategoryIds?.map(item => item?.value),  // organization name
                organizationSize: parseInt(data.organizationSize),              // organization size
                organizationProvinceId: data.organizationProvinceId,            // organization province
                organizationDistrictId: data.organizationDistrictId,            // organization district
                organizationAddress: data.organizationAddress.trim(),           // organization address
            };
            await postRegister(body).unwrap();
            await router.push(`/auth/register/success?username=${body.userName}`);
        } catch (error) {
            const {status} = error;
            const message = errorMessages[`${error.status}`] || "Lỗi hệ thống";
            if (status === "AUE_06") {
                setError('userName', {type: "custom", message: "Tài khoản chưa được kích hoạt"}, {shouldFocus: true})
            } else setError("afterSubmit", {...error, message});
        }
    };

    const handleClearField = (field) => {
        if (!field) return;
        else methods.resetField(field);
    };

    const {data: {items: ProviceList = []} = {}} = useGetProvinceQuery();
    const {data: {items: DistrictList = []} = {}} = useGetDistrictByProvinceIdQuery(watchProvinceId, { skip: !watchProvinceId });
    const {data: {items: JobCategoryList = []} = {}} = useGetJobCategoriesQuery();

    useEffect(() => {
        if (watchProvinceId) {
            methods.resetField('organizationDistrictId')
        }
    }, [watchProvinceId]);

    return (
        <Box sx={{width: "100%"}}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack>
                    {!!errors.afterSubmit && (
                        <Alert severity="error" sx={{mt: 5}}>
                            {errors.afterSubmit.message}
                        </Alert>
                    )}
                    <RegisterFormSectionLabel title="THÔNG TIN TÀI KHOẢN DOANH NGHIỆP"/>
                    <Stack>
                        <Stack direction="row" justifyContent="space-between" sx={{mb: 2.5}}>
                            <Stack>
                                <RHFTextField
                                    name="userName"
                                    title="Email đăng nhập"
                                    placeholder="Bắt buộc"
                                    isRequired
                                    style={{...InputStyle}}
                                    InputProps={{
                                        endAdornment: watchHasEmailValue && (
                                            <InputAdornment position="end" sx={{mr: 1.5}}>
                                                <IconButton edge="end" onClick={() => handleClearField("userName")}>
                                                    <Iconify icon="ic:baseline-highlight-off"/>
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Stack>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
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
                                        )
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
                                    name="rePassword"
                                    title="Xác nhận lại mật khẩu"
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
                        </Stack>
                    </Stack>
                    <RegisterFormSectionLabel title="THÔNG TIN DOANH NGHIỆP"/>
                    <Stack>
                        <Stack direction="row" justifyContent="space-between" sx={{mb: 2.5}}>
                            <Stack>
                                <RHFTextField
                                    name="organizationName"
                                    placeholder="Bắt buộc"
                                    title="Tên doanh nghiệp"
                                    isRequired
                                    style={{...InputStyle}}
                                />
                            </Stack>
                            <Stack>
                                <RHFTextField
                                    name="organizationPhoneNumber"
                                    isRequired
                                    placeholder="Bắt buộc"
                                    title="Số điện thoại doanh nghiệp"
                                    style={{...InputStyle}}
                                />
                            </Stack>
                        </Stack>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            sx={{mb: 2.5}}
                        >
                            <div style={{...InputStyle}}>
                                <RHFAutocomplete
                                    options={JobCategoryList?.map((i) => ({
                                        value: i.id,
                                        label: `${i.name[0].toUpperCase()}${i.name.slice(1)}`,
                                        name: i?.name,
                                    }))}
                                    name="jobCategoryIds"
                                    title="Ngành nghề"
                                    isRequired
                                    placeholder="Chọn tối đa 3 ngành nghề (bắt buộc)"
                                    multiple
                                />
                            </div>

                            <div style={{...InputStyle}}>
                                <RHFDropdown
                                    options={
                                        LIST_ORGANIZATION_SIZE.map((i) => ({
                                            value: i.value,
                                            label: i.name,
                                            name: i.name,
                                        }))
                                    }
                                    style={{...InputStyle}}
                                    name="organizationSize"
                                    placeholder="Bắt buộc"
                                    title="Quy mô nhân sự"
                                    isRequired
                                />
                            </div>
                        </Stack>
                        <Divider sx={{backgroundColor: STYLE_CONSTANT.COLOR_DIVIDER}}/>
                        <Stack direction="row" justifyContent="space-between" sx={{mb: 2.5, mt: 2.5}}>
                            <Stack>
                                <div style={{...InputStyle}}>
                                    <RHFDropdown
                                        options={
                                            ProviceList.map((i) => ({
                                                value: i.id,
                                                label: i.name,
                                                name: i.name,
                                            }))
                                        }
                                        style={{...InputStyle}}
                                        name="organizationProvinceId"
                                        placeholder="Bắt buộc"
                                        title="Tỉnh/Thành phố"
                                        isRequired
                                    />
                                </div>
                            </Stack>
                            <Stack>
                                <div style={{...InputStyle}}>
                                    <RHFDropdown
                                        options={
                                            DistrictList.map((i) => ({
                                                value: i.id,
                                                label: i.name,
                                                name: i.name,
                                            }))
                                        }
                                        style={{...InputStyle}}
                                        name="organizationDistrictId"
                                        disabled={!watchProvinceId}
                                        placeholder="Bắt buộc"
                                        title="Quận/Huyện"
                                        isRequired
                                    />
                                </div>
                            </Stack>
                        </Stack>

                        <Stack direction="row" justifyContent="space-between" width={STYLE_CONSTANT.WIDTH_FULL}
                               sx={{mb: 2.5}}>
                            <Stack sx={{width: STYLE_CONSTANT.WIDTH_FULL}}>
                                <RHFTextField
                                    name="organizationAddress"
                                    placeholder="Số nhà, tên đường, xã/phường..."
                                    title="Địa chỉ chi tiết doanh nghiệp"
                                />
                            </Stack>
                        </Stack>
                        <Stack direction="row" justifyContent="start" alignItems="center" sx={{mt: 2.5}}>
                            <Stack sx={{mr: 0.5}}>
                                <RHFCheckbox style={{margin: 0, padding: 0}} name="acceptTerms"/>
                            </Stack>
                            <Stack>
                                <Typography
                                    variant="body2"
                                    align="center"
                                    sx={{
                                        fontSize: STYLE_CONSTANT.FONT_SM,
                                        fontWeight: STYLE_CONSTANT.FONT_NORMAL,
                                        color: STYLE_CONSTANT.COLOR_TEXT_BLACK,
                                    }}
                                >
                                    Tôi đồng ý với
                                    <NextLink href={PATH_AUTH.policy} passHref>
                                        <Link
                                            sx={{
                                                padding: "0px 4px",
                                                color: STYLE_CONSTANT.COLOR_PRIMARY,
                                                fontStyle: "italic",
                                                fontWeight: STYLE_CONSTANT.FONT_SEMIBOLD,
                                                textDecoration: "none",
                                            }}
                                        >
                                            Chính sách bảo mật
                                        </Link>
                                    </NextLink>
                                    của iVIEC
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack>
                            {errors.acceptTerms?.message && (
                                <FormHelperText error={!!errors.acceptTerms}>
                                    {errors.acceptTerms?.message}
                                </FormHelperText>
                            )}
                        </Stack>
                    </Stack>
                    <Stack sx={{mt: 2}}>
                        <LoadingButton
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            loading={isSubmitting}
                            sx={{
                                backgroundColor: STYLE_CONSTANT.COLOR_PRIMARY,
                                textTransform: "none",
                                borderRadius: 0.75,
                            }}
                        >
                            Đăng ký
                        </LoadingButton>
                    </Stack>
                </Stack>
            </FormProvider>
        </Box>
    );
}

export default React.memo(RegisterForm);
