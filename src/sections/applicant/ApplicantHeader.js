import * as XLSXSTYLE from "xlsx-js-style";
import * as XLSX from "xlsx";
import FileSaver from 'file-saver';
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import HeadingBar from "../../components/heading-bar/HeadingBar";
import Iconify from "@/components/Iconify";
import {FormProvider, RHFTextField} from "@/components/hook-form";
import {ButtonFilterStyle} from "@/sections/applicant/style";
import {ButtonInviteStyle} from "@/sections/organization/style";
import {tableColumns} from "@/sections/applicant/others/columns";
import {fDate} from "@/utils/formatTime";
import {Address, MaritalStatus, PipelineStateType, Sex, YearOfExperience} from "@/utils/enum";

const ApplicantHeader = ({data, methods, onOpenFilterForm, onSubmit, handleSubmit}) => {
    const handleExportExcel = () => {
        const dataFormat = data?.map((applicant, index) => {
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
                expectedSalary: `${applicant?.expectedSalaryFrom} - ${applicant?.expectedSalaryTo}` || "",
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
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' },
                    left: { style: 'thin' },
                },
                numFmt: '0'
            };
        })

        for (let i = 1; i <= dataFormat.length; i++) {
            for (let j = 0; j < columns.length; j++) {
                if(columns[j] === 'A' || columns[j] === 'C' || columns[j] === 'F' || columns[j] === 'H') {
                    ws[`${columns[j]}${i+1}`].s = {
                        font: {
                            name: "Palatino Linotype",
                            sz: 11
                        },
                        alignment: {
                            horizontal: 'center',
                        },
                        border: {
                            top: { style: 'thin' },
                            bottom: { style: 'thin' },
                            right: { style: 'thin' },
                            left: { style: 'thin' },
                        },
                    };
                } else {
                    ws[`${columns[j]}${i+1}`].s = {
                        font: {
                            name: "Palatino Linotype",
                            sz: 11
                        },
                        border: {
                            top: { style: 'thin' },
                            bottom: { style: 'thin' },
                            right: { style: 'thin' },
                            left: { style: 'thin' },
                        },
                        numFmt: '0'
                    };
                }
            }
        }

        ws["!cols"] = columnWidth.map(column => ({wch: column}));
        ws["!rows"] = rowsHeight.map(rowHeight => ({ hpx: rowHeight }))

        const wb = {Sheets: {'Danh sách úng viên': ws}, SheetNames: ["Danh sách úng viên"]};
        const excelBuffer = XLSXSTYLE.write(wb, {bookType: "xlsx", type: "array"});
        const dataExport = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(dataExport, 'Danh sách úng viên' + fileExtension);
    }

    return (<HeadingBar sx={{ mb: '28px', position: 'fixed', top: 8 }}>
        <Stack flexDirection="row" alignItems="center">
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <RHFTextField
                    name="searchKey"
                    placeholder="Tìm kiếm theo họ tên, email, SĐT ứng viên..."
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
            <ButtonInviteStyle className='button-invite' onClick={handleExportExcel} startIcon={<Iconify sx={{ height: '18px', width: '18px' }} icon="material-symbols:filter-alt-outline"/>}>
                Xuất Excel
            </ButtonInviteStyle>
        </Stack>
    </HeadingBar>);
};

export default ApplicantHeader;
