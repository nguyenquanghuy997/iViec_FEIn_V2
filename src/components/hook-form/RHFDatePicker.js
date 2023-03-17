import { DATE_FORMAT } from "@/config";
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import PropTypes from "prop-types";
// form
import { Controller, useFormContext } from "react-hook-form";

RHFDatePicker.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  DatePickerProps: PropTypes.object,
};

export default function RHFDatePicker({
  name,
  label,
  style,
  DatePickerProps,
  ...other
}) {
  const { control } = useFormContext();
  const props = {
    inputFormat: DATE_FORMAT,
    componentsProps: {
      actionBar: { actions: ["clear", "today"] },
    },
    ...DatePickerProps,
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          {...field}
          error={!!error}
          label={label}
          {...props}
          helperText={error?.message}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              {...other}
              sx={{...style}}
              // InputProps={{
              //   startAdornment: (
              //     <InputAdornment position="start">{startText}</InputAdornment>
              //   ),
              // }}
            />
          )}
        />
      )}
    />
  );
}
