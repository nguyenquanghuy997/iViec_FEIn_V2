import { useAddCalendarMutation } from "../InterviewSlice";
import PersonalInterview from "./PersonalInterview";
import CloseIcon from "@/assets/CloseIcon";
import { FormProvider } from "@/components/hook-form";
import InterviewCouncil from "@/sections/interview/components/InterviewCouncil";
import ListCandidate from "@/sections/interview/components/ListCandidate";
import { LoadingButton } from "@mui/lab";
import { Grid, Box, List, Drawer, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import moment from "moment";
import { useSnackbar } from "notistack";
import React from "react";
import { useForm } from "react-hook-form";

export const BoxInnerStyle = styled("Box")(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    width: "1000px",
  },
  [theme.breakpoints.up("xl")]: {
    width: "1400px",
  },
}));

const CreateCalendar = ({
  open,
  setOpen,
  options,
  currentApplicantPipelineState,
}) => {
  const defaultValues = {
    name: "",
    recruitmentId: "",
    recruitmentPipelineStateId: "",
    interviewType: "",
    onlineInterviewAddress: "",
    note: "",
    councilIds: [],
    reviewFormId: "",
    isSendMailCouncil: false,
    isSendMailApplicant: false,
    bookingCalendarGroups: [],
  };
  // const CalendarSchema = Yup.object().shape({
  //   name: Yup.string().required("Chưa nhập tên buổi phỏng vấn"),
  //   recruitmentId: Yup.string().required(
  //     "Chưa nhập tên tiêu đề tin tuyển dụng"
  //   ),
  //   recruitmentPipelineStateId: Yup.string(),
  //   // interviewType: Yup.string().required("Nhập hình thức phỏng vấn"),
  //   onlineInterviewAddress: Yup.string(),
  //   note: Yup.string(),
  //   councilIds: Yup.array().required(""),
  //   reviewFormId: Yup.string(),
  //   isSendMailCouncil: Yup.bool(),
  //   isSendMailApplicant: Yup.bool(),
  //   bookingCalendarGroups: Yup.array().of(
  //     Yup.object().shape({
  //       name: Yup.string(),
  //       interviewGroupType: Yup.string().required("Chưa chọn loại vai trò"),
  //       interviewTime: Yup.string(),
  //       interviewDuration: Yup.string(),
  //       applicantIds: Yup.array().required(""),
  //     })
  //   ),
  // });

  const methods = useForm({
    // resolver: yupResolver(CalendarSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const [addCalendar] = useAddCalendarMutation();
  // const { data: RelateCalendar } = useGetRelateCalendaraQuery({RecruitmentPipelineStateId:watchPipelineStep}, {skip:!watchPipelineStep});

  const toHHMMSS = (num) => {
    let sec_num = parseInt(num * 60, 10);
    let hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - hours * 3600) / 60);
    let seconds = sec_num - hours * 3600 - minutes * 60;

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return hours + ":" + minutes + ":" + seconds;
  };

  const convertDurationTimeToSeconds = (time) => {
    const splitToString = time.split(":");
    return (
      +splitToString[0] * 60 * 60 + +splitToString[1] * 60 + +splitToString[2]
    );
  };

  const convertStoMs = (s) => {
    const totalMinutes = Math.floor(s / 60);
    const seconds = s % 60;
    const newSeconds = seconds < 10 ? "0" + seconds : seconds;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}:${minutes}:${newSeconds}`;
  };

  const { enqueueSnackbar } = useSnackbar();
  const onSubmit = async (d) => {

    const body = {
      name: d.name,
      recruitmentId: d.recruitmentId,
      recruitmentPipelineStateId: d.recruitmentPipelineStateId,
      reviewFormId: d.reviewFormId,
      interviewType: d.interviewType,
      onlineInterviewAddress: d.onlineInterviewAddress,
      note: d?.note,
      isSendMailCouncil: d.isSendMailApplicant,
      isSendMailApplicant: d.isSendMailApplicant,
      councilIds: d.councilIds,
      bookingCalendarGroups: [
        {
          name: "person",
          interviewGroupType: 0,
          interviewTime: "",
          interviewDuration: "",
          bookingCalendarApplicants: d?.bookingCalendarGroups.map(
            (item, index) => {
              const dateTime = convertStoMs(
                convertDurationTimeToSeconds(
                  `${item?.bookingCalendarApplicants[index].interviewTime}:00`
                ) +
                  convertDurationTimeToSeconds(
                    toHHMMSS(
                      item?.bookingCalendarApplicants[index].interviewDuration
                    )
                  )
              );
              return {
                applicantId: d?.applicantId[index],
                interviewTime: new Date(
                  `${moment(d?.date[index]).format("YYYY-MM-DD")} ${dateTime}`
                ).toISOString(),
                interviewDuration: toHHMMSS(
                  item?.bookingCalendarApplicants[index].interviewDuration
                ),
              };
            }
          ),
        },
      ],
    };
    try {
      await addCalendar(body).unwrap();
      enqueueSnackbar("Đặt lịch thành công!", {
        autoHideDuration: 2000,
      });
      onClose();
      // location.reload()
    } catch (err) {
      enqueueSnackbar(errors.afterSubmit?.message, {
        autoHideDuration: 1000,
        variant: "error",
      });
    }
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        onOpen={setOpen(true)}
      >
        <BoxInnerStyle>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <List
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 0,
              }}
            >
              <Typography
                sx={{ p: "22px 24px", fontSize: 16, fontWeight: 600 }}
              >
                Đặt lịch phỏng vấn
              </Typography>
              <Button
                onClick={onClose}
                sx={{
                  "&:hover": {
                    background: "white",
                  },
                }}
              >
                <CloseIcon />
              </Button>
            </List>

            <Box>
              <Grid container border="1px solid #E7E9ED">
                <Grid
                  item
                  xs={12}
                  md={6}
                  borderRight="1px solid #E7E9ED"
                  sx={{ padding: "24px 24px 0 24px" }}
                >
                  <Box sx={{ width: "100%", typography: "body1", mb: 3 }}>
                    <PersonalInterview
                      option={options}
                      currentApplicantPipelineState={
                        currentApplicantPipelineState
                      }
                    />
                  </Box>
                </Grid>
                <Grid item xs={5} md={3} borderRight="1px solid #E7E9ED">
                  <ListCandidate applicantId={options?.applicantId} />
                </Grid>
                <Grid item xs={5} md={3}>
                  <InterviewCouncil />
                </Grid>
              </Grid>
            </Box>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 12,
                position: "fixed",
                bottom: 0,
                background: "#FDFDFD",
                width: "100%",
                padding: "16px 24px",
                border: "1px solid #EFF3F6",
              }}
            >
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
                sx={{ backgroundColor: "#1976D2", p: 1, fontSize: 14 }}
              >
                {"Lưu"}
              </LoadingButton>
              <div style={{ width: 8 }} />

              <LoadingButton
                variant="text"
                sx={{ color: "#455570" }}
                onClick={onClose}
              >
                {"Hủy"}
              </LoadingButton>
            </div>
          </FormProvider>
        </BoxInnerStyle>
      </Drawer>
    </div>
  );
};
export default CreateCalendar;
