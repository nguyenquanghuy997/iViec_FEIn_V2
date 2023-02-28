// @mui
import { LabelStyle } from "@/components/hook-form/style";
import { TextField } from "@mui/material";
import PropTypes from "prop-types";
// form
import { Controller, useFormContext } from "react-hook-form";

RHFTextField.propTypes = {
  name: PropTypes.string,
  variant: PropTypes.string,
  title: PropTypes.string,
  isRequired: PropTypes.bool,
};

RHFTextField.defaultProps = {
  variant: "standard",
  title: "",
  isRequired: false,
};

export default function RHFTextField({ name, title, isRequired, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <>
            {title && <LabelStyle required={isRequired}>{title}</LabelStyle>}
            <TextField
              {...field}
              fullWidth
              error={!!error}
              helperText={error?.message}
              {...other}
            />
          </>
        );
      }}
    />
  );
}
