import { memo } from 'react';
import { InputLabel } from "@mui/material";
import { RHFTextField } from "@/components/hook-form";

const RangeNumberField = ({
  label,
  name,
  ...props
}) => {
  return (
    <div className="range-number-fields">
      {label && (
        <InputLabel>{label}</InputLabel>
      )}

      <RHFTextField
        name={name[0]}
        startIcon={<span>Từ</span>}
        endIcon={<span>Cm</span>}
        type="number"
        {...props}
        sx={{ mb: 2 }}
      />

      <RHFTextField
        name={name[1]}
        startIcon={<span>Đến</span>}
        endIcon={<span>Cm</span>}
        type="number"
        {...props}
      />
    </div>
  )
}

export default memo(RangeNumberField);
