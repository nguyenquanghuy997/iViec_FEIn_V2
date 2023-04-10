import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useAddCalendarMutation, useGetDetailCalendarsQuery, useUpdateCalendarMutation } from "@/sections/interview";
import { useSnackbar } from "notistack";
import moment from "moment/moment";
import { FormProvider } from "@/components/hook-form";
import { CircularProgress, Divider, Grid, Modal } from "@mui/material";
import { ViewModel } from "@/utils/cssStyles";
import { Text, View } from "@/components/DesignSystem/FlexStyled";
import { ButtonDS } from "@/components/DesignSystem";
import Iconify from "@/components/Iconify";
import PersonalInterview from "@/sections/interview/components/PersonalInterview";
import ListCandidate from "@/sections/interview/components/ListCandidate";
import InterviewCouncil from "@/sections/interview/components/InterviewCouncil";
import { LoadingButton } from "@mui/lab";
import React, { useEffect } from "react";
import { convertDurationTimeToSeconds, convertStoMs, toHhMmSs } from "@/sections/interview/config";
import { yupResolver } from "@hookform/resolvers/yup";

const defaultValues = {
  name: undefined,
  recruitmentId: undefined,
  recruitmentPipelineStateId: undefined,
  interviewType: undefined,
  onlineInterviewAddress: undefined,
  note: undefined,
  councilIds: [],
  reviewFormId: undefined,
  isSendMailCouncil: false,
  isSendMailApplicant: false,
  bookingCalendarGroups: [{
    applicantId: undefined,
    interviewTime: undefined,
    interviewDuration: undefined,
  }],
};
export const FormCalendar = ({
  open,
  setOpen,
  data,
  options,
  currentApplicantPipelineState
}) => {
  const {enqueueSnackbar} = useSnackbar();
  const isEditMode = !!data?.id;
  const {data: DetailData = {}} = useGetDetailCalendarsQuery({BookingCalendarId: data?.id}, {skip: !data?.id});
  const isLoading = isEditMode && !DetailData?.id;
  const [addCalendar] = useAddCalendarMutation();
  const [updateCalendar] = useUpdateCalendarMutation();
  
  const Schema = Yup.object().shape({
    name: Yup.string().required("Chưa nhập tên buổi phỏng vấn"),
    recruitmentId: Yup.string().required(
      "Chưa nhập tên tiêu đề tin tuyển dụng"
    ),
    recruitmentPipelineStateId: Yup.string().required(),
    interviewType: Yup.number().transform((value) => (isNaN(value) ? undefined : value)).required("Nhập hình thức phỏng vấn"),
    onlineInterviewAddress: Yup.string().nullable(),
    note: Yup.string().nullable(),
    councilIds: Yup.array().required(),
    reviewFormId: Yup.string().required(),
    isSendMailCouncil: Yup.bool(),
    isSendMailApplicant: Yup.bool(),
    applicantIdArray: Yup.array().of(Yup.string().min(1)).required("Chọn ứng viên phỏng vấn"),
    bookingCalendarGroups: Yup.array().of(
      Yup.object().shape({
        name: Yup.string(),
        interviewGroupType: Yup.string().nullable(),
        interviewTime: Yup.string(),
        interviewDuration: Yup.string(),
        bookingCalendarApplicants: Yup.array().of(
          Yup.object().shape({
            applicantId: Yup.string(),
            interviewTime: Yup.string(),
            interviewDuration: Yup.string(),
          })
        ),
      })
    ),
  });
  
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(Schema),
  });
  
  const {
    reset,
    setValue,
    handleSubmit,
    formState: {isSubmitting},
  } = methods;
  
  useEffect(() => {
    if (!DetailData?.id) return;
    setValue("name", DetailData.name ?? undefined);
    setValue("recruitmentId", DetailData.recruitmentId ?? undefined);
    setValue("recruitmentPipelineStateId", DetailData.recruitmentPipelineStateId ?? undefined);
    setValue("interviewType", DetailData.interviewType ?? undefined);
    setValue("onlineInterviewAddress", DetailData.onlineInterviewAddress ?? undefined);
    setValue("note", DetailData.note ?? undefined);
    setValue("councilIds", DetailData.councilIds ?? undefined);
    setValue("reviewFormId", DetailData.reviewFormId ?? undefined);
    setValue("isSendMailCouncil", DetailData.isSendMailCouncil ?? undefined);
    setValue("isSendMailApplicant", DetailData.isSendMailApplicant ?? undefined);
    setValue("bookingCalendarGroups", DetailData.bookingCalendarGroups ?? undefined);
  }, [DetailData]);
  
  const pressSave = handleSubmit(async (d) => {
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
          interviewGroupType: "0",
          interviewTime: "",
          interviewDuration: "",
          bookingCalendarApplicants: d?.bookingCalendarGroups.map(
            (item, index) => {
              const dateTime = convertStoMs(
                convertDurationTimeToSeconds(
                  `${item?.bookingCalendarApplicants[index].interviewTime}:00`
                ) +
                convertDurationTimeToSeconds(
                  toHhMmSs(
                    item?.bookingCalendarApplicants[index].interviewDuration
                  )
                )
              );
              return {
                applicantId: d?.applicantIdArray[index],
                interviewTime: new Date(
                  `${moment(d?.date[index]).format("YYYY-MM-DD")} ${dateTime}`
                ).toISOString(),
                interviewDuration: toHhMmSs(
                  item?.bookingCalendarApplicants[index].interviewDuration
                ),
              };
            }
          ),
        },
      ],
    };
    if (isEditMode) {
      return await updateCalendar(body).unwrap()
      .then(() => {
        enqueueSnackbar("Thực hiện thành công!", {
          autoHideDuration: 2000,
        });
        onClose();
      }).catch(() => {
        enqueueSnackbar("Thực hiện thất bại!", {
          autoHideDuration: 2000,
          variant: "error",
        })
      });
    }
    
    await addCalendar(body).unwrap()
    .then(() => {
      enqueueSnackbar("Thực hiện thành công!", {
        autoHideDuration: 2000,
      });
      onClose();
    }).catch(() => {
      enqueueSnackbar("Thực hiện thất bại!", {
        autoHideDuration: 2000,
        variant: "error",
      })
    });
  });
  
  const onClose = () => {
    reset();
    setOpen(false);
  };
  
  return (
    <FormProvider methods={methods}>
      <Modal
        open={open}
        onClose={onClose}
        sx={{display: "flex", justifyContent: "flex-end"}}
      >
        <ViewModel sx={{width: "unset", height: "100%", justifyContent: "space-between"}}>
          {isLoading ?
            <View flex="true" contentcenter="true" style={{minWidth: "600px"}}>
              <CircularProgress/>
            </View>
            :
            <View style={{overflow: "hidden"}}>
              <View>
                <View
                  flexrow="true"
                  atcenter="center"
                  pv={12}
                  ph={24}
                  bgcolor={"#FDFDFD"}
                >
                  <Text flex="true" fontsize={16} fontweight={"600"}>
                    {isEditMode
                      ? 'Chỉnh sửa lịch phỏng vấn'
                      : 'Đặt lịch phỏng vấn'}
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
                <Divider/>
              </View>
              <View style={{minWidth: "600px", maxWidth: "1400px", overflow: "hidden"}}>
                <Grid container flexDirection={"row"} height={"100%"} flexWrap={"nowrap"} overflow={"hidden"}>
                  <Grid container sx={{width: "600px", overflowY: "auto"}} p={3} height={"100%"} flexWrap={"nowrap"}
                        flexDirection={"column"}>
                    <PersonalInterview
                      item={DetailData}
                      option={options}
                      currentApplicantPipelineState={
                        currentApplicantPipelineState
                      }
                    />
                  </Grid>
                  <Divider orientation="vertical"/>
                  <Grid p={3} sx={{
                    minWidth: "400px"
                  }}>
                    <ListCandidate item={DetailData} applicantId={options?.applicantId}/>
                  </Grid>
                  <Divider orientation="vertical"/>
                  <Grid sx={{
                    minWidth: "400px",
                    overflowY: "auto"
                  }}>
                    <InterviewCouncil/>
                  </Grid>
                </Grid>
              </View>
            </View>
          }
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
                onClick={pressSave}
                sx={{backgroundColor: "#1976D2", p: 1, fontSize: 14}}
              >
                {"Lưu"}
              </LoadingButton>
              <div style={{width: 8}}/>
              
              <LoadingButton
                variant="text"
                sx={{color: "#455570"}}
                onClick={onClose}
              >
                {"Hủy"}
              </LoadingButton>
            </View>
          </View>
        </ViewModel>
      </Modal>
    </FormProvider>
  )
};