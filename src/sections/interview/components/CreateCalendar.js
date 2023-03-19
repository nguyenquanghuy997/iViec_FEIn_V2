import CloseIcon from "../../../assets/CloseIcon";
// import { useAddCalendarMutation } from "../InterviewSlice";
import { FormInterview } from "./FormInterview";
import InterviewCouncil from "./InterviewCouncil";
import ListCandidate from "./ListCandidate";
import { FormProvider } from "@/components/hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Typography, Grid, } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
// import * as Yup from "yup";
import {useFieldArray, useForm} from "react-hook-form";
// import {useSnackbar} from "notistack";


const CreateCalendar = ({ open, onClose, onOpen }) => {
  const [values, setValues] = useState("1");
  const handleChange = (event, newValue) => {
    setValues(newValue);
  };

  // const [addCalendar] = useAddCalendarMutation();
  const BoxInnerStyle = styled("Box")(({ theme }) => ({
    [theme.breakpoints.up("xl")]: {
      width: "1500px",
    },
    [theme.breakpoints.up("2k")]: {
      width: "100%",
    },
  }));

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
    bookingCalendarGroups: [
      {
        name: "",
        interviewGroupType: 0,
        interviewTime: "",
        interviewDuration: "",
        applicantIds: [],
      },
    ],
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
    // reset,
    control,
    // setError,
    // setValue,
    handleSubmit,
    formState: {  },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "bookingCalendarGroups",
  });

  // const pressHide = () => {
  //   setData(null);
  //   setShow(false);
  // };

  // const { enqueueSnackbar } = useSnackbar();
  // const onSubmit = async (d) => {
  //   try {
  //     const body = {
  //       name: d.name,
  //       recruitmentId: d.recruitmentId,
  //       recruitmentPipelineStateId: d.recruitmentPipelineStateId,
  //       reviewFormId: d.reviewFormId,
  //       interviewType: type,
  //       onlineInterviewAddress: d.onlineInterviewAddress,
  //       note: d.note,
  //       isSendMailCouncil: d.isSendMailApplicant,
  //       isSendMailApplicant: d.isSendMailApplicant,
  //       councilIds: d.councilIds,
  //       bookingCalendarGroups: d.bookingCalendarGroups,
  //     };
  //     // body = formatDataPush(body);
  //     await addCalendar(body).unwrap();
  //     enqueueSnackbar("Thực hiện thành công!", {
  //       autoHideDuration: 1000,
  //     });
  //     pressHide();
  //   } catch (error) {
  //     setError("afterSubmit", { ...error });
  //   }
  // };

  // const handleClearField = (field) => {
  //   if (!field) return;
  //   else methods.resetField(field);
  // };

  // useEffect(() => {
  //   if (!data?.id) return;
  //   let body = preview;
  //   body = formatDataGet(body);
  //   setValue("name", body.name);
  //   setValue("recruitmentId", body.recruitmentId);
  //   setValue("recruitmentPipelineStateId", body.recruitmentPipelineStateId);
  //   setValue("onlineInterviewAddress", body.onlineInterviewAddress);
  //   setValue("note", body.note);
  //   setValue("councilIds", body.councilIds);
  //   setValue("reviewFormId", body.reviewFormId);
  //   setValue("isSendMailCouncil", body.isSendMailCouncil);
  //   setValue("isSendMailApplicant", body.isSendMailApplicant);
  //   setValue("bookingCalendarGroups", body.bookingCalendarGroups);
  // }, [isEditMode, data, preview]);

  const list = () => (
    <BoxInnerStyle>
      <FormProvider methods={methods} onSubmit={handleSubmit((item) => console.log('huih',item))}>
        <List
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 0,
          }}
        >
          <Typography sx={{ p: "22px 24px", fontSize: 16, fontWeight: 600 }}>
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
            <Grid item xs={12} md={6} borderRight="1px solid #E7E9ED">
              <FormInterview handleChange={handleChange} value={values} />
            </Grid>
            <Grid item xs={5} md={3} borderRight="1px solid #E7E9ED">
              <ListCandidate value={values} action={{fields, append, remove}} defaultValues={defaultValues}/>
            </Grid>
            <Grid item xs={5} md={3}>
              <InterviewCouncil value={values} />
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
            // loading={isSubmitting}
            sx={{ backgroundColor: "#1976D2", p: 1, fontSize: 14 }}
          >
            {"Lưu"}
          </LoadingButton>
          <div style={{ width: 8 }} />

          <LoadingButton variant="text" sx={{ color: "#455570" }}>
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
export default CreateCalendar;
