import {memo} from 'react';
import {FormControl} from "@mui/material";
import PropTypes from "prop-types";
// form
import {Controller, useFormContext} from "react-hook-form";
import {FormHelperTextStyle, InputStyle, LabelStyle,} from './style';

function RHFInput({name, ...props}) {
    const {control} = useFormContext();
    return (
        <Controller
            name={name}
            control={control}
            render={({field, fieldState: {error}}) => (
                <>
                    {props?.label && (
                        <LabelStyle required={props?.isRequired}>
                            {props?.label}
                        </LabelStyle>
                    )}
                    <FormControl>
                        <InputStyle
                            {...field}
                            error={!!error}
                            disableUnderline
                            {...props}
                        />
                        <FormHelperTextStyle>{error?.message}</FormHelperTextStyle>
                    </FormControl>
                </>
            )}
        />
    );
}

RHFInput.propTypes = {
    name: PropTypes.string,
};

RHFInput.defaultProps = {
    name: ""
};

export default memo(RHFInput);