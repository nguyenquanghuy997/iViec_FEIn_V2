import { pxToRem } from '@/utils/getFontValue';
import { styled } from '@mui/material/styles';
import { TreeSelect } from 'antd';

export const TreeSelectStyle = styled(TreeSelect)(({ theme: { palette }, height = 44 }) => ({
  'div.ant-select-selector': {
    minHeight: height,
    paddingLeft: 14,
    border: '1px solid ' + palette.text.border + '!important',
    '.ant-select-selection-placeholder': {
      color: palette.text.placeholder,
      fontSize: pxToRem(14),
      paddingLeft: 4,
    },
  }
}));