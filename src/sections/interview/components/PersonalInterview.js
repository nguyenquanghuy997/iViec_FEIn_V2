import { TextAreaDS } from "@/components/DesignSystem";
import { RHFCheckbox, RHFSelect, RHFTextField } from "@/components/hook-form";
import { Label } from "@/components/hook-form/style";
import { useLazyGetRecruitmentPipelineStatesByRecruitmentsQuery } from "@/sections/applicant/ApplicantFormSlice";
import { useGetReviewFormQuery, useLazyGetRelateCalendarQuery } from "@/sections/interview/InterviewSlice";
import { useGetRecruitmentsQuery } from "@/sections/recruitment/RecruitmentSlice";
import { PipelineStateType } from "@/utils/enum";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";
import { useTheme } from "@mui/material/styles";

const PersonalInterview = ({ item }) => {
  const { resetField, watch } = useFormContext();
  const { data: { items: Data = [] } = {} } = useGetRecruitmentsQuery({
    PageIndex: 1,
    PageSize: 20
  });
  const { palette } = useTheme();

  const [getPipeline, { data: { items: ListStep = [] } = {} }] =
    useLazyGetRecruitmentPipelineStatesByRecruitmentsQuery();

  const [getRelateCalendar, { data: relateCalendar }] = useLazyGetRelateCalendarQuery();
  const { data: { items: DataForm = [] } = {} } = useGetReviewFormQuery();

  const options = [
    {
      id: 0,
      name: "Online"
    },
    {
      id: 1,
      name: "Trực tiếp"
    }
  ];

  const changeRecruitment = (e) => {
    getPipeline({ RecruitmentId: e });
    resetField("recruitmentPipelineStateId");
  };

  const changePipelineRecruitment = (e) => {
    getRelateCalendar({ RecruitmentPipelineStateId: e });
  };


  return (
    <Grid spacing={3}>
      <Grid mb={3}>
        <RHFTextField
          name="name"
          title="Tên buổi phỏng vấn"
          placeholder="VD: Phỏng vấn lập trình viên lần 1..."
          isRequired
        />
      </Grid>

      {item ? (
        <Grid mb={3}>
          <Typography variant={"textSize14500"} color={palette.text.primary}>
            Tin tuyển dụng <span style={{ color: "red" }}>*</span>
          </Typography>
          <Box
            sx={{
              backgroundColor: "#EFF3F6",
              p: 2,
              borderRadius: "6px",
              fontSize: 14
            }}
          >
            {Data.filter((data) => data?.id.includes(item?.recruitmentId))[0]?.name}
          </Box>

        </Grid>
      ) : (
        <Grid mb={3}>
          <Label required={true}>
            <Typography variant={"textSize14500"} color={palette.text.primary}>
              Tin tuyển dụng
            </Typography>
          </Label>
          <RHFSelect
            options={Data?.map((i) => ({
              value: i.id,
              label: i.name,
              name: i.name
            }))}
            name="recruitmentId"
            multiple={false}
            placeholder="Chọn tin tuyển dụng"
            required
onChange={changeRecruitment}
          />
        </Grid>
      )}

      {watch("recruitmentId") && (
        <Grid container mb={3} direction="row">
          <Grid item xs={6} pr={"12px"}>
            <Label required={true}>
              <Typography variant={"textSize14500"} color={palette.text.primary}>
                Bước phỏng vấn
              </Typography>
            </Label>
            <RHFSelect
              options={ListStep.filter(
                (item) => item.pipelineStateType === 2
              )?.map((i) => ({
                value: i.id,
                label: PipelineStateType(i.pipelineStateType),

              }))}
              name="recruitmentPipelineStateId"
              multiple={false}
              placeholder="Chọn bước phỏng vấn"
              required
              onChange={changePipelineRecruitment}
            />
          </Grid>
          <Grid item xs={6} pl={"12px"}>
            <Label required={true}>
              <Typography variant={"textSize14500"} color={palette.text.primary}>
                Hình thức phỏng vấn
              </Typography>
            </Label>
            <RHFSelect
              options={options.map((i) => ({
                value: i.id,
                label: i.name,
                name: i.name
              }))}
              name="interviewType"
              placeholder="Chọn hình thức phỏng vấn"
              multiple={false}
              required
            />
          </Grid>
        </Grid>
      )}

      {watch("interviewType") === 1 && (
        <Grid mb={3}>
          <Label required={true}>
            <Typography variant={"textSize14500"} color={palette.text.primary}>
              Địa điểm
            </Typography>
          </Label>
          <TextAreaDS
            placeholder="Nhập nội dung lưu ý..."
            name={"onlineInterviewAddress"}
            style={{ height: "80px" }}
          />
        </Grid>
      )}

      <Grid mb={3}>
        <Label>
          <Typography variant={"textSize14500"} color={palette.text.primary}>
            Lưu ý cho ứng viên
          </Typography>
        </Label>
        <TextAreaDS
          maxLength={1000}
          placeholder="Nhập nội dung lưu ý..."
          name={"note"}
        />
      </Grid>
      <Grid mb={3} container flexDirection={"column"}>
        <RHFCheckbox
          name="isSendMailCouncil"
          label="Gửi email cho hội đồng tuyển dụng"
        />
        <RHFCheckbox
          name="isSendMailApplicant"
          label="Gửi email cho ứng viên"
        />
      </Grid>
      <Grid mb={3}>
        <Label>
          <Typography variant={"textSize14500"} color={palette.text.primary}>
            Mẫu đánh giá
          </Typography>
        </Label>
        {item?.reviewFormId || relateCalendar ?
          <Box
            sx={{
              backgroundColor: "#EFF3F6",
              p: 2,
              borderRadius: "6px",
              fontSize: 14
            }}
          >
            {DataForm.filter((data) => data?.id.includes(item?.reviewFormId))[0]?.name || relateCalendar?.reviewFormName}
          </Box> :
          <RHFSelect
            options={DataForm.map((i) => ({
              value: i.id,
              label: i.name
            }))}
            required
            name="reviewFormId"
            placeholder="Chọn mẫu đánh giá"
            multiple={false}
          />
        }
      </Grid>
    </Grid>
  );
};
export default PersonalInterview;
