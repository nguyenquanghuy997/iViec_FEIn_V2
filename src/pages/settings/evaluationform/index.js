import BasicTable from "@/components/BasicTable";
import { Text, View } from "@/components/FlexStyled";
import Page from "@/components/Page";
import Pagination from "@/components/Pagination";
import SvgIcon from "@/components/SvgIcon";
import {
  FormProvider,
  RHFBasicSelect,
  RHFSearchTextField,
} from "@/components/hook-form";
import { PAGES } from "@/config";
import { useDebounce } from "@/hooks/useDebounce";
import useTable from "@/hooks/useTable";
import Layout from "@/layouts";
import {
  EvaluationFormModal,
  EvaluationItem,
  useGetAllReviewFormMutation,
  useGetAllReviewFormOwnerQuery,
} from "@/sections/evaluationform";
import { getRolesByPage } from "@/utils/role";
import { Card } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

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

const LIST_STATUS = [
  { label: "Tất cả", value: -1 },
  { label: "Đang hoạt động", value: 1 },
  { label: "Dừng hoạt động", value: 0 },
];

const LIST_OWNER = [{ label: "Tất cả", value: -1 }];

const TABLE_HEAD = [
  { id: "report1", label: "STT", align: "center" },
  { id: "report2", label: "Mẫu đánh giá", align: "center" },
  { id: "report3", label: "Người tạo", align: "center" },
  { id: "report4", label: "Tiêu chí đánh giá", align: "center" },
  { id: "report5", label: "Trạng thái", align: "center" },
  { id: "report6", label: "Số tin áp dụng", align: "center" },
  { id: "report7", label: "Hoạt động", align: "center" },
];

const defaultValues = {
  status: LIST_STATUS[0].value,
  owner: LIST_OWNER[0].value,
  search: "",
};

export default function Setting() {
  // ref
  const refRequest = useRef({});

  // state
  const [showForm, setShowForm] = useState(false);

  // form
  const methods = useForm({ defaultValues });
  const status = methods.watch("status");
  const owner = methods.watch("owner");
  const search = useDebounce(methods.watch("search"), 300);

  // table
  const { page, rowsPerPage, onChangePage, onChangeRowsPerPage } = useTable();

  // api
  const [
    fetchData,
    { isLoading, data: { TotalRecords = 0, DataList = [] } = {} },
  ] = useGetAllReviewFormMutation();
  const { data: { DataList: ListOwner = [] } = {} } =
    useGetAllReviewFormOwnerQuery();

  const refreshData = () => {
    fetchData(refRequest.current).unwrap();
  };

  const getData = (p, s) => {
    const body = {
      PageSize: s,
      PageIndex: p + 1,
      GetfilterRules: [
        {
          field: "ReviewName",
          op: "and_contains_in",
          value: String(search).trim() || undefined,
        },
        {
          field: "Status",
          op: "and_in_int",
          value: status >= 0 ? status : undefined,
        },
        {
          field: "CreatorId",
          op: "and_in_int",
          value: owner >= 0 ? owner : undefined,
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
  }, [status, owner, search]);

  return (
    <Page
      title={"Mẫu đánh giá"}
      style={{ height: "100%", background: "#FAFBFD" }}
    >
      {/* header */}
      <View
        flexRow
        atCenter
        ph={24}
        pv={16}
        bgColor={"#fff"}
        boxShadow={"inset 0px -1px 0px #DBE6EB"}
      >
        {/* title */}
        <Text fontSize={22} fontWeight={"600"}>
          {"Mẫu đánh giá"}
        </Text>
        <View flex1 />

        {/* button add */}
        <View
          flexRow
          atCenter
          pv={8}
          ph={12}
          borderRadius={4}
          bgColor={"#01B6A7"}
          onPress={() => setShowForm(true)}
        >
          <SvgIcon>
            {
              '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.9167 9H3.58333C3.26444 9 3 8.66 3 8.25C3 7.84 3.26444 7.5 3.58333 7.5H12.9167C13.2356 7.5 13.5 7.84 13.5 8.25C13.5 8.66 13.2356 9 12.9167 9Z" fill="white"/><path d="M8.24994 13.5C7.83994 13.5 7.49994 13.2356 7.49994 12.9167V3.58333C7.49994 3.26444 7.83994 3 8.24994 3C8.65994 3 8.99994 3.26444 8.99994 3.58333V12.9167C8.99994 13.2356 8.65994 13.5 8.24994 13.5Z" fill="white"/></svg>'
            }
          </SvgIcon>

          <Text
            ml={12}
            color={"#fff"}
            fontSize={15}
            lineHeight={20 / 15}
            fontWeight={"600"}
          >
            {"Thêm mẫu đánh giá"}
          </Text>
        </View>
      </View>

      {/* body */}
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

            <View width={160} ml={10}>
              <RHFBasicSelect
                name="owner"
                label="Người tạo"
                options={[
                  ...LIST_OWNER,
                  ...ListOwner.map((i) => ({
                    value: i.PK_USER_ID,
                    label: i.FULL_NAME,
                  })),
                ]}
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
                <EvaluationItem
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

        <EvaluationFormModal
          show={showForm}
          setShow={setShowForm}
          onRefreshData={refreshData}
        />
      </View>
    </Page>
  );
}
