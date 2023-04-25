import {
  Address,
  MaritalStatus,
  Sex,
  YearOfExperience,
} from "@/utils/enum";
import { fCurrency } from "@/utils/formatNumber";
import { fDate } from "@/utils/formatTime";
import { Grid, Divider } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import React from "react";

export const ApplicantInfo = ({ data }) => {
  const renderText = (title, value) => {
    return (
      <div>
        <span
          style={{
            display: "inline-flex",
            fontSize: 13,
            margin: "12px 0",
            color: "#5C6A82",
            width: "160px",
            fontWeight: 400,
          }}
        >
          {title}
        </span>

        <span
          style={{
            display: "inline-flex",
            width: "calc(100% - 160px)",
          }}
        >
          <ListItemText
            primary={value || "-"}
            sx={{
              "& .MuiTypography-root": {
                fontSize: "13px",
                fontWeight: 600,
                color: "#172B4D",
                whiteSpace: "pre-line"
              },
            }}
          />
        </span>
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
          margin: "12px 0",
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
    <Grid item>
      <DividerInfo text="THÔNG TIN CƠ BẢN" />
      {renderText("Họ và tên:", data?.fullName)}
      <div>
        <span
          style={{
            display: "inline-flex",
            fontSize: 13,
            margin: "12px 0",
            color: "#5C6A82",
            width: "160px",
            fontWeight: 400,
          }}
        >
          {"Ngành nghề:"}
        </span>

        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            fontSize: 13,
            fontWeight: 600,
            color: "#172B4D",
            width: "calc(100% - 160px)",
          }}
        >
          {data?.jobCategories?.length > 0
            ? data?.jobCategories.map((p, index) => {
              return (
                <div key={index}>
                  <ListItemText
                    primary={p?.name}
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#172B4D",
                      },
                    }}
                  />
                  {data?.jobCategories.length - 1 > index ? (
                    <span style={{ marginRight: 5 }}>,</span>
                  ) : (
                    ""
                  )}
                </div>
              );
            })
            : "-"}
        </span>
      </div>
      {renderText("Nguồn:", data?.jobSourceName)}
      {renderText("Ngày sinh:", data?.dateOfBirth ? fDate(data?.dateOfBirth) : '')}
      {renderText("Giới tính", Sex(data?.sex))}
      {renderText("Tình trạng hôn nhân:", MaritalStatus(data?.maritalStatus))}
      {renderText("Chiều cao:", `${data?.height ? data?.height + "  cm" : ''}`)}
      {renderText("Cân nặng:", `${data?.weight ? data?.weight + "  kg" : ''}`)}
      {renderText("Nơi ở hiện tại:", Address(data?.livingAddress))}
      {renderText("Quê quán:", Address(data?.homeTower))}
      {renderText("Số CMND/CCCD:", data?.identityNumber)}
      <DividerInfo text="THÔNG TIN LIÊN HỆ" />
      {renderText("Số điện thoại:", data?.phoneNumber)}
      {renderText("Email:", data?.email)}
      <DividerInfo text="KINH NGHIỆM LÀM VIỆC" />
      {renderText(
        "Số năm kinh nghiệm:",
        YearOfExperience(data?.yearOfExperience)
      )}
      {renderText("Kỹ năng:", data?.rawApplicantSkills)}
      {renderText("Kinh nghiệm làm việc:", data?.experience)}

      <DividerInfo text="HỌC VẤN" />
      {renderText("Học vấn:", data?.education)}
      {/* {renderText("2019 - 2023", data?.fullName)} */}

      <DividerInfo text="KỲ VỌNG Ở CÔNG VIỆC MỚI" />
      {renderText(
        "Mức lương mong muốn:",
        `${fCurrency(data?.expectedSalaryFrom) +
        "  -  " +
        fCurrency(data?.expectedSalaryTo) +
        " VNĐ"
        }`
      )}
      {renderText("Nơi làm mong muốn:", Address(data?.expectedWorkingAddress))}
    </Grid>
  );
};
