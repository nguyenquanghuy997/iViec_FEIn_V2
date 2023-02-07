import BasicTable from "@/components/BasicTable";
import Pagination from "@/components/Pagination";
import {
  FormProvider,
  RHFBasicSelect,
  RHFSearchTextField,
} from "@/components/hook-form";
import { PAGES } from "@/config";
import { useDebounce } from "@/hooks/useDebounce";
import useTable from "@/hooks/useTable";
import { getRolesByPage } from "@/utils/role";
import { Card } from "@mui/material";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { PipelineTable } from "./PipelineTable";
import {useGetAllReviewFormMutation} from "@/sections/pipeline";
import { View } from "@/components/FlexStyled";


export async function getStaticProps() {
  return {
    props: {
      roles: getRolesByPage(PAGES.Industry),
    },
  };
}

const LIST_STATUS = [
  { label: "Tất cả", value: "" },
  { label: "Đang hoạt động", value: 1 },
  { label: "Dừng hoạt động", value: 0 },
];
const LIST_STAGE = [
  { label: "Tất cả", value: "" },
  { label: "Thi tuyển", value: 2 },
  { label: "Phỏng vấn", value: 3 },
];

const TABLE_HEAD = [
  { id: "STT", label: "STT", align: "center" },
  { id: "Name", label: "Tên quy trình" },
  { id: "Stages", label: "Các bước trong quy trình"},
  { id: "CountRecruitment", label: "Số tin đang áp dụng", align: "center" },
  { id: "Status", label: "Trạng thái", align: "center" },
  { id: "Id", label: "Hoạt động", align: "center" },
];

const defaultValues = {
  status: LIST_STATUS[0].value,
  stage: LIST_STAGE[0].value,
  search: "",
};
export const PipelineItem = () => {
  // ref
  const refRequest = useRef({});

  // form
  const methods = useForm({ defaultValues });
  const status = methods.watch("status");
  const stage = methods.watch("stage");
  const search = useDebounce(methods.watch("search"), 300);

  // table
  const { page, rowsPerPage, onChangePage, onChangeRowsPerPage } = useTable();

  // api
  const [
    fetchData,
    { isLoading, data: { TotalRecords = 0, DataList = [] } = {} },
  ] = useGetAllReviewFormMutation();

  const refreshData = () => {
    fetchData(refRequest.current).unwrap();
  };

  const getData = (p, s) => {
    const body = {
      PageSize: s,
      PageIndex: p + 1,
      GetfilterRules: [
        {
          field: "a.Name",
          op: "and_contains_in",
          value: String(search).trim() || undefined,
        },
        {
          field: "a.IsActive",
          op: "and_in_int",
          value: status >= 0 ? status : undefined,
        },
        {
          field: "b.StageTypeId",
          op: "and_in_int",
          value: stage >= 0 ? stage : undefined,
        },
      ],
    };
    refRequest.current = body;
    fetchData(body).unwrap();
  };

  const _onChangePage = (event, newPage) => {
    onChangePage(event, newPage);
    getData(newPage, rowsPerPage);
  };

  const _onChangeRowsPerPage = (event) => {
    onChangeRowsPerPage(event);
    getData(0, event.target.value);
  };

  useEffect(() => {
    _onChangePage(null, 0);
  }, [status, stage, search]);

  return (
      <View pv={20} ph={24}>
        {/* table option */}
        <FormProvider methods={methods}>
          <View flexRow atCenter mb={20}>
            {/* status */}
            <View width={160}>
              <RHFBasicSelect
                name="status"
                label="Trạng thái"
                options={LIST_STATUS}
                style={{ background: "#fff" }}
              />
            </View>

            <View width={200} ml={10}>
              <RHFBasicSelect
                name="stage"
                label="Bước tuyển dụng"
                options={LIST_STAGE}
                style={{ background: "#fff" }}
              />
            </View>
            <View flex1 />

            {/* search */}
            <View width={550}>
              <RHFSearchTextField
                name="search"
                label="Tìm kiếm mẫu đánh giá"
                style={{ background: "#fff" }}
              />
            </View>
          </View>
        </FormProvider>

        {/* table detail */}
        <Card>
          <View pv={20}>
            <BasicTable
              page={page}
              rowsPerPage={
                isLoading
                  ? rowsPerPage
                  : Math.min(rowsPerPage, DataList?.length)
              }
              columns={TABLE_HEAD}
              isLoading={isLoading}
              dataSource={DataList}
              TableRowComp={(data, order) => (
                <PipelineTable
                  data={data}
                  order={order}
                  onRefreshData={refreshData}
                />
              )}
            />

            <Pagination
              page={page}
              rowsPerPage={rowsPerPage}
              totalRecord={TotalRecords}
              onChangePage={_onChangePage}
              onChangeRowsPerPage={_onChangeRowsPerPage}
            />
          </View>
        </Card>
      </View>
  );
}
