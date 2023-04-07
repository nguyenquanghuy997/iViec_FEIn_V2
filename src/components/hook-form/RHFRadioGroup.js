// @mui
import {
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
} from "@mui/material";
import PropTypes from "prop-types";
// form
import { Controller, useFormContext } from "react-hook-form";

RHFRadioGroup.propTypes = {
  name: PropTypes.string,
  options: PropTypes.array,
};

export default function RHFRadioGroup({ name, options, className, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <div>
          <RadioGroup {...field} row className={className} {...other}>
            {options?.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </RadioGroup>

          {!!error && (
            <FormHelperText error sx={{ px: 2 }}>
              {error.message}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
}
