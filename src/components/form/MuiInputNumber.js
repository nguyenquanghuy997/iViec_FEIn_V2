import React from 'react'
import { NumericFormat } from 'react-number-format';
import {Box} from "@mui/material";
import {Controller, useFormContext} from "react-hook-form";

import {LabelStyle, TextFieldStyle} from "@/components/hook-form/style";

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
            isAllowed={values => values.value >= 0}
            thousandSeparator
            valueIsNumericString
            prefix=""
        />
    );
});

const MuiInputNumber = ({ name, title, isRequired, variant= 'standard', ...other }) => {
    const { control } = useFormContext()
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <>
                    {title && (
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <LabelStyle required={isRequired}>
                                {title}
                            </LabelStyle>
                            {other.otherTitle}
                        </Box>
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

export default MuiInputNumber;