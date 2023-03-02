import React from 'react'
import PropTypes from 'prop-types';
import {Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel} from "@mui/material";
import { visuallyHidden } from '@mui/utils';
import {styled} from "@mui/styles";
import {CheckboxIconChecked, CheckboxIconDefault, CheckboxIconIndeterminate} from "@/assets/CheckboxIcon";

const TableHeadStyle = styled(TableHead)(({ theme, ownerState }) => ({
    position: 'relative',
    padding: theme.spacing(10),
    borderBottom: '2px solid #CCD4DC',
    ...ownerState,
}))

const TableCellStyle = styled(TableCell)(({ theme, minWidth, }) => ({
    padding: theme.spacing(2, 1),
    backgroundColor: '#FDFDFD',
    color: '#172B4D',
    minWidth: `${minWidth}px`
}))

const CommonTableHead = ({ isCheckbox, columns, tableHeadStyle = {}, ...props }) => {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    return (
        <TableHeadStyle ownerState={tableHeadStyle}>
            <TableRow>
                { isCheckbox && <TableCellStyle padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                        icon={<CheckboxIconDefault />}
                        checkedIcon={<CheckboxIconChecked />}
                        indeterminateIcon={<CheckboxIconIndeterminate />}
                    />
                </TableCellStyle> }
                {columns?.map((headCell) => (
                    <TableCellStyle
                        key={headCell.id}
                        align={headCell.align ? headCell.align : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        minWidth={headCell?.minWidth}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCellStyle>
                ))}
            </TableRow>
        </TableHeadStyle>
    )
}

CommonTableHead.propTypes = {
    isCheckbox: PropTypes.bool.isRequired,
    columns: PropTypes.array.isRequired,
    numSelected: PropTypes.number,
    onRequestSort: PropTypes.func,
    onSelectAllClick: PropTypes.func,
    order: PropTypes.oneOf(['asc', 'desc']),
    orderBy: PropTypes.string,
    rowCount: PropTypes.number,
};

export default React.memo(CommonTableHead);