import MuiTextField from "@/components/form/MuiTextField";
import { FormHelperText } from "@mui/material";
import { memo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {useTheme} from "@mui/material/styles";

function RHFTextField({ name, beforeChange, maxLength, ...other }) {
  const { control } = useFormContext();
  const theme = useTheme();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        if (beforeChange) {
          const { value } = field;
          field.value = beforeChange(value);
        }
        return (
          <>
            <MuiTextField
              sx={{ background: theme.palette.common.white}}
              {...field}
              inputProps={{
                maxLength: maxLength,
              }}
              {...other}
            />
            {error && (
              <FormHelperText
                sx={{ color: "#E53935", fontSize: 12, fontWeight: 400, mt: 1 }}
              >
                {error?.message}
              </FormHelperText>
            )}
          </>
        );
      }}
    />
  );
}

export default memo(RHFTextField);
