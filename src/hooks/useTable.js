import { defaultPagination } from "@/config";
import { useState } from "react";

export default function useTable(props) {
  const [page, setPage] = useState(props?.defaultCurrentPage || 0);
  const [rowsPerPage, setRowsPerPage] = useState(
    props?.defaultRowsPerPage || defaultPagination
  );

  const onChangePage = (_, v) => {
    setPage(v);
  };

  const onChangeRowsPerPage = (e) => {
    setPage(0);
    setRowsPerPage(parseInt(e.target.value, 10));
  };

  return {
    page,
    setPage,
    rowsPerPage,
    //
    onChangePage,
    onChangeRowsPerPage,
  };
}

export function emptyRows(page, rowsPerPage, arrayLength) {
  return page > 0 ? Math.max(0, rowsPerPage - arrayLength) : 0;
}
