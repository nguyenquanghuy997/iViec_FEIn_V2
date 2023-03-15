import {Paper} from "@mui/material";
import {makeStyles, styled} from "@mui/styles";
import { STYLE_CONSTANT as style } from '@/theme/palette'

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
    "&.MuiPaper-root.MuiAutocomplete-paper": {
        padding: 0,
        margin: 0,
        width: '100%',
        border: '1px solid #D0D4DB',
        borderTop: theme.spacing(0),
        borderRadius: '0 !important'
    },
    "& .MuiAutocomplete-listbox": {
        padding: 0,
        width: '100%'
    },
    "& .MuiAutocomplete-option": {
        padding: `${theme.spacing(1, 2.5)} !important`,
        borderRadius: '0 !important',
        cursor: 'pointer',
        margin: "0 !important",
        backgroundColor: 'transparent !important',
        borderBottom: '1px solid #E7E9ED',
        fontSize: style.FONT_13,
        "&:last-child": {
            borderWidth: 0
        },
        "&[aria-selected='true']": {
            backgroundColor: '#F2F4F5 !important'
        },
        "&:hover": {
            backgroundColor: '#F2F4F5 !important'
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
    backgroundColor: style.BG_WHITE,
    width: "560px",
    mb: 4.5,
    borderRadius: 0.75,
    boxShadow: "0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)",
    position: "relative",
};

// card label
const CardLabelStyle = {
    textAlign: "center",
    fontSize: style.FONT_XL,
    fontWeight: style.FONT_BOLD,
    mb: 1,
    width: style.WIDTH_FULL,
    color: style.COLOR_TEXT_PRIMARY,
};

const CardSubInfoLabelStyle = {
    textAlign: "center",
    fontSize: 13,
    fontWeight: style.FONT_NORMAL,
    color: style.COLOR_TEXT_PRIMARY,
};

export {
    useStyles,
    PaperAutocompleteStyle,
    BoxWrapperStyle,
    BoxInnerStyle,
    CardLabelStyle,
    CardSubInfoLabelStyle,
};
