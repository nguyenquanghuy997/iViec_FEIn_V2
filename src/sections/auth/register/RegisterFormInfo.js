// components
import Iconify from "@/components/Iconify";
import {
  FormProvider,
  RHFBasicSelect,
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
// form
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { LoadingButton } from "@mui/lab";
import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import * as qs from "qs";
import * as React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const steps = ["Thông tin cá nhân", "Thông tin công ty", "Hoàn thành"];
export default function RegisterForm({}) {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

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
    fullName: Yup.string().required("Full Name required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const defaultValues = {
    fullName: "",
    email: "",
    phone: "",
    password: "",
    rePassword: "",
    branchName: "",
    branchNickName: "",
    city: "",
    type: "",
    size: "",
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
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
      if (activeStep === 0) {
        setActiveStep(1);
      }
      if (activeStep === 1) {
        await postRegister(qs.stringify(body)).unwrap();
        setActiveStep(2);
      }
    } catch (error) {
      // TODO
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        {activeStep === 0 && (
          <div>
            <Stack spacing={3}>
              {/* {!!errors.afterSubmit && (
                <Alert severity="error">{errors.afterSubmit.message}</Alert>
              )} */}

              <RHFTextField name="fullName" label="Họ và tên" />
              <RHFTextField name="email" label="Email " />
              <RHFTextField name="phone" label="Số điện thoại" />

              <RHFTextField
                name="password"
                label="Mật khẩu"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <Iconify
                          icon={
                            showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                          }
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <RHFTextField
                name="rePassword"
                label="Nhập lại mật khẩu"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <Iconify
                          icon={
                            showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                          }
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
                // onClick={handleNext}
              >
                Tiếp tục
              </LoadingButton>
            </Stack>
          </div>
        )}

        {activeStep === 1 && (
          <Stack spacing={3}>
            {/* {!!errors.afterSubmit && (
              <Alert severity="error">{errors.afterSubmit.message}</Alert>
            )} */}

            <RHFTextField name="branchName" label="Tên công ty" />

            <RHFTextField name="branchNickName" label="Tên viết tắt công ty" />
            <RHFBasicSelect
              name={"city"}
              label={"Địa chỉ công ty"}
              placeholder={"Chọn Tỉnh/Thành"}
              style={{ marginRight: 10 }}
              options={ProviceList.map((i) => ({
                value: i.ID,
                label: i.ProvinceName,
              }))}
            />
            <RHFBasicSelect
              name={"type"}
              label={"Ngành nghề"}
              placeholder={"Chọn ngành nghề"}
              style={{ marginRight: 10 }}
              options={JobCategoryList.map((i) => ({
                value: i.JobCategoryId,
                label: i.CategoryName,
              }))}
            />

            <RHFBasicSelect
              name={"size"}
              label={"Quy mô nhân sự"}
              placeholder={"Chọn quy mô nhân sự"}
              options={LIST_BRANCH_SIZE.map((i) => ({
                value: i.id,
                label: i.name,
              }))}
            />
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Đăng kí
            </LoadingButton>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              // loading={isSubmitting}
              onClick={handleBack}
            >
              Trở lại
            </LoadingButton>
          </Stack>
        )}
        {activeStep == 2 && (
          <div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: 20,
              }}
            >
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  Hoàn thành đăng ký vui lòng đợi phản hồi IVIEC
                </Typography>
              </React.Fragment>
            </div>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              <NextLink href={PATH_AUTH.login} passHref>
                Đăng Nhập
              </NextLink>
            </LoadingButton>
          </div>
        )}
      </FormProvider>
    </Box>
  );
}
