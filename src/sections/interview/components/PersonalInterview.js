import { TextAreaDS } from "@/components/DesignSystem";
import { RHFTextField, RHFCheckbox } from "@/components/hook-form";
import RHFDropdown from "@/components/hook-form/RHFDropdown";
import { LabelStyle,  } from "@/components/hook-form/style";
// import { useGetListJobsMutation } from "@/sections/job/jobSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Stack,
  Typography,
  // InputLabel,
  // TextareaAutosize,
  TextField,
} from "@mui/material";
// import { Alert } from "@mui/material";
// import { Input } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import { Controller, useFormContext } from "react-hook-form";
import * as Yup from "yup";
import {Label} from "@/components/hook-form/style";

const PersonalInterview = () => {
  // const { TextArea } = Input;
  // const { data } = useGetListJobsMutation();
  const ConnectSchema = Yup.object().shape({
    name: Yup.string().required("Nhập tên buổi phỏng vấn"),
  });

  const defaultValues = {
    name: "",
  };
  const { control } = useFormContext();

  const methods = useForm({
    resolver: yupResolver(ConnectSchema),
    defaultValues,
  });

  const {
    // setError,
    // handleSubmit,
    formState: {  },
  } = methods;
  // const onSubmit = async () => {};
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

  const options2 = [
    {
      id: "00001",
      name: "Nhân Viên Marketing Online - HCM",
    },
    {
      id: "00002",
      name: "Nhân Viên Marketing Online - HN",
    },
  ];

  const options3 = [
    {
      id: "00001",
      name: "Mẫu đánh giá lập trình viên junior",
    },
    {
      id: "00002",
      name: "Mẫu đánh giá lập trình viên senior",
    },
    {
      id: "00003",
      name: "Mẫu đánh giá thực tập sinh IT",
    },
  ];

  const option4 = [
    {
      id: "00001",
      name: "Phỏng vấn 1",
    },
    {
      id: "00002",
      name: "Ko cần pvan",
    },
  ];

  const renderTitle = (title, required) => {
    return <Label required={required}>{title}</Label>;
};
  return (
    <Stack spacing={3}>
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
        <Box sx={{ mb: 2, width: "100%", height: 44 }}>
          <Typography>
            Tin tuyển dụng <span style={{ color: "red" }}>*</span>
          </Typography>
          <RHFDropdown
            options={options2.map((i) => ({
              value: i.id,
              label: i.name,
              name: i.name,
            }))}
            name="recruitmentId"
            multiple={false}
            required
          />
        </Box>
      </Stack>

      <Stack spacing={2} direction="row" sx={{ width: "100%" }}>
        <Box sx={{ mb: 2, width: "50%", height: 44 }}>
          <Typography>
            Bước phỏng vấn <span style={{ color: "red" }}>*</span>
          </Typography>
          <RHFDropdown
            options={option4.map((i) => ({
              value: i.id,
              label: i.name,
              name: i.name,
            }))}
            name="recruitmentPipelineStateId"
            multiple={false}
            required
          />
        </Box>
        <Box sx={{ mb: 2, width: "50%", height: 44 }}>
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

      <Stack>
        <Controller
          name={"onlineInterviewAddress"}
          control={control}
          render={({ field, fieldState: { error } }) => {
            return (
              <>
                <LabelStyle required={true}>Địa điểm</LabelStyle>
                <TextField
                  fullWidth
                  multiline
                  rows="2"
                  defaultValue="Default Value"
                  placeholder="Nội dung"
                  variant="outlined"
                  {...field}
                  value={field.value || ""}
                  error={!!error}
                  helperText={error?.message}
                  sx={{
                    "& textarea": {
                      p: "0!important",
                      fontSize: 14,
                    },
                  }}
                />
              </>
            );
          }}
        />
      </Stack>
      <Stack>
        {renderTitle('Lưu ý cho ứng viên')}
        <TextAreaDS
          maxLength={150}
          placeholder="Nhập nội dung lưu ý..."
          name={"note"}
        />
      </Stack>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <RHFCheckbox
          name="isSendMailCouncil"
          label="Gửi email cho hội đồng tuyển dụng"
        />
        <RHFCheckbox
          name="isSendMailApplicant"
          label="Gửi email cho ứng viên"
        />
      </Box>
      <Stack spacing={2} direction="row" sx={{ width: "100%" }}>
        <Box sx={{ mb: "20vh", width: "100%", height: 44 }}>
          <Typography>
            Mẫu đánh giá<span style={{ color: "red" }}>*</span>
          </Typography>
          <RHFDropdown
            options={options3.map((i) => ({
              value: i.id,
              label: i.name,
              name: i.name,
            }))}
            name="reviewFormId"
            multiple={false}
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
    </Stack>
  );
};
export default PersonalInterview;
