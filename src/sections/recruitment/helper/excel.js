import * as XLSX from "xlsx";
import FileSaver from 'file-saver';
import * as XLSXSTYLE from "xlsx-js-style";
import {recruitmentColumns} from "@/sections/recruitment/others/columns";
import {RecruitmentProcessStatus, RecruitmentWorkingForm} from "@/utils/enum";
import {fDate} from "@/utils/formatTime";
import {LIST_EXPERIENCE_NUMBER} from "@/utils/formatString";

const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

export const handleExportExcel = (data) => {
  const dataFormat = data?.map((recruitment, index) => {
    const minSalary = recruitment.minSalary ? recruitment.minSalary : '';
    const maxSalary = recruitment.maxSalary ? recruitment.maxSalary : '';
    return {
      index: index + 1,
      name: recruitment.name || "",
      jobPosition: recruitment?.jobPosition?.name || "",
      organizationName: recruitment.organizationName || "",
      processStatus: RecruitmentProcessStatus(recruitment.processStatus) || "",
      startDate: fDate(recruitment?.startDate) || "",
      endDate: fDate(recruitment?.endDate) || "",
      createdTime: fDate(recruitment?.createdTime) || "",

      numOfApplied: recruitment?.numOfApplied || 0,
      numberPosition: recruitment?.numberPosition || 0,
      numOfPass: recruitment?.numOfPass || 0,
      numOfAcceptOffer: recruitment?.numOfAcceptOffer || 0,

      ownerName: recruitment?.ownerName || "",
      coOwnerName: recruitment?.coOwners?.map(item => item?.name).join(', ') || "",

      recruitmentAddresses: recruitment.recruitmentAddresses.map(item => item?.provinceName).join(', ') || "",
      recruitmentWorkingForms: recruitment.recruitmentWorkingForms.map(i => RecruitmentWorkingForm(i?.workingForm)).join(', ') || "",

      salary: `${minSalary ? minSalary + '-' : minSalary}` + maxSalary,
      candidateLevelName: recruitment.candidateLevelName || "",
      workExperience: LIST_EXPERIENCE_NUMBER.find(item => item.value === recruitment.workExperience)?.name || "",
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

  // for (let i = 1; i <= dataFormat.length; i++) {
  //     for (let j = 0; j < columns.length; j++) {
  //         ws[`${columns[j]}${i + 1}`].s = {
  //             font: {
  //                 name: "Palatino Linotype",
  //                 sz: 11
  //             },
  //             border: {
  //                 top: { style: 'thin' },
  //                 bottom: { style: 'thin' },
  //                 right: { style: 'thin' },
  //                 left: { style: 'thin' },
  //             },
  //             numFmt: '0'
  //         };
  //     }
  // }
  ws["!cols"] = columnWidth.map(column => ({wch: column}));
  ws["!rows"] = rowsHeight.map(rowHeight => ({hpx: rowHeight}))

  const wb = {Sheets: {'Danh sách tin tuyển dụng': ws}, SheetNames: ["Danh sách tin tuyển dụng"]};
  const excelBuffer = XLSXSTYLE.write(wb, {bookType: "xlsx", type: "array"});
  const dataExport = new Blob([excelBuffer], {type: fileType});
  FileSaver.saveAs(dataExport, 'Danh sách tin tuyển dụng' + fileExtension);
}