// @mui
import PropTypes from "prop-types";
// form
import {Controller, useFormContext} from "react-hook-form";
import {AutocompleteFieldStyle, LabelStyle, TextFieldStyle} from "@/components/hook-form/style";
import React from "react";
import ChipDS from "@/components/DesignSystem/ChipDS";
import {PaperAutocompleteStyle} from "@/sections/auth/style";

RHFAutocomplete.propTypes = {
    name: PropTypes.string, options: PropTypes.array, AutocompleteProps: PropTypes.object,
};

const CustomPaper = (props) => {
    return <PaperAutocompleteStyle elevation={8} {...props} />;
};

export default function RHFAutocomplete({name, options = [], title = '', multiple = false, limitTags, isRequired = false, AutocompleteProps, ...other}) {
    const {control} = useFormContext();
    const props = {
        onChange: (field) => (event, newValue) => field.onChange(newValue),
        renderTags: (value, getTagProps) => value.map((option, index) => (<ChipDS
            {...getTagProps({index})}
            key={index}
            size="small"
            label={typeof option === 'string' ? option : option?.label}
            variant="filled"
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
            {title && (<LabelStyle required={isRequired}>{title}</LabelStyle>)}
            <AutocompleteFieldStyle
                fullWidth
                multiple={multiple}
                limitTags={limitTags}
                onChange={onChange(field)}
                options={options}
                renderTags={renderTags}
                renderInput={renderInput(field, error)}
                noOptionsText={'Không tìm thấy dữ liệu'}
                PaperComponent={CustomPaper}
                {...rest}
            />
        </>)}
    />);
}
