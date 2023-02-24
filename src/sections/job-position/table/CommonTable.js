import React from 'react'
import {Table, TableContainer} from "@mui/material";
import Scrollbar from "@/components/Scrollbar";
import {styled} from "@mui/material/styles";

const TableContainerStyle = styled(TableContainer)(({ theme, ownerState }) => ({
    padding: `0 ${theme.spacing(2)}`,
    // minWidth: '1020px',
    overflowX: 'auto',
    ...ownerState,
}))

const CommonTable = ({ tableStyle = {},children }) => {
    return (
        <Scrollbar>
            <TableContainerStyle ownerState={tableStyle}>
                <Table>
                    {children}
                </Table>
            </TableContainerStyle>
        </Scrollbar>
    )
}

export default React.memo(CommonTable);