import SvgIcon from "@/components/SvgIcon";
import { TableCell, TableRow } from "@mui/material";

export const ReportTableRow = (props) => {
  const renderButtonViewTable = (i) => {
    return (
      <span
        style={{
          userSelect: "none",
          cursor: i.onPress ? "pointer" : undefined,
        }}
        onClick={i.onPress}
      >
        {i.value}
      </span>
    );
  };
  const renderValueWithDot = (i) => {
    return (
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            marginRight: 8,
            borderRadius: 8,
            backgroundColor:
              i.delta === 2
                ? "#23B15C"
                : i.delta === 7
                ? "#c3c5cc"
                : "transparent",
          }}
        />
        <span style={{ flex: 1, display: "flex" }}>{i.value}</span>
      </div>
    );
  };

  const renderButtonViewChart = (i) => {
    return (
      <div
        style={{
          borderRadius: 100,
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          padding: "4px 8px",
          background: "#01B6A7",
          cursor: "pointer",
        }}
        onClick={i.onPress}
      >
        <span style={{ color: "#fff", marginRight: 8, userSelect: "none" }}>
          {"Xem biểu đồ"}
        </span>
        <SvgIcon>
          {`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" > <path d="M14 15.1667H2C1.72667 15.1667 1.5 14.94 1.5 14.6667C1.5 14.3933 1.72667 14.1667 2 14.1667H14C14.2733 14.1667 14.5 14.3933 14.5 14.6667C14.5 14.94 14.2733 15.1667 14 15.1667Z" fill="white" /> <path d="M3.73333 5.58658H2.66667C2.3 5.58658 2 5.88658 2 6.25325V11.9999C2 12.3666 2.3 12.6666 2.66667 12.6666H3.73333C4.1 12.6666 4.4 12.3666 4.4 11.9999V6.25325C4.4 5.87991 4.1 5.58658 3.73333 5.58658Z" fill="white" /> <path d="M8.53338 3.45996H7.46672C7.10005 3.45996 6.80005 3.75996 6.80005 4.12663V12C6.80005 12.3666 7.10005 12.6666 7.46672 12.6666H8.53338C8.90005 12.6666 9.20005 12.3666 9.20005 12V4.12663C9.20005 3.75996 8.90005 3.45996 8.53338 3.45996Z" fill="white" /> <path d="M13.3334 1.33334H12.2668C11.9001 1.33334 11.6001 1.63334 11.6001 2.00001V12C11.6001 12.3667 11.9001 12.6667 12.2668 12.6667H13.3334C13.7001 12.6667 14.0001 12.3667 14.0001 12V2.00001C14.0001 1.63334 13.7001 1.33334 13.3334 1.33334Z" fill="white" /> </svg>`}
        </SvgIcon>
      </div>
    );
  };

  return (
    <TableRow hover>
      {Array.isArray(props.children) &&
        props.children.map((i) => {
          const isButton =
            i.value === undefined && typeof i.onPress === "function";
          return (
            <TableCell
              align="left"
              width={isButton ? undefined : `${i.size}%`}
              style={isButton ? { display: "flex" } : {}}
            >
              {isButton
                ? renderButtonViewChart(i)
                : typeof i.delta === "number"
                ? renderValueWithDot(i)
                : renderButtonViewTable(i)}
            </TableCell>
          );
        })}
    </TableRow>
  );
};
