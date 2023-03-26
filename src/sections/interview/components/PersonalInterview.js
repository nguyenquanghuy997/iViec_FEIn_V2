import { TextAreaDS } from "@/components/DesignSystem";
import { RHFTextField, RHFCheckbox } from "@/components/hook-form";
import RHFDropdown from "@/components/hook-form/RHFDropdown";
import { LabelStyle } from "@/components/hook-form/style";
import { Label } from "@/components/hook-form/style";
import { useGetRecruitmentPipelineStatesByRecruitment1Query } from "@/sections/applicant/ApplicantFormSlice";
import { useGetRecruitmentByOrganizationIdQuery } from "@/sections/recruitment/RecruitmentSlice";
import { PipelineStateType } from "@/utils/enum";
import {
  Box,
  Stack,
  Typography, // InputLabel,
  // TextareaAutosize,
  TextField,
} from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const PersonalInterview = ({ wacthStep }) => {
  const { control } = useFormContext();
  const {
    data: { items: ListRecruitmentByOrganization = [] } = {},
    isLoading: isLoadingRecruitment,
  } = useGetRecruitmentByOrganizationIdQuery();



  const { data: { items: ListStep = [] } = {}, isLoading: isLoadingStep } =
    useGetRecruitmentPipelineStatesByRecruitment1Query(wacthStep);

    
  if ((isLoadingRecruitment, isLoadingStep)) return null;

  const options = [
    {
      id: 0,
      name: "Online",
    },
    {
      id: 1,
      name: "Direct",
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
  const renderTitle = (title, required) => {
    return <Label required={required}>{title}</Label>;
  };

  // console.log("testtuyet", { wacthStep, ListStep });

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
            options={ListRecruitmentByOrganization?.map((i) => ({
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
            options={ListStep.filter(
              (item) => item.pipelineStateType == 3
            )?.map((i) => ({
              value: i.id,
              label: PipelineStateType(i.pipelineStateType),
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
        {renderTitle("Lưu ý cho ứng viên")}
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
