import React, {memo, useEffect, useState} from "react";
import {MenuItem, Stack} from "@mui/material";
import {Controller, useFormContext} from "react-hook-form";
import Iconify from "@/components/Iconify";
import {containsText} from "@/utils/function";
import {
  ChipSelectStyle,
  InputProps,
  LabelStyle,
  MenuItemStyle,
  MenuProps,
  Placeholder,
  SearchInputStyle,
  SelectFieldStyle,
  TextFieldStyle,
  useStyles,
} from '@/components/hook-form/style';
import ChipDS from "@/components/DesignSystem/ChipDS";
import HelperText from "@/components/BaseComponents/HelperText";

const renderOptions = (options, value, multiple) => {

  if (multiple) {
    return options?.map((option, i) => {
      return <MenuItem
          sx={{...MenuItemStyle}}
          key={i}
          value={option.value}
      >
        {option.label}
        {value.includes(option.value) && <Iconify color="#1e5ef3" icon="material-symbols:check" sx={{width: 24, height: 24}}/>}
      </MenuItem>
    })
  } else {
    return options?.map((option, i) => {
      return <MenuItem sx={{...MenuItemStyle}} key={i} value={option.value}>
        {option.label || option.name}
        {value === option.value && <Iconify color="#1e5ef3" icon="material-symbols:check" sx={{width: 24, height: 24}}/>}
      </MenuItem>
    })
  }
}

const renderValue = (options = [], value, multiple, placeholder = '') => {
  if (multiple) {
    return Placeholder(placeholder);
  } else {
    return value || value === 0 ? options.find(option => option.value === value)?.name : Placeholder(placeholder)
  }
}

const renderChipsSelect = (options, value, onDelete) => {
  return <Stack flexDirection="row" flexWrap="wrap" justifyContent="flex-start">
    {options?.filter(option => value?.includes(option?.value))?.map((item, index) => {
      return <ChipDS
          key={index}
          sx={{...ChipSelectStyle, my: 1}}
          label={item?.name || item?.label}
          size="small"
          variant="filled"
          onDelete={() => onDelete(item.value)}
      />
    })}
  </Stack>
}

const SelectFilter = React.forwardRef((props, ref) => {
  const {control} = useFormContext();
  const {
    name,
    isRequired,
    title,
    placeholder,
    options,
    ...other
  } = props;
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

  const handleDelete = (field, valueDelete) => {
    const newOptions = field.value.filter(item => item !== valueDelete);
    field.onChange(newOptions);
  };

  return (
      <Controller
          name={name}
          control={control}
          defaultValue={props.multiple ? [] : ""}
          render={({field, fieldState: {error}}) => (
              <Stack direction="column">
                {title && (<LabelStyle required={isRequired}>{title}</LabelStyle>)}
                <SelectFieldStyle
                    {...field}
                    displayEmpty
                    error={!!error}
                    onClose={() => setSearchText("")}
                    renderValue={(selected) => props.multiple ? Placeholder(props.placeholder) : renderValue(options, selected, props.multiple, placeholder)}
                    MenuProps={{...MenuProps, classes: {paper: classes.paper}}}
                    {...other}
                >
                  {options?.length > 3 && (
                      <TextFieldStyle
                          ref={ref}
                          fullWidth
                          placeholder="Tìm kiếm..."
                          autoFocus
                          InputProps={{...InputProps}}
                          sx={{...SearchInputStyle}}
                          onChange={(e) => setSearchText(e.target.value)}
                          onKeyDown={(e) => e.stopPropagation()}
                      />
                  )}
                  {renderOptions(filterOptions, field.value, props.multiple)}
                </SelectFieldStyle>
                {props.multiple && renderChipsSelect(options, field.value, (item) => handleDelete(field, item))}
                <HelperText errorText={error?.message}/>
              </Stack>
          )}
      />
  );
});

export default memo(SelectFilter);