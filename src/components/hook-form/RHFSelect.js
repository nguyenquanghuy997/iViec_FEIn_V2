// section
import { STYLE_CONSTANT } from "@/sections/auth/register/constants";
// @mui
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

export default function RHFSelect({ name, children, ...props }) {
  const { control } = useFormContext();
  const { hasLabel = true, htmlFor, required, label, placeholder, sx } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Stack direction="column">
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
            {...field}
            select
            id={name}
            fullWidth
            SelectProps={{ native: true }}
            error={!!error}
            {...props}
            helperText={error?.message}
            label={null}
            hiddenLabel
            required={false}
            sx={
              sx
                ? sx
                : {
                    "& .MuiSelect-select .notranslate::after": placeholder && {
                      content: `"${placeholder || label}"`,
                      color: STYLE_CONSTANT.COLOR_TEXT_GRAY,
                      fontSize: STYLE_CONSTANT.FONT_SM,
                    },
                    ".MuiInputBase-root": {
                      height: "44px",
                      fontSize: STYLE_CONSTANT.FONT_SM,
                      borderRadius: 0.75,
                      width: STYLE_CONSTANT.WIDTH_FULL,
                    },
                    "& .MuiSelect-select": {
                      borderRadius: 0.75,
                    },
                    ".MuiFormHelperText-root": {
                      marginTop: 1,
                      marginLeft: 0,
                    },
                  }
            }
          >
            {children}
          </TextField>
        </Stack>
      )}
    />
  );
}

RHFSelect.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  htmlFor: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  sx: PropTypes.oneOf([PropTypes.object, PropTypes.string]),
};

RHFSelect.defaultProps = {
  htmlFor: "",
  name: "",
  label: "",
  placeholder: "",
  sx: null,
};
