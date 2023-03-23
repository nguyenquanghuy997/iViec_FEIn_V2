import {styled} from "@mui/styles";
import {Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, Typography} from "@mui/material";
import Tab from "@mui/material/Tab";
import { STYLE_CONSTANT as style } from "@/theme/palette";

const JobTitleStyle = styled(Typography)(({}) => ({
  "&.job-title": {
    fontSize: style.FONT_XL,
    fontWeight: style.FONT_SEMIBOLD,
    color: style.COLOR_TEXT_BLACK,
  }
}));

const ButtonDraftStyle = styled(Button)(({theme}) => ({
  '&.button-draft': {
    padding: theme.spacing(1, 1.5),
    minHeight: '36px',
    borderRadius: 6,
    marginLeft: theme.spacing(1),
    backgroundColor: style.BG_GRAY,
    color: style.COLOR_TEXT_PRIMARY,
    fontSize: style.FONT_SM,
    fontWeight: style.FONT_MEDIUM,
    "&:hover": {
      backgroundColor: style.BG_GRAY,
      color: style.COLOR_TEXT_PRIMARY,
    },
    "&.Mui-disabled": {
      color: '#8A94A5',
      backgroundColor: '#D0D4DB'
    }
  }
}));

const TabStyle = styled(Tab)(({theme}) => ({
  "&.tab-item": {
    textAlign: 'left',
    maxWidth: style.WIDTH_FULL,
    backgroundColor: style.BG_GRAY,
    borderRadius: "6px",
    "&.MuiTab-root": {
      minHeight: '76px',
      textTransform: 'unset',
      padding: theme.spacing(2),
      marginRight: '20px'
    },
    "&.Mui-selected": {
      color: style.COLOR_WHITE,
      backgroundColor: style.BG_PRIMARY,
    },
    "& .MuiTabs-indicator": {
      display: "none",
    },
  }
}));

// create
const BoxWrapperStyle = styled(Box)(({}) => ({
  width: style.WIDTH_FULL,
  borderRadius: 6,
}))

const BoxInnerStyle = styled(Box)(({}) => ({
  backgroundColor: style.BG_WHITE,
  boxShadow: ' 0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)',
  maxWidth: '844px',
  flex: 1
}))


const DividerCardStyle = styled(Box)(({theme}) => ({
  backgroundColor: '#455570',
  width: '844px',
  height: '52px',
  padding: theme.spacing(2, 3),
}))

// modal
const DialogStyle = styled(Dialog)(({theme}) => ({
  minHeight: '288px !important',
  "& .dialog-confirm": {
    boxShadow: ' 0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)',
    borderRadius: '6px',
    backgroundColor: "#FDFDFD",
  },
  "& .MuiDialog-container": {
    "& .MuiPaper-root": {
      padding: theme.spacing(0, 2),
      borderRadius: '6px',
      width: "100%",
      maxWidth: '600px !important',
      top: -200
    },
  },
}))

const DialogContentStyle = styled(DialogContent)(({theme}) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  mt: theme.spacing(3)
}))

const DialogActionsStyle = styled(DialogActions)(({theme}) => ({
  borderTop: '1px solid #E7E9ED',
  mt: theme.spacing(1)
}))

const TitleAlertStyle = styled(Typography)(({theme}) => ({
  "&.title-confirm": {
    textAlign: 'center',
    width: '100%',
    fontSize: '16px',
    fontWeight: 600,
    color: '#E53935',
    marginTop: theme.spacing(2),
  }
}))

const DialogContentTextStyle = styled(DialogContentText)(({theme}) => ({
  "&.subtitle-confirm": {
    textAlign: 'center',
    width: '100%',
    fontSize: '14px',
    fontWeight: 400,
    display: 'block',
    marginTop: theme.spacing(2),
    "& .subtitle-confirm-name": {
      fontWeight: 600,
      marginLeft: theme.spacing(0.5)
    }
  }
}))

const ButtonCancelStyle = styled(Button)(({}) => ({
  "&.button-cancel": {
    fontSize: 14,
    fontWeight: 600,
    color: '#455570',
    backgroundColor: 'transparent',
    borderRadius: 6,
    "&:hover": {
      color: '#455570',
      backgroundColor: 'transparent',
    }
  }
}));

export {
  JobTitleStyle,
  ButtonDraftStyle,
  TabStyle,
  DividerCardStyle,
  BoxWrapperStyle,
  BoxInnerStyle,
  DialogStyle,
  DialogContentStyle,
  DialogActionsStyle,
  TitleAlertStyle,
  DialogContentTextStyle,
  ButtonCancelStyle,
}
