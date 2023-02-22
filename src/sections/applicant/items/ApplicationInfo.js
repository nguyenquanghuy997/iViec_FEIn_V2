import {
  Address,
  MaritalStatus,
  Sex,
  YearOfExperience,
} from "@/components/enum";
import { fDate, fYear } from "@/utils/formatTime";
import { Grid, Divider, Chip, Typography } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import React from "react";

export const ApplicantInfo = ({ data }) => {
  console.log("data", data);
  const datas = {
    applicationUserId: null,
    jobSourceId: "e5149f0b-640c-4df2-abd4-57554ab896ec",
    fullName: "Nguyễn Ngọc Thắng",
    slug: "nguyen-ngoc-thang-",
    portraitImage: "string",
    dateOfBirth: "1997-02-19T04:13:32.609Z",
    email: "nt@gmail.com",
    phoneNumber: "0386193342",
    identityNumber: "6984454545154",
    weight: 66,
    height: 160,
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
    expectedSalaryFrom: 8600000,
    expectedSalaryTo: 15000000,
    maritalStatus: 1,
    yearOfExperience: 1,
    sex: 1,
    applicantSkills: [
      {
        name: "Skill chém nhau",
        slug: "skill-chem-nhau-R2BWBexlk9",
        description: null,
        id: "01000000-ac12-0242-031c-08db119482c1",
      },
    ],
    applicantsWorkingExperiences: [
      {
        startTime: "2020-02-22T10:29:19.416Z",
        endTime: "2021-02-22T10:29:19.416Z",
        organizationName: "Thủy bon bon",
        position: "Giám đốc",
        experience:
          "Phân tích nghiệp vụ và thiết kế giao diện Website, App mobile cho các dự án của công ty",
      },
      {
        startTime: "2021-02-22T10:29:19.416Z",
        endTime: "2023-02-22T10:29:19.416Z",
        organizationName: "Công ty FPT Head Office",
        position: "Giám đốc",
        experience:
          "Phân tích nghiệp vụ và thiết kế giao diện Website, App mobile cho các dự án của công ty. Phân tích nghiệp vụ và thiết kế giao diện Website, App mobile cho các dự án của công ty",
      },
    ],
    jobCategories: [
      {
        name: "123",
        id: "23900294-5af3-4c96-b0da-b5887e011363",
      },
    ],
    academicLevel: null,
    rawApplicantSkills: null,
    createdTime: "2023-02-22T03:11:58.320734Z",
    isAvailable: true,
    id: "01000000-ac12-0242-0a9a-08db14828f27",
  };
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
                fontSize: 13,
                fontWeight: 600,
                color: "#172B4D",
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
      {renderText("Họ và tên:", datas?.fullName)}
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
          {datas?.jobCategories.length > 0
            ? datas?.jobCategories.map((p, index) => {
                return (
                  <>
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
                    {datas?.jobCategories.length - 1 > index ? (
                      <span style={{ marginRight: 5 }}>,</span>
                    ) : (
                      ""
                    )}
                  </>
                );
              })
            : "-"}
        </span>
      </div>
      {renderText("Nguồn:", datas?.jobSourceName)}
      {renderText("Ngày sinh:", fDate(datas?.dateOfBirth))}
      {renderText("Giới tính", Sex(datas?.sex))}
      {renderText("Tình trạng hôn nhân:", MaritalStatus(datas?.maritalStatus))}
      {renderText("Chiều cao:", datas?.height)}
      {renderText("Cân nặng:", datas?.weight)}
      {renderText("Nơi ở hiện tại:", Address(datas?.livingAddress))}
      {renderText("Quê quán:", Address(datas?.homeTower))}
      {renderText("Số CMND/CCCD:", datas?.identityNumber)}
      <DividerInfo text="THÔNG TIN LIÊN HỆ" />
      {renderText("Số điện thoại:", datas?.phoneNumber)}
      {renderText("Email:", datas?.email)}
      <DividerInfo text="KINH NGHIỆM LÀM VIỆC" />
      {renderText(
        "Số năm kinh nghiệm:",
        YearOfExperience(datas?.yearOfExperience)
      )}
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
          {"Kỹ năng:"}
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
          {datas?.applicantSkills.length > 0
            ? datas?.applicantSkills.map((p, index) => {
                return (
                  <>
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
                    {datas?.applicantSkills.length - 1 > index ? (
                      <span style={{ marginRight: 5 }}>,</span>
                    ) : (
                      ""
                    )}
                  </>
                );
              })
            : "-"}
        </span>
      </div>
      {datas?.applicantsWorkingExperiences.length > 0 &&
        datas?.applicantsWorkingExperiences.map((p) => {
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
                {fYear(p?.startTime)} - {fYear(p?.endTime)}
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
                <ListItemText
                  primary={
                    <>
                      {p?.organizationName}
                      <Chip
                        label={"Đang làm việc"}
                        size="small"
                        sx={{
                          color: "#388E3C",
                          backgroundColor: "#EFF3F6",
                          ml: 1,
                          fontSize: 10,
                          fontWeight: 500,
                        }}
                      />
                    </>
                  }
                  secondary={
                    <>
                      <Typography>{p?.position}</Typography>
                      <Typography>{p?.experience}</Typography>
                    </>
                  }
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#172B4D",
                      marginBottom: "4px",
                    },
                    "& .MuiListItemText-secondary .MuiTypography-root": {
                      fontSize: "13px",
                      fontSize: 13,
                      fontWeight: 400,
                      color: "#455570",
                      marginBottom: "4px",
                    },
                  }}
                />
              </span>
            </div>
          );
        })}

      <DividerInfo text="HỌC VẤN" />
      {renderText("2014 - 2019", datas?.fullName)}
      {renderText("2019 - 2023", datas?.fullName)}

      <DividerInfo text="KỲ VỌNG Ở CÔNG VIỆC MỚI" />
      {renderText("Mức lương mong muốn:", "30.000.000 - 40.000.000 VNĐ")}
      {renderText("Nơi làm mong muốn:", Address(datas?.expectedWorkingAddress))}
    </Grid>
  );
};
