import OptionComponent from "./OptionComponent";
import { FormProvider } from "@/components/hook-form";
import { RHFTextField, RHFCheckbox } from "@/components/hook-form";
import RHFDropdown from "@/components/hook-form/RHFDropdown";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Stack,
  Typography,
  InputLabel,
} from "@mui/material";
import { Alert } from "@mui/material";
import { Input } from "antd";
import React from "react";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const PersonalInterview = () => {
  const { TextArea } = Input;
  const ConnectSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email không đúng định dạng")
      .required("Email không được bỏ trống"),
    password: Yup.string()
      .min(6, "Mật khẩu cần tối thiểu 6 ký tự")
      .required("Mật khẩu không được bỏ trống"),
  });

  const defaultValues = {
    email: "",
    password: "",
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(ConnectSchema),
    defaultValues,
  });

  const {
    // setError,
    handleSubmit,
    formState: { errors },
  } = methods;
  const onSubmit = async () => {};
  const options = [
    {
      id: "00001",
      name: "Online",
    },
    {
      id: "00002",
      name: "Direct",
    },
  ];

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}
        <Stack>
          <RHFTextField
            name="name"
            title="Tên buổi phỏng vấn"
            placeholder="VD: Phỏng vấn lập trình viên lần 1..."
            isRequired
            sx={{ width: "100%", minHeight: 44 }}
          />
        </Stack>

        <Stack>
          <RHFTextField
            isRequired
            sx={{ width: "100%", minHeight: 44 }}
            name="recruitmentId "
            title="Tin tuyển dụng"
            placeholder="Bắt buộc"
          />
        </Stack>

        <Stack spacing={2} direction="row" sx={{ width: "100%" }}>
          <Box sx={{ mb: 2, width: "100%", height: 44 }}>
            <Typography>
              Hình thức phỏng vấn <span style={{ color: "red" }}>*</span>
            </Typography>
            <RHFDropdown
              options={options.map((i) => ({
                value: i.id,
                label: i.name,
                name: i.name,
              }))}
              name="interviewType"
              multiple={false}
              required
            />
          </Box>
        </Stack>
        <OptionComponent />
        <Controller
          name="workingEnvironment"
          render={({ field }) => (
            <Stack>
              <InputLabel
                sx={{
                  color: "#172B4D",
                  fontSize: 14,
                  fontWeight: 500,
                  mb: 1,
                }}
              >
                Lưu ý cho ứng viên
              </InputLabel>

              <TextArea
                showCount
                name="note"
                value={field?.value}
                placeholder="Nhập nội dung lưu ý"
                maxLength={150}
                style={{
                  height: 180,
                  width: "100%",
                  resize: "none",
                  marginBottom: "20px",
                }}
                onChange={() => {}}
              />
            </Stack>
          )}
        />
        <Box sx={{ display:'flex', flexDirection:'column' }}>
          <RHFCheckbox
            name="isSendMailCouncil"
            label="Gửi email cho hội đồng tuyển dụng"
          />
          <RHFCheckbox name="isSendMailApplicant" label="Gửi email cho ứng viên" />
        </Box>

        <Box sx={{ mb: 2, width: "100%" }}>
          <Typography>
            Mẫu đánh giá <span style={{ color: "red" }}>*</span>
          </Typography>

          <RHFDropdown
            options={options.map((i) => ({
              value: i.id,
              label: i.option,
              name: i.option,
            }))}
            name="reviewFormId"
            multiple={false}
            placeholder="Chọn mẫu đánh giá"
            required
          />
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 600,
              color: "#1976D2",
              display: "flex",
              justifyContent: "end",
            }}
          >
            {" "}
            + Thêm nhanh mẫu đánh giá
          </Typography>
        </Box>
      </Stack>
    </FormProvider>
  );
};
export default PersonalInterview;
