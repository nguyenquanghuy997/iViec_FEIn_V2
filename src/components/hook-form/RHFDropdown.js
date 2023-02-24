import React, {memo, useMemo, useState} from "react";
import {FormHelperText, InputAdornment, MenuItem, Stack, Typography} from "@mui/material";
import {Controller, useFormContext} from "react-hook-form";
import Iconify from "@/components/Iconify";
import {containsText} from "@/utils/function";
import {
    LabelStyle,
    MenuItemStyle,
    SearchInputStyle,
    SelectFieldStyle,
    SelectStyle,
    TextFieldStyle,
    useStyles,
} from './style';

const Placeholder = (placeholder) => {
    return <Typography variant="body2" sx={{color: '#8A94A5', fontSize: 14, fontWeight: 400}}>{placeholder}</Typography>
}

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 330,
        },
    },
};


function RHFDropdown({name, ...props}) {
    const {control} = useFormContext();
    const {isRequired, title, placeholder, options, disabled} = props;
    const classes = useStyles();

    const [searchText, setSearchText] = useState("");
    const displayedOptions = useMemo(
        () => options?.filter((option) => containsText(option.name, searchText)),
        [searchText]
    );

    return (
        <Controller
            name={name}
            control={control}
            render={({field, fieldState: {error}}) => (
                <Stack direction="column">
                    {title && (
                        <LabelStyle required={isRequired}>
                            {title}
                        </LabelStyle>
                    )}
                    <SelectFieldStyle
                        {...field}
                        value={field.value || ''}
                        displayEmpty
                        fullWidth
                        disabled={disabled}
                        error={!!error}
                        onClose={() => setSearchText("")}
                        required={false}
                        label={null}
                        renderValue={!field.value ? () => Placeholder(placeholder) : () => options.find(option => option.value === field.value)?.name}
                        sx={{...SelectStyle}}
                        MenuProps={{...MenuProps, classes: {paper: classes.paper}}}
                    >
                        {options?.length > 3 && (
                            <TextFieldStyle
                                placeholder="Tìm kiếm..."
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Iconify icon={"ri:search-2-line"} width={16} height={16} color="#5c6a82"/>
                                        </InputAdornment>
                                    )
                                }}
                                sx={{...SearchInputStyle}}
                                onChange={(e) => setSearchText(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key !== "Escape") {
                                        e.stopPropagation();
                                    }
                                }}
                            />
                        )}
                        {searchText ? displayedOptions?.map((option, i) => (
                            <MenuItem sx={{...MenuItemStyle}} key={i} value={option.value}>
                                {option.label}
                            </MenuItem>
                        )) : options?.map((option, i) => (
                            <MenuItem sx={{...MenuItemStyle}} key={i} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </SelectFieldStyle>
                    <FormHelperText sx={{color: "#FF4842", fontSize: 12, fontWeight: 400}}>{error?.message}</FormHelperText>
                </Stack>
            )}
        />
    );
}

export default memo(RHFDropdown);