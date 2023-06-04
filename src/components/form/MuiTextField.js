import SvgIcon from "../SvgIcon";
import { LabelStyle } from "@/components/hook-form/style";
import { STYLE_CONSTANT as style } from "@/theme/palette";
import { InputAdornment, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { TimePicker } from "@mui/x-date-pickers";
import moment from "moment";
import PropTypes from "prop-types";
import { forwardRef } from "react";

const MuiTextField = forwardRef((props, ref) => {
  const {
    type,
    label,
    title,
    isRequired,
    value,
    variant,
    startIcon,
    endIcon,
    onChange,
    height = 44,
    multiline = false,
    sx,
    ...other
  } = props;
  const theme = useTheme();
  const sxProps = {
    "& .MuiInput-root": {
      border: "1px solid #D0D4DB",
      minHeight: height,
      height: "100%",
      fontSize: style.FONT_SM,
      borderRadius: "6px",
      width: style.WIDTH_FULL,
      px: 1,
      py: "6px",
      paddingRight: "16px !important",
      backgroundColor: theme.palette.background.paper,
      "&.Mui-focused": {
        backgroundColor: "transparent",
        boxShadow: "none",
        borderColor: theme.palette.common.neutral200,
      },
    },
    minWidth: "100px",
    width: "100%",
    maxWidth: "100%",
    "& .MuiInputBase-root": {
      minHeight: multiline ? "auto" : height,
    },
    "& .MuiInputBase-multiline": {
      padding: "4px 8px",
    },
    "& .Mui-disabled": {
      background: "#EFF3F6",
    },
    "& .MuiInputLabel-root:not(.MuiInputLabel-shrink)": {
      transform: startIcon
        ? "translate(43px, 11px) !important"
        : "translate(14px, 11px) !important",
    },
    "& .MuiInputBase-input": {
      padding: "0 8px !important",
    },
    "& .MuiFormHelperText-root": {
      marginLeft: "0",
    },
    "& .MuiInputBase-root:hover": {
      border: "1.5px solid #A2AAB7",
    },
    ...sx,
  };
  const InputProps = {
    startAdornment: startIcon && (
      <InputAdornment position="start" sx={{ ml: 1 }}>
        {startIcon}
      </InputAdornment>
    ),
    endAdornment: endIcon && (
      <InputAdornment position="end" sx={{ mr: 1 }}>
        {endIcon}
      </InputAdornment>
    ),
    ...other.InputProps,
  };

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
      {title && <LabelStyle required={isRequired}>{title}</LabelStyle>}
      {type === "time" ? (
        <TimePicker
          value={value ? new Date(moment(value, "HH:mm")) : undefined}
          components={{
            OpenPickerIcon: () => (
              <SvgIcon>
                {
                  '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_9515_103671)"> <path d="M10.0003 18.3333C5.39783 18.3333 1.66699 14.6025 1.66699 10C1.66699 5.39751 5.39783 1.66667 10.0003 1.66667C14.6028 1.66667 18.3337 5.39751 18.3337 10C18.3337 14.6025 14.6028 18.3333 10.0003 18.3333ZM10.0003 16.6667C11.7684 16.6667 13.4641 15.9643 14.7144 14.7141C15.9646 13.4638 16.667 11.7681 16.667 10C16.667 8.2319 15.9646 6.5362 14.7144 5.28596C13.4641 4.03572 11.7684 3.33334 10.0003 3.33334C8.23222 3.33334 6.53652 4.03572 5.28628 5.28596C4.03604 6.5362 3.33366 8.2319 3.33366 10C3.33366 11.7681 4.03604 13.4638 5.28628 14.7141C6.53652 15.9643 8.23222 16.6667 10.0003 16.6667ZM10.8337 10H14.167V11.6667H9.16699V5.83334H10.8337V10Z" fill="#5C6A82"/> </g> <defs> <clipPath id="clip0_9515_103671"> <rect width="20" height="20" fill="white"/> </clipPath> </defs> </svg>'
                }
              </SvgIcon>
            ),
          }}
          onChange={(e) => {
            const value = moment(e).format("HH:mm");
            onChange?.({ target: { value } });
          }}
          renderInput={(params) => {
            return (
              <TextField
                ref={ref}
                {...params}
                {...inputProps}
                {...other}
                InputProps={{
                  ...InputProps,
                  ...params.InputProps,
                  disableUnderline: true,
                }}
                type={undefined}
                onChange={undefined}
              />
            );
          }}
        />
      ) : (
        <TextField
          ref={ref}
          {...inputProps}
          {...other}
          InputProps={{ ...InputProps, disableUnderline: true }}
        />
      )}
    </>
  );
});

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
  type: "text",
  label: "",
  value: "",
  variant: "standard",
  startIcon: null,
  endIcon: null,
  onChange: null,
};

export default MuiTextField;
