import React, {memo, useEffect, useState} from "react";
import {
    Avatar,
    AvatarGroup,
    Checkbox,
    FormHelperText,
    InputAdornment, ListItemIcon, ListItemText,
    MenuItem,
    Stack,
    Typography
} from "@mui/material";
import {Controller, useFormContext} from "react-hook-form";
import Iconify from "@/components/Iconify";
import {containsText, stringToColor} from "@/utils/function";
import {
    LabelStyle,
    MenuItemStyle,
    SearchInputStyle,
    SelectFieldStyle,
    TextFieldStyle,
    useStyles,
} from './style';
import {isEmpty} from "lodash";

const Placeholder = (placeholder) => {
    return <Typography variant="body2" sx={{color: '#8A94A5', fontSize: 14, fontWeight: 400}}>{placeholder}</Typography>
}

const MenuProps = {
    PaperProps: {
        style: {maxHeight: 330},
    },
    disableAutoFocusItem: true,
    MenuListProps: {
        disableListWrap: true,
    },
};

const InputProps = {
    startAdornment: (
        <InputAdornment position="start">
            <Iconify icon={"ri:search-2-line"} color="#5c6a82"/>
        </InputAdornment>
    )
}

const renderOptions = (options, value) => {
    return options?.map((option, i) => {
        return <MenuItem sx={{...MenuItemStyle, '&.Mui-selected': {backgroundColor: "unset"}}} key={i}
                         value={option?.value}
                         className={`${isEmpty(option?.value) ? 'empty-option' : ''}`}>
            <ListItemIcon>
                <Avatar key={i} {...stringAvatar(option?.label)}
                        sx={{width: "36px", height: "36px", borderRadius: "10px"}}/>
            </ListItemIcon>
            <ListItemText primary={option.label} secondary={option.subLabel} sx={{
                '.MuiListItemText-primary': {color: "#172B4D", fontSize: 13, fontWeight: 500},
                '.MuiListItemText-secondary': {color: "#5C6A82", fontSize: 13, fontWeight: 400}
            }}/>
            {value?.includes(option.value) ?
                <Checkbox checked={true}/> : <Checkbox checked={false}/>}
        </MenuItem>
    })
}

function stringAvatar(name) {
    if (!name) return "";
    return {
        sx: {
            bgColor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1] ? name.split(' ')[1][0] : ""}`,
    };
}

const renderValue = (options = [], value = '', placeholder = '', multiple) => {
    return value && value?.length !== 0 ? multiple ? <>
        <AvatarGroup max={4} sx={{
            justifyContent: "left",
            '& .MuiAvatar-root': {
                width: "20px",
                height: "20px",
                fontSize: "12px !important",
                marginLeft: "-2px",
                border: "unset"
            }, ...(value?.length > 4 && {
                '& .MuiAvatarGroup-avatar:first-of-type': {
                    width: "fit-content",
                    color: "black",
                    backgroundColor: "unset",
                    fontWeight: 400,
                    marginLeft: 0
                }
            })
        }}>
            {(options.filter(option => value.includes(option.value)))?.map((field, index) => {
                return <Avatar key={index} {...stringAvatar(field?.label)} sx={{width: "20px", height: "20px"}}/>
            })
            }
        </AvatarGroup>
    </> : options.find(option => option.value === value)?.label : Placeholder(placeholder);
}

function RHFDropdownAvatarGroup({name, ...props}) {
    const {control} = useFormContext();
    const {isRequired, title, placeholder, options, disabled, multiple} = props;
    const classes = useStyles();
    const [searchText, setSearchText] = useState("");
    const [filterOptions, setFilterOptions] = useState([]);

    useEffect(() => {
        if (searchText) {
            setFilterOptions(options?.filter((option) => containsText(option.name, searchText)));
        } else {
            setFilterOptions(options)
        }
    }, [searchText, options])

    return (
        <Controller
            name={name}
            control={control}
            render={({field, fieldState: {error}}) => (
                <Stack direction="column">
                    {title && <LabelStyle required={isRequired}>{title}</LabelStyle>}
                    <SelectFieldStyle
                        {...field}
                        displayEmpty
                        multiple={multiple}
                        disabled={disabled}
                        error={!!error}
                        onClose={() => {
                            setSearchText("");
                        }}
                        renderValue={() => renderValue(options, field.value, placeholder, multiple)}
                        MenuProps={{...MenuProps, classes: {paper: classes.paper}}}
                    >
                        {options?.length > 3 && (
                            <TextFieldStyle
                                placeholder="Tìm kiếm..."
                                fullWidth
                                autoFocus
                                InputProps={{...InputProps}}
                                sx={{...SearchInputStyle}}
                                onChange={(e) => setSearchText(e.target.value)}
                                onKeyDown={(e) => e.stopPropagation()}
                            />
                        )}
                        {renderOptions(filterOptions, field.value)}
                    </SelectFieldStyle>
                    <FormHelperText
                        sx={{color: "#FF4842", fontSize: 12, fontWeight: 400}}>{error?.message}</FormHelperText>
                </Stack>
            )}
        />
    );
}

export default memo(RHFDropdownAvatarGroup);