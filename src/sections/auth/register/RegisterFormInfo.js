import { RegisterFormSectionLabel } from ".";
import { STYLE_CONSTANT } from "./constants";
import MuiButton from "@/components/BaseComponents/MuiButton";
import Iconify from "@/components/Iconify";
import SvgIcon from "@/components/SvgIcon";
import {
  FormProvider,
  RHFCheckbox,
  RHFSelect,
  RHFTextField,
} from "@/components/hook-form";
import RHFMuiAutocomplete from "@/components/hook-form/RHFMuiAutocomplete";
import { LabelStyle } from "@/components/hook-form/style";
import { PATH_AUTH } from "@/routes/paths";
import { useRegisterMutation } from "@/sections/auth/authSlice";
import {
  useGetDistrictByProvinceIdQuery,
  useGetJobCategoriesQuery,
  useGetProvinceQuery,
} from "@/sections/companyinfor/companyInforSlice";
import { AUTH_ERROR_TYPE, errorMessages } from "@/utils/errorMessages";
import { LIST_ORGANIZATION_SIZE } from "@/utils/formatString";
import { CHECK_EMAIL } from "@/utils/regex";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Box,
  Divider,
  FormHelperText,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const InputStyle = { width: 440, minHeight: 44 };

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
    userName: Yup.string()
      .email("Email không đúng định dạng")
      .matches(CHECK_EMAIL, "Email không đúng định dạng")
      .required("Email không được bỏ trống"),
    password: Yup.string()
      .min(6, "Mật khẩu cần tối thiểu 6 ký tự")
      .required("Mật khẩu không được bỏ trống"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận không đúng")
      .required("Mật khẩu xác nhận không được bỏ trống"),
    organizationName: Yup.string()
      .required("Tên doanh nghiệp không được bỏ trống")
      .transform((value) => value.trim())
      .min(1, "Tên doanh nghiệp không được bỏ trống")
      .max(50, "Tên doanh nghiệp tối đa 50 ký tự"),
    organizationPhoneNumber: Yup.string()
      .required("Số điện thoại không được bỏ trống")
      .matches(/\d+\b/, "Số điện thoại không đúng định dạng"),
    jobCategoryIds: Yup.array()
      .min(1, "Ngành nghề không được bỏ trống")
      .max(3, "Chọn tối đa 3 ngành nghê"),
    organizationSize: Yup.string().required(
      "Quy mô nhân sự không được bỏ trống"
    ),
    organizationProvinceId: Yup.string().required(
      "Tỉnh/Thành phố không được bỏ trống"
    ),
    organizationDistrictId: Yup.string().required(
      "Quận/Huyện không được bỏ trống"
    ),
    organizationAddress: Yup.string().max(
      255,
      "Địa chỉ chi tiết doanh nghiệp tối đa 255 ký tự"
    ),
    acceptTerms: Yup.bool().oneOf(
      [true],
      "Vui lòng đồng ý với chính sách bảo mật"
    ),
  });

  const methods = useForm({
    mode: "all",
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
    formState: { isSubmitting, errors, isValid },
  } = methods;

  const watchHasEmailValue = watch("userName");
  const watchProvinceId = watch("organizationProvinceId");

  const onSubmit = async (data) => {
    try {
      const body = {
        userName: data.userName.trim(),
        firstName: data.organizationName.trim(), // organization username (Email đăng nhập)
        password: data.password, // organization password
        organizationName: data.organizationName.trim(), // organization name
        organizationPhoneNumber: data.organizationPhoneNumber.trim(), // organization phone number
        organizationEmail: data.userName.trim(), // organization email
        jobCategoryIds: data.jobCategoryIds?.map((item) => item?.value), // organization name
        organizationSize: parseInt(data.organizationSize), // organization size
        organizationProvinceId: data.organizationProvinceId, // organization province
        organizationDistrictId: data.organizationDistrictId, // organization district
        organizationAddress: data.organizationAddress.trim(), // organization address
      };
      await postRegister(body).unwrap();
      await router.push(`/auth/register/success?username=${body.userName}`);
    } catch (error) {
      const { status } = error;
      const message = errorMessages[`${error.status}`] || "Lỗi hệ thống";
      if (status === AUTH_ERROR_TYPE.AUE_06) {
        setError("userName", {
          type: "custom",
          message: errorMessages[`${error.status}`],
        });
      } else setError("afterSubmit", { ...error, message });
    }
  };

  const handleClearField = (field) => {
    if (!field) return;
    else methods.resetField(field);
  };

  const { data: { items: ProvinceList = [] } = {} } = useGetProvinceQuery();
  const { data: { items: DistrictList = [] } = {} } =
    useGetDistrictByProvinceIdQuery(watchProvinceId, {
      skip: !watchProvinceId,
    });
  const { data: { items: JobCategoryList = [] } = {} } =
    useGetJobCategoriesQuery();

  useEffect(() => {
    if (watchProvinceId) {
      methods.resetField("organizationDistrictId");
    }
  }, [watchProvinceId]);

  return (
    <Box sx={{ width: "100%" }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          {!!errors.afterSubmit && (
            <Alert severity="error" sx={{ mt: 5 }}>
              {errors.afterSubmit.message}
            </Alert>
          )}
          <RegisterFormSectionLabel title="THÔNG TIN TÀI KHOẢN DOANH NGHIỆP" />
          <Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ mb: 2.5 }}
            >
              <Stack>
                <LabelStyle required={true}>Email đăng nhập</LabelStyle>
                <RHFTextField
                  name="userName"
                  placeholder="Bắt buộc"
                  style={{ ...InputStyle }}
                  InputProps={{
                    endAdornment: watchHasEmailValue && (
                      <InputAdornment position="end" sx={{ mr: 1 }}>
                        <IconButton
                          edge="end"
                          onClick={() => handleClearField("userName")}
                        >
                          <Iconify icon="ic:baseline-highlight-off" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Stack>
                <LabelStyle required={true}>Mật khẩu</LabelStyle>
                <RHFTextField
                  name="password"
                  placeholder="Bắt buộc"
                  type={showPassword ? "text" : "password"}
                  style={{ ...InputStyle }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" sx={{ mr: 1 }}>
                        <IconButton
                          edge="end"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <SvgIcon>
                            {showPassword
                              ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_83_7841)"> <path d="M12 3C17.392 3 21.878 6.88 22.819 12C21.879 17.12 17.392 21 12 21C6.608 21 2.122 17.12 1.181 12C2.121 6.88 6.608 3 12 3ZM12 19C14.0395 18.9996 16.0184 18.3068 17.6129 17.0352C19.2073 15.7635 20.3229 13.9883 20.777 12C20.3212 10.0133 19.2049 8.24 17.6106 6.97003C16.0163 5.70005 14.0383 5.00853 12 5.00853C9.9617 5.00853 7.98369 5.70005 6.38938 6.97003C4.79506 8.24 3.67877 10.0133 3.223 12C3.6771 13.9883 4.79267 15.7635 6.38714 17.0352C7.98161 18.3068 9.96053 18.9996 12 19ZM12 16.5C10.8065 16.5 9.66193 16.0259 8.81802 15.182C7.97411 14.3381 7.5 13.1935 7.5 12C7.5 10.8065 7.97411 9.66193 8.81802 8.81802C9.66193 7.97411 10.8065 7.5 12 7.5C13.1935 7.5 14.3381 7.97411 15.182 8.81802C16.0259 9.66193 16.5 10.8065 16.5 12C16.5 13.1935 16.0259 14.3381 15.182 15.182C14.3381 16.0259 13.1935 16.5 12 16.5ZM12 14.5C12.663 14.5 13.2989 14.2366 13.7678 13.7678C14.2366 13.2989 14.5 12.663 14.5 12C14.5 11.337 14.2366 10.7011 13.7678 10.2322C13.2989 9.76339 12.663 9.5 12 9.5C11.337 9.5 10.7011 9.76339 10.2322 10.2322C9.76339 10.7011 9.5 11.337 9.5 12C9.5 12.663 9.76339 13.2989 10.2322 13.7678C10.7011 14.2366 11.337 14.5 12 14.5Z" fill="#172B4D"/> </g> <defs> <clipPath id="clip0_83_7841"> <rect width="24" height="24" fill="white"/> </clipPath> </defs> </svg>'
                              : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_83_7773)"> <path d="M17.882 19.297C16.1232 20.4126 14.0827 21.0033 12 21C6.608 21 2.122 17.12 1.181 12C1.61103 9.67072 2.78263 7.5429 4.521 5.93401L1.392 2.80801L2.807 1.39301L22.606 21.193L21.191 22.607L17.881 19.297H17.882ZM5.935 7.35001C4.576 8.5856 3.62932 10.2088 3.223 12C3.53529 13.3665 4.16226 14.6411 5.054 15.7226C5.94574 16.804 7.07763 17.6624 8.35955 18.2293C9.64148 18.7962 11.038 19.0561 12.4381 18.9881C13.8381 18.9202 15.203 18.5264 16.424 17.838L14.396 15.81C13.5327 16.3538 12.5102 16.5881 11.4962 16.4744C10.4823 16.3608 9.53704 15.9059 8.81557 15.1844C8.0941 14.463 7.63923 13.5177 7.52556 12.5038C7.4119 11.4898 7.64618 10.4673 8.19 9.60401L5.935 7.35001ZM12.914 14.328L9.672 11.086C9.49406 11.5389 9.45219 12.034 9.55151 12.5104C9.65082 12.9867 9.88702 13.4238 10.2311 13.7679C10.5752 14.112 11.0123 14.3482 11.4887 14.4475C11.965 14.5468 12.4601 14.5049 12.913 14.327L12.914 14.328ZM20.807 16.592L19.376 15.162C20.0445 14.2093 20.5204 13.1352 20.777 12C20.5052 10.8097 19.9943 9.68715 19.2751 8.7005C18.556 7.71385 17.6438 6.88373 16.5939 6.26061C15.544 5.63749 14.3783 5.23437 13.1677 5.07577C11.9572 4.91717 10.727 5.00638 9.552 5.33801L7.974 3.76001C9.221 3.27001 10.58 3.00001 12 3.00001C17.392 3.00001 21.878 6.88001 22.819 12C22.5126 13.6657 21.8239 15.2376 20.807 16.592ZM11.723 7.50801C12.3595 7.46867 12.9971 7.56507 13.5935 7.79082C14.19 8.01657 14.7316 8.36652 15.1825 8.81746C15.6335 9.2684 15.9834 9.81003 16.2092 10.4065C16.4349 11.0029 16.5313 11.6405 16.492 12.277L11.722 7.50801H11.723Z" fill="#172B4D"/> </g> <defs> <clipPath id="clip0_83_7773"> <rect width="24" height="24" fill="white"/> </clipPath> </defs> </svg>'}
                          </SvgIcon>
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
                <LabelStyle required={true}>Xác nhận lại mật khẩu</LabelStyle>
                <RHFTextField
                  name="rePassword"
                  placeholder="Bắt buộc"
                  type={showPassword ? "text" : "password"}
                  style={{ ...InputStyle }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" sx={{ mr: 1 }}>
                        <IconButton
                          edge="end"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <SvgIcon>
                            {showPassword
                              ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_83_7841)"> <path d="M12 3C17.392 3 21.878 6.88 22.819 12C21.879 17.12 17.392 21 12 21C6.608 21 2.122 17.12 1.181 12C2.121 6.88 6.608 3 12 3ZM12 19C14.0395 18.9996 16.0184 18.3068 17.6129 17.0352C19.2073 15.7635 20.3229 13.9883 20.777 12C20.3212 10.0133 19.2049 8.24 17.6106 6.97003C16.0163 5.70005 14.0383 5.00853 12 5.00853C9.9617 5.00853 7.98369 5.70005 6.38938 6.97003C4.79506 8.24 3.67877 10.0133 3.223 12C3.6771 13.9883 4.79267 15.7635 6.38714 17.0352C7.98161 18.3068 9.96053 18.9996 12 19ZM12 16.5C10.8065 16.5 9.66193 16.0259 8.81802 15.182C7.97411 14.3381 7.5 13.1935 7.5 12C7.5 10.8065 7.97411 9.66193 8.81802 8.81802C9.66193 7.97411 10.8065 7.5 12 7.5C13.1935 7.5 14.3381 7.97411 15.182 8.81802C16.0259 9.66193 16.5 10.8065 16.5 12C16.5 13.1935 16.0259 14.3381 15.182 15.182C14.3381 16.0259 13.1935 16.5 12 16.5ZM12 14.5C12.663 14.5 13.2989 14.2366 13.7678 13.7678C14.2366 13.2989 14.5 12.663 14.5 12C14.5 11.337 14.2366 10.7011 13.7678 10.2322C13.2989 9.76339 12.663 9.5 12 9.5C11.337 9.5 10.7011 9.76339 10.2322 10.2322C9.76339 10.7011 9.5 11.337 9.5 12C9.5 12.663 9.76339 13.2989 10.2322 13.7678C10.7011 14.2366 11.337 14.5 12 14.5Z" fill="#172B4D"/> </g> <defs> <clipPath id="clip0_83_7841"> <rect width="24" height="24" fill="white"/> </clipPath> </defs> </svg>'
                              : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_83_7773)"> <path d="M17.882 19.297C16.1232 20.4126 14.0827 21.0033 12 21C6.608 21 2.122 17.12 1.181 12C1.61103 9.67072 2.78263 7.5429 4.521 5.93401L1.392 2.80801L2.807 1.39301L22.606 21.193L21.191 22.607L17.881 19.297H17.882ZM5.935 7.35001C4.576 8.5856 3.62932 10.2088 3.223 12C3.53529 13.3665 4.16226 14.6411 5.054 15.7226C5.94574 16.804 7.07763 17.6624 8.35955 18.2293C9.64148 18.7962 11.038 19.0561 12.4381 18.9881C13.8381 18.9202 15.203 18.5264 16.424 17.838L14.396 15.81C13.5327 16.3538 12.5102 16.5881 11.4962 16.4744C10.4823 16.3608 9.53704 15.9059 8.81557 15.1844C8.0941 14.463 7.63923 13.5177 7.52556 12.5038C7.4119 11.4898 7.64618 10.4673 8.19 9.60401L5.935 7.35001ZM12.914 14.328L9.672 11.086C9.49406 11.5389 9.45219 12.034 9.55151 12.5104C9.65082 12.9867 9.88702 13.4238 10.2311 13.7679C10.5752 14.112 11.0123 14.3482 11.4887 14.4475C11.965 14.5468 12.4601 14.5049 12.913 14.327L12.914 14.328ZM20.807 16.592L19.376 15.162C20.0445 14.2093 20.5204 13.1352 20.777 12C20.5052 10.8097 19.9943 9.68715 19.2751 8.7005C18.556 7.71385 17.6438 6.88373 16.5939 6.26061C15.544 5.63749 14.3783 5.23437 13.1677 5.07577C11.9572 4.91717 10.727 5.00638 9.552 5.33801L7.974 3.76001C9.221 3.27001 10.58 3.00001 12 3.00001C17.392 3.00001 21.878 6.88001 22.819 12C22.5126 13.6657 21.8239 15.2376 20.807 16.592ZM11.723 7.50801C12.3595 7.46867 12.9971 7.56507 13.5935 7.79082C14.19 8.01657 14.7316 8.36652 15.1825 8.81746C15.6335 9.2684 15.9834 9.81003 16.2092 10.4065C16.4349 11.0029 16.5313 11.6405 16.492 12.277L11.722 7.50801H11.723Z" fill="#172B4D"/> </g> <defs> <clipPath id="clip0_83_7773"> <rect width="24" height="24" fill="white"/> </clipPath> </defs> </svg>'}
                          </SvgIcon>
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
            </Stack>
          </Stack>
          <RegisterFormSectionLabel title="THÔNG TIN DOANH NGHIỆP" />
          <Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ mb: 2.5 }}
            >
              <Stack>
                <LabelStyle required={true}>Tên doanh nghiệp</LabelStyle>
                <RHFTextField
                  name="organizationName"
                  placeholder="Bắt buộc"
                  style={{ ...InputStyle }}
                />
              </Stack>
              <Stack>
                <LabelStyle required={true}>
                  Số điện thoại doanh nghiệp
                </LabelStyle>
                <RHFTextField
                  name="organizationPhoneNumber"
                  placeholder="Bắt buộc"
                  style={{ ...InputStyle }}
                />
              </Stack>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ mb: 2.5 }}
            >
              <div style={{ ...InputStyle }}>
                <RHFMuiAutocomplete
                  options={JobCategoryList?.map((i) => ({
                    value: i.id,
                    label: `${i.name[0].toUpperCase()}${i.name.slice(1)}`,
                    name: i?.name,
                  }))}
                  disabledOption={3}
                  name="jobCategoryIds"
                  title="Ngành nghề"
                  isRequired
                  placeholder="Chọn tối đa 3 ngành nghề (bắt buộc)"
                  multiple
                />
              </div>

              <div style={{ ...InputStyle }}>
                <LabelStyle required={true}>Quy mô nhân sự</LabelStyle>
                <RHFSelect
                  options={LIST_ORGANIZATION_SIZE.map((i) => ({
                    value: i.value,
                    label: i.name,
                    name: i.name,
                  }))}
                  style={{ ...InputStyle }}
                  name="organizationSize"
                  placeholder="Bắt buộc"
                />
              </div>
            </Stack>
            <Divider sx={{ backgroundColor: STYLE_CONSTANT.COLOR_DIVIDER }} />
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ mb: 2.5, mt: 2.5 }}
            >
              <Stack>
                <div style={{ ...InputStyle }}>
                  <LabelStyle required={true}>Tỉnh/Thành phố</LabelStyle>
                  <RHFSelect
                    options={ProvinceList?.map((i) => ({
                      value: i.id,
                      label: i.name,
                    }))}
                    style={{ ...InputStyle }}
                    name="organizationProvinceId"
                    placeholder="Bắt buộc"
                  />
                </div>
              </Stack>
              <Stack>
                <div style={{ ...InputStyle }}>
                  <LabelStyle required={true}>Quận/Huyện</LabelStyle>
                  <RHFSelect
                    options={DistrictList?.map((i) => ({
                      value: i.id,
                      label: i.name,
                    }))}
                    style={{ ...InputStyle }}
                    name="organizationDistrictId"
                    placeholder="Bắt buộc"
                    disabled={!watchProvinceId}
                  />
                </div>
              </Stack>
            </Stack>

            <Stack
              direction="row"
              justifyContent="space-between"
              width={STYLE_CONSTANT.WIDTH_FULL}
              sx={{ mb: 2.5 }}
            >
              <Stack sx={{ width: STYLE_CONSTANT.WIDTH_FULL }}>
                <LabelStyle>Địa chỉ chi tiết doanh nghiệp</LabelStyle>
                <RHFTextField
                  name="organizationAddress"
                  placeholder="Số nhà, tên đường, xã/phường..."
                />
              </Stack>
            </Stack>
            <Stack
              direction="row"
              justifyContent="start"
              alignItems="center"
              sx={{ mt: 2.5 }}
            >
              <Stack sx={{ mr: 0.5 }}>
                <RHFCheckbox
                  style={{ margin: 0, padding: 0 }}
                  name="acceptTerms"
                />
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
          <Stack sx={{ mt: 2 }}>
            <MuiButton
              disabled={!isValid}
              title={"Đăng ký"}
              type="submit"
              loading={isSubmitting}
              loadingPosition="end"
              sx={{
                backgroundColor: STYLE_CONSTANT.COLOR_PRIMARY,
                textTransform: "none",
                borderRadius: 0.75,
                fontSize: 16,
                fontWeight: 600,
              }}
            />
          </Stack>
        </Stack>
      </FormProvider>
    </Box>
  );
}

export default React.memo(RegisterForm);
