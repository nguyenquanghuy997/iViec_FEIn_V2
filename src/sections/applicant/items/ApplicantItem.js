import { ApplicantTable } from "./ApplicantTable";
import BasicTable from "@/components/BasicTable";
import { View } from "@/components/FlexStyled";
import Pagination from "@/components/Pagination";
import {
  FormProvider,
  RHFSearchTextField,
} from "@/components/hook-form";
import { PAGES } from "@/config";
import { useDebounce } from "@/hooks/useDebounce";
import useTable from "@/hooks/useTable";
import { useGetAllApplicantMutation } from "@/sections/applicant";
import { getRolesByPage } from "@/utils/role";
import { Card } from "@mui/material";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

export async function getStaticProps() {
  return {
    props: {
      roles: getRolesByPage(PAGES.Applicant),
    },
  };
}

const TABLE_HEAD = [
  { id: "STT", label: "STT", align: "center" },
  { id: "FullName", label: "Họ và tên" },
  { id: "DoB", label: "Ngày sinh" },
  { id: "Email", label: "Email", align: "center" },
  { id: "CellPhoneNumber", label: "Số điện thoại", align: "center" },
  { id: "Job", label: "Ngành nghề", align: "center" },
  { id: "KenhTuyenDungString", label: "Nguồn", align: "center" },
  { id: "RecruitmentNewsName", label: "Tin tuyển dụng", align: "center" },
  { id: "CreatedTimeStr", label: "Ngày ứng tuyển", align: "center" },
  { id: "StageName", label: "Bước tuyển dụng", align: "center" },
  { id: "BranchName", label: "Đơn vị", align: "center" },
  { id: "Id", label: "Hoạt động", align: "center" },
];

const defaultValues = {
  search: "",
};
export const ApplicantItem = () => {
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
  ] = useGetAllApplicantMutation();

  const refreshData = () => {
    fetchData(refRequest.current).unwrap();
  };

  const getData = (p, s) => {
    const body = {
      PageSize: s,
      PageIndex: p + 1,
      GetfilterRules: [
        { field: "A.FullName,A.Email,A.CellPhoneNumber", op: "and_group_contains_with_or", value: String(search).trim() || undefined},
        { field: "B.RecruitmentId", op: "and_in_int", value: undefined },
        { field: "D.StageTypeId", op: "and_in_int", value: undefined },
        { field: "E.FK_Organization_ID", op: "and_in_int", value: undefined },
        { field: "C.CreatedDate", op: "and_date_between", value: undefined },
        { field: "CreateBy", op: "and_in_int", value: undefined },
        { field: "ByWho", op: "and_in_int", value: undefined },
        { field: "Job", op: "and_in_int", value: undefined },
        { field: "KenhTuyenDung", op: "and_in_int", value: undefined },
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
          {/* search */}
          <View width={550}>
            <RHFSearchTextField
              name="search"
              label="Tìm kiếm ứng viên"
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
              isLoading ? rowsPerPage : Math.min(rowsPerPage, DataList?.length)
            }
            columns={TABLE_HEAD}
            isLoading={isLoading}
            dataSource={DataList}
            TableRowComp={(data, order) => (
              <ApplicantTable
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
};
