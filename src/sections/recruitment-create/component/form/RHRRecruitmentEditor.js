import {FormHelperText} from '@mui/material'
import PropTypes from 'prop-types'
import {Controller, useFormContext} from 'react-hook-form'
import {LabelStyle} from "@/components/hook-form/style";
import React from "react";
import RecruitmentEditor from "@/sections/recruitment-create/component/form/RecruitmentEditor";

const RHFRecruitmentEditor = ({ name, title, isRequired = false, ...other }) => {
  const {control} = useFormContext()

  return (
      <Controller
          name={name}
          control={control}
          render={({field, fieldState: {error}}) => (
              <>
                {title && (<LabelStyle required={isRequired}>{title}</LabelStyle>)}
                <RecruitmentEditor
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

RHFRecruitmentEditor.propTypes = {
  name: PropTypes.string,
}

export default RHFRecruitmentEditor;
