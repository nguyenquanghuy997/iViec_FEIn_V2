import { convertDurationTimeToSeconds, convertStoMs } from "../config";
import CloseIcon from "@/assets/CloseIcon";
import { ButtonDS } from "@/components/DesignSystem";
import { Text, View } from "@/components/DesignSystem/FlexStyled";
import { DOMAIN_SERVER_API } from "@/config";
import { BOOKING_CALENDAR_PROCCESS_STATUS } from "@/config";
import useAuth from "@/hooks/useAuth";
import { BoxFlex } from "@/sections/emailform/style";
import {
  useDeleteCalendarMutation,
  useGetDetailCalendarsQuery,
} from "@/sections/interview/InterviewSlice";
import { FormCalendar } from "@/sections/interview/components/FormCalendar";
import {
  ApplicantCalendarState,
  BookingCalendarProcessStatus,
} from "@/utils/enum";
import { INTERVIEW_PROCESS_STATUS } from "@/utils/formatString";
import {
  Button,
  Divider,
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
import { RiLinkM } from "react-icons/ri";

const DetailDialog = forwardRef(({item, title, open, onClose}, ref) => {
  const {data: DetailData} = useGetDetailCalendarsQuery(
    {BookingCalendarId: item?.id},
    {skip: !item?.id}
  );
  const theme = useTheme();
  const [openForm, setOpenForm] = useState(false);
  const [deleteCalendar] = useDeleteCalendarMutation();
  const {enqueueSnackbar} = useSnackbar();
  
  const handleClose = async (ids) => {
    const res = [ids];
    try {
      await deleteCalendar({ids: res, removeReason: ""}).unwrap();
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
      <ListItem disableGutters sx={{my: 1}}>
        <span
          style={{
            fontSize: 14,
            fontWeight: 400,
            color: theme.palette.common.borderObject,
            width: "160px",
          }}
        >
          {title}
        </span>
        
        <span
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: theme.palette.common.neutral800,
          }}
        >
          {content}
        </span>
      </ListItem>
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
  const {user} = useAuth();
  const getLink = async (id) => {
    return `${window.location.origin}/phong-van.html?DisplayName=${user?.firstName}&&Email=${user?.email}&&Role=1&&RoomName=${id}`;
  };
  
  const copyToClipboard = async (id) => {
    navigator.clipboard.writeText(await getLink(id));
    enqueueSnackbar("Đã sao chép link cuộc họp");
  };
  return (
    <Modal
      open={open}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ".MuiModal-backdrop": {background: "rgba(9, 30, 66, 0.25)"}
      }}
      onBackdropClick={onClose}
      ref={ref}
    >
      <View
        hidden
        width={800}
        borderradius={8}
        bgcolor={theme.palette.common.white}
      >
        <View flexrow="true" atcenter="true" pv={22} ph={24}>
          <Text flex fontsize={16} fontweight={"700"}>
            {title}
          </Text>
          <Button
            onClick={onClose}
            sx={{
              "&:hover": {
                bgcolor: "white",
              },
            }}
          >
            <CloseIcon/>
          </Button>
        </View>
        <Divider/>
        <View style={{overflowY: "auto", maxHeight: "600px", padding: 24}}>
          <h3>{item?.name}</h3>
          {renderText(
            "Hình thức phỏng vấn:",
            DetailData?.interviewType === 0 ? "Online" : "Trực tiếp"
          )}
          {renderText("Thời gian:", `${moment(time?.[0]).format("HH:mm")}`)}
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
            INTERVIEW_PROCESS_STATUS.find(
              (x) => x.id == DetailData?.bookingCalendarProcessStatus
            )?.name
          )}
          {renderText("Lý do hủy:", DetailData?.removeReason || "Không có")}
          {renderText(
            "Trạng thái:",
            BookingCalendarProcessStatus(
              DetailData?.bookingCalendarProcessStatus
            )
          )}
          {renderText("Lý do hủy:", DetailData?.removeReason || "Không có")}
          
          <Divider/>
          
          <List sx={{pt: 2}}>
            <Typography
              sx={{
                color: theme.palette.common.neutral700,
                fontSize: 13,
                fontWeight: 600,
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
                  <ListItemAvatar>
                    <img
                      alt=""
                      src={
                        DOMAIN_SERVER_API +
                        `/Image/GetImage?imagePath=${item?.applicant?.portraitImage}`
                      }
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "11px",
                      }}
                    />
                  </ListItemAvatar>
                  <ListItemText sx={{width: "30%"}}>
                    <Typography sx={{fontSize: 13, fontWeight: 600}}>
                      {item?.applicant?.fullName}
                    </Typography>
                    <Typography sx={{fontSize: 12, fontWeight: 400}}>
                      {item?.applicant?.phoneNumber}
                    </Typography>
                  </ListItemText>
                  <ListItemText>
                    <Typography sx={{fontSize: 13, fontWeight: 600}}>
                      {moment(time?.[index]).format("HH:mm")} - {startTime}
                    </Typography>
                  </ListItemText>
                  <ListItemText
                    sx={{display: "flex", justifyContent: "flex-end"}}
                  >
                    <Typography sx={{fontSize: 13, fontWeight: 600}}>
                      {ApplicantCalendarState(item?.applicantInterviewState)}
                    </Typography>
                  </ListItemText>
                </ListItem>
              )
            )}
          </List>
          <Divider/>
          <List sx={{pt: 2}}>
            <Typography
              sx={{
                color: theme.palette.common.neutral700,
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              Hội đồng phỏng vấn
            </Typography>
            {DetailData?.bookingCalendarCouncils.map((item, index) => (
              <ListItem
                sx={{
                  bgcolor:
                    index % 2 === 0 ? "white" : theme.palette.common.bgrMaster,
                }}
              >
                <ListItemAvatar>
                  <img
                    alt=""
                    src="https://i.pinimg.com/236x/b0/52/90/b0529099591d1f7f70732fa5e4f60e83.jpg"
                    style={{width: "60px", height: "60px"}}
                  />
                </ListItemAvatar>
                <ListItemText>
                  <Typography sx={{fontSize: 13, fontWeight: 600}}>
                    {item?.name}
                  </Typography>
                  <Typography sx={{fontSize: 12, fontWeight: 400}}>
                    {item?.email}
                  </Typography>
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </View>
        <Divider/>
        <View pv={16} ph={24} flexrow="row" jcbetween="true">
          <BoxFlex justifyContent="start">
            <ButtonDS
              tittle={" Chia sẻ link"}
              type="button"
              onClick={() => copyToClipboard(item?.id)}
              sx={{
                color: theme.palette.common.neutral700,
                backgroundColor: theme.palette.common.neutral50,
                boxShadow: "none",
                ":hover": {
                  backgroundColor: theme.palette.common.neutral50,
                },
                textTransform: "none",
              }}
              icon={<RiLinkM/>}
            />
          </BoxFlex>
          <BoxFlex justifyContent="end" gap={2}>
            <ButtonDS
              tittle={"Hủy lịch"}
              type="button"
              onClick={() => handleClose(DetailData?.id)}
              sx={{
                color: theme.palette.common.neutral700,
                backgroundColor: theme.palette.common.neutral50,
                boxShadow: "none",
                ":hover": {
                  backgroundColor: theme.palette.common.neutral50,
                },
                textTransform: "none",
              }}
            />
            {DetailData?.bookingCalendarProcessStatus ==
              BOOKING_CALENDAR_PROCCESS_STATUS.CALENDED_ONLY && (
                <ButtonDS
                  tittle={"Chỉnh sửa"}
                  type="button"
                  onClick={() => {
                    setOpenForm(true);
                  }}
                  sx={{
                    color: "white",
                    backgroundColor: theme.palette.common.blue700,
                    boxShadow: "none",
                    ":hover": {
                      backgroundColor: theme.palette.common.blue800,
                    },
                    textTransform: "none",
                  }}
                />
              )}
            
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
                backgroundColor: theme.palette.common.green600,
                boxShadow: "none",
                ":hover": {
                  backgroundColor: "#388E3C",
                },
                textTransform: "none",
              }}
            />
            {openForm && (
              <FormCalendar open={openForm} data={item} setOpen={setOpenForm}/>
            )}
          </BoxFlex>
        </View>
      </View>
    </Modal>
  );
});
export default DetailDialog;
