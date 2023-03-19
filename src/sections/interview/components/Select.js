import { TextField, Stack, Autocomplete } from "@mui/material";
import React, { memo } from "react";
import { Controller, useFormContext } from "react-hook-form";

function Select({ name, onChange, options }) {
  const { control } = useFormContext();
console.log('opi', options)
  return (
    <Controller
      render={(props) => (
        <Stack>
          <Autocomplete
            {...props}
            options={options}
            getOptionLabel={(option) => option.label}
            renderOption={(option) => <span>{option.label}</span>}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
              />
            )}
            onChange={onChange}
          />
          {/* <FormHelperText
            sx={{ color: "#FF4842", fontSize: 12, fontWeight: 400 }}
          >
            {error?.message}
          </FormHelperText> */}
        </Stack>
      )}
      name={name}
      control={control}
    />
  );
}

export default memo(Select);
