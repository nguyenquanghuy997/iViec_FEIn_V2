import { FormControlLabel, FormGroup } from "@mui/material";
import PropTypes from "prop-types";
// form
import { Controller, useFormContext } from "react-hook-form";
import Checkbox from "../form/Checkbox";
import { forwardRef } from "react";


export const RHFCheckbox = forwardRef(({name, labelPlacement, label, style, ...other}, ref) => {
  const {control} = useFormContext();
  RHFCheckbox.propTypes = {
    name: PropTypes.string.isRequired
  };
  return (
    <FormControlLabel
      labelPlacement={labelPlacement}
      label={label}
      style={{marginLeft: "-8px"}}
      control={
        <Controller
          name={name}
          control={control}
          render={({field}) => (
            <Checkbox
              {...field}
              ref={ref}
              style={other.style}
              checked={!!field.value}
            />
          )}
        />
      }
      {...other}
      sx={{...style}}
    />
  );
});

export const RHFMultiCheckbox = forwardRef(({name, options, ...other}, ref) => {
  const {control} = useFormContext();
  
  RHFMultiCheckbox.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired
  };
  
  return (
    <Controller
      name={name}
      control={control}
      render={({field}) => {
        const values = []
        .concat(field?.value)
        .filter((val) => val || val === 0 || typeof val === "boolean");
        const onSelected = (option) =>
          values.includes(option)
            ? values.filter((value) => value !== option)
            : [...values, option];
        
        return (
          <FormGroup>
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                control={
                  <Checkbox
                    ref={ref}
                    checked={values.includes(option.value)}
                    onChange={() => field.onChange(onSelected(option.value))}
                  />
                }
                label={option.label}
                {...other}
              />
            ))}
          </FormGroup>
        );
      }}
    />
  );
});
