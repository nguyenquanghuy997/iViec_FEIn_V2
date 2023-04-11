import { CandidateState } from "../config";
import { convertDurationTimeToSeconds, convertStoMs } from "../config";
import CloseIcon from "@/assets/CloseIcon";
import { ButtonDS } from "@/components/DesignSystem";
import { Text, View } from "@/components/DesignSystem/FlexStyled";
import useAuth from "@/hooks/useAuth";
import { BoxFlex } from "@/sections/emailform/style";
import {
  useDeleteCalendarMutation,
  useGetDetailCalendarsQuery,
} from "@/sections/interview/InterviewSlice";
import { FormCalendar } from "@/sections/interview/components/FormCalendar";
import {
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Typography,
  ListItemText,
  Button,
  Modal,
} from "@mui/material";
import moment from "moment";
import { useSnackbar } from "notistack";
import { forwardRef } from "react";
import { useState } from "react";
import { RiLinkM } from "react-icons/ri";

const DetailDialog = forwardRef(({ item, title, open, onClose }, ref) => {
  const { data: DetailData } = useGetDetailCalendarsQuery(
    { BookingCalendarId: item?.id },
    { skip: !item?.id }
  );
  const [openForm, setOpenForm] = useState(false);
  const [deleteCalendar] = useDeleteCalendarMutation();
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = async (ids) => {
    const res = [ids];
    try {
      await deleteCalendar({ ids: res, removeReason: "" }).unwrap();
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
      <ListItem disableGutters sx={{ my: 1 }}>
        <span
          style={{
            fontSize: 14,
            fontWeight: 400,
            color: "#5C6A82",
            width: "160px",
          }}
        >
          {title}
        </span>

        <span
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: "#172B4D",
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
    convertDurationTimeToSeconds(moment(time?.[0]).format("HH:mm:ss")) -
      convertDurationTimeToSeconds(duration?.[0])
  );
  const { user } = useAuth();

  return (
    <Modal
      open={open}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      onBackdropClick={onClose}
      ref={ref}
    >
      <View hidden width={800} borderradius={8} bgcolor={"#FDFDFD"}>
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
            <CloseIcon />
          </Button>
        </View>
        <Divider />
        <View style={{ overflowY: "auto", maxHeight: "600px", padding: 24 }}>
          <h3>{item?.name}</h3>
          {renderText(
            "Hình thức phỏng vấn:",
            DetailData?.interviewType == 0 ? "Online" : "Trực tiếp"
          )}
          {renderText("Thời gian:", `${moment(time?.[0]).format("HH:mm")}`)}
          {renderText(
            "Loại phỏng vấn:",
            DetailData?.bookingCalendarGroups.map(
              (item) => item?.interviewGroupType
            ) === "0"
              ? "Phỏng vấn cá nhân"
              : "Phỏng vấn nhóm"
          )}
          {renderText(
            "Số lượng ứng viên:",
            DetailData?.bookingCalendarGroups[0]?.bookingCalendarApplicants
              .length
          )}
          {renderText("Trạng thái:", "")}
          {renderText("Lý do hủy:", DetailData?.removeReason)}

          <Divider />

          <List sx={{ pt: 2 }}>
            <Typography
              sx={{ color: "#455570", fontSize: 13, fontWeight: 600 }}
            >
              Danh sách ứng viên
            </Typography>

            {DetailData?.bookingCalendarGroups[0]?.bookingCalendarApplicants.map(
              (item, index) => (
                <ListItem
                  sx={{ bgcolor: index % 2 === 0 ? "white" : "#F2F4F5" }}
                  key={index}
                >
                  <ListItemAvatar>
                    <img
                      alt=""
                      src="https://i.pinimg.com/236x/2e/13/99/2e139971c08795a9de247848cc2c3fd9.jpg"
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "11px",
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
                      {startTime}- {moment(time?.[index]).format("HH:mm")}
                    </Typography>
                  </ListItemText>
                  <ListItemText
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                      {CandidateState(item?.applicantInterviewState)}
                    </Typography>
                  </ListItemText>
                </ListItem>
              )
            )}
          </List>
          <Divider />
          <List sx={{ pt: 2 }}>
            <Typography
              sx={{ color: "#455570", fontSize: 13, fontWeight: 600 }}
            >
              Hội đồng phỏng vấn
            </Typography>
            {DetailData?.bookingCalendarCouncils.map((item, index) => (
              <ListItem sx={{ bgcolor: index % 2 === 0 ? "white" : "#F2F4F5" }}>
                <ListItemAvatar>
                  <img
                    alt=""
                    src="https://i.pinimg.com/236x/b0/52/90/b0529099591d1f7f70732fa5e4f60e83.jpg"
                    style={{ width: "60px", height: "60px" }}
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
              tittle={" Copy link"}
              type="button"
              // onClick={() => setIsOpenSendOffer(true)}
              sx={{
                color: "#455570",
                backgroundColor: "#F3F4F6",
                boxShadow: "none",
                ":hover": {
                  backgroundColor: "#F3F4F6",
                },
                textTransform: "none",
              }}
              icon={<RiLinkM />}
            />
          </BoxFlex>
          <BoxFlex justifyContent="end" gap={2}>
            <ButtonDS
              tittle={"Hủy lịch"}
              type="button"
              onClick={() => handleClose(DetailData?.id)}
              sx={{
                color: "#455570",
                backgroundColor: "#F3F4F6",
                boxShadow: "none",
                ":hover": {
                  backgroundColor: "#F3F4F6",
                },
                textTransform: "none",
              }}
            />
            <ButtonDS
              tittle={"Chỉnh sửa"}
              type="button"
              onClick={() => {
                setOpenForm(true);
              }}
              sx={{
                color: "white",
                backgroundColor: "#1976D2",
                boxShadow: "none",
                ":hover": {
                  backgroundColor: "#1565C0",
                },
                textTransform: "none",
              }}
            />

            <ButtonDS
              onClick=""
              tittle="Tham gia phòng họp"
              href={
                "phong-van.html?DisplayName=" +
                user?.firstName +
                "&&Email=" +
                user?.email +
                "&&RoomName=" +
                DetailData?.id +
                "&&Role=1"
              }
              sx={{
                color: "white",
                backgroundColor: "#43A047",
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
