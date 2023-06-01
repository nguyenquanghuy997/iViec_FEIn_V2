import { EditIcon } from "@/assets/ActionIcon";
import { ButtonDS } from "@/components/DesignSystem";
import Iconify from "@/components/Iconify";
import { PERMISSIONS } from "@/config";
import useAuth from "@/hooks/useAuth";
import useRole from "@/hooks/useRole";
import { fTime } from "@/utils/formatTime";
import { Box, CardContent, Divider, Tooltip, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { RiCalendarCheckFill } from "react-icons/ri";

const ViewSchedule = ({ data, isLastItem, handleClick, handleClickDialog }) => {
  // const { data: Detaildata } = useGetDetailCalendarsQuery({
  //   BookingCalendarId: id,
  // });
  const { user } = useAuth();
  const theme = useTheme();
  const { canAccess } = useRole();
  const canEdit = useMemo(() => canAccess(PERMISSIONS.CRUD_INTV_SCHE), []);
  const renderSwitch = (param) => {
    switch (param) {
      case 0: // applyjob
        return (
          <Tooltip title="Ứng viên đã xác nhận">
            <Box
              sx={{
                borderRadius: "100%",
                background: "#E8F5E9",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 2,
              }}
            >
              <RiCalendarCheckFill color={"#388E3C"} />
            </Box>
          </Tooltip>
        );

      case 11: // interview expried
        return (
          <Tooltip title="Lịch phỏng vấn quá hạn">
            <Box
              sx={{
                borderRadius: "100%",
                background: "#E8F5E9",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 2,
              }}
            >
              <Iconify
                icon={"ant-design:reload-time-outline"}
                width={20}
                height={20}
                color="#F26A12"
              />
            </Box>
          </Tooltip>
        );
      case 6: // interview schedule
        return (
          <Tooltip title="Chờ ứng viên xác nhận">
            <Box
              sx={{
                borderRadius: "100%",
                background: "#E8F5E9",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 2,
              }}
            >
              <Iconify
                icon={"ri:calendar-event-fill"}
                width={20}
                height={20}
                color="#1565C0"
              />
            </Box>
          </Tooltip>
        );
      case 8: // interview refuse
        return (
          <Tooltip title="Đã hủy">
            <Box
              sx={{
                borderRadius: "100%",
                background: "#E8F5E9",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 2,
              }}
            >
              <Iconify
                icon={"mdi:cancel-bold"}
                width={20}
                height={20}
                color="#172B4D"
              />
            </Box>
          </Tooltip>
        );
      case 9: // interviewing
        return (
          <Tooltip title="Đang diễn ra">
            <Box
              sx={{
                borderRadius: "100%",
                background: "#E8F5E9",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 2,
              }}
            >
              <Iconify
                icon={"material-symbols:play-circle"}
                width={20}
                height={20}
                color="#388E3C"
              />
            </Box>
          </Tooltip>
        );
      case 10: // interview finish
        return (
          <Tooltip title="Đã k">
            <Box
              sx={{
                borderRadius: "100%",
                background: "#E8F5E9",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 2,
              }}
            >
              <Iconify
                icon={"icon-park-solid:correct"}
                width={20}
                height={20}
                color="#172B4D"
              />
            </Box>
          </Tooltip>
        );
      default:
        return (
          <Box
            sx={{
              borderRadius: "100%",
              background: "#E8F5E9",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: 2,
            }}
          >
            <RiCalendarCheckFill color={"#388E3C"} />
          </Box>
        );
    }
  };

  return (
    <>
      <Box
        key={data?.id}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          borderRadius: isLastItem ? "" : "6px 6px 6px 6px !important",
          borderBottom: isLastItem ? "" : "1px solid #E7E9ED",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            width: "100%",
            backgroundColor: "background.paper",
            color: "text.secondary",
            padding: "16px",
            borderRadius: isLastItem ? "" : "6px",
          }}
          onClick={() => handleClickDialog(data)}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {renderSwitch(data?.bookingCalendarProcessStatus)}
          </Box>

          <Box sx={{ width: "20%" }}>
            <Typography sx={{ fontSize: 13, fontWeight: 600 }} color="#172B4D">
              {data?.name}
            </Typography>
            <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
              {data?.startTime ? fTime(data?.startTime) : ""} -
              {data?.endTime ? fTime(data?.endTime) : ""}
            </Typography>
          </Box>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Box sx={{ width: "15%", px: 3 }}>
            <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
              Số người phỏng vấn
            </Typography>
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              {data?.numOfApplicant}
            </Typography>
          </Box>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Box sx={{ width: "15%", px: 3 }}>
            <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
              Loại phỏng vấn
            </Typography>
            <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
              {data?.interviewGroupType == 0 ? " Cá nhân" : "Nhóm"}
            </Typography>
          </Box>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Box sx={{ width: "15%", px: 3 }}>
            <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
              Hình thức
            </Typography>
            <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
              {data?.interviewType == 0 ? " Online" : "Trực tiếp"}
            </Typography>
          </Box>
          {data?.interviewType == 1 && (
            <>
              <Divider orientation="vertical" variant="middle" flexItem />
              <Box sx={{ width: "30%", px: 3 }}>
                <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                  Địa chỉ
                </Typography>
                <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
                  {data?.offlineInterviewAddress}
                </Typography>
              </Box>
            </>
          )}
        </CardContent>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            width: "fit-content",
            alignItems: "center",
            padding: "16px",
          }}
        >
          {canEdit && data?.bookingCalendarProcessStatus < 2 && (
            <div
              style={{ cursor: "pointer" }}
              onClick={() => handleClick(data)}
            >
              <EditIcon width={12} height={12} />
            </div>
          )}
          {
            // interviewing status
            data?.bookingCalendarProcessStatus < 2 && (
              <ButtonDS
                tittle="Tham gia"
                onClick={() => {
                  window.open(
                    window.location.origin +
                      "/phong-van.html?DisplayName=" +
                      user?.firstName +
                      "&&Email=" +
                      user?.email +
                      "&&RoomName=" +
                      data?.id
                  );
                }}
                target="_blank"
                sx={{
                  fontSize: "12px",
                  lineHeight: "18px",
                  width: "max-content",
                  padding: "6px 10px",
                  backgroundColor: "#388E3C",
                  "&:hover": {
                    backgroundColor:
                      theme.palette.common.green600 + "!important",
                  },
                }}
              />
            )
          }
        </Box>
      </Box>
    </>
  );
};

export default ViewSchedule;
