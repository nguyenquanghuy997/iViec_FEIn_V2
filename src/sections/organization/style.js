import {styled} from "@mui/styles";
import {Box, Button, Checkbox} from '@mui/material';
import {TreeItem, TreeView} from "@mui/lab";

const CheckboxStyle = styled(Checkbox)(({theme}) => ({
  '&.MuiCheckbox-root': {
    paddingBottom: theme.spacing(0),
    paddingTop: theme.spacing(0),
    "&:hover": {
      backgroundColor: 'transparent'
    },
  }
}));

const TreeItemStyle = styled(TreeItem)(({theme}) => ({
  [theme.breakpoints.up('xl')]: {
    '&.tree-item .MuiTreeItem-content': {
      height: 48,
      marginBottom: theme.spacing(0.5),
      position: 'relative',
      borderLeft: '1px solid transparent',
      "&:active, &:focus": {
        backgroundColor: 'transparent !important',
      },
      '&.Mui-selected': {
        "&.Mui-expanded": {
          backgroundColor: '#F2F4F5 !important',
          borderLeft: '1px solid #d0d4db',
        },
        "&.Mui-focused": {
          backgroundColor: '#F2F4F5 !important',
          borderLeft: '1px solid #d0d4db',
        },
        "&:hover": {
          backgroundColor: '#F2F4F5 !important',
        }
      },
      "& .MuiTreeItem-label": {
        display: 'flex',
        alignItems: 'center',
        position: "relative",
        "&:before": {
          pointerEvents: "none",
          content: '""',
          position: "absolute",
          width: 18,
          left: -8,
          top: 24,
          borderBottom: `1px solid #D0D4DB`
        },
      },
      "& .MuiTreeItem-iconContainer": {
        position: 'absolute',
        top: '50%',
        left: theme.spacing(5),
        transform: 'translateY(-50%)'
      },
      "& .MuiFormControlLabel-label": {
        marginLeft: theme.spacing(2),
        fontSize: '14px',
      },
      "& .tree-label-title": {
        marginLeft: theme.spacing(2.5),
        fontSize: '14px',
        color: '#455570',
        height: '20px',
        fontWeight: 600,
        display: 'inline-block',
      },
    },
    '&.tree-item.tree-item-root-node .MuiTreeItem-content': {
      "& .MuiTreeItem-label:has(.tree-item-label.tree-item-root-label)": {
        "&:before": {
          display: 'none !important',
        },
      }
    },
    "& .tree-item-label": {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 48,
      "& .tree-item-label-text": {
        lineHeight: 3,
        minWidth: '80%',
      },
      "& .tree-item-label-actions": {
        display: 'none',
        alignItems: 'center',
      },
      "& .tree-item-label-actions.tree-item-label-actions-checked": {
        display: 'flex',
        alignItems: 'center',
      },
      "&:hover .tree-item-label-actions": {
        transition: 'all ease 0.5s',
        display: 'flex',
        alignItems: 'center',
        height: 22
      },
      "&.tree-item-label-checked .tree-item-label-actions": {
        transition: 'all ease 0.5s',
        display: 'flex',
        alignItems: 'center',
        height: 22
      },
    }
  }
}));
const TreeViewStyle = styled(TreeView)(({theme}) => ({
  [theme.breakpoints.up('xl')]: {
    "& .tree-item .MuiTreeItem-group": {
      marginLeft: theme.spacing(3.5),
      position: 'relative',
      "&:before": {
        pointerEvents: "none",
        content: '""',
        position: "absolute",
        height: "calc(100% - 16px)",
        width: 1,
        left: 0,
        top: 0,
        backgroundColor: '#D0D4DB'
      }
    },
  }
}));
const ButtonTreeStyle = styled(Button)(({theme}) => ({
  [theme.breakpoints.up('xl')]: {
    "&.tree-add-button": {
      marginTop: theme.spacing(1),
      marginLeft: theme.spacing(1.5),
      backgroundColor: 'transparent',
      position: 'relative',
      color: '#1976D2',
      fontSize: '12px',
      fontWeight: 600,
      "&:hover": {
        backgroundColor: 'transparent',
      },
      "&:before": {
        pointerEvents: "none",
        content: '""',
        position: "absolute",
        width: 16,
        left: -12,
        top: 16,
        borderBottom: `1px solid #D0D4DB`
      },
    },
    "&.tree-add-button.tree-add-button-root-node": {
      "&:before": {
        display: 'none'
      },
    }
  }
}));

const OrganizationFromHeadStyle = styled(Box)(({theme, width = 600}) => ({
  "&.organization-form-head": {
    position: "fixed",
    top: 0,
    right: 0,
    width: width,
    backgroundColor: '#FDFDFD',
    zIndex: 1,
    borderBottom: '1px solid #E7E9ED',
    padding: theme.spacing(2),
    height: theme.spacing(8),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }

}));

const OrganizationFromFooterStyle = styled(Box)(({theme, width = 600}) => ({
  "&.organization-form-footer": {
    position: "fixed",
    bottom: 0,
    right: 0,
    width: width,
    backgroundColor: '#FDFDFD',
    zIndex: 1,
    borderTop: '1px solid #E7E9ED',
    padding: theme.spacing(2),
    height: theme.spacing(8),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
}));

export {
  CheckboxStyle,
  TreeItemStyle,
  TreeViewStyle,
  ButtonTreeStyle,
  OrganizationFromHeadStyle,
  OrganizationFromFooterStyle,
}

