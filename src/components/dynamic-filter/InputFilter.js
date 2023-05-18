import React from "react";
import {TextField} from "@mui/material";
import {STYLE_CONSTANT} from "@/sections/auth/register/constants";
import {styled} from "@mui/material/styles";

const TextFieldStyle = styled(TextField)(({theme}) => ({
    "&.input-filter .MuiInputBase-root": {
        height: "44px",
        fontSize: STYLE_CONSTANT.FONT_SM,
        borderRadius: theme.spacing(0.75),
        width: STYLE_CONSTANT.WIDTH_FULL,
        '&.Mui-focused': {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            borderColor: theme.palette.common.neutral200,
        },
    },
    "&.MuiInput-root.Mui-error": {
        border: '1px solid red',
        height: "44px",
    },
    "&.input-filter .MuiInputBase-root .MuiOutlinedInput-notchedOutline": {
        border: '1px solid #D0D4DB',
    },
    "&.input-filter .MuiInputBase-root.Mui-error .MuiOutlinedInput-notchedOutline": {
        border: '1px solid red',
    },
    "& .MuiFormHelperText-root": {
        marginTop: theme.spacing(1),
        marginLeft: 0,
        fontSize: STYLE_CONSTANT.FONT_XS,
        color: STYLE_CONSTANT.COLOR_TEXT_DANGER,
    },
}));

const InputFilter = React.forwardRef((props, ref) => {
    const {name, placeholder, type, onSubmit, ...other} = props;
    return (
        <TextFieldStyle
            inputRef={ref}
            fullWidth
            id={name}
            name={name}
            {...other}
            onKeyPress={onSubmit}
            type={type}
            placeholder={placeholder}
            className='input-filter'
        />
    );
})

export default InputFilter;
