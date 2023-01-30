// @mui
// components
import EmptyContent from "@/components/EmptyContent";
import { TableCell, TableRow } from "@mui/material";
import PropTypes from "prop-types";

TableNoData.propTypes = {
  isNotFound: PropTypes.bool,
};

export default function TableNoData({ isNotFound }) {
  if (!isNotFound) return null;
  return (
    <TableRow>
      <TableCell colSpan={12}>
        <EmptyContent
          title="Không có dữ liệu"
          sx={{
            "& span.MuiBox-root": { height: 160 },
          }}
        />
      </TableCell>
    </TableRow>
  );
}
