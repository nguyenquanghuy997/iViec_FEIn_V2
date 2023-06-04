import { EditIcon } from "@/assets/ActionIcon";
import { ButtonDS } from "@/components/DesignSystem";
import { View } from "@/components/FlexStyled";
import SvgIcon from "@/components/SvgIcon";
import { BOOKING_CALENDAR_PROCCESS_STATUS, PERMISSIONS } from "@/config";
import useAuth from "@/hooks/useAuth";
import useRole from "@/hooks/useRole";
import { ButtonIcon } from "@/utils/cssStyles";
import { fTime } from "@/utils/formatTime";
import { Box, CardContent, Divider, Tooltip, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import moment from "moment";
import { useMemo } from "react";

const ViewSchedule = ({ data, isLastItem, handleClick, handleClickDialog }) => {
  const { user } = useAuth();
  const theme = useTheme();
  const { canAccess } = useRole();
  const canEdit = useMemo(() => canAccess(PERMISSIONS.CRUD_INTV_SCHE), []);
  const renderSwitch = (param) => {
    switch (param) {
      case 1: // interviewing
        return (
          <Tooltip title="Đang phỏng vấn">
            <Box
              sx={{
                borderRadius: "100%",
                background: theme.palette.common.green700,
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 2,
              }}
            >
              <SvgIcon>
                {
                  '<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_3738_314342)"> <path d="M12.9175 8.77722L5.8515 13.4879C5.8013 13.5213 5.74298 13.5404 5.68276 13.5433C5.62253 13.5462 5.56265 13.5327 5.5095 13.5042C5.45634 13.4758 5.4119 13.4334 5.38091 13.3817C5.34991 13.33 5.33353 13.2708 5.3335 13.2105V3.78922C5.33353 3.72892 5.34991 3.66976 5.38091 3.61804C5.4119 3.56633 5.45634 3.52398 5.5095 3.49552C5.56265 3.46706 5.62253 3.45355 5.68276 3.45644C5.74298 3.45932 5.8013 3.47848 5.8515 3.51188L12.9175 8.22255C12.9631 8.25299 13.0006 8.29423 13.0265 8.34261C13.0524 8.39099 13.0659 8.44501 13.0659 8.49988C13.0659 8.55475 13.0524 8.60878 13.0265 8.65715C13.0006 8.70553 12.9631 8.74678 12.9175 8.77722Z" fill="#FDFDFD"/> </g> <defs> <clipPath id="clip0_3738_314342"> <rect width="16" height="16" fill="white" transform="translate(0 0.5)"/> </clipPath> </defs> </svg>'
                }
              </SvgIcon>
            </Box>
          </Tooltip>
        );
      case 2: // interview finish
        return (
          <Tooltip title="Kết thúc phỏng vấn">
            <Box
              sx={{
                borderRadius: "100%",
                background: theme.palette.common.neutral50,
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 2,
              }}
            >
              <SvgIcon>
                {
                  '<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_3738_313119)"> <path d="M6.6665 10.6145L12.7945 4.48584L13.7378 5.42851L6.6665 12.4998L2.42383 8.25717L3.3665 7.31451L6.6665 10.6145Z" fill="#172B4D"/> </g> <defs> <clipPath id="clip0_3738_313119"> <rect width="16" height="16" fill="white" transform="translate(0 0.5)"/> </clipPath> </defs> </svg>'
                }
              </SvgIcon>
            </Box>
          </Tooltip>
        );
      case 3: // interview refuse
        return (
          <Tooltip title="Đã hủy lịch">
            <Box
              sx={{
                borderRadius: "100%",
                background: theme.palette.common.neutral50,
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 2,
              }}
            >
              <SvgIcon>
                {
                  '<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_3738_312778)"> <path d="M7.99999 7.55732L11.3 4.25732L12.2427 5.19999L8.94266 8.49999L12.2427 11.8L11.3 12.7427L7.99999 9.44266L4.69999 12.7427L3.75732 11.8L7.05732 8.49999L3.75732 5.19999L4.69999 4.25732L7.99999 7.55732Z" fill="#172B4D"/> </g> <defs> <clipPath id="clip0_3738_312778"> <rect width="16" height="16" fill="white" transform="translate(0 0.5)"/> </clipPath> </defs> </svg>'
                }
              </SvgIcon>
            </Box>
          </Tooltip>
        );

      default:
        return (
          <Tooltip title="Đã lên lịch">
            <Box
              sx={{
                borderRadius: "100%",
                background: theme.palette.common.green50,
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 2,
              }}
            >
              <SvgIcon>
                {
                  '<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_3738_309325)"> <path d="M6.00016 1.16675V2.50008H10.0002V1.16675H11.3335V2.50008H14.0002C14.177 2.50008 14.3465 2.57032 14.4716 2.69534C14.5966 2.82037 14.6668 2.98994 14.6668 3.16675V13.8334C14.6668 14.0102 14.5966 14.1798 14.4716 14.3048C14.3465 14.4298 14.177 14.5001 14.0002 14.5001H2.00016C1.82335 14.5001 1.65378 14.4298 1.52876 14.3048C1.40373 14.1798 1.3335 14.0102 1.3335 13.8334V3.16675C1.3335 2.98994 1.40373 2.82037 1.52876 2.69534C1.65378 2.57032 1.82335 2.50008 2.00016 2.50008H4.66683V1.16675H6.00016ZM13.3335 5.83341H2.66683V13.1667H13.3335V5.83341ZM10.0242 7.25741L10.9668 8.20008L7.66683 11.5001L5.3095 9.14275L6.2535 8.20008L7.6675 9.61475L10.0248 7.25741H10.0242Z" fill="#388E3C"/> </g> <defs> <clipPath id="clip0_3738_309325"> <rect width="16" height="16" fill="white" transform="translate(0 0.5)"/> </clipPath> </defs> </svg>'
                }
              </SvgIcon>
            </Box>
          </Tooltip>
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
          cursor: "pointer",
          ":hover": {
            backgroundColor: theme.palette.common.neutral100,
          },
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            color: "text.secondary",
            padding: "16px",
            borderRadius: isLastItem ? "" : "6px",
            width: "85%",
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

          <View flex1 flexRow>
            <Box sx={{ width: "30%", pr: 3 }}>
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                color="#172B4D"
              >
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
                Số ứng viên
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
                <Box sx={{ width: "25%", px: 3 }}>
                  <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                    Địa chỉ
                  </Typography>
                  <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
                    {data?.offlineInterviewAddress}
                  </Typography>
                </Box>
              </>
            )}
          </View>
        </CardContent>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            width: "15%",
            alignItems: "center",
            padding: "16px",
            justifyContent: "flex-end",
          }}
        >
          {canEdit &&
            data?.bookingCalendarProcessStatus ==
              BOOKING_CALENDAR_PROCCESS_STATUS.PENDING && (
              <div
                style={{ cursor: "pointer" }}
                onClick={() => handleClick(data)}
              >
                <ButtonIcon
                  tooltip="Sửa"
                  icon={<EditIcon width={12} height={12} />}
                  size="small"
                  sx={{ color: theme.palette.common.borderObject, mx: 1 }}
                  onClick={() => handleClick(data)}
                ></ButtonIcon>
              </div>
            )}
          {/* interviewing status */}
          {data?.bookingCalendarProcessStatus !=
            BOOKING_CALENDAR_PROCCESS_STATUS.REFUSE &&
            moment().format("DD/MM/YYYY") ==
              moment(data?.startTime).format("DD/MM/YYYY") && (
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
            )}
        </Box>
      </Box>
    </>
  );
};

export default ViewSchedule;
