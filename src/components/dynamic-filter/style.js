import {styled} from "@mui/styles";
import {Box, Typography} from "@mui/material";
import {TreeView} from "@mui/lab";

export const BoxLabelStyle = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  padding: theme.spacing(0, 2),
  minHeight: '44px',
  borderBottom: '1px solid #E7E9ED',
  "&.MuiTreeItem-content": {
    "& .MuiTreeItem-label": {
      "& .selected-icon": {
        display: "none",
      }
    },
    "&.Mui-selected .MuiTreeItem-label": {
      fontWeight: 600,
      "& .selected-icon": {
        display: "block",
      }
    },
  },
  "& .MuiTreeItem-iconContainer": {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

export const LabelTextStyle = styled(Typography)(({theme}) => ({
  marginLeft: theme.spacing(1),
  fontSize: 14,
  color: '#172B4D',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}));

export const TreeViewStyle = styled(TreeView)(({theme}) => ({
  "&.tree-item": {
    "& .MuiTreeItem-root": {
      paddingTop: 0,
      paddingBottom: 0
    },
    "& .MuiCollapse-root": {
      margin: 0,
      "& .MuiTreeItem-root": {
        paddingLeft: theme.spacing(2),
      }
    },
    "& .MuiTreeItem-content": {
      "&:hover": {
        backgroundColor: 'transparent !important',
      },
      "&.Mui-selected": {
        backgroundColor: 'transparent !important',
      }
    }
  }
}));