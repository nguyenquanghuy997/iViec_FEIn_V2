import { Grid, Divider, Chip } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import React from "react";

export const ApplicantInfo = () => {
  const renderText = (title, value, secondary, label) => {
    return (
      <div>
        <span
          style={{
            display: "inline-flex",
            fontSize: 13,
            margin: "12px 0 12px 0",
            color: "#5C6A82",
            width: "160px",
          }}
        >
          {title}
        </span>

        <span
          style={{
            display: "inline-flex",
            fontSize: 13,
            fontWeight: 500,
            color: "#172B4D",
          }}
        >
          <ListItemText
            primary={value}
            secondary={secondary}
            sx={{
              mb: 1,
              "& .MuiTypography-root": {
                fontSize: "13px",
              },
            }}
          />
        </span>
        {label ? (
          <Chip
            label={label}
            size="small"
            sx={{ color: "#388E3C", backgroundColor: "#EFF3F6", ml: 1 }}
          />
        ) : (
          ""
        )}
      </div>
    );
  };

  const DividerInfo = ({ text }) => {
    return (
      <Divider
        textAlign="left"
        sx={{
          "&:before": {
            width: 0,
          },
          margin: "12px 0 12px 0",
          "&:after": {},
          fontWeight: "600",
          fontSize: "14px",
          lineHeight: "20px",
          span: {
            pl: 0,
            pr: 2,
          },
        }}
      >
        {text}
      </Divider>
    );
  };

  return (
    <Grid item sx={{ padding: "12px 0 0 0" }}>
      <DividerInfo text="THÔNG TIN CƠ BẢN" />
      {renderText("Họ và tên:", "Đinh Tiến Thành")}
      {renderText("Ngành nghề:", "Công nghệ thông tin")}
      {renderText("Nguồn:", "-")}
      {renderText("Ngày sinh:", "17/02/1996")}
      {renderText("Giới tính", "Đinh Tiến Thành")}
      {renderText("Tình trạng hôn nhân:", "Đinh Tiến Thành")}
      {renderText("Chiều cao:", "Đinh Tiến Thành")}
      {renderText("Cân nặng:", "Đinh Tiến Thành")}
      {renderText(
        "Nơi ở hiện tại:",
        "Số 10 Phạm Văn Bạch, Dịch Vọng, Cầu Giấy, Hà Nội"
      )}
      {renderText("Quê quán:", "Quất Lâm, Đồ Sơn, Hải Phòng")}
      {renderText("Số CMND/CCCD:", "Đinh Tiến Thành")}
      <DividerInfo text="THÔNG TIN LIÊN HỆ" />
      {renderText("Số điện thoại:", "0123 456 789")}
      {renderText("Email:", "thanhdt58@fpt.com.vn")}
      <DividerInfo text="KINH NGHIỆM LÀM VIỆC" />
      {renderText("Số năm kinh nghiệm:", "6 năm")}
      {renderText("Kỹ năng:", "ReactJS")}

      {renderText(
        "2019-2020:",
        "Công ty FPT Infomation System",
        "Senior UX/UI Designer"
      )}

      {renderText(
        "2020-2023:",
        "Công ty FPT Telecom",
        "Senior UX/UI Designer",
        "Đang làm việc"
      )}

      <DividerInfo text="HỌC VẤN" />
      {renderText(
        "2014 - 2019:",
        "Đại học Bách Khoa Hà Nội",
        "Toán Tin ứng dụng . Kỹ sư"
      )}
      {renderText(
        "2019 - 2023:",
        "Trung tâm công nghệ thông tin FPT",
        "Tin ứng dụng . Thực tập sinh",
        "Đang học"
      )}

      <DividerInfo text="KỲ VỌNG Ở CÔNG VIỆC MỚI" />
      {renderText("Mức lương mong muốn:", "30.000.000 - 40.000.000 VNĐ")}
      {renderText("Nơi làm mong muốn:", "Cầu Giấy")}

    </Grid>
  );
};
