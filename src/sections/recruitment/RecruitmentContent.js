import Content from "@/components/BaseComponents/Content";
import { View } from "@/components/FlexStyled";
import JobPositionSelectModal from "@/sections/job-position/JobPositionSelectModal";
import CommonTable from "@/sections/job-position/table/CommonTable";
import CommonTableFooter from "@/sections/job-position/table/CommonTableFooter";
import CommonTableHead from "@/sections/job-position/table/CommonTableHead";
import CommonTableToolbar from "@/sections/job-position/table/CommonTableToolbar";
import {
  getComparator,
  stableSort,
} from "@/sections/job-position/table/function";
import RecruitmentHeader from "@/sections/recruitment/RecruitmentHeader";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Checkbox,
  Drawer,
  Stack,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/styles";
import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const TableCellStyle = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(1),
  backgroundColor: "#FDFDFD",
  height: "60px",
}));

function createData(
  name,
  organization,
  newsNumber,
  status,
  createdDate,
  createdBy
) {
  return { name, organization, newsNumber, status, createdDate, createdBy };
}

const rows = [
  createData(
    "Bước tuyển dụng 1",
    "Ứng tuyển > Thi tuyển",
    1,
    "Chờ nội bộ phê duyệt",
    "17/02/2023",
    "Nguyễn Thị Thanh Huyền"
  ),
  createData(
    "Bước tuyển dụng 2",
    "Ứng tuyển > Thi tuyển",
    1,
    "Chờ nội bộ phê duyệt",
    "17/02/2023",
    "Nguyễn Thị Thanh Huyền"
  ),
  createData(
    "Bước tuyển dụng 3",
    "Ứng tuyển > Thi tuyển",
    1,
    "Chờ nội bộ phê duyệt",
    "17/02/2023",
    "Nguyễn Thị Thanh Huyền"
  ),
  createData(
    "Bước tuyển dụng 4",
    "Ứng tuyển > Thi tuyển",
    1,
    "Chờ nội bộ phê duyệt",
    "17/02/2023",
    "Nguyễn Thị Thanh Huyền"
  ),
  createData(
    "Bước tuyển dụng 5",
    "Ứng tuyển > Thi tuyển",
    1,
    "Chờ nội bộ phê duyệt",
    "17/02/2023",
    "Nguyễn Thị Thanh Huyền"
  ),
  createData(
    "Bước tuyển dụng 6",
    "Ứng tuyển > Thi tuyển",
    1,
    "Chờ nội bộ phê duyệt",
    "17/02/2023",
    "Nguyễn Thị Thanh Huyền"
  ),
  createData(
    "Bước tuyển dụng 7",
    "Ứng tuyển > Thi tuyển",
    1,
    "Chờ nội bộ phê duyệt",
    "17/02/2023",
    "Nguyễn Thị Thanh Huyền"
  ),
  createData(
    "Bước tuyển dụng 8",
    "Ứng tuyển > Thi tuyển",
    1,
    "Chờ nội bộ phê duyệt",
    "17/02/2023",
    "Nguyễn Thị Thanh Huyền"
  ),
  createData(
    "Bước tuyển dụng 9",
    "Ứng tuyển > Thi tuyển",
    1,
    "Chờ nội bộ phê duyệt",
    "17/02/2023",
    "Nguyễn Thị Thanh Huyền"
  ),
  createData(
    "Bước tuyển dụng 10",
    "Ứng tuyển > Thi tuyển",
    1,
    "Chờ nội bộ phê duyệt",
    "17/02/2023",
    "Nguyễn Thị Thanh Huyền"
  ),
  createData(
    "Bước tuyển dụng 11",
    "Ứng tuyển > Thi tuyển",
    1,
    "Chờ nội bộ phê duyệt",
    "17/02/2023",
    "Nguyễn Thị Thanh Huyền"
  ),
  createData(
    "Bước tuyển dụng 12",
    "Ứng tuyển > Thi tuyển",
    1,
    "Chờ nội bộ phê duyệt",
    "17/02/2023",
    "Nguyễn Thị Thanh Huyền"
  ),
];

const TABLE_HEAD = [
  { id: "STT", label: "STT", align: "center", numeric: true, minWidth: 60 },
  { id: "name", label: "Quy trình tuyển dụng", minWidth: 220 },
  { id: "organization", label: "Bước tuyển dụng", minWidth: 220 },
  {
    id: "newsNumber",
    label: "Số tin áp dụng",
    align: "right",
    numeric: true,
    minWidth: 160,
  },
  { id: "status", label: "Trạng thái", align: "left", minWidth: 180 },
  { id: "createdDate", label: "Ngày tạo", align: "center", minWidth: 180 },
  { id: "createdBy", label: "Bước tuyển dụng", align: "center", minWidth: 220 },
];

export const RecruitmentContent = () => {
  // form search
  const Schema = Yup.object().shape({
    search: Yup.string(),
  });
  const methods = useForm({
    mode: "onChange",
    defaultValues: { search: "" },
    resolver: yupResolver(Schema),
  });

  // const {watch} = methods;

  // const searchValue = useDebounce(watch("search"), 1000);

  // modal
  const [, setIsOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setIsOpen(newOpen);
  };

  // table
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    // call api
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 1 ? Math.max(0, page * rowsPerPage - rows.length) : 1;

  return (
    <Box>
      <Stack>
        <RecruitmentHeader />
      </Stack>
      <Stack sx={{ mt: 2, backgroundColor: "#FDFDFD", width: "100%" }}>
        <View>
          <CommonTableToolbar methods={methods} />
          <CommonTable>
            <CommonTableHead
              columns={TABLE_HEAD}
              isCheckbox
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(
                  (page - 1) * rowsPerPage,
                  (page - 1) * rowsPerPage + rowsPerPage
                )
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                      sx={{ borderBottom: "1px solid #CCD4DC" }}
                    >
                      <TableCellStyle padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCellStyle>
                      <TableCellStyle align="right">{index + 1}</TableCellStyle>
                      <TableCellStyle id={labelId} scope="row">
                        {row.name}
                      </TableCellStyle>
                      <TableCellStyle align="left">
                        {row.organization}
                      </TableCellStyle>
                      <TableCellStyle align="right">
                        {row.newsNumber}
                      </TableCellStyle>
                      <TableCellStyle align="left">{row.status}</TableCellStyle>
                      <TableCellStyle align="center">
                        {row.createdDate}
                      </TableCellStyle>
                      <TableCellStyle align="center">
                        {row.createdBy}
                      </TableCellStyle>
                    </TableRow>
                  );
                })}
              {emptyRows > 1 && (
                <TableRow
                  sx={{
                    height: 60 * emptyRows,
                  }}
                >
                  <TableCellStyle colSpan={9} />
                </TableRow>
              )}
            </TableBody>
          </CommonTable>
          <CommonTableFooter
            rowsPerPageOptions={[5, 10, 25]}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            count={Math.ceil(rows.length / rowsPerPage)}
            total={rows.length}
            items={
              rows.slice(
                (page - 1) * rowsPerPage,
                (page - 1) * rowsPerPage + rowsPerPage
              ).length
            }
          />
        </View>
      </Stack>
      <Drawer
        anchor={"bottom"}
        open={selected.length > 0}
        variant="persistent"
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Content>
          <JobPositionSelectModal />
        </Content>
      </Drawer>
    </Box>
  );
};
