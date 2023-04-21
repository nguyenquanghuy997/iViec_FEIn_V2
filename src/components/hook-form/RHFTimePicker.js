import { TextField } from "@mui/material";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Controller, useFormContext } from "react-hook-form";

dayjs.extend(customParseFormat);

export default function RHFTimePicker({
  name,
  style
}) {
  const {control} = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => (
        <TextField
          sx={{...style}}
          {...field}
          value={field.value || ""}
          error={!!error}
          helperText={error?.message}
          type="time"
        />
      )}
    />
  );
}
