// react
// components
import { RegisterFormSectionLabel } from ".";
import { STYLE_CONSTANT } from "./constants";
import Iconify from "@/components/Iconify";
import {
  FormProvider,
  RHFBasicSelect,
  RHFCheckbox,
  RHFTextField,
} from "@/components/hook-form";
// hooks
import { PATH_AUTH } from "@/routes/paths";
import {
  useLazyGetDistrictByProvinceIdQuery,
  useLazyGetProvinceQuery,
  useRegisterMutation,
} from "@/sections/auth/authSlice";
import { useGetJobCategoriesQuery } from "@/sections/companyinfor/companyInforSlice";
import errorMessages from "@/utils/errorMessages";
import { LIST_ORGANIZATION_SIZE } from "@/utils/formatString";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { LoadingButton } from "@mui/lab";
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
// next
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const InputStyle = { width: 440, minHeight: 44 };

export default function RegisterForm({}) {
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
      .required("Email không được bỏ trống"),
    password: Yup.string()
      .min(6, "Mật khẩu cần tối thiểu 6 ký tự")
      .required("Mật khẩu không được bỏ trống"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận không đúng")
      .required("Mật khẩu xác nhận không được bỏ trống"),
    organizationName: Yup.string().required(
      "Tên doanh nghiệp không được bỏ trống"
    ).max(50, "Tên doanh nghiệp tối đa 50 ký tự"),
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
    organizationAddress: Yup.string().max(255, "Địa chỉ cụ thể doanh nghiệp tối đa 255 ký tự"),
    acceptTerms: Yup.bool().oneOf(
      [true],
      "Vui lòng đồng ý với chính sách bảo mật"
    ),
  });

  const methods = useForm({
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
    formState: { isSubmitting, errors },
  } = methods;

  const watchHasEmailValue = watch("userName");
  const watchProvinceId = watch("organizationProvinceId");

  const onSubmit = async (data) => {
    try {
      const body = {
        userName: data.userName, // organization username (Email đăng nhập)
        password: data.password, // organization password
        organizationName: data.organizationName, // organization name
        organizationPhoneNumber: data.organizationPhoneNumber, // organization phone number
        jobCategoryIds: data.jobCategoryIds, // organization name
        organizationSize: parseInt(data.organizationSize), // organization size
        organizationProvinceId: data.organizationProvinceId, // organization province
        organizationDistrictId: data.organizationDistrictId, // organization district
        organizationAddress: data.organizationAddress, // organization address
      };
      await postRegister(body).unwrap();
      router.push(`/auth/register/success?username=${body.userName}`);
    } catch (error) {
      const message = errorMessages[`${error.status}`] || "Lỗi hệ thống";
      setError("afterSubmit", { ...error, message });
    }
  };

  const handleClearField = (field) => {
    if (!field) return;
    else methods.resetField(field);
  };

  const [fetchProvice, { data: { items: ProviceList = [] } = {} }] =
    useLazyGetProvinceQuery();
  const [getDistrictByProvinceId, { data: { items: DistrictList = [] } = {} }] =
    useLazyGetDistrictByProvinceIdQuery();
  const { data: { items: JobCategoryList = [] } = {} } =
    useGetJobCategoriesQuery();

  useEffect(() => {
    fetchProvice().unwrap();
  }, []);

  useEffect(() => {
    if (watchProvinceId) {
      getDistrictByProvinceId(watchProvinceId).unwrap();
      methods.resetField('organizationDistrictId')
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
                <RHFTextField
                  name="userName"
                  label="Email đăng nhập"
                  placeholder="Email đăng nhập (bắt buộc)"
                  required
                  style={{ ...InputStyle }}
                  InputProps={{
                    endAdornment: watchHasEmailValue && (
                      <InputAdornment position="end">
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
                <RHFTextField
                  name="password"
                  label="Mật khẩu"
                  placeholder="Bắt buộc"
                  required
                  type={showPassword ? "text" : "password"}
                  style={{ ...InputStyle }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <Iconify
                            icon={
                              showPassword
                                ? "ic:outline-remove-red-eye"
                                : "mdi:eye-off-outline"
                            }
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
              <Stack>
                <RHFTextField
                  name="rePassword"
                  label="Xác nhận lại mật khẩu"
                  placeholder="Bắt buộc"
                  required
                  type={showPassword ? "text" : "password"}
                  style={{ ...InputStyle }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <Iconify
                            icon={
                              showPassword
                                ? "ic:outline-remove-red-eye"
                                : "mdi:eye-off-outline"
                            }
                          />
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
                <RHFTextField
                  name="organizationName"
                  placeholder="Bắt buộc"
                  label="Tên doanh nghiệp"
                  required
                  style={{ ...InputStyle }}
                />
              </Stack>
              <Stack>
                <RHFTextField
                  name="organizationPhoneNumber"
                  required
                  placeholder="Bắt buộc"
                  label="Số điện thoại doanh nghiệp"
                  style={{ ...InputStyle }}
                />
              </Stack>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ mb: 2.5 }}
            >
              <RHFBasicSelect
                name="jobCategoryIds"
                placeholder="Chọn tối đa 3 ngành nghề (bắt buộc)"
                label="Ngành nghề"
                required
                multiple
                style={{ ...InputStyle }}
                options={JobCategoryList.map((i) => ({
                  value: i.id,
                  label: `${i.name[0].toUpperCase()}${i.name.slice(1)}`,
                }))}
              />
              <RHFBasicSelect
                name="organizationSize"
                label="Quy mô nhân sự"
                placeholder="Bắt buộc"
                style={{ ...InputStyle }}
                required
                options={LIST_ORGANIZATION_SIZE.map((i) => ({
                  value: i.value,
                  label: i.name,
                }))}
              />
            </Stack>
            <Divider sx={{ backgroundColor: STYLE_CONSTANT.COLOR_DIVIDER }} />
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ mb: 2.5, mt: 2.5 }}
            >
              <Stack>
                <RHFBasicSelect
                  name="organizationProvinceId"
                  label="Tỉnh/Thành phố"
                  placeholder="Bắt buộc"
                  required
                  style={{ ...InputStyle }}
                  options={ProviceList?.map((i) => ({
                    value: i?.id,
                    label: i?.name,
                    slug: i?.slug,
                  }))}
                />
              </Stack>
              <Stack>
                <RHFBasicSelect
                  name="organizationDistrictId"
                  label="Quận/Huyện"
                  placeholder="Bắt buộc"
                  required
                  disabled={!watchProvinceId}
                  style={{ ...InputStyle }}
                  options={DistrictList?.map((i) => ({
                    value: i?.id,
                    label: i?.name,
                    slug: i?.slug,
                  }))}
                />
              </Stack>
            </Stack>

            <Stack
              direction="row"
              justifyContent="space-between"
              width={STYLE_CONSTANT.WIDTH_FULL}
              sx={{ mb: 2.5 }}
            >
              <Stack sx={{ width: STYLE_CONSTANT.WIDTH_FULL }}>
                <RHFTextField
                  name="organizationAddress"
                  placeholder="Số nhà, tên đường, xã/phường..."
                  label="Địa chỉ chi tiết doanh nghiệp"
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
                  <NextLink href={PATH_AUTH.register} passHref>
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
