// @mui
import {FormHelperText} from '@mui/material'

import PropTypes from 'prop-types'
// form
import {Controller, useFormContext} from 'react-hook-form'

//
import EmailEditor from "@/sections/emailform/component/editor/EmailEditor";
import {LabelStyle} from "@/components/hook-form/style";

RHFEmailEditor.propTypes = {
  name: PropTypes.string,
}

export default function RHFEmailEditor({name, title, isRequired = false, ...other}) {
  const {control} = useFormContext()

  return (
      <Controller
          name={name}
          control={control}
          render={({field, fieldState: {error}}) => (
              <>
                {title && (
                    <LabelStyle required={isRequired}>
                      {title}
                    </LabelStyle>
                )}
                <EmailEditor
                    id={name}
                    value={field.value}
                    onChange={field.onChange}
                    error={!!error}
                    helperText={
                      <FormHelperText error sx={{px: 2, textTransform: 'capitalize'}}>
                        {error?.message}
                      </FormHelperText>
                    }
                    {...other}
                />
              </>
          )}
      />
  )
}
