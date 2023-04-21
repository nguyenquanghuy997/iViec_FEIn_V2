import { forwardRef, useImperativeHandle, useRef } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker as XDatePicker } from '@mui/x-date-pickers/DatePicker';

import TextInput from '@/components/form/MuiTextField';

const DatePicker = forwardRef(({
  iconPosition = 'start',
  inputProps = {},
  placeholder,
  ...props
}, ref) => {
  const _datePicker = useRef();

  useImperativeHandle(ref, () => (_datePicker.current));

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <XDatePicker
        ref={_datePicker}
        InputAdornmentProps={{ position: iconPosition }}
        PaperProps={{
          sx: {
            background: '#fff',
            '.MuiButtonBase-root': {
              background: 'transparent',
            },
          }
        }}
        PopperProps={{
          sx: {
            zIndex: 12007,
            paddingTop: '10px',
          }
        }}
        renderInput={(params) => {
          let { value } = props;
          if (!value) {
            params.inputProps.value = undefined;
          }
          if (placeholder) {
            params.inputProps.placeholder = placeholder;
          }

          return (
            <TextInput {...params}  {...inputProps} />
          )
        }}
        {...props}
      />
    </LocalizationProvider>
  )
})

export default DatePicker;