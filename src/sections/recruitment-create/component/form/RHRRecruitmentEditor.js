import { memo } from "react";
import dynamic from 'next/dynamic'
import FormHelperText from '@mui/material/FormHelperText';
import {Controller, useFormContext} from 'react-hook-form';
import {LabelStyle} from "@/components/hook-form/style";
const RecruitmentEditor = dynamic(() => import('@/sections/recruitment-create/component/form/RecruitmentEditor'), {
    loading: () => <div>Loading...</div>,
    ssr: false,
})

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

export default memo(RHFRecruitmentEditor);
