import { Grid, Divider, Chip } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import React from "react";

export const ApplicantInfo = ({ data }) => {
  console.log('data',data)
  const datas = {
    applicationUserId: null,
    jobSourceId: "e5149f0b-640c-4df2-abd4-57554ab896ec",
    fullName: "Nguyễn Ngọc Thắng",
    slug: "nguyen-ngoc-thang-",
    portraitImage: "string",
    dateOfBirth: "1997-02-19T04:13:32.609Z",
    email: "nt@gmail.com",
    phoneNumber: "0386193342",
    identityNumber: null,
    weight: null,
    height: null,
    homeTower: {
      provinceId: "01000000-ac12-0242-daf3-08db10c3ab39",
      provinceName: "Hải Phòng",
      districtId: "01000000-ac12-0242-4391-08db10c3ab3a",
      districtName: "Thuỷ Nguyên",
      villageId: null,
      villageName: null,
      id: "01000000-ac12-0242-8589-08db14828f2a",
    },
    livingAddress: {
      provinceId: "01000000-ac12-0242-daf3-08db10c3ab39",
      provinceName: "Hải Phòng",
      districtId: "01000000-ac12-0242-4391-08db10c3ab3a",
      districtName: "Thuỷ Nguyên",
      villageId: null,
      villageName: null,
      id: "01000000-ac12-0242-8aae-08db14828f2a",
    },
    expectedWorkingAddress: {
      provinceId: "01000000-ac12-0242-daf3-08db10c3ab39",
      provinceName: "Hải Phòng",
      districtId: "01000000-ac12-0242-4391-08db10c3ab3a",
      districtName: "Thuỷ Nguyên",
      villageId: null,
      villageName: null,
      id: "01000000-ac12-0242-8d04-08db14828f2a",
    },
    curriculumVitae: null,
    experience: "Không làm sao có",
    education: "Đại học đường đời",
    expectedSalaryFrom: null,
    expectedSalaryTo: null,
    maritalStatus: null,
    yearOfExperience: 1,
    sex: 1,
    applicantSkills: [],
    jobCategories: [
      {
        name: 'thuybon',
        id: "23900294-5af3-4c96-b0da-b5887e011363",
      },
      {
        name: 'thuybon bon',
        id: "23900294-5af3-4c96-b0da-b5887e011363",
      },
    ],
    academicLevel: null,
    rawApplicantSkills: null,
    createdTime: "2023-02-22T03:11:58.320734Z",
    isAvailable: true,
    id: "01000000-ac12-0242-0a9a-08db14828f27",
  };
  const renderText = (title, value, label) => {
    return (
      <div>
        <span
          style={{
            display: "inline-flex",
            fontSize: 13,
            margin: "12px 0",
            color: "#5C6A82",
            width: "160px",
            fontWeight: 600,
          }}
        >
          {title}
        </span>

        <span
          style={{
            display: "inline-flex",
          }}
        >
          <ListItemText
            primary={value}
            sx={{
              mb: 1,
              "& .MuiTypography-root": {
                fontSize: "13px",
                fontSize: 13,
                fontWeight: 800,
                color: "#172B4D",
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
      {renderText("Họ và tên:", datas?.fullName)}
      <div>
        <span
          style={{
            display: "inline-flex",
            fontSize: 13,
            margin: "12px 0",
            color: "#5C6A82",
            width: "160px",
            fontWeight: 600,
          }}
        >
          {"Ngành nghề"}
        </span>

        <span
          style={{
            display: "inline-flex",
          }}
        >
          {datas?.jobCategories.map((p) => {
            <ListItemText
              primary={p?.name}
              sx={{
                mb: 1,
                "& .MuiTypography-root": {
                  fontSize: "13px",
                  fontSize: 13,
                  fontWeight: 800,
                  color: "#172B4D",
                },
              }}
            />;
          })}
        </span>
      </div>
      {renderText("Ngành nghề:")}
      {renderText("Nguồn:", datas?.fullName)}
      {renderText("Ngày sinh:", datas?.fullName)}
      {renderText("Giới tính", datas?.fullName)}
      {renderText("Tình trạng hôn nhân:", datas?.fullName)}
      {renderText("Chiều cao:", datas?.fullName)}
      {renderText("Cân nặng:", datas?.fullName)}
      {renderText("Nơi ở hiện tại:", datas?.fullName)}
      {renderText("Quê quán:", datas?.fullName)}
      {renderText("Số CMND/CCCD:", datas?.fullName)}
      <DividerInfo text="THÔNG TIN LIÊN HỆ" />
      {renderText("Số điện thoại:", datas?.fullName)}
      {renderText("Email:", datas?.fullName)}
      <DividerInfo text="KINH NGHIỆM LÀM VIỆC" />
      {renderText("Số năm kinh nghiệm:", datas?.fullName)}
      {renderText("Kỹ năng:", datas?.fullName)}

      {renderText("2019-2020:", datas?.fullName, datas?.fullName)}

      {renderText(
        "2020-2023:",
        datas?.fullName,
      )}

      <DividerInfo text="HỌC VẤN" />
      {renderText("2014 - 2019:", datas?.fullName, datas?.fullName)}
      {renderText(
        "2019 - 2023:",
        datas?.fullName,
      )}

      <DividerInfo text="KỲ VỌNG Ở CÔNG VIỆC MỚI" />
      {renderText("Mức lương mong muốn:", "30.000.000 - 40.000.000 VNĐ")}
      {renderText("Nơi làm mong muốn:", "Cầu Giấy")}
    </Grid>
  );
};
