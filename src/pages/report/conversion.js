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
  useReportConversionChartMutation,
  useReportConversionItemChartMutation,
  useReportConversionItemTableMutation,
  useReportConversionTableMutation,
} from "@/sections/report/reportSlice";
import { Card, Container } from "@mui/material";
import moment from "moment";
import dynamic from "next/dynamic";
import * as qs from "qs";
import { useEffect, useRef, useState } from "react";

const Chart = dynamic(() => import("../../sections/report/chart2"), {
  ssr: false,
});

Setting.getLayout = function getLayout(pageProps, page) {
  return <Layout permissions={PERMISSION_PAGES.report} {...pageProps}>{page}</Layout>;
};

const TABLE_HEAD_PARENT = [
  { id: "report1", label: "Tin tuyển dụng", align: "left" },
  { id: "report2", label: "Phòng ban", align: "left" },
  { id: "report3", label: "Ứng tuyển", align: "left" },
  { id: "report4", label: "Thi tuyển", align: "left" },
  { id: "report5", label: "Phỏng vấn với máy", align: "left" },
  { id: "report6", label: "Phỏng vấn online", align: "left" },
  { id: "report7", label: "Offer", align: "left" },
  { id: "report8", label: "Đã tuyển", align: "left" },
  { id: "report9", label: "Biểu đồ", align: "left" },
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
  // ref
  const statusRef = useRef(undefined);

  // state
  const [showChart, setShowChart] = useState(false);
  const [showTable, setShowTable] = useState(false);

  // query
  const [fetchChart, { data: dataChart }] =
    useReportConversionItemChartMutation();
  const {
    TotalApply = 0,
    TotalExam = 0,
    TotalInterviewMachine = 0,
    TotalInterviewOnline = 0,
    TotalOffer = 0,
    TotalGetJob = 0,
  } = dataChart?.DataList?.[0] || {};

  const [fetchTable, { data: dataTable, isLoading: isTableLoading }] =
    useReportConversionItemTableMutation();
  const { DataList = [], TotalRecords = 0 } = dataTable || {};

  // handle
  const onPressRow = (status) => {
    setShowTable(true);
    statusRef.current = status;
  };

  const onUpdateData = (e) => {
    const body = {
      ...e.paging,
      IN_SORT: e.sort,
      item: {
        RecruitmentId: data.RecruitmentId,
      },
      GetfilterRules: [
        {
          field: "Lap.TypePipeline",
          op: "and_in_int",
          value: statusRef.current,
        },
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

  // effect
  useEffect(() => {
    fetchChart(
      qs.stringify({
        ...filter.item,
        RecruitmentId: data.RecruitmentId,
      })
    ).unwrap();
  }, [JSON.stringify(filter)]);

  const calcValue = (value) => {
    return (
      value + " (" + ((value / data.TotalApplicants) * 100).toFixed() + "%)"
    );
  };

  return (
    <>
      <ReportTableRow>
        {[
          { size: 22, delta: data.ProcessStatus, value: data.Title },
          { size: 16, value: data.BranchOrganiName },
          {
            size: 8,
            value: calcValue(data.TotalApply),
            onPress: () => onPressRow(1),
          },
          {
            size: 8,
            value: calcValue(data.TotalExam),
            onPress: () => onPressRow(2),
          },
          {
            size: 8,
            value: calcValue(data.TotalInterviewMachine),
            onPress: () => onPressRow(6),
          },
          {
            size: 8,
            value: calcValue(data.TotalInterviewOnline),
            onPress: () => onPressRow(3),
          },
          {
            size: 8,
            value: calcValue(data.TotalOffer),
            onPress: () => onPressRow(4),
          },
          {
            size: 8,
            value: calcValue(data.TotalGetJob),
            onPress: () => onPressRow(5),
          },
          { size: 14, onPress: () => setShowChart(true) },
        ]}
      </ReportTableRow>

      <ReportModal
        title={data.Title}
        subTitle={"Báo cáo tỷ lệ chuyển đổi ứng viên"}
        modalProps={{
          open: showChart,
          onBackdropClick: () => setShowChart(false),
        }}
      >
        <Chart
          id={`${data.RecruitmentId}`}
          data={[
            { value: 9, category: "Ứng tuyển", value2: TotalApply },
            { value: 8, category: "Thi tuyển", value2: TotalExam },
            {
              value: 7,
              category: "Phỏng vấn với máy",
              value2: TotalInterviewMachine,
            },
            {
              value: 6,
              category: "Phỏng vấn online",
              value2: TotalInterviewOnline,
            },
            { value: 5, category: "Offer", value2: TotalOffer },
            { value: 4, category: "Đã tuyển", value2: TotalGetJob },
          ]}
        />
      </ReportModal>

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
  const [fetchChart, { data: dataChart }] = useReportConversionChartMutation();
  const {
    TotalApplicants = 0,
    TotalRecruit = 0,
    TotalPass = 0,
    TotalApplicantsCompare = 0,
    TotalRecruitCompare = 0,
    TotalPassCompare = 0,
    TotalApply = 0,
    TotalExam = 0,
    TotalInterviewMachine = 0,
    TotalInterviewOnline = 0,
    TotalOffer = 0,
    TotalGetJob = 0,
  } = dataChart?.DataList?.[0] || {};

  const [fetchTable, { data: dataTable, isLoading: isTableLoading }] =
    useReportConversionTableMutation();

  const { DataList = [], TotalRecords = 0 } = dataTable || {};

  const [fetchExcel, { data: dataExcel }] = useReportConversionTableMutation();

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
          tableQueries.sort === "popular" ? "TotalApplicants" : "Re.StartDate",
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
      title={"Báo cáo tỷ lệ chuyển đổi ứng viên"}
      style={{ height: "100%", background: "#FAFBFD" }}
    >
      <ReportHeader
        list={
          !isTableLoading
            ? dataExcel?.DataList?.map((i) => {
                const calcValue = (value) => {
                  return (
                    value +
                    " (" +
                    ((value / i.TotalApplicants) * 100).toFixed() +
                    "%)"
                  );
                };
                return {
                  "Tin tuyển dụng": i.Title,
                  "Phòng ban": i.BranchOrganiName,
                  "Ứng tuyển": calcValue(i.TotalApply),
                  "Thi tuyển": calcValue(i.TotalExam),
                  "Phỏng vấn với máy": calcValue(i.TotalInterviewMachine),
                  "Phỏng vấn online": calcValue(i.TotalInterviewOnline),
                  Offer: calcValue(i.TotalOffer),
                  "Đã tuyển": calcValue(i.TotalGetJob),
                };
              })
            : []
        }
        onUpdateData={(e) => fetchData(e, tableRef.current)}
        onUpdateCompareText={setTextCompare}
      >
        {"Báo cáo tỷ lệ chuyển đổi ứng viên"}
      </ReportHeader>

      <Container maxWidth={themeStretch ? false : "xl"} style={{ padding: 20 }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div>
            {renderItem(
              <SvgIcon>
                {`<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" > <path d="M16.8562 1.14857C16.4395 0.722739 15.8228 0.565239 15.2478 0.731905L1.83951 4.60607C1.23284 4.77441 0.80284 5.25524 0.687007 5.86524C0.568673 6.48691 0.982007 7.27691 1.52201 7.6069L5.71451 10.1669C6.14451 10.4302 6.69951 10.3644 7.05534 10.0077L11.8562 5.2069C12.0978 4.95607 12.4978 4.95607 12.7395 5.2069C12.9812 5.44774 12.9812 5.84024 12.7395 6.09024L7.93034 10.8911C7.57367 11.2477 7.50701 11.8011 7.76951 12.2319L10.3312 16.4402C10.6312 16.9394 11.1478 17.2236 11.7145 17.2236C11.7812 17.2236 11.8562 17.2236 11.9228 17.2144C12.5728 17.1319 13.0895 16.6894 13.2812 16.0644L17.2562 2.75691C17.4312 2.19024 17.2728 1.57357 16.8562 1.14857Z" fill="white" /> </svg>`}
              </SvgIcon>,
              "Ứng tuyển",
              TotalApplicants,
              calcPercent(TotalApplicants, TotalApplicantsCompare)
            )}
            <div style={{ height: 16 }} />

            {renderItem(
              <SvgIcon>
                {`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" > <path d="M5.83334 8.88888V11.1111C5.83334 13.5921 5.83334 14.8325 6.64252 15.318C7.45169 15.8035 8.54623 15.2198 10.7353 14.0523L12.8186 12.9412C15.2451 11.6471 16.4583 11 16.4583 9.99999C16.4583 8.99999 15.2451 8.35294 12.8186 7.05882L10.7353 5.94771C8.54623 4.7802 7.45169 4.19645 6.64252 4.68195C5.83334 5.16746 5.83334 6.40793 5.83334 8.88888Z" fill="white" /> </svg>`}
              </SvgIcon>,
              "Đang tuyển dụng",
              TotalRecruit,
              calcPercent(TotalRecruit, TotalRecruitCompare)
            )}
            <div style={{ height: 16 }} />

            {renderItem(
              <SvgIcon>
                {`<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" > <path fill-rule="evenodd" clip-rule="evenodd" d="M0.666656 9C0.666656 4.39763 4.39762 0.666668 8.99999 0.666668C11.2101 0.666668 13.3297 1.54464 14.8925 3.10744C16.4553 4.67025 17.3333 6.78986 17.3333 9C17.3333 13.6024 13.6024 17.3333 8.99999 17.3333C4.39762 17.3333 0.666656 13.6024 0.666656 9ZM7.94314 11.7917L12.6265 7.10833C12.7799 6.94737 12.7799 6.69429 12.6265 6.53333L12.1848 6.09166C12.0228 5.93285 11.7635 5.93285 11.6015 6.09166L7.65147 10.0417L6.40147 8.8C6.32586 8.71943 6.2203 8.67373 6.10981 8.67373C5.99932 8.67373 5.89375 8.71943 5.81814 8.8L5.37647 9.24166C5.29759 9.3199 5.25322 9.4264 5.25322 9.5375C5.25322 9.64859 5.29759 9.75509 5.37647 9.83333L7.35981 11.7917C7.43542 11.8722 7.54099 11.9179 7.65147 11.9179C7.76196 11.9179 7.86753 11.8722 7.94314 11.7917Z" fill="white" /> </svg>`}
              </SvgIcon>,
              "Đã tuyển",
              TotalPass,
              calcPercent(TotalPass, TotalPassCompare)
            )}
          </div>

          <Card style={{ flex: 1, padding: 20, marginLeft: 100 }}>
            <span
              style={{
                fontSize: 18,
                fontWeight: "600",
                marginBottom: 40,
                display: "block",
              }}
            >
              {"Tỷ lệ chuyển đổi ứng viên trên toàn bộ tin tuyển dụng"}
            </span>

            <Chart
              data={[
                { value: 9, category: "Ứng tuyển", value2: TotalApply },
                { value: 8, category: "Thi tuyển", value2: TotalExam },
                {
                  value: 7,
                  category: "Phỏng vấn với máy",
                  value2: TotalInterviewMachine,
                },
                {
                  value: 6,
                  category: "Phỏng vấn online",
                  value2: TotalInterviewOnline,
                },
                { value: 5, category: "Offer", value2: TotalOffer },
                { value: 4, category: "Đã tuyển", value2: TotalGetJob },
              ]}
            />
          </Card>
        </div>
      </Container>

      <ReportTable
        title={"Tỷ lệ chuyển đổi ứng viên theo từng tin tuyển dụng"}
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
