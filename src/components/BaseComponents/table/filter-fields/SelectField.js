import { InputLabel } from '@mui/material';
import { RHFSelect } from '@/components/hook-form';

export default function SelectField({
  label,
  remoteMethod,
  ...props
}) {
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