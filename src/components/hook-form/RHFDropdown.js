import React, {memo, useEffect, useState} from "react";
import {FormHelperText, InputAdornment, MenuItem, Stack, Typography} from "@mui/material";
import {Controller, useFormContext} from "react-hook-form";
import Iconify from "@/components/Iconify";
import {containsText} from "@/utils/function";
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
    style: { maxHeight: 330 },
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
    return <MenuItem sx={{...MenuItemStyle}} key={i} value={option.value} className={`${isEmpty(option.value) ? 'empty-option' : ''}`}>
      {option.label}
      {value === option.value && <Iconify color="#1e5ef3" icon="material-symbols:check" sx={{ width: 24, height: 24 }} /> }
    </MenuItem>
  })
}

const renderValue = (options = [], value = '', placeholder = '') => {
  return value ? options.find(option => option.value === value)?.name : Placeholder(placeholder);
}

function RHFDropdown({name, ...props}) {
  const {control} = useFormContext();
  const {isRequired, title, placeholder, options, disabled} = props;
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
                    defaultValue=""
                    displayEmpty
                    disabled={disabled}
                    error={!!error}
                    onClose={() => setSearchText("")}
                    renderValue={() => renderValue(options, field.value, placeholder)}
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
                <FormHelperText sx={{color: "#FF4842", fontSize: 12, fontWeight: 400}}>{error?.message}</FormHelperText>
              </Stack>
          )}
      />
  );
}

export default memo(RHFDropdown);