import * as XLSX from "xlsx";
import FileSaver from 'file-saver';
import * as XLSXSTYLE from "xlsx-js-style";
import { tableColumns } from "../others/columns";

const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

export const handleExportExcel = (dataFormat) => {
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