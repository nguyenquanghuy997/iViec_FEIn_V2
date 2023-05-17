import {Button, Box, Typography} from "@mui/material";
import {styled} from "@mui/styles";

const ButtonFilterStyle = styled(Button)(({theme}) => ({
    marginLeft: `${theme.spacing(1)} !important`,
    backgroundColor:theme.palette.common.neutral50 + " !important",
    padding: "12px 16px 12px 16px !important",
    height: "44px",
    borderRadius: "6px !important",
    color: theme.palette.common.neutral700 + ' !important',
    fontSize: '14px',
    fontWeight: '600 !important'
}));

const ButtonCancelStyle = styled(Button)(({theme}) => ({
    marginLeft: theme.spacing(1),
    backgroundColor: theme.palette.common.white,
    boxShadow: 'none',
    color: theme.palette.common.neutral700  + " !important",
    "&:hover": {
        backgroundColor: "transparent !important",
        boxShadow: 'none',
        color: theme.palette.common.neutral700,
    }
}));
const ButtonSaveStyle = styled(Button)(({theme}) => ({
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    backgroundColor: theme.palette.common.neutral50 + "!important",
    boxShadow: 'none',
    color: theme.palette.common.neutral700 + " !important",
    "&:hover": {
        backgroundColor: theme.palette.common.neutral50 + "!important",
        boxShadow: 'none',
        color: theme.palette.common.neutral700,
    }
}));


const HelperTextTypography = styled(Typography)(({theme}) => ({
    padding: theme.spacing(0, 2),
    fontSize: '13px !important',
    fontWeight: 400,
    fontStyle: 'italic',
    color: theme.palette.common.neutral500
}));

const FilterModalHeadStyle = styled(Box)(({theme}) => ({
    position: "sticky",
    top: 0,
    right: 0,
    width: `384px`,
    backgroundColor: theme.palette.common.white,
    zIndex: 1,
    borderBottom: '1px solid ' + theme.palette.common.neutral100,
    padding: theme.spacing(2),
    height: theme.spacing(8),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}));

const FilterModalFooterStyle = styled(Box)(({theme}) => ({
    position: "fixed",
    bottom: 0,
    right: 0,
    width: `384px`,
    backgroundColor: theme.palette.common.white,
    zIndex: 1,
    borderTop: '1px solid ' + theme.palette.common.neutral100,
    padding: theme.spacing(2),
    height: theme.spacing(8),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}));


export {
    ButtonFilterStyle,
    HelperTextTypography,
    FilterModalHeadStyle,
    FilterModalFooterStyle,
    ButtonCancelStyle,
    ButtonSaveStyle
};
