import { EditIcon } from "@/assets/ActionIcon";
import { ButtonDS } from "@/components/DesignSystem";
import { useGetDetailCalendarsQuery } from "@/sections/interview/InterviewSlice";
import { Divider, Typography, Box, CardContent } from "@mui/material";

const ViewSchedule = ({ id, check, handleClick, handleClickDialog }) => {
  const { data: DetailData } = useGetDetailCalendarsQuery({
    BookingCalendarId: id,
  });
  return (
    <Box
      key={DetailData?.id}
      sx={{ display: "flex", justifyContent: "space-between" }}
    >
      <CardContent
        sx={{
          display: "flex",
          width: "100%",
          bgcolor: "background.paper",
          color: "text.secondary",
          px: 2,
        }}
        onClick={() => handleClickDialog(DetailData)}
      >
        <Box sx={{ width: "20%" }}>
          <Typography sx={{ fontSize: 13, fontWeight: 600 }} color="#172B4D">
            {DetailData?.name}
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
          <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
            {
              DetailData?.bookingCalendarGroups[0]
                ?.bookingCalendarGroupApplicants.length
            }
          </Typography>
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Box sx={{ width: "15%", px: 3 }}>
          <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
            Loại phỏng vấn
          </Typography>
          <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
            {DetailData?.interviewType == 0 ? " Online" : "Trực tiếp"}
          </Typography>
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Box sx={{ width: "15%", px: 3 }}>
          <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
            Hình thức
          </Typography>
          <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
            {DetailData?.interviewType == 0 ? " Online" : "Trực tiếp"}
          </Typography>
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem />
        {DetailData?.interviewType == 1 ? (
          <Box sx={{ width: "30%", px: 3 }}>
            <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
              Địa chỉ
            </Typography>
            <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
              {DetailData?.onlineInterviewAddress}
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
        <div
          style={{ cursor: "pointer" }}
          onClick={() => handleClick(DetailData)}
        >
          <EditIcon width={12} height={12} />
        </div>
        {check ? (
          <ButtonDS
            tittle="Tham gia"
            sx={{
              bgcolor: "#388E3C",
              "&:hover": {
                backgroundColor: "#43A047 !important",
              },
            }}
          />
        ) : (
          ""
        )}
      </Box>

      <Divider />
    </Box>
  );
};

export default ViewSchedule;
