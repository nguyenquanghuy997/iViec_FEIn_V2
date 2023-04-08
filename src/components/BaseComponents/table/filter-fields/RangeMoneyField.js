import { InputLabel } from "@mui/material";
import { RHFTextField } from "@/components/hook-form";

export default function RangeMoneyField({
  label,
  name,
  ...props
}) {
  return (
    <div className="range-money-fields">
      {label && (
        <InputLabel>{label}</InputLabel>
      )}

      <RHFTextField
        name={name[0]}
        startIcon={<span>Từ</span>}
        endIcon={<span>VNĐ</span>}
        type="number"
        {...props}
        sx={{ mb: 2 }}
      />

      <RHFTextField
        name={name[1]}
        startIcon={<span>Đến</span>}
        endIcon={<span>VNĐ</span>}
        type="number"
        {...props}
      />
    </div>
  )
}