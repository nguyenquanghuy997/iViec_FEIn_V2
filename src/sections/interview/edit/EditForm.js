import { useUpdateCalendarMutation } from "../InterviewSlice";
import PersonalInterview from "../components/PersonalInterview";
import { FormProvider } from "@/components/hook-form";
import { LoadingButton } from "@mui/lab";
import { Divider, Grid, Modal } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import React from "react";
import { useForm } from "react-hook-form";
import { ViewModel } from "@/utils/cssStyles";
import { Text, View } from "@/components/DesignSystem/FlexStyled";
import { ButtonDS } from "@/components/DesignSystem";
import Iconify from "@/components/Iconify";
import ListCandidate from "@/sections/interview/components/ListCandidate";
import InterviewCouncil from "@/sections/interview/components/InterviewCouncil";
import {useEffect} from "react";
import moment from "moment";
export const BoxInnerStyle = styled("Box")(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    width: "80%"
  },
  [theme.breakpoints.up("xl")]: {
    width: "1400px"
  }
}));

const EditForm  = ({item, open, setOpen }) => {
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
    defaultValues
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting }
  } = methods;


  const [updateCalendar] = useUpdateCalendarMutation();
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
    }

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
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!item?.id) return;
  }, [item]);

  return (
    <BoxInnerStyle>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Modal
          open={open}
          onClose={onClose}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <ViewModel sx={{ width: "unset", height: "100%", justifyContent: "space-between" }}>
            <View style={{ overflow: "hidden" }}>
              <View>
                <View
                  flexrow="true"
                  atcenter="center"
                  pv={12}
                  ph={24}
                  bgcolor={"#FDFDFD"}
                >
                  <Text flex="true" fontsize={16} fontweight={"600"}>
                    Chỉnh sửa lịch phỏng vấn
                  </Text>
                  <ButtonDS
                    type="submit"
                    sx={{
                      backgroundColor: "#fff",
                      boxShadow: "none",
                      ":hover": {
                        backgroundColor: "#EFF3F7"
                      },
                      textTransform: "none",
                      padding: "12px",
                      minWidth: "unset"
                    }}
                    onClick={onClose}
                    icon={
                      <Iconify
                        icon={"mi:close"}
                        width={20}
                        height={20}
                        color="#5C6A82"
                      />
                    }
                  />
                </View>
                <Divider />
              </View>
              <View style={{ minWidth: "600px", maxWidth: "1400px", overflow: "hidden" }}>
                <Grid container flexDirection={"row"} height={"100%"} flexWrap={"nowrap"} overflow={"hidden"}>
                  <Grid container sx={{ width: "600px", overflowY: "auto" }} p={3} height={"100%"} flexWrap={"nowrap"}
                        flexDirection={"column"}>
                    <PersonalInterview item={item} isEditmode={true}/>
                  </Grid>
                  <Divider orientation="vertical"/>
                  <Grid p={3} sx={{
                    minWidth: "400px"
                  }}>
                    <ListCandidate item={item} isEditmode={true}/>
                  </Grid>
                  <Divider orientation="vertical"/>
                  <Grid sx={{
                    minWidth: "400px",
                    overflowY: "auto"
                  }}>
                    <InterviewCouncil item={item} isEditmode={true}/>
                  </Grid>
                </Grid>
              </View>
            </View>

            <View
              flexrow="true"
              jcbetween="true"
              pv={12}
              ph={16}
              boxshadow={"inset 0px 1px 0px #EBECF4"}
            >
              <View flexrow="true">
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
              </View>
            </View>
          </ViewModel>
        </Modal>
      </FormProvider>
    </BoxInnerStyle>
  );
};
export default EditForm ;
