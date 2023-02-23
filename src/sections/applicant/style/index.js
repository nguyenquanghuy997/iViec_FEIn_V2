import {Button, Box, Typography} from "@mui/material";
import {makeStyles, styled} from "@mui/styles";

const useStyles = makeStyles(({}) => ({}));
const ButtonFilterStyle = styled(Button)(({theme}) => ({
    marginLeft: `${theme.spacing(1)} !important`,
    backgroundColor: "#F3F4F6 !important",
    padding: "12px 16px 12px 16px !important",
    height: "44px",
    borderRadius: "6px !important",
    color: '#455570 !important'
}));

const ButtonCancelStyle = styled(Button)(({theme}) => ({
    marginLeft: theme.spacing(1),
    backgroundColor: "#FDFDFD",
    boxShadow: 'none',
    color: "#455570 !important",
    "&:hover": {
        backgroundColor: "transparent !important",
        boxShadow: 'none',
        color: "#455570",
    }
}));


const HelperTextTypography = styled(Typography)(({theme}) => ({
    padding: theme.spacing(0, 2),
    fontSize: '13px',
    fontWeight: 400,
    fontStyle: 'italic',
    color: "#8A94A5"
}));

const ApplicantModalHeadStyle = styled(Box)(({theme}) => ({
    position: "fixed",
    top: 0,
    right: 0,
    width: `384px`,
    backgroundColor: '#FDFDFD',
    zIndex: 1,
    borderBottom: '1px solid #E7E9ED',
    padding: theme.spacing(2),
    height: theme.spacing(8),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}));

const ApplicantModalFooterStyle = styled(Box)(({theme}) => ({
    position: "fixed",
    bottom: 0,
    right: 0,
    width: `384px`,
    backgroundColor: '#FDFDFD',
    zIndex: 1,
    borderTop: '1px solid #E7E9ED',
    padding: theme.spacing(2),
    height: theme.spacing(8),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}));


export {
    useStyles,
    ButtonFilterStyle,
    HelperTextTypography,
    ApplicantModalHeadStyle,
    ApplicantModalFooterStyle,
    ButtonCancelStyle,
};