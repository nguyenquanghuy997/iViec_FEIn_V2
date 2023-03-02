import React from 'react'
import {styled} from "@mui/styles";
import {Avatar, Checkbox, Stack, TableBody, TableCell, TableRow, Typography} from "@mui/material";
import {View} from "@/components/FlexStyled";
import CommonTable from "@/sections/job-position/table/CommonTable";
import CommonTableHead from "@/sections/job-position/table/CommonTableHead";
import {getComparator, stableSort} from "@/sections/job-position/table/function";
import CommonTableFooter from "@/sections/job-position/table/CommonTableFooter";
import {useForm} from "react-hook-form";
import {CheckboxIconChecked, CheckboxIconDefault, CheckboxIconIndeterminate} from "@/assets/CheckboxIcon";
import OrganizationTableToolbar from "@/sections/organizationdetail/component/OrganizationTableToolbar";
import {convertViToEn, stringAvatar} from "@/utils/function";

const TableCellStyle = styled(TableCell)(({theme}) => ({
  padding: theme.spacing(1),
  backgroundColor: '#FDFDFD',
  color: '#172B4D',
  height: '60px',
}))

function createData(id, name, email, phoneNumber, roleGroup, isActivate, createdDate, userInvite) {
  return {id, name, email, phoneNumber, roleGroup, isActivate, createdDate, userInvite};
}

const rows = [
  createData("1",'Nguyễn Thị Thanh Huyền', 'Example@fpt.com.vn', "0123 456 789", ['Nhân viên tuyển dụng', 'Nhân viên tuyển dụng 2'], 1, '17/02/2023', 'Nguyễn Thị Thanh Huyền'),
  createData("2",'Nguyễn Thị Thanh Huyền', 'Example@fpt.com.vn', "0123 456 789", ['Nhân viên tuyển dụng'], 1,'17/02/2023', 'Nguyễn Thị Thanh Huyền'),
  createData("3",'Nguyễn Thị Thanh Huyền', 'Example@fpt.com.vn', "0123 456 789", ['Nhân viên tuyển dụng'], 0,'17/02/2023', 'Nguyễn Thị Thanh Huyền'),
  createData("4",'Nguyễn Thị Thanh Huyền', 'Example@fpt.com.vn', "0123 456 789", ['Nhân viên tuyển dụng'], 0,'17/02/2023', 'Nguyễn Thị Thanh Huyền'),
  createData("5",'Nguyễn Thị Thanh Huyền', 'Example@fpt.com.vn', "0123 456 789", ['Nhân viên tuyển dụng'], 0,'17/02/2023', 'Nguyễn Thị Thanh Huyền'),
  createData("6",'Nguyễn Thị Thanh Huyền', 'Example@fpt.com.vn', "0123 456 789", ['Chờ nội bộ phê duyệt'], 1,'17/02/2023', 'Nguyễn Thị Thanh Huyền'),
  createData("7",'Nguyễn Thị Thanh Huyền', 'Example@fpt.com.vn', "0123 456 789", ['Chờ nội bộ phê duyệt'], 1,'17/02/2023', 'Nguyễn Thị Thanh Huyền'),
  createData("8",'Nguyễn Thị Thanh Huyền', 'Example@fpt.com.vn', "0123 456 789", ['Chờ nội bộ phê duyệt'], 1,'17/02/2023', 'Nguyễn Thị Thanh Huyền'),
  createData("9",'Nguyễn Thị Thanh Huyền', 'Example@fpt.com.vn', "0123 456 789", ['Chờ nội bộ phê duyệt'], 1,'17/02/2023', 'Nguyễn Thị Thanh Huyền'),
  createData("10",'Nguyễn Thị Thanh Huyền', 'Example@fpt.com.vn', "0123 456 789", ['Chờ nội bộ phê duyệt'], 1,'17/02/2023', 'Nguyễn Thị Thanh Huyền'),
  createData("11",'Nguyễn Thị Thanh Huyền', 'Example@fpt.com.vn', "0123 456 789", ['Chờ nội bộ phê duyệt'], 1,'17/02/2023', 'Nguyễn Thị Thanh Huyền'),
  createData("12",'Nguyễn Thị Thanh Huyền', 'Example@fpt.com.vn', "0123 456 789", ['Chờ nội bộ phê duyệt'], 1,'17/02/2023', 'Nguyễn Thị Thanh Huyền'),
  createData("13",'Nguyễn Thị Thanh Huyền', 'Example@fpt.com.vn', "0123 456 789", ['Chờ nội bộ phê duyệt'], 1,'17/02/2023', 'Nguyễn Thị Thanh Huyền'),
  createData("14",'Nguyễn Thị Thanh Huyền', 'Example@fpt.com.vn', "0123 456 789", ['Chờ nội bộ phê duyệt'], 1,'17/02/2023', 'Nguyễn Thị Thanh Huyền'),
  createData("15",'Nguyễn Thị Thanh Huyền', 'Example@fpt.com.vn', "0123 456 789", ['Chờ nội bộ phê duyệt'], 1,'17/02/2023', 'Nguyễn Thị Thanh Huyền'),
  createData("16",'Nguyễn Thị Thanh Huyền', 'Example@fpt.com.vn', "0123 456 789", ['Chờ nội bộ phê duyệt'], 1,'17/02/2023', 'Nguyễn Thị Thanh Huyền'),
];

const columns = [
  {
    id: "STT",
    label: "STT",
    align: "center",
    position: 'sticky'
  },
  {id: "name", label: "Họ và tên", minWidth: 220,
    render: (value) => <>
      <Stack direction="row" alignItems="center">
        <Avatar {...stringAvatar(convertViToEn(value))} />
        <Typography variant="body2" sx={{ ml: 1 }}>{value}</Typography>
      </Stack>
    </>
  },
  {id: "email", label: "Email", minWidth: 220},
  {id: "phoneNumber", label: "Số điện thoại", align: "left", minWidth: 150},
  {
    id: "roleGroup",
    label: "Vai trò",
    align: "left",
    minWidth: 220,
    render: (value) => value.map(item => <Typography variant="body2">{item}</Typography>)
  },
  {
    id: "isActivate",
    label: "Trạng thái",
    align: "center",
    minWidth: 180,
    render: (value) => value === 1 ? <Typography variant="body2" sx={{ color: '#388E3C' }}>Đang hoạt động</Typography>  : <Typography variant="body2" sx={{ color: '#D32F2F' }}>Dừng hoạt động</Typography>
  },
  {id: "createdDate", label: "Ngày tham gia", align: "center", minWidth: 150},
  {id: "userInvite", label: "Người mời tham gia", align: "left", minWidth: 150, render: (value) => <>
      <Stack direction="row" alignItems="center">
        <Avatar {...stringAvatar(convertViToEn(value))}/>
        <Typography variant="body2" sx={{ ml: 1 }}>{value}</Typography>
      </Stack>
    </>},
];
const OrganizationDetailTable = () => {

  // form search
  const methods = useForm({
    mode: "onChange",
    defaultValues: {search: ""},
  });

  // table
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    // call api
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
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

  const isSelected = (id) => selected.indexOf(id) !== -1;

// Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 1 ? Math.max(0, (page) * rowsPerPage - rows.length) : 1;

  return (
      <Stack sx={{
        backgroundColor: '#FDFDFD',
        width: '100%',
        borderRadius: '6px',
        boxShadow: '0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)',
      }}>
        <View>
          <OrganizationTableToolbar methods={methods}/>
          <CommonTable>
            <CommonTableHead
                columns={columns}
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
                  .slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                        <TableRow
                            hover
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={index}
                            selected={isItemSelected}
                            sx={{borderBottom: '1px solid #CCD4DC', position: 'relative'}}
                        >
                          <TableCellStyle
                              onClick={(event) => handleClick(event, `${row.id}`)}
                              padding="checkbox">
                            <Checkbox
                                color="primary"
                                checked={isItemSelected}
                                inputProps={{ 'aria-labelledby': labelId }}
                                icon={<CheckboxIconDefault />}
                                checkedIcon={<CheckboxIconChecked />}
                                indeterminateIcon={<CheckboxIconIndeterminate />}
                            />
                          </TableCellStyle>
                          <TableCellStyle align='center'>{index + 1}</TableCellStyle>
                          {
                            columns.slice(1).map((column) => {
                              if(column.render) {
                                return (
                                    <TableCellStyle align={column.align} {...column}>{column.render(row[column.id])}</TableCellStyle>
                                )
                              }
                              return (
                                  <TableCellStyle align={column.align} {...column}>{row[column.id]}</TableCellStyle>
                              )
                            })
                          }
                        </TableRow>
                    );
                  })
              }
              {
                  emptyRows > 1 && (
                      <TableRow
                          sx={{
                            height: 60 * emptyRows,
                          }}
                      >
                        <TableCellStyle colSpan={9}/>
                      </TableRow>
                  )
              }
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
              items={rows.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage).length}
          />
        </View>
      </Stack>
  )
}

export default OrganizationDetailTable;