import {STYLE_CONSTANT} from "@/sections/auth/register/constants";
import {styled} from "@mui/material/styles";
import {makeStyles} from "@mui/styles";
import {Autocomplete, FormHelperText, Input, InputLabel, Select, TextField} from "@mui/material";

const useStyles = makeStyles(() => ({
    paper: {
        maxHeight: '330px !important',
        border: '1px solid #D0D4DB !important',
        borderTop: '0 !important',
        borderTopLeftRadius: '0 !important',
        borderTopRightRadius: '0 !important',
        borderBottomLeftRadius: '6px !important',
        borderBottomRightRadius: '6px !important',
        "& .MuiList-root": {
            padding: 0,
        },
        "&::-webkit-scrollbar": {
            width: "4px",
            borderRadius: '6px'
        },
        "&::-webkit-scrollbar-track": {
            background: "#EFF3F6"
        },
        "&::-webkit-scrollbar-thumb": {
            background: "#B9BFC9"
        },
        "&::-webkit-scrollbar-thumb:hover": {
            background: "#888"
        }
    }
}));

const TextFieldStyle = styled(TextField)(({theme}) => ({
    "& input": {
        "&:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 30px white inset !important",
        },
        "&:-webkit-autofill:hover": {
            WebkitBoxShadow: "0 0 0 30px white inset !important",
        },
        "&:-webkit-autofill:focus": {
            WebkitBoxShadow: "0 0 0 30px white inset !important",
        },
        "&:-webkit-autofill:active": {
            WebkitBoxShadow: "0 0 0 30px white inset !important",
        },
    },
    "& .MuiInput-root": {
        border: '1px solid #D0D4DB',
        height: "44px",
        fontSize: STYLE_CONSTANT.FONT_SM,
        borderRadius: theme.spacing(0.75),
        width: STYLE_CONSTANT.WIDTH_FULL,
        '&.Mui-focused': {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            borderColor: '#D0D4DB',
        },
    },
    "& .MuiInput-root.Mui-error": {
        border: '1px solid red',
        height: "44px",
    },
    "& .MuiFormHelperText-root": {
        marginTop: theme.spacing(1),
        marginLeft: 0,
        fontSize: STYLE_CONSTANT.FONT_XS,
        color: STYLE_CONSTANT.COLOR_TEXT_DANGER,
    },
    "& .MuiInputAdornment-positionEnd": {
        marginRight: theme.spacing(1.5)
    },
    "& .MuiInputAdornment-positionStart": {
        marginLeft: theme.spacing(1.5)
    }
}));

const SelectFieldStyle = styled(Select)(({theme}) => ({
    "&.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        border: '1px solid #D0D4DB',
    },
    "&.MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
        border: '1px solid red',
    },
    "&.MuiInputBase-root": {
        height: "44px",
        fontSize: STYLE_CONSTANT.FONT_SM,
        borderRadius: 6,
        width: STYLE_CONSTANT.WIDTH_FULL,
    },
    "& .MuiSelect-select": {
        borderRadius: 6,
    },
    ".MuiFormHelperText-root": {
        marginTop: theme.spacing(1),
        marginLeft: 0,
    },
}));

const AutocompleteFieldStyle = styled(Autocomplete)(({theme}) => ({
    "&.MuiAutocomplete-root .MuiAutocomplete-inputRoot": {
        paddingTop: '4.5px',
        paddingBottom: '4.5px',
        fontSize: "14px",
        color: "#1E5EF3",
        fontWeight: 500,
        borderRadius: '6px',
        borderWidth: 1
    },
    "& .MuiAutocomplete-inputRoot .MuiOutlinedInput-notchedOutline": {
        border: '1px solid #D0D4DB',
        "&:hover": {
            border: '1px solid #D0D4DB',
        }
    },
    "& .MuiAutocomplete-inputRoot:hover .MuiOutlinedInput-notchedOutline": {
        border: '1px solid #D0D4DB',
    },
    "& .MuiAutocomplete-inputRoot.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: '1px solid #D0D4DB',
    },
    "& .MuiAutocomplete-inputRoot.Mui-error .MuiOutlinedInput-notchedOutline": {
        border: '1px solid red',
    },
    ".MuiFormHelperText-root": {
        marginTop: theme.spacing(1),
        marginLeft: 0,
    },
}));

const InputStyle = styled(Input)(({theme}) => ({
    "& input": {
        "&:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 30px white inset !important",
        },
        "&:-webkit-autofill:hover": {
            WebkitBoxShadow: "0 0 0 30px white inset !important",
        },
        "&:-webkit-autofill:focus": {
            WebkitBoxShadow: "0 0 0 30px white inset !important",
        },
        "&:-webkit-autofill:active": {
            WebkitBoxShadow: "0 0 0 30px white inset !important",
        },
    },
    border: '1px solid #D0D4DB',
    height: "44px",
    fontSize: STYLE_CONSTANT.FONT_SM,
    borderRadius: theme.spacing(0.75),
    width: STYLE_CONSTANT.WIDTH_FULL,
    "&.MuiInputBase-root.Mui-error": {
        borderWidth: '1px',
    },
    "& > .MuiInputBase-input": {
        width: '376px',
        padding: '0 0 0 14px !important',
    },
}));

const LabelStyle = styled(InputLabel)(({theme}) => ({
    fontSize: STYLE_CONSTANT.FONT_SM,
    color: STYLE_CONSTANT.COLOR_TEXT_BLACK,
    fontWeight: STYLE_CONSTANT.FONT_MEDIUM,
    marginBottom: theme.spacing(1),
}));
const FormHelperTextStyle = styled(FormHelperText)(({theme}) => ({
    marginTop: theme.spacing(1),
    marginLeft: 0,
    fontSize: STYLE_CONSTANT.FONT_XS,
    color: STYLE_CONSTANT.COLOR_TEXT_DANGER,
}));
const Label = styled(InputLabel)(({theme}) => ({
    fontSize: STYLE_CONSTANT.FONT_SM,
    color: STYLE_CONSTANT.COLOR_TEXT_BLACK,
    fontWeight: STYLE_CONSTANT.FONT_MEDIUM,
    marginBottom: theme.spacing(1),
}));
const SearchInputStyle = {
    boxShadow: "inset 0px -1px 0px #E7E9ED",
    "& .MuiInputBase-root": {
        border: 0,
        borderRadius: 0,
    },
    "& .MuiInputBase-input": {
        color: STYLE_CONSTANT.COLOR_TEXT_SECONDARY,
        padding: "10px 0",
        fontFamily: "Inter",
        fontWeight: STYLE_CONSTANT.FONT_MEDIUM,
        fontSize: STYLE_CONSTANT.FONT_SM,
    },
    "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
        padding: 0,
    },
}

const MenuItemStyle = {
    color: "#172B4D",
    padding: "10px 16px",
    fontSize: STYLE_CONSTANT.FONT_SM,
    fontWeight: STYLE_CONSTANT.FONT_NORMAL,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    "&.MuiMenuItem-root.empty-option": {
        display: 'none',
        opacity: 0,
        height: 0,
        visibility: 'hidden',
    }
}

const InputLabelStyle = {
    fontSize: STYLE_CONSTANT.FONT_SM,
    color: STYLE_CONSTANT.COLOR_TEXT_SECONDARY,
    fontWeight: STYLE_CONSTANT.FONT_MEDIUM,
    marginBottom: 1,
};
const InputLabelErrorStyle = {
    color: STYLE_CONSTANT.COLOR_TEXT_DANGER,
    marginLeft: 0,
};

export {
    useStyles,
    InputStyle,
    LabelStyle,
    Label,
    FormHelperTextStyle,
    TextFieldStyle,
    SelectFieldStyle,
    AutocompleteFieldStyle,
    SearchInputStyle,
    MenuItemStyle,
    InputLabelStyle,
    InputLabelErrorStyle,
}