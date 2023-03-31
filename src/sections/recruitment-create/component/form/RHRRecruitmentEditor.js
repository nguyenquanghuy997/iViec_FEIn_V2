import FormHelperText from '@mui/material/FormHelperText';
import {Controller, useFormContext} from 'react-hook-form';
import {LabelStyle} from "@/components/hook-form/style";
import Editor from '@/components/form/editor/Editor';

const RHFRecruitmentEditor = ({ name, title, isRequired = false, ...other }) => {
  const {control} = useFormContext()

  return (
      <Controller
          name={name}
          control={control}
          render={({field, fieldState: {error}}) => (
              <>
                {title && (<LabelStyle required={isRequired}>{title}</LabelStyle>)}
                <Editor
                    {...field}
                    id={name}
                    initialValue={field.value}
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

export default RHFRecruitmentEditor;
