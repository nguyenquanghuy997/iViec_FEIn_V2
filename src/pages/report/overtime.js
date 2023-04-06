import Page from "@/components/Page";
import SvgIcon from "@/components/SvgIcon";
import { PERMISSION_PAGES } from "@/config";
import useSettings from "@/hooks/useSettings";
import Layout from "@/layouts";
import {
  ReportCard,
  ReportHeader,
  ReportModal,
  ReportTable,
  ReportTableRow,
} from "@/sections/report";
import {
  useReportOverTimeChartMutation,
  useReportOverTimeItemTableMutation,
  useReportOverTimeTableMutation,
} from "@/sections/report/reportSlice";
import { Card, Container } from "@mui/material";
import moment from "moment";
import dynamic from "next/dynamic";
import * as qs from "qs";
import { useEffect, useRef, useState } from "react";

const Chart = dynamic(() => import("../../sections/report/chart3"), {
  ssr: false,
});

Setting.getLayout = function getLayout(pageProps, page) {
  return <Layout permissions={PERMISSION_PAGES.report} {...pageProps}>{page}</Layout>;
};

const TABLE_HEAD_PARENT = [
  { id: "report1", label: "Tin tuyển dụng", align: "left" },
  { id: "report2", label: "Phòng ban", align: "left" },
  { id: "report3", label: "Tổng ứng viên", align: "left" },
  { id: "report4", label: "Thời gian tuyển dụng", align: "left" },
];

const TABLE_HEAD_CHILD = [
  { id: "report1", label: "Họ và tên", align: "left" },
  { id: "report2", label: "Ngày sinh", align: "left" },
  { id: "report3", label: "Email", align: "left" },
  { id: "report4", label: "Số điện thoại", align: "left" },
  { id: "report5", label: "Ngày ứng tuyển", align: "left" },
  { id: "report6", label: "Nhân viên phụ trách", align: "left" },
];

function ReportItem({ data, filter }) {
  // state
  const [showTable, setShowTable] = useState(false);

  // query
  const [fetchTable, { data: dataTable, isLoading: isTableLoading }] =
    useReportOverTimeItemTableMutation();
  const { DataList = [], TotalRecords = 0 } = dataTable || {};

  // handle
  const onPressRow = () => {
    setShowTable(true);
  };

  const onUpdateData = (e) => {
    const body = {
      ...e.paging,
      IN_SORT: e.sort,
      item: {
        ...filter.item,
        RecruitmentId: data.RecruitmentId,
      },
      GetfilterRules: [
        ...e.search.map((i) => ({
          ...i,
          field: "App.FullName",
        })),
      ],
    };
    fetchTable(qs.stringify(body)).unwrap();
  };

  // render
  const renderRow = (data) => {
    return (
      <ReportTableRow>
        {[
          { size: 100 / 6, value: data.FullName },
          { size: 100 / 6, value: moment(data.DoB).format("DD/MM/YYYY") },
          { size: 100 / 6, value: data.Email },
          {
            size: 100 / 6,
            value: data.CellPhoneNumber,
          },
          {
            size: 100 / 6,
            value: moment(data.CreatedDate).format("DD/MM/YYYY"),
          },
          {
            size: 100 / 6,
            value: data.BranchHrEmail,
          },
        ]}
      </ReportTableRow>
    );
  };

  return (
    <>
      <ReportTableRow>
        {[
          { size: 44, delta: data.ProcessStatus, value: data.Title },
          { size: 18, value: data.BranchOrganiName },
          { size: 18, value: data.CountApply, onPress: onPressRow },
          {
            size: 20,
            value: data.StartDateString + " - " + data.EndDateString,
          },
        ]}
      </ReportTableRow>

      <ReportModal
        big
        title={data.Title}
        subTitle={"Danh sách ứng viên ứng tuyển"}
        modalProps={{
          open: showTable,
          onBackdropClick: () => setShowTable(false),
        }}
      >
        <ReportTable
          tableProps={{
            columns: TABLE_HEAD_CHILD,
            dataSource: DataList,
            isLoading: isTableLoading,
            TableRowComp: renderRow,
          }}
          pageProps={{
            totalRecord: TotalRecords,
          }}
          onUpdateData={onUpdateData}
        />
      </ReportModal>
    </>
  );
}

export default function Setting() {
  const { themeStretch } = useSettings();

  // ref
  const chartRef = useRef(null);
  const tableRef = useRef(null);
  const excelRef = useRef(null);

  // state
  const [textCompare, setTextCompare] = useState("");

  // query
  const [fetchChart, { data: dataChart }] = useReportOverTimeChartMutation();
  const { TotalRegister = 0, TotalRegisterCompare = 0 } =
    dataChart?.DataList?.[0] || {};

  const [fetchTable, { data: dataTable, isLoading: isTableLoading }] =
    useReportOverTimeTableMutation();
  const { DataList = [], TotalRecords = 0 } = dataTable || {};

  const [fetchExcel, { data: dataExcel }] = useReportOverTimeTableMutation();

  const calcPercent = (a, b) => {
    return (((a - b) / (b || 1)) * 100).toFixed();
  };

  const fetchData = (chartQueries, tableQueries) => {
    if (chartQueries) {
      chartRef.current = chartQueries;
      fetchChart(qs.stringify(chartQueries)).unwrap();
    }
    if (tableQueries) {
      tableRef.current = tableQueries;
      const body = {
        ...chartRef.current,
        ...tableQueries.paging,
        GetfilterRules: [
          ...(chartRef.current.GetfilterRules || []),
          ...tableQueries.search,
        ],
        IN_SORT:
          tableQueries.sort === "popular" ? "C1.CountApply" : "C1.StartDate",
      };
      excelRef.current = body;
      fetchTable(qs.stringify(body)).unwrap();
    }
  };
  const renderItem = (icon, title, value, delta) => {
    return (
      <ReportCard
        icon={icon}
        title={title}
        value={value}
        delta={delta}
        tooltip={textCompare}
      />
    );
  };

  // effect
  useEffect(() => {
    TotalRecords &&
      fetchExcel(
        qs.stringify({
          ...excelRef.current,
          pageIndex: 1,
          PageSize: TotalRecords,
        })
      ).unwrap();
  }, [JSON.stringify(dataTable)]);

  return (
    <Page
      title={"Báo cáo ứng viên theo thời gian"}
      style={{ height: "100%", background: "#FAFBFD" }}
    >
      <ReportHeader
        list={
          !isTableLoading
            ? dataExcel?.DataList?.map((i) => ({
                "Tin tuyển dụng": i.Title,
                "Phòng ban": i.BranchOrganiName,
                "Tổng ứng viên": i.CountApply,
                "Thời gian tuyển dụng":
                  i.StartDateString + " - " + i.EndDateString,
              }))
            : []
        }
        onUpdateData={(e) => fetchData(e, tableRef.current)}
        onUpdateCompareText={setTextCompare}
      >
        {"Báo cáo ứng viên theo thời gian"}
      </ReportHeader>

      <Container maxWidth={themeStretch ? false : "xl"} style={{ padding: 20 }}>
        <Card style={{ padding: 24, display: "flex", flexDirection: "row" }}>
          <div style={{ flex: 1, marginRight: 100 }}>
            <span
              style={{
                fontSize: 18,
                fontWeight: "600",
                marginBottom: 40,
                display: "block",
              }}
            >
              {"Số lượng ứng viên theo thời gian trên toàn bộ tin tuyển dụng"}
            </span>

            <Chart data={dataChart?.DataList} />
          </div>

          <div>
            {renderItem(
              <SvgIcon>
                {`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" > <path d="M7.49999 1.66663C5.31666 1.66663 3.54166 3.44163 3.54166 5.62496C3.54166 7.76663 5.21666 9.49996 7.39999 9.57496C7.46666 9.56663 7.53332 9.56663 7.58332 9.57496C7.59999 9.57496 7.60832 9.57496 7.62499 9.57496C7.63332 9.57496 7.63332 9.57496 7.64166 9.57496C9.77499 9.49996 11.45 7.76663 11.4583 5.62496C11.4583 3.44163 9.68332 1.66663 7.49999 1.66663Z" fill="white" /> <path d="M11.7333 11.7917C9.40833 10.2417 5.61666 10.2417 3.275 11.7917C2.21666 12.5 1.63333 13.4583 1.63333 14.4833C1.63333 15.5083 2.21666 16.4583 3.26666 17.1583C4.43333 17.9417 5.96666 18.3333 7.5 18.3333C9.03333 18.3333 10.5667 17.9417 11.7333 17.1583C12.7833 16.45 13.3667 15.5 13.3667 14.4667C13.3583 13.4417 12.7833 12.4917 11.7333 11.7917Z" fill="white" /> <path d="M16.6583 6.11659C16.7917 7.73325 15.6417 9.14992 14.05 9.34159C14.0417 9.34159 14.0417 9.34159 14.0333 9.34159H14.0083C13.9583 9.34159 13.9083 9.34159 13.8667 9.35825C13.0583 9.39992 12.3167 9.14159 11.7583 8.66659C12.6167 7.89992 13.1083 6.74992 13.0083 5.49992C12.95 4.82492 12.7167 4.20825 12.3667 3.68325C12.6833 3.52492 13.05 3.42492 13.425 3.39159C15.0583 3.24992 16.5167 4.46659 16.6583 6.11659Z" fill="white" /> <path d="M18.325 13.825C18.2583 14.6334 17.7417 15.3334 16.875 15.8084C16.0417 16.2667 14.9917 16.4834 13.95 16.4584C14.55 15.9167 14.9 15.2417 14.9667 14.525C15.05 13.4917 14.5583 12.5 13.575 11.7084C13.0167 11.2667 12.3667 10.9167 11.6583 10.6584C13.5 10.125 15.8167 10.4834 17.2417 11.6334C18.0083 12.25 18.4 13.025 18.325 13.825Z" fill="white" /> </svg>`}
              </SvgIcon>,
              "Số lượng ứng viên",
              TotalRegister,
              calcPercent(TotalRegister, TotalRegisterCompare)
            )}
          </div>
        </Card>
      </Container>

      <ReportTable
        title={"Kết quả tuyển dụng theo từng tin tuyển dụng"}
        tableProps={{
          columns: TABLE_HEAD_PARENT,
          dataSource: DataList,
          isLoading: isTableLoading,
          TableRowComp: (data) => (
            <ReportItem data={data} filter={chartRef.current} />
          ),
        }}
        pageProps={{
          totalRecord: TotalRecords,
        }}
        onUpdateData={(e) => fetchData(null, e)}
      />
    </Page>
  );
}
