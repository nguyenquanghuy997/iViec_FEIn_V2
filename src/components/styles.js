import { styled } from "@mui/material/styles";
import { pxToRem } from "@/utils/getFontValue";

export const FormStyle = styled('div')(({ theme: { palette } }) => ({
  '.form-group': {
    marginBottom: '24px',
    '&.no-margin': {
      marginBottom: 0,
    },
    '> label': {
      marginBottom: '8px',
      display: 'block',
      fontWeight: 500,
      color: palette.text.secondary,
    },
    '.MuiInputBase-root': {
      borderRadius: '6px',
      fontSize: pxToRem(14),
      '.tag-item': {
        transform: 'none',
      },
      '.MuiInputBase-input': {
        // transform: 'translateY(1px)',
      },
    },
  },
  '.form-value': {
    height: 44,
    background: palette.common.bgrObject,
    borderRadius: 6,
    display: 'flex',
    alignItems: 'center',
    padding: '8px 16px',
    fontSize: pxToRem(14),
  },
}));