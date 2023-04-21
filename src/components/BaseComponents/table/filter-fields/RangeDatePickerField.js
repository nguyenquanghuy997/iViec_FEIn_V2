import { memo } from 'react';
import { InputLabel } from "@mui/material";
import RHFDatePicker from "@/components/hook-form/RHFDatePickerCustom";

const RangeDatePickerField = ({
  label,
  name,
  placeholder,
  ...props
}) => {
  return (
    <div className="date-fields">
      {label && (
        <InputLabel>{label}</InputLabel>
      )}

      <RHFDatePicker
        iconPosition="end"
        inputProps={{
          startIcon: <span>Từ</span>,
          sx: { mb: 2 },
        }}
        placeholder={placeholder}
        name={name[0]}
        {...props}
      />

      <RHFDatePicker
        iconPosition="end"
        inputProps={{
          startIcon: <span>Đến</span>,
        }}
        name={name[1]}
        placeholder={placeholder}
        {...props}
      />
    </div>
  )
}

export default memo(RangeDatePickerField);
