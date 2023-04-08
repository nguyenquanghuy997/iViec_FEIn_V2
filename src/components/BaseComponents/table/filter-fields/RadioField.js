import {
  InputLabel,
} from "@mui/material";
import { RHFRadioGroup } from "@/components/hook-form";

export default function RadioField({
  label,
  name,
  options,
  ...props
}) {
  return (
    <div>
      {label && (
        <InputLabel>{label}</InputLabel>
      )}

      <RHFRadioGroup
        name={name}
        options={options}
        className="radio-group-fields"
        {...props}
      />
    </div>
  )
}