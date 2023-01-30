import { useGetOrganizationQuery } from "./reportSlice";
import DropdownTree from "@/components/DropdownTree";
import SvgIcon from "@/components/SvgIcon";
import useSettings from "@/hooks/useSettings";
import { Container } from "@mui/system";
import { isSameDay } from "date-fns";
import { vi } from "date-fns/locale";
import * as FileSaver from "file-saver";
import moment from "moment";
import { useEffect, useState } from "react";
import { createStaticRanges, DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import * as XLSX from "xlsx";

const LIST_DATE_RANGE = [
  {
    label: "Tuần này",
    range: () => ({
      startDate: new Date(moment().startOf("week").add(1, "day").valueOf()),
      endDate: new Date(moment().endOf("week").add(1, "day").valueOf()),
    }),
  },
  {
    label: "Tháng này",
    range: () => ({
      startDate: new Date(moment().startOf("month").valueOf()),
      endDate: new Date(moment().endOf("month").valueOf()),
    }),
  },
  {
    label: "Quý này",
    range: () => ({
      startDate: new Date(moment().startOf("quarter").valueOf()),
      endDate: new Date(moment().endOf("quarter").valueOf()),
    }),
  },
  {
    label: "Năm nay",
    range: () => ({
      startDate: new Date(moment().startOf("year").valueOf()),
      endDate: new Date(moment().endOf("year").valueOf()),
    }),
  },
];

export const ReportHeader = ({
  list = [],
  children,
  onUpdateData,
  onUpdateCompareText,
}) => {
  const { themeStretch } = useSettings();

  // state
  const [showDeptPicker, setShowDeptPicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [currentDept, setCurrentDept] = useState(null);
  const [currentDateRange, setCurrentDateRange] = useState({
    ...LIST_DATE_RANGE[0].range(),
    key: "selection",
  });
  const { startDate, endDate } = currentDateRange;
  const totalDate = moment(endDate).diff(moment(startDate), "days") + 1;
  const startDateCompare = moment(startDate)
    .subtract(totalDate, "day")
    .valueOf();
  const endDateCompare = moment(endDate).subtract(totalDate, "day").valueOf();
  const textCompare = `So sánh với: ${moment(startDateCompare).format(
    "DD/MM/YYYY"
  )} - ${moment(endDateCompare).format("DD/MM/YYYY")}`;

  // api
  const { data: organizationQueryRes } = useGetOrganizationQuery();
  const { DataList: organization } = organizationQueryRes || {};

  // handle
  const pressExport = () => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const ws = XLSX.utils.json_to_sheet(list);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, children + fileExtension);
  };

  // callback
  const onDeptSelect = (item) => {
    setShowDeptPicker(false);
    setCurrentDept(item?.Id !== currentDept?.Id ? item : null);
  };

  const onDateSelect = ({ selection }) => {
    if (selection) {
      setCurrentDateRange(selection);
      if (!isSameDay(selection.startDate, selection.endDate))
        setShowDatePicker(false);
    }
  };

  // render
  const renderButton = (child, child2, onPress) => {
    return (
      <div style={{ position: "relative" }}>
        <div
          style={{
            height: 36,
            minWidth: 36,
            borderRadius: 4,
            paddingLeft: 10,
            paddingRight: 10,
            marginLeft: 16,
            border: "1px solid #EBECF4",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={onPress}
        >
          {child}
        </div>

        {child2}
      </div>
    );
  };

  const renderText = (title, value) => {
    return (
      <span
        style={{
          fontSize: 15,
          fontWeight: !value ? "600" : "500",
          marginLeft: !value ? 10 : undefined,
          marginRight: 10,
          userSelect: "none",
        }}
      >
        {title}
        {": "}
        {!!value && <span style={{ fontWeight: "700" }}>{value}</span>}
      </span>
    );
  };

  const renderDropdownIcon = () => {
    return (
      <SvgIcon>
        {` <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg" > <path d="M6 5.5L0.803848 0.25H11.1962L6 5.5Z" fill="#393B3E" /> </svg>`}
      </SvgIcon>
    );
  };

  // effect
  useEffect(() => {
    onUpdateCompareText?.(textCompare);
  }, [textCompare]);

  useEffect(() => {
    if (startDate !== endDate) {
      const queries = {
        item: {
          StartDate: moment(startDate).format("YYYY-MM-DD"),
          EndDate: moment(endDate).format("YYYY-MM-DD"),
          StartDateCompare: moment(startDateCompare).format("YYYY-MM-DD"),
          EndDateCompare: moment(endDateCompare).format("YYYY-MM-DD"),
        },
        GetfilterRules: [
          {
            field: "Organ.Id",
            op: "and_in_int",
            value: currentDept?.Id,
          },
        ],
      };
      onUpdateData?.(queries);
    }
  }, [JSON.stringify(currentDept), JSON.stringify(currentDateRange)]);

  return (
    <div
      style={{
        background: "#fff",
        paddingTop: 16,
        paddingBottom: 16,
        boxShadow: "inset 0px -1px 0px #DBE6EB",
      }}
    >
      <Container maxWidth={themeStretch ? false : "xl"}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <span
            style={{
              fontSize: 22,
              fontWeight: "600",
            }}
          >
            {children}
          </span>
          <div style={{ flex: 1 }} />

          {Array.isArray(list) && list.length
            ? renderButton(
                <SvgIcon>
                  {`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" > <path d="M13.6001 9.60001V12.3496C13.6001 12.5138 13.5678 12.6764 13.505 12.8281C13.4421 12.9798 13.35 13.1177 13.2339 13.2338C13.1178 13.3499 12.98 13.442 12.8283 13.5048C12.6765 13.5677 12.514 13.6 12.3497 13.6H3.64975C3.31826 13.5998 3.00042 13.468 2.7661 13.2335C2.53177 12.999 2.40015 12.6811 2.40015 12.3496V9.60001" stroke="#2F2F2F" stroke-width="1.66667" stroke-miterlimit="10" stroke-linecap="round" /> <path d="M8 2.37501V7.97501" stroke="#2F2F2F" stroke-width="1.66667" stroke-miterlimit="10" stroke-linecap="round" /> <path d="M4.77515 7.18063L7.99995 9.59982L11.1871 7.19982" stroke="#2F2F2F" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" /> </svg>`}
                </SvgIcon>,
                null,
                pressExport
              )
            : null}

          {/* {renderButton(
            <>
              {renderText("Trạng thái", "Tất cả")}

              {renderDropdownIcon()}
            </>
          )} */}

          {renderButton(
            <>
              {renderText("Phòng ban", currentDept?.Name || "Tất cả")}

              {renderDropdownIcon()}
            </>,
            showDeptPicker ? (
              <div
                style={{
                  right: 0,
                  width: 200,
                  height: 200,
                  zIndex: 100,
                  overflow: "scroll",
                  position: "absolute",
                  top: "calc(100% + 10px)",
                  border: "1px solid #EBECF4",
                  background: "#fff",
                }}
              >
                <DropdownTree data={organization} onSelect={onDeptSelect} />
              </div>
            ) : null,
            () => {
              setShowDatePicker(false);
              setShowDeptPicker(!showDeptPicker);
            }
          )}

          {renderButton(
            <>
              <SvgIcon>
                {`<svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg" > <path d="M1.06177 6.26955H12.9444" stroke="#2F2F2F" stroke-linecap="round" stroke-linejoin="round" /> <path d="M9.96123 8.87313H9.96741" stroke="#2F2F2F" stroke-linecap="round" stroke-linejoin="round" /> <path d="M7.00322 8.87313H7.0094" stroke="#2F2F2F" stroke-linecap="round" stroke-linejoin="round" /> <path d="M4.03862 8.87313H4.0448" stroke="#2F2F2F" stroke-linecap="round" stroke-linejoin="round" /> <path d="M9.96123 11.4642H9.96741" stroke="#2F2F2F" stroke-linecap="round" stroke-linejoin="round" /> <path d="M7.00322 11.4642H7.0094" stroke="#2F2F2F" stroke-linecap="round" stroke-linejoin="round" /> <path d="M4.03862 11.4642H4.0448" stroke="#2F2F2F" stroke-linecap="round" stroke-linejoin="round" /> <path d="M9.69576 1.33337V3.52723" stroke="#2F2F2F" stroke-linecap="round" stroke-linejoin="round" /> <path d="M4.31027 1.33337V3.52723" stroke="#2F2F2F" stroke-linecap="round" stroke-linejoin="round" /> <path fill-rule="evenodd" clip-rule="evenodd" d="M9.82551 2.38617H4.18064C2.22285 2.38617 1 3.47679 1 5.48152V11.5146C1 13.5509 2.22285 14.6667 4.18064 14.6667H9.81933C11.7833 14.6667 13 13.5698 13 11.5651V5.48152C13.0062 3.47679 11.7895 2.38617 9.82551 2.38617Z" stroke="#2F2F2F" stroke-linecap="round" stroke-linejoin="round" /> </svg>`}
              </SvgIcon>
              <div style={{ width: 10 }} />

              {renderText(
                `Thời gian`,
                `${moment(currentDateRange.startDate).format("DD/MM/YYYY")} - ${
                  !isSameDay(
                    currentDateRange.startDate,
                    currentDateRange.endDate
                  )
                    ? moment(currentDateRange.endDate).format("DD/MM/YYYY")
                    : ""
                }`
              )}

              {renderDropdownIcon()}
            </>,
            showDatePicker ? (
              <div
                style={{
                  right: 0,
                  zIndex: 100,
                  position: "absolute",
                  top: "calc(100% + 10px)",
                  border: "1px solid #EBECF4",
                }}
              >
                <DateRangePicker
                  locale={vi}
                  ranges={[currentDateRange]}
                  inputRanges={[]}
                  onChange={onDateSelect}
                  staticRanges={createStaticRanges(LIST_DATE_RANGE)}
                />
              </div>
            ) : null,
            () => {
              setShowDeptPicker(false);
              setShowDatePicker(!showDatePicker);
            }
          )}
        </div>
      </Container>
    </div>
  );
};
