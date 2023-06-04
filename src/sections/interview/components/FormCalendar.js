import { ButtonDS } from "@/components/DesignSystem";
import { Text, View } from "@/components/DesignSystem/FlexStyled";
import Iconify from "@/components/Iconify";
import { drawerPaperStyle } from "@/components/drawer-edit-form/styles";
import { FormProvider } from "@/components/hook-form";
import { dispatch } from "@/redux/store";
import {
  calendarServiceApi,
  useAddCalendarMutation,
  useGetDetailCalendarsQuery,
  useUpdateCalendarMutation,
} from "@/sections/interview";
import InterviewCouncil from "@/sections/interview/components/InterviewCouncil";
import ListCandidate from "@/sections/interview/components/ListCandidate";
import PersonalInterview from "@/sections/interview/components/PersonalInterview";
import {
  convertDataGet,
  convertDurationTimeToSeconds,
  convertStoMs, timeToMinutes,
  toHhMmSs,
} from "@/sections/interview/config";
import { ViewModel } from "@/utils/cssStyles";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { CircularProgress, Divider, Drawer, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import moment from "moment";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const defaultValues = {
  id: undefined,
  name: undefined,
  recruitmentId: undefined,
  recruitmentPipelineStateId: undefined,
  interviewType: undefined,
  offlineInterviewAddress: undefined,
  note: undefined,
  councilIds: [],
  reviewFormId: undefined,
  isSendMailCouncil: false,
  isSendMailApplicant: false,
  bookingCalendarGroups: [
    {
      applicantId: undefined,
      interviewTime: undefined,
      interviewDuration: undefined,
      bookingCalendarApplicants: [
        {
          date: null,
        },
      ],
    },
  ],
};
export const FormCalendar = ({
  open,
  setOpen,
  data,
  options,
  optionsFromCruit,
  item,
  currentApplicantPipelineState,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const isEditMode = !!data?.id;
  const { data: DetailData = {} } = useGetDetailCalendarsQuery(
    { BookingCalendarId: data?.id },
    { skip: !data?.id }
  );
  const isLoading = isEditMode && !DetailData?.id;
  const [addCalendar] = useAddCalendarMutation();
  const [updateCalendar] = useUpdateCalendarMutation();

  const Schema = Yup.object().shape({
    id: Yup.string().nullable(),
    name: Yup.string().required("Chưa nhập tên buổi phỏng vấn"),
    recruitmentId: Yup.string().required(
      "Chưa nhập tên tiêu đề tin tuyển dụng"
    ),
    recruitmentPipelineStateId: Yup.string().required(
      "Chưa chọn bước phỏng vấn"
    ),
    interviewType: Yup.number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .required("Chưa chọn hình thức phỏng vấn"),
    offlineInterviewAddress: Yup.string()
      .nullable()
      .when("interviewType", {
        is: (interviewType) => interviewType === 1,
        then: Yup.string().required("Chưa nhập địa điểm phỏng vấn"),
      }),
    note: Yup.string().nullable(),
    councilIds: Yup.array().required(),
    reviewFormId: Yup.string().required("Chưa nhập mẫu đánh giá"),
    isSendMailCouncil: Yup.bool(),
    isSendMailApplicant: Yup.bool(),
    applicantIdArray: Yup.array()
      .of(Yup.string().min(1))
      .required("Chọn ứng viên phỏng vấn"),
    bookingCalendarGroups: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().nullable(),
        interviewGroupType: Yup.string().nullable(),
        interviewTime: Yup.string().nullable(),
        interviewDuration: Yup.string().nullable(),
        bookingCalendarApplicants: Yup.array().of(
          Yup.object().shape({
            applicantId: Yup.string(),
            date: Yup.string().nullable().required("Chưa chọn ngày phỏng vấn"),
            interviewTime: Yup.string()
              .nullable()
              .required("Chưa chọn giờ phỏng vấn")
              .when('date', (date, schema) => {
                return (new Date(date)).setHours(0,0,0,0) === (new Date).setHours(0,0,0,0) ?
                  schema.test('interviewTime',
                    'Cần lớn hơn thời gian hiện tại',
                    (value) => {
                    return timeToMinutes(value) > timeToMinutes((new moment).format("HH:mm"))
                    }
                  ) : schema;
              }),
            interviewDuration: Yup.number()
              .transform((value) => (isNaN(value) ? undefined : value))
              .min(1, "Thời lượng phải lớn hơn 0")
              .max(120, "Thời lượng không quá 120 phút")
              .required("Chưa chọn thời lượng phỏng vấn"),
          })
        ),
      })
    ),
  });
  
  const methods = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(Schema),
  });
  const theme = useTheme();
  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;
  
  useEffect(() => {
    if (!DetailData?.id) return;
    setValue("id", DetailData.id);
    setValue("name", DetailData.name ?? undefined);
    setValue("recruitmentId", DetailData.recruitmentId ?? undefined);
    setValue(
      "recruitmentPipelineStateId",
      DetailData.recruitmentPipelineStateId ?? undefined
    );
    setValue("interviewType", DetailData.interviewType ?? undefined);
    setValue(
      "offlineInterviewAddress",
      DetailData.offlineInterviewAddress ?? undefined
    );
    setValue("note", DetailData.note ?? undefined);
    setValue("reviewFormId", DetailData.reviewFormId ?? undefined);
    setValue("isSendMailCouncil", DetailData.isSendMailCouncil ?? undefined);
    setValue(
      "isSendMailApplicant",
      DetailData.isSendMailApplicant ?? undefined
    );
    setValue(
      "bookingCalendarGroups",
      convertDataGet(DetailData.bookingCalendarGroups) ?? undefined
    );

    let arrayApplicant = [];
    DetailData.bookingCalendarGroups.forEach((item) => {
      item?.bookingCalendarApplicants.forEach((itemData) => {
        arrayApplicant.push(itemData.applicant.id);
      });
    });
    setValue("applicantIdArray", arrayApplicant);

    let arrayCouncil = [];
    DetailData.bookingCalendarCouncils.forEach((item) => {
      arrayCouncil.push(item.id);
    });
    setValue("councilIds", arrayCouncil);
  }, [DetailData]);
  
  const pressSave = handleSubmit(async (d) => {
    const body = {
      id: d.id,
      name: d.name,
      recruitmentId: d.recruitmentId,
      recruitmentPipelineStateId: d.recruitmentPipelineStateId,
      reviewFormId: d.reviewFormId,
      interviewType: d.interviewType,
      offlineInterviewAddress: d.offlineInterviewAddress,
      note: d?.note,
      isSendMailCouncil: d.isSendMailApplicant,
      isSendMailApplicant: d.isSendMailApplicant,
      councilIds: d.councilIds,
      bookingCalendarGroups: [
        {
          interviewGroupType: "0",
          bookingCalendarApplicants:
            d?.bookingCalendarGroups[0].bookingCalendarApplicants.map(
              (item) => {
                const dateTime = convertStoMs(
                  convertDurationTimeToSeconds(`${item?.interviewTime}:00`)
                );
                item.interviewTime = new Date(
                  `${moment(item.date).format("YYYY-MM-DD")} ${dateTime}`
                ).toISOString();
                item.interviewDuration = toHhMmSs(item.interviewDuration);
                return item;
              }
            ),
        },
      ],
    };
    if (isEditMode) {
      return await updateCalendar(body)
        .unwrap()
        .then(() => {
          enqueueSnackbar("Thực hiện thành công!", {
            autoHideDuration: 2000,
          });
          onClose();
        })
        .catch(() => {
          enqueueSnackbar("Thực hiện thất bại!", {
            autoHideDuration: 2000,
            variant: "error",
          });
        });
    }

    await addCalendar(body)
      .unwrap()
      .then(() => {
        enqueueSnackbar("Thực hiện thành công!", {
          autoHideDuration: 2000,
        });
        dispatch(
          calendarServiceApi.util.invalidateTags([
            { type: "BookCalendar", id: "List" },
          ])
        );
        onClose();
      })
      .catch(() => {
        enqueueSnackbar("Thực hiện thất bại!", {
          autoHideDuration: 2000,
          variant: "error",
        });
      });
  });

  const onClose = () => {
    reset();
    setOpen(false);
  };

  return (
    <FormProvider methods={methods}>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          ".MuiModal-backdrop": { background: "rgba(9, 30, 66, 0.25)" },
        }}
        PaperProps={{
          sx: {
            ...drawerPaperStyle({ ...theme, width: 1400 }),
            height: "calc(100vh)",
            marginTop: 0,
            background: "transparent",
          },
        }}
      >
        <ViewModel sx={{ width: "unset", justifyContent: "space-between", height: '100vh' }}>
          <View height={'calc(100vh - 64px)'}>
          {/* header */}
            <View
              flexrow
              atcenter
              pv={12}
              ph={24}
              bgcolor={theme.palette.common.white}
            >
              <Text flex="true" fontsize={16} fontweight={"600"}>
                {isEditMode
                  ? "Chỉnh sửa lịch phỏng vấn"
                  : "Đặt lịch phỏng vấn"}
              </Text>
              <ButtonDS
                type="submit"
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  boxShadow: "none",
                  ":hover": {
                    backgroundColor: "#EFF3F7",
                  },
                  textTransform: "none",
                  padding: "12px",
                  minWidth: "unset",
                }}
                onClick={onClose}
                icon={
                  <Iconify
                    icon={"mi:close"}
                    width={20}
                    height={20}
                    color={theme.palette.common.borderObject}
                  />
                }
              />
            </View>
            <Divider />
            {/* content */}
            <View style={{
              minWidth: "600px",
              overflow: "hidden",
              flex: '1 1 auto'
            }}>
              {isLoading ? (
                <View flex contentcenter>
                  <CircularProgress />
                </View>
              ) : (
                <>
                  {/* body */}
                  <View
                    flex
                    style={{
                      maxWidth: "1400px",
                      overflow: "hidden",
                    }}
                  >
                    <Grid
                      container
                      flexDirection={"row"}
                      height={"100%"}
                      flexWrap={"nowrap"}
                      overflow={"hidden"}
                    >
                      <Grid
                        container
                        sx={{ width: "600px", overflowY: "auto" }}
                        p={3}
                        height={"100%"}
                        flexWrap={"nowrap"}
                        flexDirection={"column"}
                      >
                        <PersonalInterview
                          detailCandidate={item}
                          item={DetailData}
                          option={options}
                          optionsFromCruit={optionsFromCruit}
                          currentApplicantPipelineState={
                            currentApplicantPipelineState
                          }
                        />
                      </Grid>
                      <Divider orientation="vertical" />

                      <Grid
                        p={3}
                        sx={{
                          minWidth: "400px",
                          overflow: "auto"
                        }}
                      >
                        <ListCandidate
                          detailCandidate={item}
                          option={options}
                          isEditMode={isEditMode}
                          applicantId={options?.applicantId}
                          error={errors}
                        />
                      </Grid>
                      <Divider orientation="vertical" />
                      <Grid
                        sx={{
                          minWidth: "400px",
                          overflowY: "auto",
                        }}
                      >
                        <InterviewCouncil />
                      </Grid>
                    </Grid>
                  </View>
                </>
              )}
            </View>

            {/* footer */}
            <View
              flexrow
              jcbetween
              pv={12}
              ph={16}
              boxshadow={"inset 0px 1px 0px #EBECF4"}
            >
              <View flexrow>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                  onClick={pressSave}
                  sx={{
                    backgroundColor: theme.palette.common.blue700,
                    p: "8px 12px",
                    fontSize: 14,
                    fontWeight: 600,
                    minWidth: "unset"
                  }}
                >
                  {"Lưu"}
                </LoadingButton>
                <div style={{ width: 8 }} />

                <LoadingButton
                  variant="text"
                  sx={{ color: theme.palette.common.neutral700 }}
                  onClick={onClose}
                >
                  {"Hủy"}
                </LoadingButton>
              </View>
            </View>
          </View>

        </ViewModel>
      </Drawer>
    </FormProvider>
  );
};
