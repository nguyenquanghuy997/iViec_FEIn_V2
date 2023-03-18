import * as XLSX from "xlsx";
import FileSaver from 'file-saver';
import * as XLSXSTYLE from "xlsx-js-style";
import {recruitmentColumns} from "@/sections/recruitment/others/columns";

const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

export const handleExportExcel = (data) => {
  const ws = XLSX.utils.json_to_sheet(data, {cellStyles: true});
  let columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T']
  let columnWidth = [5, 20, 20, 10, 20, 15, 20, 15, 20, 15, 20, 22, 20, 20, 20, 20, 28, 28, 25, 20];
  let rowsHeight = [30, ...Array(data.length).fill(16.5)];
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