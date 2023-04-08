import CloseIcon from "../../../assets/CloseIcon";
import { useUpdateCalendarMutation } from "../InterviewSlice";
import InterviewCouncil from "../components/InterviewCouncil";
import ListCandidate from "../components/ListCandidate";
import PersonalInterview from "../components/PersonalInterview";
import { FormProvider } from "@/components/hook-form";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Drawer, Grid, List, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { get } from "lodash";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export const BoxInnerStyle = styled("Box")(({theme}) => ({
  [theme.breakpoints.up("sm")]: {
    width: "1000px",
  },
  [theme.breakpoints.up("xl")]: {
    width: "1400px",
  },
}));

const EditForm = ({ item, open, onClose, onOpen }) => {
  // const { data: DetailData } = useGetDetailCalendarsQuery({
  //   BookingCalendarId: item?.id,
  // });
  const defaultValues = { ...item };
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
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const [updateCalendar] = useUpdateCalendarMutation();
  const { enqueueSnackbar } = useSnackbar();

  // const toHHMMSS = (num) => {
  //   var sec_num = parseInt(num * 60, 10);
  //   var hours = Math.floor(sec_num / 3600);
  //   var minutes = Math.floor((sec_num - hours * 3600) / 60);
  //   var seconds = sec_num - hours * 3600 - minutes * 60;
  //
  //   if (hours < 10) {
  //     hours = "0" + hours;
  //   }
  //   if (minutes < 10) {
  //     minutes = "0" + minutes;
  //   }
  //   if (seconds < 10) {
  //     seconds = "0" + seconds;
  //   }
  //   return hours + ":" + minutes + ":" + seconds;
  // };
  //
  // const convertDurationTimeToSeconds = (time) => {
  //   const splitToString = time.split(":");
  //   return (
  //     +splitToString[0] * 60 * 60 + +splitToString[1] * 60 + +splitToString[2]
  //   );
  // };
  //
  // const convertStoMs = (s) => {
  //   const totalMinutes = Math.floor(s / 60);
  //   const seconds = s % 60;
  //   const newSeconds = seconds < 10 ? "0" + seconds : seconds;
  //   const hours = Math.floor(totalMinutes / 60);
  //   const minutes = totalMinutes % 60;
  //   return `${hours}:${minutes}:${newSeconds}`;
  // };
  const onSubmit = async (d) => {
    const res = {
      id: item?.id,
      name: d.name,
      recruitmentId: d.recruitmentId,
      recruitmentPipelineStateId: d.recruitmentPipelineStateId,
      reviewFormId: d.reviewFormId,
      interviewType: d.interviewType,
      onlineInterviewAddress: d.onlineInterviewAddress,
      note: d?.note,
      isSendMailCouncil: d.isSendMailApplicant,
      isSendMailApplicant: d.isSendMailApplicant,
      councilIds: d.bookingCalendarCouncils.map((item) => item?.id),
      // bookingCalendarGroups: [
      //   {
      //     name: "person",
      //     interviewGroupType: 0,
      //     interviewTime: "",
      //     interviewDuration: "",
      //     bookingCalendarApplicants:[ d?.bookingCalendarGroups.map((item) => {
      //       const dateTime = convertStoMs(
      //         convertDurationTimeToSeconds(
      //           `${d?.bookingCalendarApplicants[item]?.interviewTime}:00`
      //         ) +
      //           convertDurationTimeToSeconds(
      //             toHHMMSS(
      //               d?.bookingCalendarApplicants[item]?.interviewDuration
      //             )
      //           )
      //       );

      //       return {
      //         applicantId: item,
      //         interviewTime: new Date(
      //           `${moment(d?.date).format("YYYY-MM-DD")} ${dateTime}`
      //         ).toISOString(),
      //         interviewDuration: toHHMMSS(
      //           d?.bookingCalendarApplicants[item].interviewDuration
      //         ),
      //       };
      //     })],
      //   },
      // ],
      bookingCalendarGroups: item?.bookingCalendarGroups.map((group) => {
        return {
          name: "person",
          interviewGroupType: 0,
          interviewTime: "",
          interviewDuration: "",
          bookingCalendarApplicants: group?.bookingCalendarGroupApplicants.map(
            (item) => {
              return {
                applicantId: item?.id,
                interviewTime: item?.interviewTime,
                interviewDuration: item?.interviewDuration,
              };
            }
          ),
          // d?.bookingCalendarGroups.map((item) => {
          //   const dateTime = convertStoMs(
          //     convertDurationTimeToSeconds(
          //       `${d?.bookingCalendarApplicants[item]?.interviewTime}:00`
          //     ) +
          //       convertDurationTimeToSeconds(
          //         toHHMMSS(
          //           d?.bookingCalendarApplicants[item]?.interviewDuration
          //         )
          //       )
          //   );

          //   return {
          //     applicantId: item,
          //     interviewTime: new Date(
          //       `${moment(d?.date).format("YYYY-MM-DD")} ${dateTime}`
          //     ).toISOString(),
          //     interviewDuration: toHHMMSS(
          //       d?.bookingCalendarApplicants[item].interviewDuration
          //     ),
          //   };
          // }),
        };
      }),
    };

    try {
      await updateCalendar(res).unwrap();
      enqueueSnackbar("Chỉnh sửa lịch thành công!", {
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
  useEffect(() => {
    if (!item?.id) return;
    setValue(
      "bookingCalendarGroups",
      get(item, "bookingCalendarGroups.bookingCalendarApplicants")
    );
    // setValue("recruitmentId", body.recruitmentId);
    // setValue("recruitmentPipelineStateId", body.recruitmentPipelineStateId);
    // setValue("onlineInterviewAddress", body.onlineInterviewAddress);
    // setValue("note", body.note);
    // setValue("councilIds", body.councilIds);
    // setValue("reviewFormId", body.reviewFormId);
    // setValue("isSendMailCouncil", body.isSendMailCouncil);
    // setValue("isSendMailApplicant", body.isSendMailApplicant);
    // setValue("bookingCalendarGroups", body.bookingCalendarGroups);
  }, [item]);

  const list = () => (
    <BoxInnerStyle>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <List
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 0,
          }}
        >
          <Typography sx={{ p: "22px 24px", fontSize: 16, fontWeight: 600 }}>
            Chỉnh sửa lịch phỏng vấn
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
              sx={{padding: "24px 24px 0 24px"}}
            >
              <Box sx={{width: "100%", typography: "body1", mb: 3}}>
                <PersonalInterview
                  item={defaultValues}
                />
              </Box>
            </Grid>
            <Grid item xs={5} md={3} borderRight="1px solid #E7E9ED">
              <ListCandidate
                isEditmode={true}
              />
            </Grid>
            <Grid item xs={5} md={3}>
              <InterviewCouncil
                isEditmode={true}
              />
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
            sx={{backgroundColor: "#1976D2", p: 1, fontSize: 14}}
          >
            {"Lưu"}
          </LoadingButton>

          <LoadingButton
            variant="text"
            sx={{color: "#455570"}}
            onClick={onClose}
          >
            {"Hủy"}
          </LoadingButton>
        </div>
      </FormProvider>
    </BoxInnerStyle>
  );

  return (
    <div>
      <Drawer anchor="right" open={open} onClose={onClose} onOpen={onOpen}>
        {list("right")}
      </Drawer>
    </div>
  );
};
export default EditForm;
