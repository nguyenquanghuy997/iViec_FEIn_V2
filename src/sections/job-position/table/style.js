import {Button} from "@mui/material";
import {makeStyles, styled} from "@mui/styles";

const useStyles = makeStyles(() => ({}));

const ButtonFilterStyle = styled(Button)(({}) => ({
    marginLeft: '8px !important',
    backgroundColor: "#F3F4F6 !important",
    padding: '8px 12px !important',
    height: "36px",
    borderRadius: "6px",
    color: '#455570 !important',
    minWidth: '90px',
    fontSize: '14px !important',
    fontWeight: '500 !important'
}));
const ButtonAddStyle = styled(Button)(({}) => ({
    backgroundColor: "#1976D2 !important",
    padding: '8px 12px !important',
    height: "36px",
    borderRadius: "6px !important",
    color: '#FDFDFD !important',
    minWidth: '90px',
    fontSize: '14px !important',
    fontWeight: '500 !important'
}));

export {
    useStyles,
    ButtonFilterStyle,
    ButtonAddStyle,
}