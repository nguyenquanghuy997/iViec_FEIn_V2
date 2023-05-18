import { Box } from '@mui/material';
import {styled, useTheme} from '@mui/material/styles';

export const ModalBox = styled(Box)(({ width = 600 }) => {
  const  theme = useTheme();
  return {
    '.modal-content-box': {
      minHeight: "10px",
      maxHeight: "calc(100vh - 60px)",
    },
    backgroundColor: "white",
    borderRadius: "6px",
    boxShadow: "0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)",
    ".modal-header": {
      minHeight: "68px",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "15px 24px",
      borderBottom: "1px solid #E7E9ED",
      color: theme.palette.common.neutral800,
    },
    ".modal-body": {
      padding: "4px 24px 24px",
      maxHeight: 'calc(100vh - 190px)',
      overflow: 'auto',
      flex: 1,
    },
    ".modal-footer": {
      width: "100%",
      height: "68px",
      paddingRight: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      borderTop: "1px solid #E7E9ED",
    },

    '&.alert-modal': {
      width: width,
      maxWidth: '98%',
      minHeight: '1px',
      '.alert-image': {
        display: 'inline-block',
        marginBottom: 16,
      },
      '.modal-header': {
        borderBottom: 'none',
        padding: '10px 24px',
        minHeight: '60px',
      },
      '.modal-body': {
        textAlign: 'center',
      },
      '.modal-footer': {
        height: 'auto',
        '&.btns-vertical': {
          display: 'block',
          borderTop: 'none',
          padding: '24px 32px',
        },
        '&.btns-horizontal': {
          padding: '16px 24px',
          flexDirection: 'row-reverse',
          justifyContent: 'flex-start',
          '> button': {
            display: 'inline-block',
            width: 'auto',
          },
        },
      },
    },
  };
});
