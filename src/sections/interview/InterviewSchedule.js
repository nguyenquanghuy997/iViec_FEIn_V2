import { Divider, Typography, Box, Card, CardContent } from "@mui/material";
import * as React from "react";

export default function InterviewSchedule() {
  const type = [
    {
      id: 1,
      title: "Tiêu đề lịch phỏng vấn",
      number: "15",
      type: "Cá nhân",
      form: "Onl",
    },
    {
      id: 2,
      title: "Phỏng vấn chuyên viên phân tích nghiệp vụ - vòng 2",
      number: "15",
      type: "Nhóm",
      form: "Trực tiếp",
      address: "Số 10, Phạm Văn Bạch, Dịch Vọng Hậu, Cầu Giấy, Hà Nội",
    },
    {
      id: 3,
      title: "Tiêu đề lịch phỏng vấn",
      number: "15",
      type: "Cá nhân",
      form: "Onl",
    },
  ];
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

      {type.map((item) => (
        <>
          <CardContent
            sx={{
              display: "flex",
              width: "100%",
              bgcolor: "background.paper",
              color: "text.secondary",
              px: 2,
            }}
          >
            <Box sx={{ width: "20%" }}>
              <Typography
                sx={{ fontSize: 13, fontWeight: 600 }}
                color="#172B4D"
              >
                {item.title}
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
                {" "}
                {item?.number}
              </Typography>
            </Box>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Box sx={{ width: "15%", px: 3 }}>
              <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                Loại phỏng vấn
              </Typography>
              <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
                {item?.type}
              </Typography>
            </Box>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Box sx={{ width: "15%", px: 3 }}>
              <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                Hình thức
              </Typography>
              <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
                {item?.form}
              </Typography>
            </Box>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Box sx={{ width: "30%", px: 3 }}>
              <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                Địa chỉ
              </Typography>
              <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
                {item?.address}
              </Typography>
            </Box>
          </CardContent>
          <Divider />
        </>
      ))}
    </Card>
  );
}
