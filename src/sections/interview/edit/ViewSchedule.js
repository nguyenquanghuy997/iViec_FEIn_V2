import { EditIcon } from "@/assets/ActionIcon";
import { ButtonDS } from "@/components/DesignSystem";
import { PERMISSIONS } from "@/config";
import useAuth from "@/hooks/useAuth";
import useRole from "@/hooks/useRole";
import { Box, CardContent, Divider, Typography } from "@mui/material";
import { useMemo } from "react";
import { RiCalendarCheckFill, RiCalendarEventFill } from "react-icons/ri";

const ViewSchedule = ({ data, check, handleClick, handleClickDialog }) => {
  // const { data: DetailData } = useGetDetailCalendarsQuery({
  //   BookingCalendarId: id,
  // });
  const { user } = useAuth();

  const { canAccess } = useRole();
  const canEdit = useMemo(() => canAccess(PERMISSIONS.CRUD_INTV_SCHE), []);

  return (
    <>
      <Box
        key={data?.id}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <CardContent
          sx={{
            display: "flex",
            width: "100%",
            backgroundColor: "background.paper",
            color: "text.secondary",
            px: 2,
          }}
          onClick={() => handleClickDialog(data)}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {data?.interviewType == 0 ? (
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
            ) : (
              <Box
                sx={{
                  borderRadius: "100%",
                  background: "#E3F2FD",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mr: 2,
                }}
              >
                <RiCalendarEventFill color={"#1565C0"} />
              </Box>
            )}
          </Box>

          <Box sx={{ width: "20%" }}>
            <Typography sx={{ fontSize: 13, fontWeight: 600 }} color="#172B4D">
              {data?.name}
            </Typography>
            <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
              15:00 - 18:00
            </Typography>
          </Box>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Box sx={{ width: "15%", px: 3 }}>
            <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
              Số người phỏng vấn
            </Typography>
            <Typography sx={{ fontSize: 12, fontWeight: 600 }}>{2}</Typography>
          </Box>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Box sx={{ width: "15%", px: 3 }}>
            <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
              Loại phỏng vấn
            </Typography>
            <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
              {data?.interviewType == 0 ? " Online" : "Trực tiếp"}
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
          <Divider orientation="vertical" variant="middle" flexItem />
          {data?.interviewType == 1 ? (
            <Box sx={{ width: "30%", px: 3 }}>
              <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                Địa chỉ
              </Typography>
              <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
                {data?.offlineInterviewAddress}
              </Typography>
            </Box>
          ) : (
            ""
          )}
        </CardContent>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            width: check ? "150px" : "fit-content",
            alignItems: "center",
          }}
        >
          {canEdit && (
            <div
              style={{ cursor: "pointer" }}
              onClick={() => handleClick(data)}
            >
              <EditIcon width={12} height={12} />
            </div>
          )}

          <ButtonDS
            tittle="Tham gia"
            href={
              "phong-van.html?DisplayName=" +
              user?.firstName +
              "&&Email=" +
              user?.email +
              "&&RoomName=" +
              data?.id +
              "&&Role=1"
            }
            sx={{
              fontSize: "12px",
              lineHeight: "18px",
              width: "max-content",
              padding: "6px 10px",
              backgroundColor: "#388E3C",
              "&:hover": {
                backgroundColor: "#43A047 !important",
              },
            }}
          />
          {check ? (
            <ButtonDS
              tittle="Tham gia"
              sx={{
                backgroundColor: "#388E3C",
                "&:hover": {
                  backgroundColor: "#43A047 !important",
                },
              }}
            />
          ) : (
            ""
          )}
        </Box>
      </Box>
      <Divider />
    </>
  );
};

export default ViewSchedule;
