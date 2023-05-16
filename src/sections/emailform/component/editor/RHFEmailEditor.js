import {FormHelperText} from '@mui/material'
import PropTypes from 'prop-types'
import {Controller, useFormContext} from 'react-hook-form'
import {LabelStyle} from "@/components/hook-form/style";
import React from "react";
import EmailEditor from "@/sections/offer-form/component/editor/EmailEditor";

const RHFEmailEditor = ({ name, title, isRequired = false, ...other }) => {
  const {control} = useFormContext()

  return (
      <Controller
          name={name}
          control={control}
          render={({field, fieldState: {error}}) => (
              <>
                {title && (<LabelStyle required={isRequired}>{title}</LabelStyle>)}
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
                <FormHelperText error sx={{px: 2, textTransform: 'capitalize'}}>
                  {error?.message}
                </FormHelperText>
              </>
          )}
      />
  )
}

RHFEmailEditor.propTypes = {
  name: PropTypes.string,
}

export default RHFEmailEditor;
