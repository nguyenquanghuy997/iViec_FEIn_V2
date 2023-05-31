import {styled } from '@mui/material/styles';
import { pxToRem } from '@/utils/getFontValue';
import { STYLE_CONSTANT } from '@/theme/palette';

export const HeaderStyle = styled('div')(({theme}) => ({
  background: theme.palette.background.default,
  boxShadow: '0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)',
  '.search-form': {
    width: '520px',
    maxWidth: '100%',
  },
  '.search-input': {
    flex: 1,
    '.MuiInputBase-root': {
      height: '44px',
      borderRadius: '6px',
      background: theme.palette.common.bgrMaster,
      fontSize: '14px',
      paddingLeft: 12,
      '.MuiInputBase-input':{
        paddingLeft:'0'
      },
      '&:hover': {
        background: STYLE_CONSTANT.COLOR_DIVIDER
      },
      'fieldset': {
        border: 'none',
      },
    },
  },

  '&.inside': {
    borderRadius: '4px',
    boxShadow:'unset',
    background: theme.palette.common.white,
    '.table-header-container': {
      padding: 16,
    },

    '.search-input': {
      '.MuiInputBase-root': {
        height: '36px',
      },
    },
  },

  '.drawer-filter': {
    '.MuiDrawer-paper': {
      // paddingLeft: 16,
      background: 'transparent',
      borderLeft: 'none',
    },
    'form': {
      background: theme.palette.background.paper,
      boxShadow: '-3px 0px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)',
    },
  },
}));

export const TableStyle = styled('div')(({theme}) => ({
  background: theme.palette.common.white,
  boxShadow: "0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)",
  borderRadius: "4px",
  fontFamily: 'Inter !important',
  ".ant-table": {
    minHeight: "500px",
    borderRadius: "8px",
    fontFamily: 'Inter !important',
  },
  ".ant-table-content": {
    minHeight: 'calc(100vh - 320px)',
    borderRadius: "8px",
  },
  ".ant-table-thead >tr>th": {
    background: theme.palette.common.white,
    height: "72px",
    padding: "13px 8px",
    borderBottom: "2px solid " + theme.palette.common.strokeDividerLine,
    wordBreak: "break-all",
  },
  ".ant-table-thead >tr>th.ant-table-selection-column": {
    width: "56px",
  },
  ".ant-table-tbody >tr >td": {
    padding: "13px 8px",
    color: theme.palette.common.neutral800,
    fontWeight: 400,
    wordBreak: 'break-all',
    fontSize: '13px',
    lineHeight: '20px',
  },
  ".ant-table-empty .ant-table-tbody >tr >td":{
    borderBottom:'unset',
  },
  ".ant-pagination": {
    padding: "0 16px",
  },
  ".ant-checkbox-inner": {
    width: '18px',
  height: '18px',
  border: '2.5px solid #8A94A5'
  },
  '.ant-checkbox-indeterminate .ant-checkbox-inner, .ant-checkbox-checked .ant-checkbox-inner':{
    borderColor: '#1677ff !important'
  },
  '.ant-checkbox-indeterminate .ant-checkbox-inner':{
    backgroundColor: '#1677ff'
  },
  '.ant-checkbox-indeterminate .ant-checkbox-inner:after':{
    width: '8px',
    height: '2px',
    backgroundColor: '#fff'
  },
  ".ant-pagination .ant-pagination-total-text": {
    position: "absolute",
    left: 16,
    color: theme.palette.common.neutral700,
    fontWeight: 600,
    fontSize: 12,
  },

  ".ant-pagination .ant-pagination-item a": {
    color: theme.palette.common.neutral500,
    fontWeight: 600,
    fontSize: 12,
  },
  ".ant-pagination .ant-pagination-item-active ": {
    background: "#EFF3F7",
    borderRadius: 6,
    border: "none",
  },
  ".ant-pagination .ant-pagination-item-active a": {
    color: theme.palette.common.neutral700,
    fontWeight: 700,
  },
  ".ant-pagination .ant-select-selection-item": {
    color: theme.palette.common.neutral700,
    fontWeight: 600,
    fontSize: 12,
  },
  ".ant-select .ant-select-arrow": {
    marginTop: "-5px",
    fontSize: 10,
    color: theme.palette.common.neutral700,
  },
  ".ant-pagination .ant-pagination-next button": {
    color: theme.palette.common.neutral700,
  },
  ".ant-select-dropdown.ant-select-dropdown-placement-bottomLeft": {
    zIndex: 10000,
  },
  ".ant-pagination .ant-pagination-item a:hover, .ant-pagination .ant-pagination-next:hover .ant-pagination-item-link": {
    backgroundColor: "#EFF3F7",
    color: theme.palette.common.neutral700,
    fontWeight: 700,
  },
  
  '&.inside': {
    '.ant-table-wrapper .ant-table': {
      borderRadius: 0,
      paddingLeft: '10px'
    },
  },
}));

export const FilterItemStyle = styled('div')(({ theme: { palette } }) => ({
  marginBottom: 24,
  paddingBottom: 20,
  borderBottom: '1px solid ' + palette.text.border,
  '> div > label': {
    fontWeight: 600,
    fontSize: pxToRem(14),
    color: palette.text.sub,
    transform: 'none',
    position: 'static',
    display: 'block',
    marginBottom: 16,
    '&.Mui-focused': {
      color: palette.text.sub,
    },
    '+ *': {
      marginTop: 0,
    },
  },
  '&:last-of-type': {
    borderBottom: 'none',
    marginBottom: 0,
  },

  '.date-fields, .range-number-fields, .range-money-fields': {
    '.MuiInputAdornment-positionStart > span:last-of-type': {
      display: 'inline-block',
      minWidth: 28,
    },
    '.MuiInputAdornment-positionEnd > button': {
      marginRight: -6,
    },
  },

  '.radio-group-fields': {
    flexDirection: 'row',
    flexWrap: 'wrap',
    '> label': {
      minWidth: 'calc('+ 100/3 +'% - 16px)',
    },
  },

  '.address-fields': {
    '.form-group': {
      marginBottom: 16,
      '> label': {
        fontSize: pxToRem(14),
        fontWeight: 500,
        color: palette.text.primary,
      },
    },
    '.MuiGrid-item:last-of-type > .form-group': {
      marginBottom: 0,
    },
  },
}));