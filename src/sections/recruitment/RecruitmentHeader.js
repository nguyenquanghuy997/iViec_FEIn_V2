import {useState} from "react";
import * as XLSXSTYLE from "xlsx-js-style";
import * as XLSX from "xlsx";
import FileSaver from 'file-saver';
import {useRouter} from "next/router";
import {get} from "lodash";
import HeadingBar from "../../components/heading-bar/HeadingBar";
import Iconify from "@/components/Iconify";
import {FormProvider, RHFTextField} from "@/components/hook-form";
import {InputAdornment, Stack} from "@mui/material";
import {ButtonFilterStyle} from "@/sections/applicant/style";
import {BoxFlex} from "@/sections/emailform/style";
import {ButtonInviteStyle} from "@/sections/organization/style";
import {PATH_DASHBOARD} from "@/routes/paths";
import {useGetOrganizationQuery} from "@/sections/report/reportSlice";
import OrganizationSettingModal from "@/sections/recruitment/modals/OrganizationSettingModal";
import {RecruitmentProcessStatus, RecruitmentWorkingForm} from "@/utils/enum";
import {fDate} from "@/utils/formatTime";
import {recruitmentColumns} from "@/sections/recruitment/others/columns";

const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

const RecruitmentHeader = ({data, methods, onOpenFilterForm, onSubmit, handleSubmit}) => {
  const router = useRouter();
  const {data: Organization = {}} = useGetOrganizationQuery();

  const [isOpenSettingOrganization, setIsOpenSettingOrganization] = useState(false);

  const handleCheckNavigate = () => {
    if (get(Organization, 'isActivated')) {
      return router.push(PATH_DASHBOARD.recruitment.create);
    } else {
      setIsOpenSettingOrganization(true)
    }
  }

    const handleExportExcel = () => {
        const dataFormat = data?.map((recruitment, index) => {
            return {
                index: index + 1,
                name: recruitment.name || "",
                jobPosition: recruitment.jobPosition || "",
                organizationName: recruitment.organizationName || "",
                processStatus: RecruitmentProcessStatus(recruitment.processStatus) || "",
                startDate: fDate(recruitment.startDate) || "",
                endDate: fDate(recruitment.endDate) || "",
                createdTime: fDate(recruitment.createdTime) || "",
                numberApply: recruitment.numberApply || "",
                numberPosition: recruitment.numberPosition || "",
                numberJoin: recruitment.numberApply || "",
                numberView: recruitment.numberView || "",
                ownerName: recruitment.ownerName || "",
                ownerName2: recruitment.ownerName || "",
                recruitmentAddresses: recruitment.recruitmentAddresses.map(item => item.provinceName).join(', ') || "",
                recruitmentWorkingForms: recruitment.recruitmentWorkingForms.map(i => RecruitmentWorkingForm(i.workingForm)).join(', ') || "",
                salary: `${recruitment.minSalary} - ${recruitment.maxSalary}` || "",
                candidateLevelId: recruitment.candidateLevelId || "",
                workExperience: recruitment.workExperience || "",
                language: recruitment.workingLanguageName || "Tiếng Việt",
            }
        });
        const ws = XLSX.utils.json_to_sheet(dataFormat, {cellStyles: true});
        let columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T']
        let columnWidth = [5, 20, 20, 10, 20, 15, 20, 15, 20, 15, 20, 22, 20, 20, 20, 20, 28, 28, 25, 20];
        let rowsHeight = [30, ...Array(dataFormat.length).fill(16.5)];
        recruitmentColumns.forEach((column, index) => {
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
        ws["!cols"] = columnWidth.map(column => ({wch: column}));
        ws["!rows"] = rowsHeight.map(rowHeight => ({hpx: rowHeight}))

        const wb = {Sheets: {'Danh sách tin tuyển dụng': ws}, SheetNames: ["Danh sách tin tuyển dụng"]};
        const excelBuffer = XLSXSTYLE.write(wb, {bookType: "xlsx", type: "array"});
        const dataExport = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(dataExport, 'Danh sách tin tuyển dụng' + fileExtension);
    }

  return (
      <HeadingBar sx={{ mb: '28px', position: 'fixed', top: 8 }}>
        <BoxFlex>
          <Stack flexDirection="row" alignItems="center">
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <RHFTextField
                  name="searchKey"
                  placeholder="Tìm kiếm theo tiêu đề tin tuyển dụng..."
                  sx={{minWidth: '510px'}}
                  InputProps={{
                    startAdornment: (
                        <InputAdornment position='start' sx={{ ml: 1.5 }}>
                          <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }}/>
                        </InputAdornment>
                    ),
                  }}
              />
            </FormProvider>
            <ButtonFilterStyle onClick={onOpenFilterForm} startIcon={<Iconify sx={{ height: '18px', width: '18px' }} icon="material-symbols:filter-alt-outline"/>}>
              Bộ lọc
            </ButtonFilterStyle>
          </Stack>
          <Stack flexDirection={"row"}>
              <ButtonInviteStyle className="button-invite" startIcon={<Iconify icon="material-symbols:download"/>} onClick={handleExportExcel}>
                 Export
              </ButtonInviteStyle>
              <ButtonInviteStyle className="button-invite" startIcon={<Iconify icon="material-symbols:add"/>} onClick={handleCheckNavigate}>
                  Đăng tin tuyển dụng
              </ButtonInviteStyle>
          </Stack>
        </BoxFlex>

        <OrganizationSettingModal
            onClose={() => setIsOpenSettingOrganization(false)}
            isOpenSettingOrganization={isOpenSettingOrganization}
        />

      </HeadingBar>
  );
};

export default RecruitmentHeader;
