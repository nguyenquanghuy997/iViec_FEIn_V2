// react
import { useEffect, useState } from "react";

// next
import NextLink from "next/link";

import * as qs from "qs";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Typography,
} from "@mui/material";

// components
import { RegisterFormSectionLabel } from ".";
import Iconify from "@/components/Iconify";
import {
  FormProvider,
  RHFBasicSelect,
  RHFCheckbox,
  RHFTextField,
} from "@/components/hook-form";
// hooks
import { PATH_AUTH } from "@/routes/paths";
import { useRegisterMutation } from "@/sections/auth/authSlice";
import {
  useGetJobCategoriesQuery,
  useGetProviceMutation,
} from "@/sections/companyinfor/companyInforSlice";
import { LIST_BRANCH_SIZE } from "@/utils/formatString";

import { STYLE_CONSTANT } from "./constants";

const InputStyle = { width: 440, minHeight: 44 };

export default function RegisterForm({}) {
  const [fetchProvice, { data: { DataList: ProviceList = [] } = {} }] =
    useGetProviceMutation();
  const { data: { DataList: JobCategoryList = [] } = {} } =
    useGetJobCategoriesQuery();
  useEffect(() => {
    fetchProvice().unwrap();
  }, []);
  const [postRegister] = useRegisterMutation();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    companyPhoneNumber: Yup.string()
      .required("Số điện thoại không được bỏ trống")
      .matches(/\d+\b/, "Số điện thoại không đúng định dạng"),
    companyEmail: Yup.string()
      .email("Email không đúng định dạng")
      .required("Email không được bỏ trống"),
    companyName: Yup.string().required("Tên doanh nghiệp không được bỏ trống"),
    type: Yup.string().required("Ngành nghề không được bỏ trống"),
    size: Yup.string().required("Quy mô nhân sự không được bỏ trống"),
    companyProvinceId: Yup.string().required(
      "Tỉnh/Thành phố không được bỏ trống"
    ),
    companyDistrictId: Yup.string().required("Quận/Huyện không được bỏ trống"),
    password: Yup.string()
      .min(6, "Mật khẩu cần tối thiểu 6 ký tự")
      .required("Mật khẩu không được bỏ trống"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận không đúng")
      .required("Mật khẩu xác nhận không được bỏ trống"),
    acceptTerms: Yup.bool().oneOf(
      [true],
      "Vui lòng đồng ý với chính sách bảo mật"
    ),
  });

  const defaultValues = {
    companyEmail: "",
    companyPhoneNumber: "",
    password: "",
    rePassword: "",
    companyName: "",
    acceptTerms: true,
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = methods;
  const onSubmit = async (data) => {
    try {
      const body = {
        FULL_NAME: data.fullName,
        EMAIL: data.email,
        PhoneNumber: data.phone,
        BranchName: data.fullName,
        BranchNickName: data.fullName,
        BranchJobCategoryId: data.type,
        BranchProvinceId: data.city,
        BranchSize: data.size,
        PASSWORD: data.password,
        REPASSWORD: data.rePassword,
      };
      await postRegister(qs.stringify(body)).unwrap();
    } catch (error) {
      // TODO
    }
  };

  const watchHasEmailValue = watch("companyEmail");

  const handleClearField = (field) => {
    if (!field) return;
    else methods.resetField(field);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <RegisterFormSectionLabel title="THÔNG TIN TÀI KHOẢN DOANH NGHIỆP" />
          <Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ mb: 2.5 }}
            >
              <Stack>
                <RHFTextField
                  name="companyEmail"
                  label="Email đăng nhập"
                  placeholder="Email đăng nhập (bắt buộc)"
                  required
                  style={{ ...InputStyle }}
                  InputProps={{
                    endAdornment: watchHasEmailValue && (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={() => handleClearField("companyEmail")}
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
                              showPassword ? "ic:outline-remove-red-eye" : "mdi:eye-off-outline"
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
                              showPassword ? "ic:outline-remove-red-eye" : "mdi:eye-off-outline"
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
                  name="branchName"
                  placeholder="Bắt buộc"
                  label="Tên doanh nghiệp"
                  required
                  style={{ ...InputStyle }}
                />
              </Stack>
              <Stack>
                <RHFTextField
                  name="companyPhoneNumber"
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
                name="type"
                placeholder="Chọn tối đa 3 ngành nghề (bắt buộc)"
                label="Ngành nghề"
                required
                style={{ ...InputStyle }}
                options={JobCategoryList.map((i) => ({
                  value: i.JobCategoryId,
                  label: i.CategoryName,
                }))}
              />
              <RHFBasicSelect
                name="size"
                label="Quy mô nhân sự"
                placeholder="Bắt buộc"
                style={{ ...InputStyle }}
                required
                options={LIST_BRANCH_SIZE.map((i) => ({
                  value: i.id,
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
                  name="city"
                  label="Tỉnh/Thành phố"
                  placeholder="Bắt buộc"
                  required
                  style={{ ...InputStyle }}
                  options={ProviceList.map((i) => ({
                    value: i.ID,
                    label: i.ProvinceName,
                  }))}
                />
              </Stack>
              <Stack>
                <RHFBasicSelect
                  name="district"
                  label="Quận/Huyện"
                  placeholder="Bắt buộc"
                  required
                  style={{ ...InputStyle }}
                  options={ProviceList.map((i) => ({
                    value: i.ID,
                    label: i.ProvinceName,
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
                  name="companyAddress"
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
        </div>
      </FormProvider>
    </Box>
  );
}
