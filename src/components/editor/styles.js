import { Box } from '@mui/material';
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

  '&.has-attach-files': {
    position: 'relative',
    '.btn-attachment-files': {
      position: 'absolute',
      top: 1, right: 1,
      zIndex: 1000,
      background: '#fff',
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderLeft: '1px solid ' + palette.text.border,
      minHeight: 39,
    },
    '.tox-editor-header': {
      paddingRight: '150px!important',
    },
  },

  '.attachment-files': {
    marginTop: 24,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    '.file-box': {
      padding: '8px 20px',
      height: '100%',
      width: 280,
      marginRight: 16,
      marginBottom: 8,
      border: '1px solid #B9BFC9',
      '.thumbnail-box': {
        height: 'auto',
        width: 24,
      },
      '&:last-of-type': {
        marginRight: 0,
      },
    }
  },
}));


export const BoxItemFileStyle = styled(Box)(({ theme }) => ({
  "&.file-upload-item": {
    marginRight: theme.spacing(2),
    marginBottom: 8,
    padding: theme.spacing(1, 2),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: "1px solid #B9BFC9",
    borderRadius: 6,
  },
}));