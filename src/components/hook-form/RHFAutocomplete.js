// @mui
import PropTypes from "prop-types";
// form
import {Controller, useFormContext} from "react-hook-form";
import {AutocompleteFieldStyle, LabelStyle, TextFieldStyle} from "@/components/hook-form/style";
import React from "react";
import ChipDS from "@/components/DesignSystem/ChipDS";

RHFAutocomplete.propTypes = {
    name: PropTypes.string, options: PropTypes.array, AutocompleteProps: PropTypes.object,
};

export default function RHFAutocomplete({name, options = [], AutocompleteProps, ...other}) {
    const {control} = useFormContext();
    const props = {
        onChange: (field) => (event, newValue) => field.onChange(newValue),
        renderTags: (value, getTagProps) => value.map((option, index) => (<ChipDS

            {...getTagProps({index})}
            key={option}
            size="small"
            label={option}
        />)),
        renderInput: (field, error) => (params) => (<TextFieldStyle
            {...field}
            fullWidth
            error={!!error}
            helperText={error?.message}
            {...other}
            {...params}
        />), ...AutocompleteProps,
    };

    const {onChange, renderTags, renderInput, ...rest} = props;

    return (<Controller
        name={name}
        control={control}
        render={({field, fieldState: {error}}) => (<>
            {other.title && (<LabelStyle required={other.isRequired}>
                {other.title}
            </LabelStyle>)}
            <AutocompleteFieldStyle
                fullWidth
                onChange={onChange(field)}
                options={options}
                renderTags={renderTags}
                renderInput={renderInput(field, error)}
                {...rest}
            />
        </>)}
    />);
}
