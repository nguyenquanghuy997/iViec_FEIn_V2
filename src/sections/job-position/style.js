import {Box, Button, Typography} from "@mui/material";
import {styled} from "@mui/styles";

// title
const TitleStyle = styled(Typography)(({theme}) => ({
    fontSize: 14,
    fontWeight: 600,
    color: '#455570',
    marginLeft: `${theme.spacing(2)} !important`,
}));

const ButtonStyle = styled(Button)(({theme}) => ({
    backgroundColor: 'transparent',
    padding: '0 !important',
    marginLeft: theme.spacing(0.5),
    width: '0',
    minWidth: '20px !important',
    transition: "none",
}));

// item style
const BoxHeaderWrapperStyle = styled(Box)(({theme}) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
}));

const BoxItemStyle = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    width: '100%'
}));

// Connect Card Style
const ConnectCardStyle = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    backgroundColor: "#F2F4F5",

}));

const ConnectCardItemStyle = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    width: '100%'
}));

export {
    TitleStyle,
    ButtonStyle,
    BoxHeaderWrapperStyle,
    BoxItemStyle,
    ConnectCardStyle,
    ConnectCardItemStyle
}