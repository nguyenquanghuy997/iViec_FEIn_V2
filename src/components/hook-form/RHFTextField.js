// @mui
import { STYLE_CONSTANT } from "@/sections/auth/register/constants";
import { InputLabel, Stack, TextField } from "@mui/material";
import PropTypes from "prop-types";
// form
import { Controller, useFormContext } from "react-hook-form";

const InputLabelStyle = {
  fontSize: STYLE_CONSTANT.FONT_SM,
  color: STYLE_CONSTANT.COLOR_TEXT_SECONDARY,
  fontWeight: STYLE_CONSTANT.FONT_MEDIUM,
  marginBottom: 1,
};

const InputLabelErrorStyle = {
  color: STYLE_CONSTANT.COLOR_TEXT_DANGER,
};

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

export default function RHFTextField({ name, ...props }) {
  const { control } = useFormContext();
  const { htmlFor, required, label, placeholder, hasLabel = true, sx } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Stack>
          {hasLabel && (
            <InputLabel
              htmlFor={htmlFor || name}
              required={required}
              sx={
                error
                  ? { ...InputLabelStyle, ...InputLabelErrorStyle }
                  : { ...InputLabelStyle }
              }
            >
              {label}
            </InputLabel>
          )}
          <TextField
            fullWidth
            {...field}
            id={name}
            error={!!error}
            {...props}
            helperText={error?.message}
            required={false}
            hiddenLabel={!hasLabel}
            label={hasLabel ? null : label}
            sx={sx ? sx : sxDefault}
            placeholder={placeholder}
          />
        </Stack>
      )}
    />
  );
}

RHFTextField.propTypes = {
  name: PropTypes.string,
  htmlFor: PropTypes.string,
  required: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

RHFTextField.defaultProps = {
  name: "",
  htmlFor: "",
  required: false,
  label: "",
  placeholder: "",
  sx: sxDefault,
};
