import {EditIcon} from "@/assets/ActionIcon";
import {ButtonDS} from "@/components/DesignSystem";
import {PERMISSIONS} from "@/config";
import useAuth from "@/hooks/useAuth";
import useRole from "@/hooks/useRole";
import {fTime} from "@/utils/formatTime";
import {Box, CardContent, Divider, Typography} from "@mui/material";
import React, {useMemo} from "react";
import {RiCalendarCheckFill} from "react-icons/ri";
import Iconify from "@/components/Iconify";

const ViewSchedule = ({data, check, handleClick, handleClickDialog}) => {
  // const { data: Detaildata } = useGetDetailCalendarsQuery({
  //   BookingCalendarId: id,
  // });
  const {user} = useAuth();

  const {canAccess} = useRole();
  const canEdit = useMemo(() => canAccess(PERMISSIONS.CRUD_INTV_SCHE), []);
  const renderSwitch = (param) => {
    switch (param) {
      case 0:
        return <Box
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
          <RiCalendarCheckFill color={"#388E3C"}/>
        </Box>
      case 11:
        return <Box
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
      case 6:
        return <Box
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
      case 8:
        return <Box
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
      case 9:
        return <Box
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
      case 10:
        return <Box
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
      default:
        return <Box
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
          <RiCalendarCheckFill color={"#388E3C"}/>
        </Box>
    }
  }

  return (
    <>
      <Box
        key={data?.id}
        sx={{display: "flex", justifyContent: "space-between"}}
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
            {
              renderSwitch(data?.bookingCalendarProcessStatus)
            }
          </Box>

          <Box sx={{width: "20%"}}>
            <Typography sx={{fontSize: 13, fontWeight: 600}} color="#172B4D">
              {data?.name}
            </Typography>
            <Typography sx={{fontSize: 13, fontWeight: 500}}>
              {data?.startTime ? fTime(data?.startTime) : ''} -{data?.endTime ? fTime(data?.endTime) : ''}
            </Typography>
          </Box>
          <Divider orientation="vertical" variant="middle" flexItem/>
          <Box sx={{width: "15%", px: 3}}>
            <Typography sx={{fontSize: 13, fontWeight: 500}}>
              Số người phỏng vấn
            </Typography>
            <Typography sx={{
              fontSize: 12,
              fontWeight: 600
            }}></Typography>
          </Box>
          <Divider orientation="vertical" variant="middle" flexItem/>
          <Box sx={{width: "15%", px: 3}}>
            <Typography sx={{fontSize: 13, fontWeight: 500}}>
              Loại phỏng vấn
            </Typography>
            <Typography sx={{fontSize: 12, fontWeight: 600}}>
              {data?.interviewType == 0 ? " Online" : "Trực tiếp"}
            </Typography>
          </Box>
          <Divider orientation="vertical" variant="middle" flexItem/>
          <Box sx={{width: "15%", px: 3}}>
            <Typography sx={{fontSize: 13, fontWeight: 500}}>
              Hình thức
            </Typography>
            <Typography sx={{fontSize: 12, fontWeight: 600}}>
              {data?.interviewType == 0 ? " Online" : "Trực tiếp"}
            </Typography>
          </Box>
          <Divider orientation="vertical" variant="middle" flexItem/>
          {data?.interviewType == 1 ? (
            <Box sx={{width: "30%", px: 3}}>
              <Typography sx={{fontSize: 13, fontWeight: 500}}>
                Địa chỉ
              </Typography>
              <Typography sx={{fontSize: 12, fontWeight: 600}}>
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
              style={{cursor: "pointer"}}
              onClick={() => handleClick(data)}
            >
              <EditIcon width={12} height={12}/>
            </div>
          )}

          <ButtonDS
            tittle="Tham gia"
            href={
              window.location.origin +
              "/phong-van.html?DisplayName=" +
              user?.firstName +
              "&&Email=" +
              user?.email +
              "&&RoomName=" +
              data?.id
            }
            target='_blank'
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
      <Divider/>
    </>
  );
};

export default ViewSchedule;
