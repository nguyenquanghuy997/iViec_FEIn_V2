import { InputLabel } from '@mui/material';
import { RHFSelect } from '@/components/hook-form';

export default function SelectCheckboxField({
  label,
  remoteUrl,
  remoteMethod,
  search,
  ...props
}) {
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