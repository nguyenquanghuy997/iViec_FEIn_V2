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
  useReportTrackingChartMutation,
  useReportTrackingItemChartMutation,
  useReportTrackingItemTableMutation,
  useReportTrackingTableMutation,
} from "@/sections/report/reportSlice";
import { Container } from "@mui/material";
import dynamic from "next/dynamic";
import * as qs from "qs";
import { useEffect, useRef, useState } from "react";

const Chart = dynamic(() => import("../../sections/report/chart4"), {
  ssr: false,
});

Setting.getLayout = function getLayout(pageProps, page) {
  return <Layout permissions={PERMISSION_PAGES.report} {...pageProps}>{page}</Layout>;
};

const TABLE_HEAD_PARENT = [
  { id: "report1", label: "Đơn vị/ Phòng ban", align: "left" },
  { id: "report2", label: "Tổng tin tuyển dụng", align: "left" },
  { id: "report3", label: "Tin đang tuyển dụng", align: "left" },
  { id: "report4", label: "Tin chờ phê duyệt", align: "left" },
  { id: "report5", label: "Tin không phê duyệt", align: "left" },
  { id: "report6", label: "Tin đã hoàn thành", align: "left" },
  { id: "report7", label: "Tỷ lệ phê duyệt", align: "left" },
  { id: "report8", label: "Biểu đồ", align: "left" },
];

const TABLE_HEAD_CHILD = [
  { id: "report1", label: "Tin tuyển dụng", align: "left" },
  { id: "report2", label: "Vị trí công việc", align: "left" },
  { id: "report3", label: "Quy trình tuyển dụng", align: "left" },
  { id: "report4", label: "Ngày bắt đầu", align: "left" },
  { id: "report5", label: "Hạn nộp hồ sơ", align: "left" },
  { id: "report6", label: "Số lượng cần tuyển", align: "left" },
  { id: "report7", label: "Trạng thái", align: "left" },
];

function ReportItem({ data, filter }) {
  // ref
  const statusRef = useRef(undefined);

  // state
  const [showChart, setShowChart] = useState(false);
  const [showTable, setShowTable] = useState(false);

  // query
  const [fetchChart, { data: dataChart }] =
    useReportTrackingItemChartMutation();
  const {
    TotalRecruitment = 0,
    TotalRecruitmentApply = 0,
    TotalRecruitWaitingApproved = 0,
    TotalRecruitmentNotApproved = 0,
    TotalRecruitCompleted = 0,
  } = dataChart?.DataList?.[0] || {};

  const [fetchTable, { data: dataTable, isLoading: isTableLoading }] =
    useReportTrackingItemTableMutation();
  const { DataList = [], TotalRecords = 0 } = dataTable || {};

  // handle
  const onPressRow = (status) => {
    setShowTable(true);
    statusRef.current = status;
  };

  const onUpdateData = (e) => {
    const body = {
      ...e.paging,
      IN_SORT: "Re.StartDate",
      item: {
        ...filter.item,
        Id: data.Id,
      },
      GetfilterRules: [
        {
          field: "Re.ProcessStatus",
          op: "and_in_int",
          value: statusRef.current,
        },
        ...e.search.map((i) => ({
          ...i,
          field: "Re.Title",
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
          { size: 100 / 7, value: data.Title },
          { size: 100 / 7, value: data.JobTypeName },
          { size: 100 / 7, value: data.PipelineName },
          {
            size: 100 / 7,
            value: data.StartDateString,
          },
          {
            size: 100 / 7,
            value: data.EndDateString,
          },
          {
            size: 100 / 7,
            value: data.NumberPositions,
          },
          {
            size: 100 / 7,
            value: data.ProcessStatusInString,
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
        Id: data.Id,
      })
    ).unwrap();
  }, [JSON.stringify(filter)]);

  return (
    <>
      <ReportTableRow>
        {[
          {
            size: 22,
            delta: data.ProcessStatus,
            value: data.Name,
          },
          {
            size: 14,
            value: data.TotalRecruitment,
            onPress: () => onPressRow(undefined),
          },
          {
            size: 10,
            value: data.TotalRecruitmentApply,
            onPress: () => onPressRow(2),
          },
          {
            size: 10,
            value: data.TotalRecruitWaitingApproved,
            onPress: () => onPressRow("1, 8"),
          },
          {
            size: 10,
            value: data.TotalRecruitmentNotApproved,
            onPress: () => onPressRow("6, 9"),
          },
          {
            size: 10,
            value: data.TotalRecruitCompleted,
            onPress: () => onPressRow(7),
          },
          {
            size: 11,
            value:
              (
                ((data.TotalRecruitmentApply + data.TotalRecruitCompleted) /
                  data.TotalRecruitment) *
                  100 || 0
              ).toFixed() + "%",
          },
          { size: 34, onPress: () => setShowChart(true) },
        ]}
      </ReportTableRow>

      <ReportModal
        title={data.Title}
        subTitle={"Báo cáo theo dõi tin tuyển dụng"}
        modalProps={{
          open: showChart,
          onBackdropClick: () => setShowChart(false),
        }}
      >
        <Chart
          id={`${data.Id}`}
          total={TotalRecruitment}
          data={[
            { sector: "Tin đã hoàn thành", size: TotalRecruitCompleted },
            { sector: "Tin đang tuyển dụng", size: TotalRecruitmentApply },
            {
              sector: "Tin chờ phê duyệt",
              size: TotalRecruitWaitingApproved,
            },
            {
              sector: "Tin không phê duyệt",
              size: TotalRecruitmentNotApproved,
            },
          ]}
        />
      </ReportModal>

      <ReportModal
        big
        title={data.Name}
        subTitle={"Danh sách tin tuyển dụng được tạo"}
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
  const [fetchChart, { data: dataChart }] = useReportTrackingChartMutation();
  const {
    TotalRecruitment = 0,
    TotalRecruitmentApply = 0,
    TotalRecruitWaitingApproved = 0,
    TotalRecruitmentNotApproved = 0,
    TotalRecruitCompleted = 0,
    TotalRecruitmentCompare = 0,
    TotalRecruitmentApplyCompare = 0,
    TotalRecruitWaitingApprovedCompare = 0,
    TotalRecruitmentNotApprovedCompare = 0,
    TotalRecruitCompletedCompare = 0,
  } = dataChart?.DataList?.[0] || {};

  const [fetchTable, { data: dataTable, isLoading: isTableLoading }] =
    useReportTrackingTableMutation();
  const { DataList = [], TotalRecords = 0 } = dataTable || {};

  const [fetchExcel, { data: dataExcel }] = useReportTrackingTableMutation();

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
          tableQueries.sort === "popular" ? "C1.TotalRecruitment" : undefined,
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
      title={"Báo cáo theo dõi tin tuyển dụng"}
      style={{ height: "100%", background: "#FAFBFD" }}
    >
      <ReportHeader
        list={
          !isTableLoading
            ? dataExcel?.DataList?.map?.((i) => ({
                "Đơn vị/ Phòng ban": i.Name,
                "Tổng tin tuyển dụng": i.TotalRecruitment,
                "Tin đang tuyển dụng": i.TotalRecruitmentApply,
                "Tin chờ phê duyệt": i.TotalRecruitWaitingApproved,
                "Tin không phê duyệt": i.TotalRecruitmentNotApproved,
                "Tin đã hoàn thành": i.TotalRecruitCompleted,
                "Tỷ lệ phê duyệt":
                  (
                    ((i.TotalRecruitmentApply + i.TotalRecruitCompleted) /
                      i.TotalRecruitment) *
                      100 || 0
                  ).toFixed() + "%",
              }))
            : []
        }
        onUpdateData={(e) => fetchData(e, tableRef.current)}
        onUpdateCompareText={setTextCompare}
      >
        {"Báo cáo theo dõi tin tuyển dụng"}
      </ReportHeader>

      <Container maxWidth={themeStretch ? false : "xl"} style={{ padding: 20 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: 20,
            background: "#fff",
          }}
        >
          <div>
            {renderItem(
              <SvgIcon>
                {`<svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg" > <path fill-rule="evenodd" clip-rule="evenodd" d="M5.43814 12.6583H9.92659C10.2649 12.6583 10.5454 12.375 10.5454 12.0333C10.5454 11.6917 10.2649 11.4167 9.92659 11.4167H5.43814C5.09985 11.4167 4.81933 11.6917 4.81933 12.0333C4.81933 12.375 5.09985 12.6583 5.43814 12.6583ZM8.22692 7.24999H5.43814C5.09986 7.24999 4.81933 7.53332 4.81933 7.87499C4.81933 8.21666 5.09986 8.49166 5.43814 8.49166H8.22692C8.5652 8.49166 8.84573 8.21666 8.84573 7.87499C8.84573 7.53332 8.5652 7.24999 8.22692 7.24999ZM14.1151 6.52133C14.309 6.51909 14.5202 6.51666 14.7121 6.51666C14.9183 6.51666 15.0834 6.68332 15.0834 6.89166V13.5917C15.0834 15.6583 13.4249 17.3333 11.3787 17.3333H4.81108C2.66586 17.3333 0.916687 15.575 0.916687 13.4083V4.42499C0.916687 2.35832 2.58335 0.666656 4.63781 0.666656H9.04375C9.25827 0.666656 9.42329 0.841657 9.42329 1.04999V3.73332C9.42329 5.25832 10.6692 6.50832 12.1791 6.51666C12.5317 6.51666 12.8427 6.51929 13.1148 6.5216C13.3265 6.52339 13.5146 6.52499 13.6807 6.52499C13.7982 6.52499 13.9504 6.52323 14.1151 6.52133ZM14.3426 5.30499C13.6644 5.30749 12.8649 5.30499 12.2898 5.29916C11.3772 5.29916 10.6256 4.53999 10.6256 3.61832V1.42166C10.6256 1.06249 11.0571 0.884157 11.3038 1.14332C11.7509 1.61281 12.3654 2.25838 12.977 2.90078C13.5855 3.54002 14.191 4.17612 14.6256 4.63249C14.8665 4.88499 14.69 5.30416 14.3426 5.30499Z" fill="white" /> </svg>`}
              </SvgIcon>,
              "Tổng tin tuyển dụng",
              TotalRecruitment,
              calcPercent(TotalRecruitment, TotalRecruitmentCompare)
            )}
            <div style={{ height: 16 }} />

            {renderItem(
              <SvgIcon>
                {` <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" > <path d="M5.83331 8.8889V11.1111C5.83331 13.5921 5.83331 14.8325 6.64249 15.3181C7.45166 15.8036 8.5462 15.2198 10.7353 14.0523L12.8186 12.9412C15.2451 11.6471 16.4583 11 16.4583 10C16.4583 9.00001 15.2451 8.35295 12.8186 7.05883L10.7353 5.94772C8.5462 4.78022 7.45166 4.19646 6.64249 4.68197C5.83331 5.16747 5.83331 6.40795 5.83331 8.8889Z" fill="white" /> </svg>`}
              </SvgIcon>,
              "Tin đang tuyển dụng",
              TotalRecruitmentApply,
              calcPercent(TotalRecruitmentApply, TotalRecruitmentApplyCompare)
            )}
            <div style={{ height: 16 }} />

            {renderItem(
              <SvgIcon>
                {`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" > <path d="M5.83331 8.8889V11.1111C5.83331 13.5921 5.83331 14.8325 6.64249 15.3181C7.45166 15.8036 8.5462 15.2198 10.7353 14.0523L12.8186 12.9412C15.2451 11.6471 16.4583 11 16.4583 10C16.4583 9.00001 15.2451 8.35295 12.8186 7.05883L10.7353 5.94772C8.5462 4.78022 7.45166 4.19646 6.64249 4.68197C5.83331 5.16747 5.83331 6.40795 5.83331 8.8889Z" fill="white" /> </svg>`}
              </SvgIcon>,
              "Tin chờ phê duyệt",
              TotalRecruitWaitingApproved,
              calcPercent(
                TotalRecruitWaitingApproved,
                TotalRecruitWaitingApprovedCompare
              )
            )}
            <div style={{ height: 16 }} />

            {renderItem(
              <SvgIcon>
                {`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" > <path d="M10 1.66667C5.40835 1.66667 1.66669 5.40834 1.66669 10C1.66669 14.5917 5.40835 18.3333 10 18.3333C14.5917 18.3333 18.3334 14.5917 18.3334 10C18.3334 5.40834 14.5917 1.66667 10 1.66667ZM12.8 11.9167C13.0417 12.1583 13.0417 12.5583 12.8 12.8C12.675 12.925 12.5167 12.9833 12.3584 12.9833C12.2 12.9833 12.0417 12.925 11.9167 12.8L10 10.8833L8.08335 12.8C7.95835 12.925 7.80002 12.9833 7.64169 12.9833C7.48335 12.9833 7.32502 12.925 7.20002 12.8C6.95835 12.5583 6.95835 12.1583 7.20002 11.9167L9.11669 10L7.20002 8.08334C6.95835 7.84167 6.95835 7.44167 7.20002 7.20001C7.44169 6.95834 7.84169 6.95834 8.08335 7.20001L10 9.11667L11.9167 7.20001C12.1584 6.95834 12.5584 6.95834 12.8 7.20001C13.0417 7.44167 13.0417 7.84167 12.8 8.08334L10.8834 10L12.8 11.9167Z" fill="white" /> </svg>`}
              </SvgIcon>,
              "Tin không phê duyệt",
              TotalRecruitmentNotApproved,
              calcPercent(
                TotalRecruitmentNotApproved,
                TotalRecruitmentNotApprovedCompare
              )
            )}
            <div style={{ height: 16 }} />

            {renderItem(
              <SvgIcon>
                {`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" > <path fill-rule="evenodd" clip-rule="evenodd" d="M1.66669 10C1.66669 5.39762 5.39765 1.66666 10 1.66666C12.2102 1.66666 14.3298 2.54464 15.8926 4.10744C17.4554 5.67024 18.3334 7.78986 18.3334 10C18.3334 14.6024 14.6024 18.3333 10 18.3333C5.39765 18.3333 1.66669 14.6024 1.66669 10ZM8.94317 12.7917L13.6265 8.10833C13.7799 7.94737 13.7799 7.69428 13.6265 7.53333L13.1848 7.09166C13.0228 6.93285 12.7635 6.93285 12.6015 7.09166L8.6515 11.0417L7.4015 9.79999C7.32589 9.71943 7.22033 9.67373 7.10984 9.67373C6.99935 9.67373 6.89378 9.71943 6.81817 9.79999L6.3765 10.2417C6.29762 10.3199 6.25325 10.4264 6.25325 10.5375C6.25325 10.6486 6.29762 10.7551 6.3765 10.8333L8.35984 12.7917C8.43545 12.8722 8.54102 12.9179 8.6515 12.9179C8.76199 12.9179 8.86756 12.8722 8.94317 12.7917Z" fill="white" /> </svg>`}
              </SvgIcon>,
              "Tin đã hoàn thành",
              TotalRecruitCompleted,
              calcPercent(TotalRecruitCompleted, TotalRecruitCompletedCompare)
            )}
          </div>

          <div
            style={{
              flex: 1,
              padding: 20,
              marginLeft: 100,
              borderRadius: 8,
              border: "1px solid #EBECF4",
            }}
          >
            <span
              style={{
                fontSize: 18,
                fontWeight: "600",
                marginBottom: 40,
                display: "block",
              }}
            >
              {"Thống kê tin tuyển dụng trên toàn bộ tổ chức"}
            </span>

            <Chart
              total={TotalRecruitment}
              data={[
                { sector: "Tin đã hoàn thành", size: TotalRecruitCompleted },
                { sector: "Tin đang tuyển dụng", size: TotalRecruitmentApply },
                {
                  sector: "Tin chờ phê duyệt",
                  size: TotalRecruitWaitingApproved,
                },
                {
                  sector: "Tin không phê duyệt",
                  size: TotalRecruitmentNotApproved,
                },
              ]}
            />
          </div>
        </div>
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
