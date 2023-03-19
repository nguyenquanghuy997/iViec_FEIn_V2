import { memo } from 'react';
// @mui
import { LabelStyle, TextFieldStyle } from "@/components/hook-form/style";
import PropTypes from "prop-types";
// form
import { Controller, useFormContext } from "react-hook-form";

RHFTextField.propTypes = {
  name: PropTypes.string,
  variant: PropTypes.string,
  title: PropTypes.string,
  isRequired: PropTypes.bool,
};

RHFTextField.defaultProps = {
  variant: "standard",
  title: "",
  isRequired: false,
};

function RHFTextField({
  name,
  title,
  isRequired,
  variant,
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
            {title && <LabelStyle required={isRequired}>{title}</LabelStyle>}
            <TextFieldStyle
              {...field}
              value={field.value || ""}
              error={!!error}
              helperText={error?.message}
              variant={variant}
              {...other}
              InputProps={{ ...other.InputProps, disableUnderline: true }}
              inputProps={{
                maxLength: maxLength,
              }}
            />
          </>
        );
      }}
    />
  );
}

export default memo(RHFTextField)