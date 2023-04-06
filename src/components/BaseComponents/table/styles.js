import { styled } from '@mui/material/styles';

export const HeaderStyle = styled('div')(() => ({
  background: '#fff',
  boxShadow: '0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)',
  '.search-form': {
    width: '620px',
    maxWidth: '100%',
  },
  '.search-input': {
    flex: 1,
    '.MuiInputBase-root': {
      height: '44px',
      borderRadius: '6px',
      background: '#F2F4F5',
      'fieldset': {
        border: 'none',
      },
    },
  },
}));

export const TableStyle = styled('div')(() => ({
  ".ant-table": {
    minHeight: "500px",
    borderRadius: "8px",
  },
  ".ant-table-content": {
    minHeight: "500px",
    borderRadius: "8px",
  },
  ".ant-table-thead >tr>th": {
    background: "#FDFDFD",
    height: "72px",
    padding: "13px 8px",
    borderBottom: "2px solid #CCD4DC",
    wordBreak: "break-all",
  },
  ".ant-table-tbody >tr >td": {
    padding: "13px 8px",
    color: '#172B4D',
    fontWeight: 400,
    wordBreak: 'break-all'
  },
  ".ant-pagination": {
    padding: "0 16px",
  },
  ".ant-pagination .ant-pagination-total-text": {
    position: "absolute",
    left: 16,
    color: "#455570",
    fontWeight: 600,
    fontSize: 12,
  },

  ".ant-pagination .ant-pagination-item a": {
    color: "#8A94A5",
    fontWeight: 600,
    fontSize: 12,
  },
  ".ant-pagination .ant-pagination-item-active ": {
    background: "#EFF3F7",
    borderRadius: 6,
    border: "none",
  },
  ".ant-pagination .ant-pagination-item-active a": {
    color: "#455570",
    fontWeight: 700,
  },
  ".ant-pagination .ant-select-selection-item": {
    color: "#455570",
    fontWeight: 600,
    fontSize: 12,
  },
  ".ant-select .ant-select-arrow": {
    marginTop: "-5px",
    fontSize: 10,
    color: "#455570",
  },
  ".ant-pagination .ant-pagination-next button": {
    color: "#455570",
  },
  ".ant-select-dropdown.ant-select-dropdown-placement-bottomLeft": {
    zIndex: 10000,
  },
  ".ant-pagination .ant-pagination-item a:hover, .ant-pagination .ant-pagination-next:hover .ant-pagination-item-link": {
    backgroundColor: "#EFF3F7",
    color: "#455570",
    fontWeight: 700,
  },
  '.setting': {
    background: "#FDFDFD",
    boxShadow:
      "0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)",
    borderRadius: "4px",
  },
}));