import {DeleteIcon, EditIcon} from "@/assets/ActionIcon";
import Content from "@/components/BaseComponents/Content";
import {ButtonDS} from "@/components/DesignSystem";
import Iconify from "@/components/Iconify";
import {Address, MaritalStatus, PipelineStateType, Sex, YearOfExperience} from "@/utils/enum";
import {Box, Divider, Drawer, IconButton, Link, Stack, Typography,} from "@mui/material";
import {memo, useState} from "react";
import {PATH_DASHBOARD} from "@/routes/paths";
import NextLink from "next/link";
import {fDate} from "@/utils/formatTime";
import * as XLSX from "xlsx";
import {tableColumns} from "@/sections/applicant/others/columns";
import * as XLSXSTYLE from "xlsx-js-style";
import FileSaver from 'file-saver';

const ApplicantBottomNav = ({selectedList, itemSelected, open, onClose, onOpenForm}) => {

  const [, setTypeConfirmMultiple] = useState("");
  const handleShowConfirmMultiple = (type) => {
    setTypeConfirmMultiple(type);
  };

  const handleOpenFormWithCurrentNode = () => {
    onOpenForm();
  };

  const handleExportExcel = (data) => {
    const dataFormat = data?.map((applicant, index) => {
      const minSalary = applicant.expectedSalaryFrom ? applicant.expectedSalaryFrom : '';
      const maxSalary = applicant.expectedSalaryTo ? applicant.expectedSalaryTo : '';
      return {
        index: index + 1,
        fullName: applicant.fullName || "",
        dateOfBirth: fDate(applicant.dateOfBirth) || "",
        sex: Sex(applicant.sex) || "",
        email: applicant.email || "",
        phoneNumber: applicant.phoneNumber || "",
        creatorName: applicant.creatorName || "",
        createdTime: fDate(applicant.createdTime) || "",
        jobSourceName: applicant.jobSourceName || "",
        jobCategories: applicant.jobCategories[0]?.name || "",
        identityNumber: `${applicant.identityNumber}` || "",
        maritalStatus: MaritalStatus(applicant.maritalStatus) || "",
        height: applicant.height || "",
        weight: applicant.weight || "",
        livingAddress: Address(applicant.livingAddress) || "",
        skills: applicant.applicantSkills[0]?.name || "",
        expectedSalary: `${minSalary ? minSalary + '-' : minSalary}` + maxSalary || "",
        expectedWorkingAddress: Address(applicant.expectedWorkingAddress) || "",
        yearOfExperience: YearOfExperience(applicant.yearOfExperience) || "",
        homeTower: Address(applicant.homeTower) || "",
        education: applicant.education || "",
        experience: applicant.experience || "",
        applyTime: fDate(applicant.createdTime) || "",
        ownerName: applicant.ownerName || "",
        recruitmentName: applicant.recruitmentName || "",
        organizationName: applicant.organizationName || "",
        jobPosition: 'No data',
        recruitmentPipelineState: PipelineStateType(applicant.recruitmentPipelineState, 1) || "",
        averageScore: 'No data',
        testDay: 'No data',
        point: 'No data',
        interviewDate1: 'No data',
        interviewResult1: 'No data',
        interviewDate2: 'No data',
        interviewResult2: 'No data',
        interviewDate3: 'No data',
        interviewResult3: 'No data',
        interviewDate4: 'No data',
        interviewResult4: 'No data',
        interviewDate5: 'No data',
        interviewResult5: 'No data',
      }
    });
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const ws = XLSX.utils.json_to_sheet(dataFormat, {cellStyles: true});
    let columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'AA', 'AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AI', 'AJ', 'AK', 'AL', 'AM', 'AN', 'AO']
    let columnWidth = [5, 20, 15, 10, 20, 15, 20, 12, 12, 15, 20, 22, 15, 15, 16, 10, 28, 28, 25, 20, 20, 25, 20, 25, 20, 10, 18, 20, 20, 20, 20, 25, 26, 25, 26, 25, 26, 25, 26, 25, 26];
    let rowsHeight = [30, ...Array(dataFormat.length).fill(16.5)];
    tableColumns.forEach((column, index) => {
      ws[`${columns[index]}1`].v = column;
      ws[`${columns[index]}1`].s = {
        font: {
          name: "Palatino Linotype",
          bold: true,
          sz: 12
        },
        alignment: {wrapText: true, vertical: 'center'},
        fill: {
          fgColor: {rgb: "B7DEE8"},
        },
        border: {
          top: {style: 'thin'},
          bottom: {style: 'thin'},
          right: {style: 'thin'},
          left: {style: 'thin'},
        },
        numFmt: '0'
      };
    })

    for (let i = 1; i <= dataFormat.length; i++) {
      for (let j = 0; j < columns.length; j++) {
        if (columns[j] === 'A' || columns[j] === 'C' || columns[j] === 'F' || columns[j] === 'H') {
          ws[`${columns[j]}${i + 1}`].s = {
            font: {
              name: "Palatino Linotype",
              sz: 11
            },
            alignment: {
              horizontal: 'center',
            },
            border: {
              top: {style: 'thin'},
              bottom: {style: 'thin'},
              right: {style: 'thin'},
              left: {style: 'thin'},
            },
          };
        } else {
          ws[`${columns[j]}${i + 1}`].s = {
            font: {
              name: "Palatino Linotype",
              sz: 11
            },
            border: {
              top: {style: 'thin'},
              bottom: {style: 'thin'},
              right: {style: 'thin'},
              left: {style: 'thin'},
            },
            numFmt: '0'
          };
        }
      }
    }

    ws["!cols"] = columnWidth.map(column => ({wch: column}));
    ws["!rows"] = rowsHeight.map(rowHeight => ({hpx: rowHeight}))

    const wb = {Sheets: {'Danh sách úng viên': ws}, SheetNames: ["Danh sách úng viên"]};
    const excelBuffer = XLSXSTYLE.write(wb, {bookType: "xlsx", type: "array"});
    const dataExport = new Blob([excelBuffer], {type: fileType});
    FileSaver.saveAs(dataExport, 'Danh sách úng viên' + fileExtension);
  }

  return (
      <Drawer
          anchor={"bottom"}
          open={open}
          variant="persistent"
          onClose={onClose}
      >
        <Content>
          <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
          >
            <Stack flexDirection="row" alignItems="center">
              {selectedList.length === 1 && (
                  <>
                    <ButtonDS
                        type="submit"
                        variant="contained"
                        tittle="Chi tiết"
                        sx={{
                          marginRight: "16px",
                          textTransform: "none",
                          padding: "6px 11px",
                        }}
                        href={"recruitment/"}
                        icon={
                          <Iconify
                              icon={
                                "material-symbols:arrow-circle-right-outline-rounded"
                              }
                              width={20}
                              height={20}
                              color="#FDFDFD"
                              mr={1}
                          />
                        }
                    />
                    <ButtonDS
                        type="submit"
                        variant="contained"
                        tittle="Xem tin tuyển dụng"
                        sx={{
                          color: "#455570",
                          backgroundColor: "#F3F4F6",
                          boxShadow: "none",
                          ":hover": {
                            backgroundColor: "#E7E9ED",
                          },
                          marginRight: "12px",
                          textTransform: "none",
                          padding: "6px 11px",
                        }}
                        onClick={() => handleShowConfirmMultiple("CloseRecruitment")}
                        icon={
                          <Iconify
                              icon={"ri:share-box-line"}
                              width={20}
                              height={20}
                              color="#5C6A82"
                              mr={1}
                          />
                        }
                    />
                  </>
              )}
              <ButtonDS
                  type="submit"
                  variant="contained"
                  tittle="Đóng tin"
                  sx={{
                    color: "#455570",
                    backgroundColor: "#F3F4F6",
                    boxShadow: "none",
                    ":hover": {
                      backgroundColor: "#E7E9ED",
                    },
                    marginRight: "12px",
                    textTransform: "none",
                    padding: "6px 11px",
                  }}
                  onClick={() => handleShowConfirmMultiple("CloseRecruitment")}
                  icon={
                    <Iconify
                        icon={"ri:file-copy-fill"}
                        width={20}
                        height={20}
                        color="#5C6A82"
                        mr={1}
                    />
                  }
              />
              {selectedList.length === 1 && (
                  <NextLink href={PATH_DASHBOARD.recruitment.update(selectedList[0])} passHref>
                    <Link>
                      <IconButton size='small' sx={{color: '#8A94A5', mx: 1}}>
                        <EditIcon/>
                      </IconButton>
                    </Link>
                  </NextLink>
              )}
              <ButtonDS
                  type="submit"
                  sx={{
                    padding: "8px",
                    minWidth: "unset",
                    backgroundColor: "#fff",
                    boxShadow: "none",
                    ":hover": {
                      backgroundColor: "#EFF3F7",
                    },
                    textTransform: "none",
                    marginLeft: "12px",
                  }}
                  onClick={() => handleExportExcel(itemSelected)}
                  icon={
                    <Iconify
                        icon={"vscode-icons:file-type-excel"}
                        width={20}
                        height={20}
                    />
                  }
              />
              {selectedList.length === 1 && (
                  <>
                    <ButtonDS
                        type="submit"
                        sx={{
                          padding: "8px",
                          minWidth: "unset",
                          backgroundColor: "#fff",
                          boxShadow: "none",
                          ":hover": {
                            backgroundColor: "#EFF3F7",
                          },
                          textTransform: "none",
                          marginLeft: "12px",
                        }}
                        onClick={() => handleOpenFormWithCurrentNode()}
                        icon={
                          <Iconify
                              icon={"ri:file-copy-fill"}
                              width={20}
                              height={20}
                              color="#5C6A82"
                          />
                        }
                    />
                    <IconButton
                        size="small"
                        sx={{color: "#1976D2", mx: 1}}
                        onClick={() => handleShowConfirmMultiple()}
                    >
                      <DeleteIcon/>
                    </IconButton>
                  </>
              )}
            </Stack>
            <Box sx={{display: "flex", alignItems: "center"}}>
              <Typography>Đã chọn: {selectedList.length}</Typography>
              <Divider
                  orientation="vertical"
                  flexItem
                  sx={{mx: 2, width: "2px", backgroundColor: "#E7E9ED"}}
              />
              <IconButton size="medium" onClick={onClose}>
                <Iconify icon="ic:baseline-close"/>
              </IconButton>
            </Box>
          </Box>
        </Content>
      </Drawer>
  );
};

export default memo(ApplicantBottomNav);
