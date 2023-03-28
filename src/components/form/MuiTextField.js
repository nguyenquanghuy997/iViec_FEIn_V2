import {forwardRef, useImperativeHandle, useRef} from "react";
import PropTypes from 'prop-types';
import {STYLE_CONSTANT as style} from "@/theme/palette";
import {InputAdornment, TextField} from "@mui/material";

const MuiTextField = forwardRef((props, ref) => {
    const { type, label, value, variant, startIcon, endIcon, onChange, height = 44, multiline = false, sx, ...other } = props;
    const _textField = useRef();
    const _inputRef = useRef();

    useImperativeHandle(ref, () => ({
        _inputRef: _inputRef.current,
        ..._inputRef.current
    }));

    const sxProps = {
        "& .MuiInput-root": {
            border: "1px solid #D0D4DB",
            minHeight: height,
            height: "100%",
            fontSize: style.FONT_SM,
            borderRadius: '6px',
            width: style.WIDTH_FULL,
            px: 1,
            "&.Mui-focused": {
                backgroundColor: "transparent",
                boxShadow: "none",
                borderColor: "#D0D4DB",
            },
        },
        minWidth: "100px",
        width: '100%',
        maxWidth: '100%',
        "& .MuiInputBase-root": {
            height: multiline ? 'auto' : height,
        },
        '& .MuiInputBase-multiline': {
            padding: '4px 8px',
        },
        '& .Mui-disabled': {
            background: '#EFF3F6',
        },
        "& .MuiInputLabel-root:not(.MuiInputLabel-shrink)": {
            transform: startIcon
                ? "translate(43px, 11px) !important"
                : "translate(14px, 11px) !important",
        },
        "& .MuiInputBase-input": {
            padding: "8px 8px 8px !important",
        },
        "& .MuiFormHelperText-root": {
            marginLeft: "0",
        },
        ...sx };
    const InputProps = {
        startAdornment: (
            startIcon && <InputAdornment position="start" sx={{ ml: 1 }}>
                {startIcon}
            </InputAdornment>
        ),
        endAdornment: (
            endIcon && <InputAdornment position="end" sx={{ mr: 1 }}>
                {endIcon}
            </InputAdornment>
        ),
        ...other.InputProps,
    }

    const inputProps = {
        type: type,
        label: label,
        value: value,
        variant: variant,
        onChange: onChange,
        onFocus: () => {},
        multiline,
        sx: sxProps,
    };

    return (
        <>
            <TextField
                ref={_textField}
                inputRef={_inputRef}
                {...inputProps}
                {...other}
                InputProps={{ ...InputProps, disableUnderline: true, }}
            />
        </>
    )
})

MuiTextField.propTypes = {
    type: PropTypes.oneOf(["text", "number", "email", "password"]),
    label: PropTypes.string,
    value: PropTypes.string,
    variant: PropTypes.oneOf(["outlined", "filled", "standard"]),
    startIcon: PropTypes.node,
    endIcon: PropTypes.node,
    onChange: PropTypes.func,
};

MuiTextField.defaultProps = {
    type: 'text',
    label: '',
    value: '',
    variant: 'standard',
    startIcon: null,
    endIcon: null,
    onChange: null,
};


export default MuiTextField;