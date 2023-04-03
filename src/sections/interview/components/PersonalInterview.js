import { TextAreaDS } from "@/components/DesignSystem";
import { RHFTextField, RHFCheckbox, RHFSelect } from "@/components/hook-form";
import { LabelStyle } from "@/components/hook-form/style";
import { Label } from "@/components/hook-form/style";
import { useGetRecruitmentPipelineStatesByRecruitment1Query } from "@/sections/applicant/ApplicantFormSlice";
import { useGetReviewFormQuery } from "@/sections/interview/InterviewSlice";
import { useGetRecruitmentsQuery } from "@/sections/recruitment/RecruitmentSlice";
import { PipelineStateType } from "@/utils/enum";
import { Box, Stack, Typography, TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const PersonalInterview = ({ watchStep, watchType }) => {
  const { control } = useFormContext();
  const { data: { items: Data = [] } = {} } = useGetRecruitmentsQuery({
    PageIndex: 1,
    PageSize: 20,
  });
  const { data: { items: ListStep = [] } = {}, isLoading: isLoadingStep } =
    useGetRecruitmentPipelineStatesByRecruitment1Query(
      { RecruitmentId: watchStep },
      {
        skip: !watchStep,
      }
    );

  const { data: { items: DataForm = [] } = {} } = useGetReviewFormQuery();

  if (isLoadingStep) return null;
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
          <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
            Tin tuyển dụng <span style={{ color: "red" }}>*</span>
          </Typography>
          <RHFSelect
            options={Data?.map((i) => ({
              value: i.id,
              label: i.name,
              name: i.name,
            }))}
            name="recruitmentId"
            multiple={false}
            placeholder="Chọn tin tuyển dụng"
            required
          />
        </Box>
      </Stack>

      {watchStep && (
        <Stack spacing={2} direction="row" sx={{ width: "100%" }}>
          <Box sx={{ mb: 2, width: "50%", height: 44 }}>
            <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
              Bước phỏng vấn <span style={{ color: "red" }}>*</span>
            </Typography>
            <RHFSelect
              options={ListStep.filter(
                (item) => item.pipelineStateType == 2
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
            <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
              Hình thức phỏng vấn <span style={{ color: "red" }}>*</span>
            </Typography>
            <RHFSelect
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
      )}

      {watchType === 1 && (
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
      )}

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
          <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
            Mẫu đánh giá
          </Typography>
          <RHFSelect
            options={DataForm.map((i) => ({
              value: i.id,
              label: i.name,
              name: i.name,
            }))}
            name="reviewFormId"
            placeholder="Chọn mẫu đánh giá"
            multiple={false}
          />

          {/* <Typography
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
          </Typography> */}
        </Box>
      </Stack>
    </Stack>
  );
};
export default PersonalInterview;
