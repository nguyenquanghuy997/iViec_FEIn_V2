import MuiTextField from "./MuiTextField";
import { FormHelperText } from "@mui/material";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Controller, useFormContext } from "react-hook-form";
import {useTheme} from "@mui/material/styles";

dayjs.extend(customParseFormat);

export default function MuiTimePicker({ name, ref, ...other }) {
  const { control } = useFormContext();
  const theme = useTheme();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <MuiTextField
            sx={{ background: theme.palette.common.white }}
            {...field}
            ref={ref}
            inputProps={{
              ...field.inputProps,
              ref: ref,
              placeholder: other.placeholder,
            }}
            type="time"
          />

          {error && (
            <FormHelperText
              sx={{ color: "#FF4842", fontSize: 12, fontWeight: 400, mt: 1 }}
            >
              {error?.message}
            </FormHelperText>
          )}
        </>
      )}
    />
  );
}
