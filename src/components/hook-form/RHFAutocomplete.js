// @mui
import {Autocomplete, Chip, InputLabel, TextField} from "@mui/material";
import PropTypes from "prop-types";
// form
import {Controller, useFormContext} from "react-hook-form";
import {InputLabelErrorStyle, InputLabelStyle} from "@/components/hook-form/style";
import React from "react";

RHFAutocomplete.propTypes = {
  name: PropTypes.string,
  options: PropTypes.array,
  AutocompleteProps: PropTypes.object,
};

export default function RHFAutocomplete({name, options = [], required, label, placeholder, AutocompleteProps, ...other}) {
  const { control } = useFormContext();
  const props = {
    onChange: (field) => (event, newValue) => field.onChange(newValue),
    renderTags: (value, getTagProps) =>
      value.map((option, index) => (
        <Chip
          {...getTagProps({ index })}
          key={option}
          size="small"
          label={option}
        />
      )),
    renderInput: (field, error) => (params) =>
      (
        <TextField
          {...field}
          fullWidth
          placeholder={(field.value?.length === 0 || !field.value) ? placeholder : null}
          error={!!error}
          helperText={error?.message}
          {...other}
          {...params}
        />
      ),
    ...AutocompleteProps,
  };

  const { onChange, renderTags, renderInput, ...rest } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
          <>
            {label && <InputLabel required={required} sx={error ? {...InputLabelStyle, ...InputLabelErrorStyle} : {...InputLabelStyle}}>
              {label}
            </InputLabel>}
            <Autocomplete
                fullWidth
                onChange={onChange(field)}
                options={options}
                renderTags={renderTags}
                renderInput={renderInput(field, error)}
                {...rest}
            />
          </>

      )}
    />
  );
}
