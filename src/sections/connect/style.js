import {styled} from "@mui/styles";
import {Box, Button, Typography} from "@mui/material";

// title
export const TitleStyle = styled(Typography)(({theme}) => ({
  fontSize: 14,
  fontWeight: 600,
  marginRight: `${theme.spacing(1)} !important`,
}));

export const ButtonStyle = styled(Button)(({theme}) => ({
  backgroundColor: 'transparent',
  padding: '0 !important',
  marginLeft: theme.spacing(0.5),
  width: '0',
  minWidth: '20px !important',
  transition: "none",
}));

// item style
export const BoxWrapperStyle = styled(Box)(({borderColor, theme}) => ({
  borderRadius: '6px',
  backgroundColor: '#FDFDFD',
  minHeight: theme.spacing(8),
  borderLeftColor: borderColor || "#FB8906",
  borderLeftWidth: '3px',
  borderLeftStyle: 'solid',
  padding: theme.spacing(2, 3),
  width: '100%'
}));

export const BoxItemStyle = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%'
}));

// Connect Card Style
export const ConnectCardStyle = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  backgroundColor: "#F2F4F5",

}));

export const ConnectCardItemStyle = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%'
}));
