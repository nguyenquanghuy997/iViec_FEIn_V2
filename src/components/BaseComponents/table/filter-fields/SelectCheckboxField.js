import { memo } from 'react';
import { InputLabel } from '@mui/material';
import { RHFSelect } from '@/components/hook-form';

const SelectCheckboxField = ({
  label,
  remoteUrl,
  remoteMethod,
  search,
  ...props
}) => {
  return (
    <div>
      {label && (
        <InputLabel>{label}</InputLabel>
      )}

      <RHFSelect
        search={search || !!remoteUrl}
        remoteUrl={remoteUrl}
        method={remoteMethod}
        {...props}
      />
    </div>
  )
}

export default memo(SelectCheckboxField);
