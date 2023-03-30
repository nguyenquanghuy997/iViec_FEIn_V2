import {memo} from 'react';
import {Controller, useFormContext} from "react-hook-form";
import MuiTextField from "@/components/form/MuiTextField";

function RHFTextField({
  name,
  beforeChange,
  maxLength,
  ...other
}) {
  const { control } = useFormContext();
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
              {...field}
              error={!!error}
              helperText={error?.message}
              inputProps={{
                maxLength: maxLength,
              }}
              {...other}
            />
          </>
        );
      }}
    />
  );
}

export default memo(RHFTextField)