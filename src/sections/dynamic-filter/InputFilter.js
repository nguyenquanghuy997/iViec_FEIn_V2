import React from "react";
import {TextField} from "@mui/material";
import {STYLE_CONSTANT} from "@/sections/auth/register/constants";

const sxDefault = {
    input: {
        "&:-webkit-autofill": {
            "-webkit-box-shadow": "0 0 0 30px white inset !important",
        },
        "&:-webkit-autofill:hover": {
            "-webkit-box-shadow": "0 0 0 30px white inset !important",
        },
        "&:-webkit-autofill:focus": {
            "-webkit-box-shadow": "0 0 0 30px white inset !important",
        },
        "&:-webkit-autofill:active": {
            "-webkit-box-shadow": "0 0 0 30px white inset !important",
        },
    },
    ".MuiInputBase-root": {
        height: "44px",
        fontSize: STYLE_CONSTANT.FONT_SM,
        borderRadius: 0.75,
        width: STYLE_CONSTANT.WIDTH_FULL,
    },
    ".MuiInputBase-root.Mui-error": {
        height: "44px",
        fontSize: STYLE_CONSTANT.FONT_SM,
        borderRadius: 0.75,
        width: STYLE_CONSTANT.WIDTH_FULL,
    },
    ".MuiInputBase-input": {
        height: "44px",
        py: "0 !important",
    },
    ".MuiFormHelperText-root": {
        marginTop: 1,
        marginLeft: 0,
        fontSize: STYLE_CONSTANT.FONT_XS,
        color: STYLE_CONSTANT.COLOR_TEXT_DANGER,
    },
};

const InputFilter = ({name, placeholder, type, ...props}) => {
    const {label, hasLabel = true, sx} = props;
    return (
        <TextField
            fullWidth
            id={name}
            {...props}
            type={type}
            required={false}
            label={hasLabel ? null : label}
            sx={sx ? {...sxDefault, ...sx} : sxDefault}
            placeholder={placeholder}
        />
    );
};

export default InputFilter;
