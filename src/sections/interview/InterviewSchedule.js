import DetailDialog from "./edit/DetailDialog";
import EditForm from "./edit/EditForm";
import { EditIcon } from "@/assets/ActionIcon";
import CloseIcon from "@/assets/CloseIcon";
import { ButtonDS } from "@/components/DesignSystem";
import {
  useGetCalendarQuery, // useGetDetailCalendarsQuery,
} from "@/sections/interview/InterviewSlice";
import { Divider, Typography, Box, Card, CardContent } from "@mui/material";
import { useState } from "react";

export default function InterviewSchedule() {
  const { data: Data } = useGetCalendarQuery();
  // const { data: DetailCanlendar } = useGetDetailCalendarsQuery(
  //   Data?.items[0]?.id
  // );
  // console.log("faf", DetailCanlendar);
  const check = false;
  const [openForm, setOpenForm] = useState(false);
  const [item, setItem] = useState({});
  const [itemDialog, setItemDialog] = useState({});

  const [openDialog, setOpenDialog] = useState(false);

  const handleClick = (data) => {
    setOpenForm(true);
    setItem(data);
  };
  const handleClickDialog = (data) => {
    setOpenDialog(true);
    setItemDialog(data);
  };

  return (
    <Card sx={{ m: "140px 0", borderRadius: "6px", border: "none", p: 3 }}>
      <CardContent sx={{ display: "flex", p: 0 }}>
        <Box
          sx={{
            borderRadius: "100%",
            bgcolor: " #1976D2",
            height: 40,
            width: 40,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mr: 2,
            color: "white",
          }}
        >
          7
        </Box>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Thứ 4, Ngày 07/03/2023 (Hôm nay)
        </Typography>
      </CardContent>

      {Data?.items.map((item) => (
        <>
          <Box
            key={item.id}
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
              onClick={() => handleClickDialog(item)}
            >
              <Box sx={{ width: "20%" }}>
                <Typography
                  sx={{ fontSize: 13, fontWeight: 600 }}
                  color="#172B4D"
                >
                  {item.name}
                </Typography>
                <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                  15:00 - 18:00
                </Typography>
              </Box>
              <Divider orientation="vertical" variant="middle" flexItem />
              <Box sx={{ width: "15%", px: 3 }}>
                <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                  Số ứng viên
                </Typography>
                <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
                  3
                </Typography>
              </Box>
              <Divider orientation="vertical" variant="middle" flexItem />
              <Box sx={{ width: "15%", px: 3 }}>
                <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                  Loại phỏng vấn
                </Typography>
                <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
                  {/* {item?.interviewType == 0 ? " Online" : "Trực tiếp"} */}
                </Typography>
              </Box>
              <Divider orientation="vertical" variant="middle" flexItem />
              <Box sx={{ width: "15%", px: 3 }}>
                <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                  Hình thức
                </Typography>
                <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
                  {item?.interviewType == 0 ? " Online" : "Trực tiếp"}
                </Typography>
              </Box>
              <Divider orientation="vertical" variant="middle" flexItem />
              {item?.interviewType == 1 ? (
                <Box sx={{ width: "30%", px: 3 }}>
                  <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                    Địa chỉ
                  </Typography>
                  <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
                    {item?.onlineInterviewAddress}
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
                onClick={() => handleClick(item)}
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
        </>
      ))}
      {openForm && (
        <EditForm
          open={openForm}
          item={item}
          onClose={() => setOpenForm(false)}
        />
      )}
      {openDialog && (
        <DetailDialog
          subheader={<CloseIcon />}
          title="Chi tiết lịch phỏng vấn"
          open={openDialog}
          item={itemDialog}
          onClose={() => setOpenDialog(false)}
        />
      )}
     
    </Card>
  );
}
