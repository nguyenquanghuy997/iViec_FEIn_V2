import Page from "@/components/Page";
import SvgIcon from "@/components/SvgIcon";
import { PAGES } from "@/config";
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
  useReportRecurimentChartMutation,
  useReportRecurimentItemChartMutation,
  useReportRecurimentItemTableMutation,
  useReportRecurimentTableMutation,
} from "@/sections/report/reportSlice";
import { getRolesByPage } from "@/utils/role";
import { Card, Container } from "@mui/material";
import moment from "moment";
import dynamic from "next/dynamic";
import * as qs from "qs";
import { useEffect, useRef, useState } from "react";

const Chart = dynamic(() => import("../../sections/report/chart1"), {
  ssr: false,
});

Setting.getLayout = function getLayout({ roles = [] }, page) {
  return <Layout roles={roles}>{page}</Layout>;
};

export async function getStaticProps() {
  return {
    props: {
      roles: getRolesByPage(PAGES.Industry),
    },
  };
}

const TABLE_HEAD_PARENT = [
  { id: "report1", label: "Tin tuyển dụng", align: "left" },
  { id: "report2", label: "Phòng ban", align: "left" },
  { id: "report3", label: "Cần tuyển", align: "left" },
  { id: "report4", label: "Ứng tuyển", align: "left" },
  { id: "report5", label: "Đã tuyển", align: "left" },
  { id: "report6", label: "Bị loại", align: "left" },
  { id: "report7", label: "Tỷ lệ hoàn thành", align: "left" },
  { id: "report8", label: "Biểu đồ", align: "left" },
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
    useReportRecurimentItemChartMutation();
  const {
    TotalNeed = 0,
    TotalApply = 0,
    TotalRecruit = 0,
    TotalEliminated = 0,
  } = dataChart?.DataList?.[0] || {};

  const [fetchTable, { data: dataTable, isLoading: isTableLoading }] =
    useReportRecurimentItemTableMutation();
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
          field: "ARe.ProcessStatus",
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

  return (
    <>
      <ReportTableRow>
        {[
          { size: 22, delta: data.ProcessStatus, value: data.Title },
          { size: 14, value: data.BranchOrganiName },
          { size: 10, value: data.NumberPositions },
          {
            size: 10,
            value: data.CountApply,
            onPress: () => onPressRow(undefined),
          },
          {
            size: 10,
            value: data.CountApplyPass,
            onPress: () => onPressRow(8),
          },
          {
            size: 10,
            value: data.CountEliminated,
            onPress: () => onPressRow(9),
          },
          {
            size: 11,
            value:
              ((data.CountApplyPass / data.CountApply) * 100 || 0).toFixed() +
              "%",
          },
          { size: 34, onPress: () => setShowChart(true) },
        ]}
      </ReportTableRow>

      <ReportModal
        title={data.Title}
        subTitle={"Báo cáo kết quả tuyển dụng"}
        modalProps={{
          open: showChart,
          onBackdropClick: () => setShowChart(false),
        }}
      >
        <Chart
          id={`${data.RecruitmentId}`}
          data={[
            {
              title: "Cần tuyển",
              value: TotalNeed,
            },
            {
              title: "Ứng viên",
              value: TotalApply,
            },
            {
              title: "Đã tuyển",
              value: TotalRecruit,
            },
            {
              title: "Bị loại",
              value: TotalEliminated,
            },
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
  const [fetchChart, { data: dataChart }] = useReportRecurimentChartMutation();
  const {
    TotalRecruitment = 0,
    TotalApplicant = 0,
    TotalRecruitmentCompare = 0,
    TotalApplicantCompare = 0,
    TotalNeed = 0,
    TotalApply = 0,
    TotalRecruit = 0,
    TotalEliminated = 0,
  } = dataChart?.DataList?.[0] || {};

  const [fetchTable, { data: dataTable, isLoading: isTableLoading }] =
    useReportRecurimentTableMutation();
  const { DataList = [], TotalRecords = 0 } = dataTable || {};

  const [fetchExcel, { data: dataExcel }] = useReportRecurimentTableMutation();

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
          tableQueries.sort === "popular" ? "CountApply" : "Re.StartDate",
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
      title={"Báo cáo kết quả tuyển dụng"}
      style={{ height: "100%", background: "#FAFBFD" }}
    >
      <ReportHeader
        list={
          !isTableLoading
            ? dataExcel?.DataList?.map((i) => ({
                "Tin tuyển dụng": i.Title,
                "Phòng ban": i.BranchOrganiName,
                "Cần tuyển": i.NumberPositions,
                "Ứng tuyển": i.CountApply,
                "Đã tuyển": i.CountApplyPass,
                "Bị loại": i.CountEliminated,
                "Tỷ lệ hoàn thành":
                  ((i.CountApplyPass / i.CountApply) * 100 || 0).toFixed() +
                  "%",
              }))
            : []
        }
        onUpdateData={(e) => fetchData(e, tableRef.current)}
        onUpdateCompareText={setTextCompare}
      >
        {"Báo cáo kết quả tuyển dụng"}
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
              {"Kết quả tuyển dụng trên toàn bộ tin tuyển dụng"}
            </span>

            <Chart
              data={[
                {
                  title: "Cần tuyển",
                  value: TotalNeed,
                },
                {
                  title: "Ứng viên",
                  value: TotalApply,
                },
                {
                  title: "Đã tuyển",
                  value: TotalRecruit,
                },
                {
                  title: "Bị loại",
                  value: TotalEliminated,
                },
              ]}
            />
          </div>

          <div>
            {renderItem(
              <SvgIcon>
                {`<svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg" > <path fill-rule="evenodd" clip-rule="evenodd" d="M5.43807 12.6583H9.92651C10.2648 12.6583 10.5453 12.375 10.5453 12.0333C10.5453 11.6917 10.2648 11.4167 9.92651 11.4167H5.43807C5.09978 11.4167 4.81925 11.6917 4.81925 12.0333C4.81925 12.375 5.09978 12.6583 5.43807 12.6583ZM8.22685 7.24999H5.43807C5.09978 7.24999 4.81925 7.53333 4.81925 7.87499C4.81925 8.21666 5.09978 8.49166 5.43807 8.49166H8.22685C8.56513 8.49166 8.84566 8.21666 8.84566 7.87499C8.84566 7.53333 8.56513 7.24999 8.22685 7.24999ZM14.1151 6.52135C14.3091 6.51911 14.5203 6.51667 14.7121 6.51667C14.9184 6.51667 15.0834 6.68334 15.0834 6.89167V13.5917C15.0834 15.6583 13.425 17.3333 11.3788 17.3333H4.81114C2.66592 17.3333 0.916748 15.575 0.916748 13.4083V4.42501C0.916748 2.35834 2.58341 0.666672 4.63787 0.666672H9.04381C9.25833 0.666672 9.42335 0.841672 9.42335 1.05001V3.73334C9.42335 5.25834 10.6692 6.50834 12.1791 6.51667C12.5318 6.51667 12.8427 6.51931 13.1148 6.52162C13.3265 6.52341 13.5147 6.52501 13.6808 6.52501C13.7982 6.52501 13.9505 6.52325 14.1151 6.52135ZM14.3425 5.30499C13.6643 5.30749 12.8648 5.30499 12.2897 5.29916C11.3772 5.29916 10.6255 4.53999 10.6255 3.61833V1.42166C10.6255 1.06249 11.057 0.884161 11.3037 1.14333C11.7503 1.61234 12.3641 2.25707 12.975 2.89882C13.5842 3.53872 14.1905 4.17566 14.6255 4.63249C14.8665 4.88499 14.6899 5.30416 14.3425 5.30499Z" fill="white" /> </svg>`}
              </SvgIcon>,
              "Tin tuyển dụng",
              TotalRecruitment,
              calcPercent(TotalRecruitment, TotalRecruitmentCompare)
            )}
            <div style={{ height: 16 }} />

            {renderItem(
              <SvgIcon>
                {`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" > <path d="M7.50008 1.66666C5.31675 1.66666 3.54175 3.44166 3.54175 5.625C3.54175 7.76666 5.21675 9.5 7.40008 9.575C7.46675 9.56666 7.53341 9.56666 7.58341 9.575C7.60008 9.575 7.60841 9.575 7.62508 9.575C7.63341 9.575 7.63341 9.575 7.64175 9.575C9.77508 9.5 11.4501 7.76666 11.4584 5.625C11.4584 3.44166 9.68341 1.66666 7.50008 1.66666Z" fill="white" /> <path d="M11.7333 11.7917C9.4083 10.2417 5.61663 10.2417 3.27497 11.7917C2.21663 12.5 1.6333 13.4583 1.6333 14.4833C1.6333 15.5083 2.21663 16.4583 3.26663 17.1583C4.4333 17.9417 5.96663 18.3333 7.49997 18.3333C9.0333 18.3333 10.5666 17.9417 11.7333 17.1583C12.7833 16.45 13.3666 15.5 13.3666 14.4667C13.3583 13.4417 12.7833 12.4917 11.7333 11.7917Z" fill="white" /> <path d="M16.6583 6.11666C16.7916 7.73333 15.6416 9.15 14.05 9.34166C14.0416 9.34166 14.0416 9.34166 14.0333 9.34166H14.0083C13.9583 9.34166 13.9083 9.34166 13.8666 9.35833C13.0583 9.4 12.3166 9.14166 11.7583 8.66666C12.6166 7.9 13.1083 6.75 13.0083 5.5C12.95 4.825 12.7166 4.20833 12.3666 3.68333C12.6833 3.525 13.05 3.425 13.425 3.39166C15.0583 3.25 16.5166 4.46666 16.6583 6.11666Z" fill="white" /> <path d="M18.3249 13.825C18.2582 14.6333 17.7415 15.3333 16.8749 15.8083C16.0415 16.2667 14.9915 16.4833 13.9499 16.4583C14.5499 15.9167 14.8999 15.2417 14.9665 14.525C15.0499 13.4917 14.5582 12.5 13.5749 11.7083C13.0165 11.2667 12.3665 10.9167 11.6582 10.6583C13.4999 10.125 15.8165 10.4833 17.2415 11.6333C18.0082 12.25 18.3999 13.025 18.3249 13.825Z" fill="white" /> </svg>`}
              </SvgIcon>,
              "Ứng viên",
              TotalApplicant,
              calcPercent(TotalApplicant, TotalApplicantCompare)
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
