import { Controller, useFormContext } from "react-hook-form";
import SwitchItem from '../form/Switch';
import { STYLE_CONSTANT } from "@/theme/palette";

export default function SwitchStatusDS({
  name,
  label,
  disabled,
  colorLabel,
  sx
}) {
  const {control} = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({field}) => (
        <div style={{display: "flex", alignItems: "center"}}>
          <SwitchItem {...field} checked={field.value} disabled={disabled} sx={sx}/>
          <label
            style={{
              fontWeight: 400,
              fontSize: 14,
              color: colorLabel ? colorLabel : field.value === true ? STYLE_CONSTANT.COLOR_SUCCESS : STYLE_CONSTANT.COLOR_TEXT_PRIMARY,
            }}
          >
            {label}
          </label>
        </div>
      )}
    />
  );
}
