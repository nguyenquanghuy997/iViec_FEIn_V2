// @mui
import { FormHelperText } from '@mui/material'
import dynamic from 'next/dynamic';

import PropTypes from 'prop-types'
// form
import { Controller, useFormContext } from 'react-hook-form'

const Editor = dynamic(() => import("../../sections/companyinfor/edit/editor"), {
  ssr: false,
});

RHFEditor.propTypes = {
  name: PropTypes.string,
}

export default function RHFEditor({ name, ...other }) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Editor
          id={name}
          value={field.value}
          onChange={field.onChange}
          error={!!error}
          config={{
            toolbar: [
              "bold",
              "|",
              "italic",
              "|",
              "underline",
              "|",
              "link",
              "|",
              "bulletedList",
              "|",
              "numberedList",
              "|",
              "alignment",
              "|",
            ],
          }}
          helperText={
            <FormHelperText error sx={{ px: 2, textTransform: 'capitalize' }}>
              {error?.message}
            </FormHelperText>
          }
          {...other}
        />
      )}
    />
  )
}
