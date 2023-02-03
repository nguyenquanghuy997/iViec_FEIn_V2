// @mui
import { TextField } from '@mui/material'

import PropTypes from 'prop-types'
// form
import { Controller, useFormContext } from 'react-hook-form'

RHFTextField.propTypes = {
  name: PropTypes.string,
}

export default function RHFTextField({ name, ...other }) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          error={!!error}
          helperText={error?.message}
          placeholder
          sx={{
            input: {
              fontFamily: 'Inter',
              '&::placeholder': {
                textOverflow: 'ellipsis !important',
                color: '#8A94A5',
                fontWeight: '400',
                fontSize: '14px',
                fontFamily: 'Inter',
              }
            }
          }}
          {...other}
        />
      )}
    />
  )
}
