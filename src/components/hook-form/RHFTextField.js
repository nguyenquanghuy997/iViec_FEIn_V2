// @mui
import PropTypes from 'prop-types'
// form
import {Controller, useFormContext} from 'react-hook-form'
import {LabelStyle, TextFieldStyle} from "@/components/hook-form/style";

RHFTextField.propTypes = {
    name: PropTypes.string,
    variant: PropTypes.string,
    title: PropTypes.string,
    isRequired: PropTypes.bool,
}

RHFTextField.defaultProps = {
    variant: 'standard',
    title: "",
    isRequired: false,
}

export default function RHFTextField({ name, title, isRequired, variant, ...other }) {
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
                        error={!!error}
                        helperText={error?.message}
                        variant={variant}
                        {...other}
                        InputProps={{ ...other.InputProps, disableUnderline: true }}
                    />
                </>
            )}
        />
    )
}
