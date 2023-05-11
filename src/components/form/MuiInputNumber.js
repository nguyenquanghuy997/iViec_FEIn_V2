import { LabelStyle, TextFieldStyle } from "@/components/hook-form/style";
import { Box, FormHelperText } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { NumericFormat } from "react-number-format";

const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;
  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      isAllowed={(values) => values.value >= 0}
      thousandSeparator
      valueIsNumericString
      prefix=""
    />
  );
});

const MuiInputNumber = ({
  name,
  title,
  isRequired,
  variant = "standard",
  onChange,
  ...other
}) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const { onChange: onFieldChange, ...otherField } = field;

        return (
          <>
            {title && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <LabelStyle required={isRequired}>{title}</LabelStyle>
                {other.otherTitle}
              </Box>
            )}
            <TextFieldStyle
              onChange={(e) => {
                if (onChange) {
                  onChange(e);
                }
                onFieldChange(e);
              }}
              {...otherField}
              fullWidth
              sx={{ background: "#fff" }}
              placeholder={other.placeholder}
              // error={!!error}
              // helperText={error?.message}
              variant={variant}
              InputProps={{
                ...other.InputProps,
                disableUnderline: true,
                inputComponent: NumericFormatCustom,
              }}
            />
            {error && (
              <FormHelperText
                sx={{ color: "#FF4842", fontSize: 12, fontWeight: 400, mt: 1 }}
              >
                {error?.message}
              </FormHelperText>
            )}
          </>
        );
      }}
    />
  );
};

export default MuiInputNumber;
