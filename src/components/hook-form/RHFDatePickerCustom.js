import PropTypes from 'prop-types';
// form
import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker } from '@/components/datepicker';

RHFDatePicker.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  datePickerProps: PropTypes.object,
}

export default function RHFDatePicker({
  name,
  label,
  datePickerProps,
  iconPosition,
  ...other
}) {
  const { control } = useFormContext();

  datePickerProps = {
    inputFormat: 'DD/MM/YYYY',
    iconPosition,
    ...datePickerProps,
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <DatePicker
            {...field}
            error={!!error}
            label={label}
            {...datePickerProps}
            helperText={error?.message}
            {...other}
          />
        )
      }}
    />
  )
}
