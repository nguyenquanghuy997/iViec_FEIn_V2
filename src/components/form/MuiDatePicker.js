import {forwardRef} from "react";
import {Controller, useFormContext} from "react-hook-form";
import {FormHelperText, InputAdornment} from "@mui/material";
import vi from "date-fns/locale/vi";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import MuiTextField from "@/components/form/MuiTextField";

import {DATE_FORMAT} from "@/config";

const MuiDatePicker = forwardRef((props, ref) => {
    const { name, label, DatePickerProps, startIcon, endIcon, ...other } = props;
    const {control} = useFormContext()
    const propsInput = {
        inputFormat: DATE_FORMAT,
        InputProps: {
            startAdornment: startIcon && (
                <InputAdornment position='start'>{startIcon}</InputAdornment>
            ),
            endAdornment: endIcon && (
                <InputAdornment position='end'>{endIcon}</InputAdornment>
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
                                <MuiTextField
                                    sx={{mb: 2}}
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
                    {error && <FormHelperText sx={{color: "#FF4842", fontSize: 12, fontWeight: 400, mt: 0}}>{error?.message}</FormHelperText>}
                </>
            )}
        />
    );
});
export default MuiDatePicker;