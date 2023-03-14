import {STYLE_CONSTANT} from "../register/constants";
import {Paper} from "@mui/material";
import {makeStyles, styled} from "@mui/styles";

const useStyles = makeStyles(({}) => ({
    input: {
        border: '1px solid red',
        "&:focus": {
            borderWidth: '1px',
        }
    },
    paperItem: {
        backgroundColor: 'blue'
    }
}));

const PaperAutocompleteStyle = styled(Paper)(({theme}) => ({
    border: '1px solid #D0D4DB',
    borderTop: theme.spacing(0),
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: '6px',
    borderBottomRightRadius: '6px',
    "& .MuiAutocomplete-paper": {
        padding: 0,
        margin: 0,
        width: '100%'
    },
    "& .MuiAutocomplete-option": {
        padding: theme.spacing(1, 2),
        borderRadius: 0,
        cursor: 'pointer',
        margin: 0,
        backgroundColor: 'transparent',
        borderBottom: '1px solid #E7E9ED',
        "&:last-child": {
            borderWidth: 0
        },
        "&[aria-selected='true']": {
            backgroundColor: '#F2F4F5 !important'
        },
        "&:hover": {
            backgroundColor: '#F2F4F5'
        }
    },
    "& ul": {
        padding: 0,
        width: '100%'
    },
    "& li": {
        padding: theme.spacing(1, 2),
        cursor: 'pointer',
        margin: 0,
        backgroundColor: 'transparent',
        borderBottom: '1px solid #E7E9ED',
        "&:last-child": {
            borderWidth: 0
        },
        "&:hover": {
            backgroundColor: '#F2F4F5'
        }
    },
    "& ::-webkit-scrollbar": {
        width: "4px",
        borderRadius: '6px'
    },
    "& ::-webkit-scrollbar-track": {
        background: "#EFF3F6"
    },
    "& ::-webkit-scrollbar-thumb": {
        background: "#B9BFC9"
    },
    "& ::-webkit-scrollbar-thumb:hover": {
        background: "#888"
    }
}));

// box style
const BoxWrapperStyle = {
    mt: "36px",
    mb: "36px",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

const BoxInnerStyle = {
    px: 7.5,
    py: 5,
    backgroundColor: STYLE_CONSTANT.COLOR_BACKGROUND,
    width: "560px",
    mb: 4.5,
    borderRadius: 0.75,
    boxShadow: "0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)",
    position: "relative",
};

// card label
const CardLabelStyle = {
    textAlign: "center",
    fontSize: STYLE_CONSTANT.FONT_XL,
    fontWeight: STYLE_CONSTANT.FONT_BOLD,
    mb: 1,
    width: STYLE_CONSTANT.WIDTH_FULL,
    color: STYLE_CONSTANT.COLOR_TEXT_PRIMARY,
};

const CardSubInfoLabelStyle = {
    textAlign: "center",
    fontSize: 13,
    fontWeight: STYLE_CONSTANT.FONT_NORMAL,
    color: STYLE_CONSTANT.COLOR_TEXT_PRIMARY,
};

export {
    useStyles,
    PaperAutocompleteStyle,
    BoxWrapperStyle,
    BoxInnerStyle,
    CardLabelStyle,
    CardSubInfoLabelStyle,
};
