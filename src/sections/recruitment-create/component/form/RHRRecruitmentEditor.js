import {memo} from "react";
import FormHelperText from '@mui/material/FormHelperText';
import {Controller, useFormContext} from 'react-hook-form';
import {LabelStyle} from "@/components/hook-form/style";
import RecruitmentEditor from '@/sections/recruitment-create/component/form/RecruitmentEditor';

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
                      <FormHelperText error sx={{px: 0}}>
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

export default memo(RHFRecruitmentEditor);
