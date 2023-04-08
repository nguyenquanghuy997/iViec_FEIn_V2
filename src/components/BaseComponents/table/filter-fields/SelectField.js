import { memo } from 'react';
import { InputLabel } from '@mui/material';
import { RHFSelect } from '@/components/hook-form';

const SelectField = ({
  label,
  remoteMethod,
  ...props
}) => {
  return (
    <div>
      {label && (
        <InputLabel>{label}</InputLabel>
      )}

      <RHFSelect
        method={remoteMethod}
        {...props}
      />
    </div>
  )
}

export default memo(SelectField);