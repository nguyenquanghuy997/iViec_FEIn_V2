import React from 'react'
import { NumericFormat } from 'react-number-format';
import {LabelStyle, TextFieldStyle} from "@/components/hook-form/style";
import {Controller, useFormContext} from "react-hook-form";
const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
    props,
    ref,
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
          thousandSeparator
          valueIsNumericString
          prefix=""
      />
  );
});

const InputNumberFormatFilter = ({ name, title, isRequired, variant= 'standard', ...other }) => {
  const { control } = useFormContext()
  return (
      <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => (
              <>
                {title && (
                    <LabelStyle required={isRequired}>
                      {title}
                    </LabelStyle>
                )}
                <TextFieldStyle
                    {...field}
                    fullWidth
                    sx={{mb: 2}}
                    placeholder={other.placeholder}
                    error={!!error}
                    helperText={error?.message}
                    variant={variant}
                    InputProps={{
                      ...other.InputProps,
                      disableUnderline: true,
                      inputComponent: NumericFormatCustom,
                    }}
                />
              </>
          )}
      />
  )
}

export default React.memo(InputNumberFormatFilter);