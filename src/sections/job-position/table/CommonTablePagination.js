import React from 'react'
import {Pagination, TablePagination} from "@mui/material";

const CommonTablePagination = ({
        shape="rounded",
        count,
        page,
        rowsPerPage,
        rowsPerPageOptions=[10, 20, 30],
        onPageChange,
        onRowsPerPageChange
    }) => {
    return (
        <TablePagination
            sx={{ borderTop: 0 }}
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            labelDisplayedRows={() => ''}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
            labelRowsPerPage={`${rowsPerPage || 10} bản ghi trên trang`}
            ActionsComponent={(subProps) => <Pagination
                {...subProps}
                onChange={onPageChange}
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                shape={shape}
            />}
        />
    )
}

export default React.memo(CommonTablePagination);