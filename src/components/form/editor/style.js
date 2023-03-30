import { styled } from '@mui/material/styles';

export const EditorStyle = styled('div')(({ theme: { palette } }) => ({
  '.tox-tinymce': {
    border: '1px solid ' + palette.text.border,
    borderRadius: '6px',
  },
  '.tox-editor-header .tox-toolbar__primary': {
    '> .tox-toolbar__group:not(:last-of-type)': {
      position: 'relative',
      '&:after': {
        position: 'absolute',
        content: `""`,
        top: 9, right: 0,
        borderRight: '1px solid ' + palette.text.border,
        height: '60%', width: 1,
      }
    }
  },
}));
