
// const getTextWidth = (text, font = "14px -apple-system") => {
//     const canvas = document.createElement("canvas");
//     const context = canvas.getContext("2d");
//     context.font = font;
//     const metrics = context.measureText(text);
//     return Math.round(metrics.width + 80);
//   };
  
// export const calculateColumnsWidth = (
//     columns,
//     source,
//     maxWidthPerCell = 500
//   ) => {
//     const columnsParsed = JSON.parse(JSON.stringify(columns));
  
  
//     const columnsWithWidth = columnsParsed.map(column =>
//       Object.assign(column, {
//         width: getTextWidth(column.title)
//       })
//     );
  
  
//     source.map(entry => {
//       columnsWithWidth.map((column, indexColumn) => {
//         const columnWidth = column.width;
//         const cellValue = Object.values(entry)[indexColumn];
  
//         // Get the string width based on chars length
//         let cellWidth = getTextWidth(cellValue);
  
//         // Verify if the cell value is smaller than column's width
//         if (cellWidth < columnWidth) cellWidth = columnWidth;
  
//         // Verify if the cell value width is bigger than our max width flag
//         if (cellWidth > maxWidthPerCell) cellWidth = maxWidthPerCell;
  
//         // Update the column width
//         columnsWithWidth[indexColumn].width = cellWidth;
//       });
//     });
  
//     // Sum of all columns width to determine the table max width
//     const tableWidth = columnsWithWidth
//       .map(column => column.width)
//       .reduce((a, b) => {
//         return a + b;
//       });
  
//     return {
//       columns: columnsWithWidth,
//       source,
//       tableWidth
//     };
//   };
  