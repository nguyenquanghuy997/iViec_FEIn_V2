import {styled} from "@mui/styles";
import {Box, Button, Typography} from "@mui/material";
import Tab from "@mui/material/Tab";

const JobTitleStyle = styled(Typography)(({}) => ({
  "&.job-title": {
    fontSize: 20,
    fontWeight: 600,
    color: '#172B4D',
  }
}));

const ButtonDraftStyle = styled(Button)(({theme}) => ({
  '&.button-draft': {
    padding: theme.spacing(1, 1.5),
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
    color: "#455570",
    minHeight: '36px',
    fontSize: 14,
    fontWeight: 500,
    marginLeft: theme.spacing(1),
    "&:hover": {
      backgroundColor: '#F3F4F6',
      color: "#455570",
    },
  }
}));

const TabStyle = styled(Tab)(({theme}) => ({
  "&.tab-item": {
    textAlign: 'left',
    maxWidth: '100%',
    "&.MuiTab-root": {
      height: '76px',
      textTransform: 'unset',
      padding: theme.spacing(2),
      marginRight: '20px'
    },
    "&.Mui-selected": {
      color: "#FDFDFD",
      backgroundColor: "#1976D2",
      borderRadius: "6px",
    },
    "& .MuiTabs-indicator": {
      display: "none",
    },
  }
}));

// create
const BoxWrapperStyle = styled(Box)(({}) => ({
  width: '100%',
  borderRadius: 6,
  // overflow: 'hidden',
  // padding: '0 0 24px',
}))

const BoxInnerStyle = styled(Box)(({}) => ({
  backgroundColor: '#FDFDFD',
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


export {
  JobTitleStyle,
  ButtonDraftStyle,
  TabStyle,
  DividerCardStyle,
  BoxWrapperStyle,
  BoxInnerStyle
}
