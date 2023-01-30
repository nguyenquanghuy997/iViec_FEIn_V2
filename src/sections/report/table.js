import BasicTable from "@/components/BasicTable";
import Pagination from "@/components/Pagination";
import {
  FormProvider,
  RHFBasicSelect,
  RHFSearchTextField,
} from "@/components/hook-form";
import { useDebounce } from "@/hooks/useDebounce";
import useSettings from "@/hooks/useSettings";
import useTable from "@/hooks/useTable";
import { Box, Card, Container } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const REPORT_TYPE_FULL = [
  { label: "Nổi bật", value: "popular" },
  { label: "Ngày bắt đầu", value: "startDate" },
];

const REPORT_TYPE = [{ label: "Ngày ứng tuyển", value: "ARe.CreatedDate" }];

const defaultValuesFull = {
  sort: "popular",
  search: "",
};

const defaultValues = {
  sort: "ARe.CreatedDate",
  search: "",
};

export const ReportTable = ({ title, tableProps, pageProps, onUpdateData }) => {
  const { themeStretch } = useSettings();

  const methods = useForm({
    defaultValues: title ? defaultValuesFull : defaultValues,
  });
  const { watch } = methods;
  const sort = watch("sort");
  const search = useDebounce(watch("search"), 300);

  const { page, rowsPerPage, onChangePage, onChangeRowsPerPage } = useTable();

  const _onUpdateData = (p, s) => {
    onUpdateData?.({
      sort,
      search: [
        {
          field: "Re.Title",
          op: "and_contains_in",
          value: search || undefined,
        },
      ],
      paging: {
        pageIndex: p + 1,
        PageSize: s,
      },
    });
  };

  const _onChangePage = (event, newPage) => {
    onChangePage(event, newPage);
    _onUpdateData(newPage, rowsPerPage);
  };

  const _onChangeRowsPerPage = (event) => {
    onChangeRowsPerPage(event);
    _onUpdateData(0, event.target.value);
  };

  useEffect(() => {
    _onChangePage(null, 0);
  }, [sort, search]);

  const Wrapper = title ? Card : Box;

  return (
    <Container
      maxWidth={themeStretch ? false : "xl"}
      style={{ padding: title ? 20 : 0 }}
    >
      <FormProvider methods={methods}>
        <Box sx={{ display: "flex", paddingBottom: "24px" }}>
          <div style={{ width: 200 }}>
            <RHFBasicSelect
              name="sort"
              label="Sắp xếp"
              options={title ? REPORT_TYPE_FULL : REPORT_TYPE}
              style={{ background: "#fff" }}
            />
          </div>
          <div style={{ flex: 1 }} />

          <div style={{ width: 550 }}>
            <RHFSearchTextField
              name="search"
              label="Tìm kiếm nhanh trong danh sách"
              style={{ background: "#fff" }}
            />
          </div>
        </Box>
      </FormProvider>

      <Wrapper
        style={
          !title ? { border: "#EBECF4 1px solid", borderRadius: 8 } : undefined
        }
      >
        <span
          style={{
            fontSize: 18,
            fontWeight: "600",
            display: "block",
            padding: title ? "24px 20px" : "10px 0px",
          }}
        >
          {title}
        </span>

        <BasicTable
          page={page}
          rowsPerPage={
            tableProps?.isLoading
              ? rowsPerPage
              : Math.min(rowsPerPage, tableProps?.dataSource?.length)
          }
          {...tableProps}
        />

        <Pagination
          page={page}
          rowsPerPage={rowsPerPage}
          {...pageProps}
          onChangePage={_onChangePage}
          onChangeRowsPerPage={_onChangeRowsPerPage}
        />
      </Wrapper>
    </Container>
  );
};
