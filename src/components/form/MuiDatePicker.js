import MuiTextField from "@/components/form/MuiTextField";
import { DATE_FORMAT } from "@/config";
import { FormHelperText, InputAdornment } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import vi from "date-fns/locale/vi";
import { forwardRef } from "react";
import { Controller, useFormContext } from "react-hook-form";

const renderDayVi = (day) => {
  switch (day) {
    case "Mon":
      return "T2";
    case "Tue":
      return "T3";
    case "Wed":
      return "T4";
    case "Thu":
      return "T5";
    case "Fri":
      return "T6";
    case "Sat":
      return "T7";
    case "Sun":
      return "CN";
  }
};
const MuiDatePicker = forwardRef((props, ref) => {
  const { name, label, DatePickerProps, startIcon, endIcon, ...other } = props;
  const { control } = useFormContext();
  const propsInput = {
    inputFormat: DATE_FORMAT,
    InputProps: {
      startAdornment: startIcon && (
        <InputAdornment position="start">{startIcon}</InputAdornment>
      ),
      endAdornment: endIcon && (
        <InputAdornment position="end">{endIcon}</InputAdornment>
      ),
    },
    ...DatePickerProps,
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({ field, fieldState: { error } }) => (
        <>
          <LocalizationProvider
            adapterLocale={vi}
            dateAdapter={AdapterDateFns}
            dateFormats={{ monthAndYear: "MM-yyyy" }}
          >
            <DatePicker
              ref={ref}
              {...field}
              error={!!error}
              label={label}
              {...propsInput}
              dayOfWeekFormatter={(day) => {
                return renderDayVi(day);
              }}
              renderInput={(params) => (
                <MuiTextField
                  sx={{ background: "#fff", }}
                  {...params}
                  ref={ref}
                  inputProps={{
                    ...params.inputProps,
                    ref: ref,
                    placeholder: other.placeholder,
                  }}
                />
              )}
              inputFormat={DATE_FORMAT}
            />
          </LocalizationProvider>
          {error && (
            <FormHelperText
              sx={{ color: "#FF4842", fontSize: 12, fontWeight: 400, mt: 1 }}
            >
              {error?.message}
            </FormHelperText>
          )}
        </>
      )}
    />
  );
});
export default MuiDatePicker;
