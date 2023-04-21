import { Checkbox as MuiCheckbox } from "@mui/material";
import {
  CheckboxIconChecked,
  CheckboxIconDefault,
  CheckboxIconIndeterminate,
} from "@/assets/CheckboxIcon";

export default function Checkbox(props) {
  return (
    <MuiCheckbox
      icon={<CheckboxIconDefault />}
      checkedIcon={<CheckboxIconChecked />}
      indeterminateIcon={<CheckboxIconIndeterminate />}
      {...props}
    />
  )
}