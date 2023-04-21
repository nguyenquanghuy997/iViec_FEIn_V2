import { TextAreaDS } from "@/components/DesignSystem";
import { RHFCheckbox, RHFSelect, RHFTextField } from "@/components/hook-form";
import { Label } from "@/components/hook-form/style";
import { useLazyGetRecruitmentPipelineStatesByRecruitmentsQuery } from "@/sections/applicant/ApplicantFormSlice";
import {
  useGetReviewFormQuery,
  useLazyGetRelateCalendarQuery,
} from "@/sections/interview/InterviewSlice";
import { useGetRecruitmentsQuery } from "@/sections/recruitment/RecruitmentSlice";
import { PipelineStateType } from "@/utils/enum";
import { Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

const PersonalInterview = ({
  item,
  option,
  currentApplicantPipelineState,
  optionsFromCruit,
}) => {
  const { resetField, watch, setValue } = useFormContext();
  const { data: { items: dataRecruitment = [] } = {} } =
    useGetRecruitmentsQuery({ processStatuses: [5, 7] });
  const { palette } = useTheme();

  const [getPipeline, { data: { items: ListStep = [] } = {} }] =
    useLazyGetRecruitmentPipelineStatesByRecruitmentsQuery();

  const [getRelateCalendar, { data: relateCalendar }] =
    useLazyGetRelateCalendarQuery();
  const { data: { items: DataForm = [] } = {} } = useGetReviewFormQuery();

  const interviewType = [
    {
      value: 0,
      label: "Online",
    },
    {
      value: 1,
      label: "Trực tiếp",
    },
  ];

  const changeRecruitment = (e) => {
    getPipeline({ RecruitmentId: e });
    resetField("recruitmentPipelineStateId");
    resetField("reviewFormId");
    resetField("interviewType");
    resetField("offlineInterviewAddress");
    resetField("applicantIdArray");
    resetField("bookingCalendarGroups");
  };

  const changePipelineRecruitment = (e) => {
    getRelateCalendar({ RecruitmentPipelineStateId: e });
  };

  useEffect(() => {
    if (option) {
      setValue("recruitmentId", option?.id);
      setValue("recruitmentPipelineStateId", currentApplicantPipelineState),
        getPipeline({ RecruitmentId: option?.id });
      getRelateCalendar({
        RecruitmentPipelineStateId: currentApplicantPipelineState,
      });
    }
  }, [!option]);

  useEffect(() => {
    if (optionsFromCruit) {
      setValue("recruitmentId", optionsFromCruit?.recruitmentId);
      setValue(
        "recruitmentPipelineStateId",
        optionsFromCruit?.recruitmentPipelineStateId
      );
      getPipeline({ RecruitmentId: optionsFromCruit?.recruitmentId });
    getRelateCalendar({
      RecruitmentPipelineStateId: optionsFromCruit?.recruitmentPipelineStateId,
    });
    }
  }, [optionsFromCruit]);

  useEffect(() => {
    if (!item?.id) return;
    getPipeline({ RecruitmentId: item?.recruitmentId });
    getRelateCalendar({
      RecruitmentPipelineStateId: item?.recruitmentPipelineStateId,
    });
  }, [item]);

  useEffect(() => {
    if (!relateCalendar) return;
    setValue("reviewFormId", relateCalendar?.reviewFormId);
  }, [relateCalendar]);


  return (
    <Grid>
      <Grid mb={3}>
        <RHFTextField
          name="name"
          title="Tên buổi phỏng vấn"
          placeholder="VD: Phỏng vấn lập trình viên lần 1..."
          isRequired
        />
      </Grid>

      <Grid mb={3}>
        <Label required={true}>
          <Typography variant={"textSize14500"} color={palette.text.primary}>
            Tin tuyển dụng
          </Typography>
        </Label>
        <RHFSelect
          options={dataRecruitment.map((i) => ({
            value: i?.id,
            label: i?.name,
            name: i?.name,
          }))}
          name="recruitmentId"
          multiple={false}
          placeholder="Chọn tin tuyển dụng"
          disabled={!!(option || item?.recruitmentId || optionsFromCruit)}
          onChange={changeRecruitment}
        />
      </Grid>

      <Grid container mb={3} direction="row">
        <Grid item xs={6} pr={"12px"}>
          <Label required={true}>
            <Typography variant={"textSize14500"} color={palette.text.primary}>
              Bước phỏng vấn
            </Typography>
          </Label>
          <RHFSelect
            options={
              ListStep.filter((item) => item.pipelineStateType === 2)?.map(
                (i) => ({
                  value: i.id,
                  label: PipelineStateType(i.pipelineStateType),
                })
              ) || {
                value: option.currentApplicantPipelineState,
              }
              ||{
               value: optionsFromCruit?.recruitmentPipelineStateId}
            }
            name="recruitmentPipelineStateId"
            multiple={false}
            placeholder="Chọn bước phỏng vấn"
            required
            disabled={
              !!(
                currentApplicantPipelineState ||
                item?.recruitmentPipelineStateId ||
                !watch("recruitmentId") || optionsFromCruit
              )
            }
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
            options={interviewType}
            name="interviewType"
            placeholder="Chọn hình thức phỏng vấn"
            multiple={false}
            required
          />
        </Grid>
      </Grid>

      {watch("interviewType") === 1 && (
        <Grid mb={3}>
          <Label required={true}>
            <Typography variant={"textSize14500"} color={palette.text.primary}>
              Địa điểm
            </Typography>
          </Label>
          <TextAreaDS
            placeholder="Nhập nội dung lưu ý..."
            name={"offlineInterviewAddress"}
            style={{
              height: "80px", resize: "none", "&.antInputDataCount": {
                display: "none"
              }
            }}
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
      <Grid mb={9}>
        <Label required={true}>
          <Typography variant={"textSize14500"} color={palette.text.primary}>
            Mẫu đánh giá
          </Typography>
        </Label>
        <RHFSelect
          options={DataForm.map((i) => ({
            value: i.id,
            label: i.name,
          }))}
          name="reviewFormId"
          placeholder="Chọn mẫu đánh giá"
          disabled={!!(item?.reviewFormId || relateCalendar?.reviewFormId)}
          multiple={false}
        />
      </Grid>
    </Grid>
  );
};
export default PersonalInterview;
