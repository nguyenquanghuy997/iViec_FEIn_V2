import React from 'react';
import {Box, Checkbox, Drawer, Stack, TableBody, TableCell, TableRow} from "@mui/material";
import JobPositionHeader from "@/sections/job-position/JobPositionHeader";
import {View} from "@/components/FlexStyled";
import CommonTableHead from "@/sections/job-position/table/CommonTableHead";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import CommonTable from "@/sections/job-position/table/CommonTable";
import CommonTableToolbar from "@/sections/job-position/table/CommonTableToolbar";
import {getComparator, stableSort} from "@/sections/job-position/table/function";
import {styled} from "@mui/styles";
import CommonTableFooter from "@/sections/job-position/table/CommonTableFooter";
import Content from "@/components/BaseComponents/Content";
import JobPositionSelectModal from "@/sections/job-position/JobPositionSelectModal";

const TableCellStyle = styled(TableCell)(({theme}) => ({
    padding: theme.spacing(1),
    backgroundColor: '#FDFDFD',
    height: '60px'
}))

function createData(name, organization, newsNumber, status, createdDate) {
    return {name, organization, newsNumber, status, createdDate};
}

const rows = [
    createData('Nhân viên cấp cao 1', 'FPT Head Office miền Bắc', 1, 'Chờ nội bộ phê duyệt', '17/02/2023'),
    createData('Nhân viên cấp cao 2', 'FPT Head Office miền Bắc', 2, 'Chờ nội bộ phê duyệt', '17/02/2023'),
    createData('Nhân viên cấp cao 3', 'FPT Head Office miền Bắc', 3, 'Chờ nội bộ phê duyệt', '17/02/2023'),
    createData('Nhân viên cấp cao 4', 'FPT Head Office miền Bắc', 4, 'Chờ nội bộ phê duyệt', '17/02/2023'),
    createData('Nhân viên cấp cao 5', 'FPT Head Office miền Bắc', 5, 'Chờ nội bộ phê duyệt', '17/02/2023'),
    createData('Nhân viên cấp cao 6', 'FPT Head Office miền Bắc', 6, 'Chờ nội bộ phê duyệt', '17/02/2023'),
    createData('Nhân viên cấp cao 7', 'FPT Head Office miền Bắc', 7, 'Chờ nội bộ phê duyệt', '17/02/2023'),
    createData('Nhân viên cấp cao 8', 'FPT Head Office miền Bắc', 8, 'Chờ nội bộ phê duyệt', '17/02/2023'),
    createData('Nhân viên cấp cao 9', 'FPT Head Office miền Bắc', 9, 'Chờ nội bộ phê duyệt', '17/02/2023'),
    createData('Nhân viên cấp cao 10', 'FPT Head Office miền Bắc', 10, 'Chờ nội bộ phê duyệt', '17/02/2023'),
    createData('Nhân viên cấp cao 11', 'FPT Head Office miền Bắc', 10, 'Chờ nội bộ phê duyệt', '17/02/2023'),
];

const TABLE_HEAD = [
    {id: "STT", label: "STT", align: "center", numeric: true},
    {id: "name", label: "Vị trí công việc"},
    {id: "organization", label: "Đơn vị"},
    {id: "newsNumber", label: "Số tin áp dụng", align: "right", numeric: true},
    {id: "status", label: "Trạng thái", align: "left"},
    {id: "createdDate", label: "Ngày tạo", align: "center"},
];

export const JobPositionContent = () => {

    // form search
    const Schema = Yup.object().shape({
        search: Yup.string(),
    });
    const methods = useForm({
        mode: "onChange",
        defaultValues: {search: ""},
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

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 1 ? Math.max(0, (page) * rowsPerPage - rows.length) : 1;

    return (
        <Box>
            <Stack>
                <JobPositionHeader/>
            </Stack>
            <Stack sx={{mt: 2, backgroundColor: '#FDFDFD', width: '100%'}}>
                <View>
                    <CommonTableToolbar methods={methods}/>
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
                                .slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
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
                                            sx={{borderBottom: '1px solid #CCD4DC',}}
                                        >
                                            <TableCellStyle padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCellStyle>
                                            <TableCellStyle align="right">{index + 1}</TableCellStyle>
                                            <TableCellStyle id={labelId} scope="row"
                                                            padding="none">{row.name}</TableCellStyle>
                                            <TableCellStyle align="left">{row.organization}</TableCellStyle>
                                            <TableCellStyle align="right">{row.newsNumber}</TableCellStyle>
                                            <TableCellStyle align="left">{row.status}</TableCellStyle>
                                            <TableCellStyle align="center">{row.createdDate}</TableCellStyle>
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
            <Drawer
                anchor={'bottom'}
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
    )
}
