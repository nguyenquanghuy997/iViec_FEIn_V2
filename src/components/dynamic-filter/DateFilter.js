import React from 'react'
import vi from "date-fns/locale/vi";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {FormHelperText, InputAdornment} from "@mui/material";
import InputFilter from "@/components/dynamic-filter/InputFilter";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {Controller, useFormContext} from "react-hook-form";
import {DATE_FORMAT} from "@/config";

const DateFilter = React.forwardRef((props, ref) => {
  const { name, label, DatePickerProps, startIcon, endIcon, ...other } = props;
  const {control} = useFormContext()
  const propsInput = {
    inputFormat: DATE_FORMAT,
    InputProps: {
      startAdornment: startIcon && (
          <InputAdornment position='start' sx={{color: '#5C6A82','& div':{
            minWidth:'28px'
          }}}><div>{startIcon}</div></InputAdornment>
      ),
      endAdornment: endIcon && (
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
                <LocalizationProvider
                    adapterLocale={vi}
                    dateAdapter={AdapterDateFns}
                    dateFormats={{ monthAndYear: 'MM-yyyy' }}
                >
                  <DatePicker
                      ref={ref}
                      {...field}
                      error={!!error}
                      label={label}
                      {...propsInput}
                      renderInput={(params) => (
                          <InputFilter
                              sx={{mb: 2}}
                              {...params}
                              ref={ref}
                              inputProps={{
                                ...params.inputProps,
                                ref: ref,
                                placeholder: other.placeholder,
                                // readOnly: true
                              }}
                          />
                      )}
                      inputFormat={DATE_FORMAT}
                  />
                </LocalizationProvider>
                {error && <FormHelperText sx={{color: "#FF4842", fontSize: 12, fontWeight: 400, mt: 0}}>{error?.message}</FormHelperText>}
              </>
          )}
      />
  );
});

export default React.memo(DateFilter);