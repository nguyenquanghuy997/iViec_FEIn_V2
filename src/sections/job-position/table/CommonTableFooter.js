import React from 'react'
import {Box, TableFooter, Typography} from '@mui/material';
import {styled} from "@mui/styles";
import CommonTablePagination from "@/sections/job-position/table/CommonTablePagination";

const TableFooterStyle = styled(TableFooter)(({theme}) => ({
    marginTop: theme.spacing(3)
}))

const TableFooterInnerStyle = styled(Box)(({}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 16
}))

const TableFooterTypographyStyle = styled(Typography)(({theme}) => ({
    color: '#455570',
    fontSize: '12px !important',
    fontWeight: '600 !important',
    marginLeft: theme.spacing(2)
}))

const CommonTableFooter = ({
        rowsPerPageOptions,
        rowsPerPage,
        page,
        onPageChange,
        onRowsPerPageChange,
        count,
        total,
        items = 10
    }) => {
    return (
        <TableFooterStyle>
            <TableFooterInnerStyle>
                <TableFooterTypographyStyle>
                    {items} / {total} kết quả phù hợp
                </TableFooterTypographyStyle>
                <CommonTablePagination
                    count={count}
                    shape="rounded"
                    page={page}
                    onPageChange={onPageChange}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={rowsPerPageOptions}
                    onRowsPerPageChange={onRowsPerPageChange}
                />
            </TableFooterInnerStyle>
        </TableFooterStyle>
    )
}

export default React.memo(CommonTableFooter);