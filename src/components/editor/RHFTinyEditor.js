import {memo} from "react";
import FormHelperText from '@mui/material/FormHelperText';
import {Controller, useFormContext} from 'react-hook-form';
import TinyEditor from "./TinyEditor";


const RHFTinyEditor = ({ name, ...other }) => {
  const {control} = useFormContext()

  return (
      <Controller
          name={name}
          control={control}
          render={({field, fieldState: {error}}) => (
              <>
                <TinyEditor
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

export default memo(RHFTinyEditor);
