import { convertDurationTimeToSeconds, convertStoMs } from "../config";
import { AvatarDS, ButtonDS } from "@/components/DesignSystem";
import { Text, View } from "@/components/DesignSystem/FlexStyled";
import SvgIcon from "@/components/SvgIcon";
import { BOOKING_CALENDAR_PROCCESS_STATUS, DOMAIN_SERVER_API } from "@/config";
import useAuth from "@/hooks/useAuth";
import { BoxFlex } from "@/sections/emailform/style";
import {
  useCancelBookingCalendarMutation,
  useGetDetailCalendarsQuery,
} from "@/sections/interview/InterviewSlice";
import { FormCalendar } from "@/sections/interview/components/FormCalendar";
import {
  ApplicantCalendarState,
  BookingCalendarProcessStatus,
} from "@/utils/enum";
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import moment from "moment";
import { useSnackbar } from "notistack";
import { forwardRef, useState } from "react";

const DetailDialog = forwardRef(({ item, title, open, onClose }, ref) => {
  const { data: DetailData } = useGetDetailCalendarsQuery(
    { BookingCalendarId: item?.id, DateSelector: item?.startTime },
    { skip: !item?.id || !item?.startTime }
  );
  // const DetailData = [];
  const theme = useTheme();
  const [openForm, setOpenForm] = useState(false);
  const [cancelBookingCalendar] = useCancelBookingCalendarMutation();
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = async (id) => {
    try {
      await cancelBookingCalendar(id).unwrap();
      enqueueSnackbar("Hủy lịch thành công!", {
        autoHideDuration: 2000,
      });
      onClose();
    } catch (err) {
      enqueueSnackbar("Hủy lịch thất bại!", {
        autoHideDuration: 1000,
        variant: "error",
      });
      onClose();
    }
  };
  const renderText = (title, content) => {
    return (
      <View flexrow mt={20}>
        <span
          style={{
            width: "140px",
            height: "24px",
            fontSize: 13,
            fontWeight: 500,
            // color: theme.palette.common.neutral700,
            color: "#5C6A82",
            fontFamily: "Inter",
            fontStyle: "normal",
            lineHeight: "20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {title}
        </span>

        <span
          style={{
            fontSize: 13,
            fontWeight: 500,
            // color: theme.palette.common.neutral700,
            color: "#172B4D",
            width: "608px",
            height: "24px",
            fontFamily: "Inter",
            fontStyle: "normal",
            lineHeight: "20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {content}
        </span>
      </View>
    );
  };

  const time =
    DetailData?.bookingCalendarGroups?.[0]?.bookingCalendarApplicants?.map(
      (item) => item?.interviewTime
    );
  const duration =
    DetailData?.bookingCalendarGroups?.[0]?.bookingCalendarApplicants?.map(
      (item) => item?.interviewDuration
    );

  const startTime = convertStoMs(
    convertDurationTimeToSeconds(moment(time?.[0]).format("HH:mm:ss")) +
      convertDurationTimeToSeconds(duration?.[0])
  );

  const { user } = useAuth();
  const getLink = async (id) => {
    return `${window.location.origin}/phong-van.html?DisplayName=${user?.firstName}&&Email=${user?.email}&&Role=1&&RoomName=${id}`;
  };

  const copyToClipboard = async (id) => {
    navigator.clipboard.writeText(await getLink(id));
    enqueueSnackbar("Đã sao chép link cuộc họp");
  };
  return (
    <>
      <Modal
        open={open}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          ".MuiModal-backdrop": { background: "rgba(9, 30, 66, 0.25)" },
        }}
        onBackdropClick={onClose}
        ref={ref}
      >
        <View
          hidden
          width={800}
          height={820}
          borderradius={0}
          bgcolor={theme.palette.common.white}
        >
          {/* header */}
          <View flexrow="true" atcenter="true" pv={14} pl={24} pr={16}>
            <Text flex fontsize={16} fontweight={"600"}>
              {title}
            </Text>
            <IconButton onClick={onClose}>
              <SvgIcon>
                {
                  '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_9044_182347)"> <path d="M9.99999 8.82178L14.125 4.69678L15.3033 5.87511L11.1783 10.0001L15.3033 14.1251L14.125 15.3034L9.99999 11.1784L5.87499 15.3034L4.69666 14.1251L8.82166 10.0001L4.69666 5.87511L5.87499 4.69678L9.99999 8.82178Z" fill="#455570"/> </g> <defs> <clipPath id="clip0_9044_182347"> <rect width="20" height="20" fill="white"/> </clipPath> </defs> </svg>'
                }
              </SvgIcon>
            </IconButton>
          </View>
          <Divider />

          <View
            style={{
              overflowY: "auto",
              height: "684px",
              padding: 24,
            }}
          >
            <Text fontsize={16} fontweight={600}>
              {item?.name}
            </Text>

            {renderText(
              "Tin tuyển dụng:",
              DetailData?.recruitmentName || "Không có"
            )}
            {renderText(
              "Hình thức phỏng vấn:",
              DetailData?.interviewType === 0 ? "Online" : "Trực tiếp"
            )}
            {renderText(
              "Thời gian phỏng vấn:",
              `${moment(time?.[0]).format("HH:mm")} - ${startTime.substring(
                startTime.length - 3,
                startTime.length - 8
              )} Ngày ${moment(time?.[0]).format("DD/MM/yyyy")}`
            )}
            {renderText(
              "Loại phỏng vấn:",
              DetailData?.bookingCalendarGroups.map(
                (item) => item?.interviewGroupType
              ) == 0
                ? "Phỏng vấn cá nhân"
                : "Phỏng vấn nhóm"
            )}
            {renderText(
              "Số lượng ứng viên:",
              DetailData?.bookingCalendarGroups[0]?.bookingCalendarApplicants
                .length
            )}
            {renderText(
              "Trạng thái:",
              BookingCalendarProcessStatus(
                DetailData?.bookingCalendarProcessStatus
              )
            )}
            {renderText("Lý do hủy:", DetailData?.removeReason || "Không có")}
            <Divider style={{ marginTop: "18px" }} />

            <List sx={{ pt: "16px", pb: "16px" }}>
              <Typography
                sx={{
                  color: theme.palette.common.neutral700,
                  fontSize: 13,
                  fontWeight: 600,
                  mb: "8px",
                }}
              >
                Danh sách ứng viên
              </Typography>

              {DetailData?.bookingCalendarGroups[0]?.bookingCalendarApplicants.map(
                (item, index) => (
                  <ListItem
                    sx={{
                      bgcolor:
                        index % 2 === 0
                          ? "white"
                          : theme.palette.common.bgrMaster,
                    }}
                    key={index}
                  >
                    <ListItemAvatar style={{ width: "40px", height: "40px" }}>
                      <AvatarDS
                        alt=""
                        src={
                          DOMAIN_SERVER_API +
                          `/Image/GetImage?imagePath=${item?.applicant?.portraitImage}`
                        }
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "11px",
                          backgroundColor: "#FFFFFF",
                        }}
                      />
                    </ListItemAvatar>
                    <ListItemText sx={{ width: "30%" }}>
                      <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                        {item?.applicant?.fullName}
                      </Typography>
                      <Typography sx={{ fontSize: 12, fontWeight: 400 }}>
                        {item?.applicant?.phoneNumber}
                      </Typography>
                    </ListItemText>
                    <ListItemText>
                      <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                        {moment(time?.[index]).format("HH:mm")} - {startTime}
                      </Typography>
                    </ListItemText>
                    <ListItemText
                      sx={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                        {ApplicantCalendarState(item?.applicantInterviewState)}
                      </Typography>
                    </ListItemText>
                  </ListItem>
                )
              )}
            </List>
            <Divider />

            <List sx={{ pt: "16px" }}>
              <Typography
                sx={{
                  color: theme.palette.common.neutral700,
                  fontSize: 13,
                  fontWeight: 600,
                  mb: "8px",
                }}
              >
                Hội đồng phỏng vấn
              </Typography>
              {DetailData?.bookingCalendarCouncils.map((item, index) => (
                <ListItem
                  sx={{
                    bgcolor:
                      index % 2 === 0
                        ? "white"
                        : theme.palette.common.bgrMaster,
                  }}
                >
                  <ListItemAvatar style={{ width: "40px", height: "40px" }}>
                    <img
                      alt=""
                      src="https://i.pinimg.com/236x/b0/52/90/b0529099591d1f7f70732fa5e4f60e83.jpg"
                      style={{ width: "40px", height: "40px" }}
                    />
                  </ListItemAvatar>
                  <ListItemText>
                    <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                      {item?.name}
                    </Typography>
                    <Typography sx={{ fontSize: 12, fontWeight: 400 }}>
                      {item?.email}
                    </Typography>
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </View>
          <Divider />

          <View pv={16} ph={24} flexrow="row" jcbetween="true">
            <BoxFlex justifyContent="start">
              <ButtonDS
                tittle={"Chia sẻ link"}
                type="button"
                onClick={() => copyToClipboard(item?.id)}
                sx={{
                  color: theme.palette.common.neutral700,
                  fontWeight: 500,
                  backgroundColor: theme.palette.common.neutral50,
                  boxShadow: "none",
                  ":hover": {
                    backgroundColor: theme.palette.common.neutral100,
                  },
                  textTransform: "none",
                }}
                icon={
                  <View mr={8}>
                    <SvgIcon>
                      {
                        '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_9044_181403)"> <path d="M11.7713 9.88542L10.8287 8.94275L11.7713 8.00008C12.019 7.75245 12.2154 7.45848 12.3494 7.13493C12.4834 6.81139 12.5524 6.46462 12.5524 6.11442C12.5524 5.76422 12.4834 5.41744 12.3494 5.0939C12.2154 4.77036 12.019 4.47638 11.7713 4.22875C11.5237 3.98112 11.2297 3.78469 10.9062 3.65068C10.5826 3.51666 10.2359 3.44768 9.88568 3.44768C9.53547 3.44768 9.1887 3.51666 8.86516 3.65068C8.54162 3.78469 8.24764 3.98112 8.00001 4.22875L7.05734 5.17142L6.11468 4.22875L7.05734 3.28608C7.80955 2.54603 8.82372 2.13319 9.87893 2.13748C10.9341 2.14178 11.9449 2.56287 12.6911 3.30902C13.4372 4.05518 13.8583 5.06595 13.8626 6.12116C13.8669 7.17638 13.4541 8.19054 12.714 8.94275L11.7713 9.88542ZM9.88534 11.7714L8.94268 12.7141C8.57236 13.0905 8.13118 13.3898 7.64459 13.5949C7.15799 13.7999 6.63562 13.9066 6.1076 13.9088C5.57957 13.9109 5.05635 13.8085 4.5681 13.6074C4.07986 13.4063 3.63625 13.1106 3.26288 12.7372C2.88951 12.3638 2.59376 11.9202 2.39268 11.432C2.19161 10.9437 2.08919 10.4205 2.09134 9.8925C2.09349 9.36447 2.20017 8.8421 2.40521 8.35551C2.61025 7.86892 2.90961 7.42774 3.28601 7.05742L4.22868 6.11475L5.17134 7.05742L4.22868 8.00008C3.98105 8.24771 3.78462 8.54169 3.6506 8.86523C3.51658 9.18878 3.44761 9.53555 3.44761 9.88575C3.44761 10.236 3.51658 10.5827 3.6506 10.9063C3.78462 11.2298 3.98105 11.5238 4.22868 11.7714C4.47631 12.019 4.77028 12.2155 5.09383 12.3495C5.41737 12.4835 5.76414 12.5525 6.11434 12.5525C6.46454 12.5525 6.81131 12.4835 7.13486 12.3495C7.4584 12.2155 7.75238 12.019 8.00001 11.7714L8.94268 10.8287L9.88534 11.7714ZM9.88534 5.17142L10.8287 6.11475L6.11468 10.8281L5.17134 9.88542L9.88534 5.17208V5.17142Z" fill="#455570"/> </g> <defs> <clipPath id="clip0_9044_181403"> <rect width="16" height="16" fill="white"/> </clipPath> </defs> </svg>'
                      }
                    </SvgIcon>
                  </View>
                }
              />
            </BoxFlex>

            <BoxFlex justifyContent="end" gap={2}>
              {DetailData?.bookingCalendarProcessStatus ==
                BOOKING_CALENDAR_PROCCESS_STATUS.PENDING && (
                <ButtonDS
                  tittle={"Hủy lịch"}
                  type="button"
                  onClick={() => handleClose(DetailData?.id)}
                  sx={{
                    color: theme.palette.common.neutral700,
                    fontWeight: 500,
                    backgroundColor: theme.palette.common.neutral50,
                    boxShadow: "none",
                    ":hover": {
                      backgroundColor: theme.palette.common.neutral100,
                    },
                    textTransform: "none",
                  }}
                />
              )}
              {DetailData?.bookingCalendarProcessStatus ==
                BOOKING_CALENDAR_PROCCESS_STATUS.PENDING && (
                <ButtonDS
                  tittle={"Chỉnh sửa"}
                  type="button"
                  onClick={() => {
                    onClose();
                    setOpenForm(true);
                  }}
                  sx={{
                    color: "white",
                    fontWeight: 600,
                    backgroundColor: theme.palette.common.blue700,
                    boxShadow: "none",
                    ":hover": {
                      backgroundColor: theme.palette.common.blue800,
                    },
                    textTransform: "none",
                  }}
                />
              )}
              {DetailData?.bookingCalendarProcessStatus !=
                BOOKING_CALENDAR_PROCCESS_STATUS.REFUSE &&
                moment().format("DD/MM/YYYY") ==
                  moment(time?.[0]).format("DD/MM/YYYY") && (
                  <ButtonDS
                    onClick={() => {
                      window.open(
                        window.location.origin +
                          "/phong-van.html?DisplayName=" +
                          user?.firstName +
                          "&&Email=" +
                          user?.email +
                          "&&RoomName=" +
                          DetailData?.id
                      );
                    }}
                    tittle="Tham gia phòng họp"
                    sx={{
                      color: "white",
                      fontWeight: 600,
                      backgroundColor: theme.palette.common.green600,
                      boxShadow: "none",
                      ":hover": {
                        backgroundColor: "#388E3C",
                      },
                      textTransform: "none",
                    }}
                  />
                )}
            </BoxFlex>
          </View>
        </View>
      </Modal>
      {openForm && (
        <FormCalendar open={openForm} data={item} setOpen={setOpenForm} />
      )}
    </>
  );
});
export default DetailDialog;
