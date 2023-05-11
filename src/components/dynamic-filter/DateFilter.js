import React from 'react'
import { InputAdornment } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { DatePicker } from "@/components/datepicker";

const DateFilter = React.forwardRef((props, ref) => {
  const {name, label, DatePickerProps, startIcon, endIcon, ...other} = props;
  const {control} = useFormContext()
  const propsInput = {
    inputFormat: 'DD/MM/YYYY',
    iconPosition: "end",
    inputProps: {
      sx: { mb: 2 },
      startIcon: startIcon && (
        <InputAdornment position='start' sx={{
          color: '#5C6A82', '& div': {
            minWidth: '28px'
          }
        }}>
          <div>{startIcon}</div>
        </InputAdornment>
      ),
      endIcon: endIcon && (
        <InputAdornment position='end' style={{color: '#5C6A82'}}>{endIcon}</InputAdornment>
      ),
    },
    ...DatePickerProps,
  }
  
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({field, fieldState: {error}}) => (
        <>
          <DatePicker
            ref={ref}
            {...field}
            error={!!error}
            label={label}
            {...propsInput}
            {...other}
            helperText={error?.message}
          />
        </>
      )}
    />
  );
});

export default React.memo(DateFilter);