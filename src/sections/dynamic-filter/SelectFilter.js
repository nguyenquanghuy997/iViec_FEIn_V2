import React, {memo, useEffect, useState} from "react";
import {FormHelperText, InputAdornment, MenuItem, Stack, Typography} from "@mui/material";
import {Controller, useFieldArray, useFormContext} from "react-hook-form";
import Iconify from "@/components/Iconify";
import {containsText} from "@/utils/function";
import {
  LabelStyle,
  MenuItemStyle,
  SearchInputStyle,
  SelectFieldStyle,
  TextFieldStyle,
  useStyles,
} from '@/components/hook-form/style';
import ChipDS from "@/components/DesignSystem/ChipDS";

const Placeholder = (placeholder) => {
  return <Typography variant="body2" sx={{color: '#8A94A5', fontSize: 14, fontWeight: 400}}>{placeholder}</Typography>
}

const MenuProps = {
  PaperProps: {
    style: {maxHeight: 330,},
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

const renderOptions = (options, value, multiple = false) => {
  return options?.map((option, i) => {
    if (!multiple) {
      return <MenuItem sx={{...MenuItemStyle}} key={i} value={option.value}>
        {option.label || option.name}
        {value === option.value && <Iconify color="#1e5ef3" icon="material-symbols:check" sx={{width: 24, height: 24}}/>}
      </MenuItem>
    } else {
      return <MenuItem sx={{...MenuItemStyle}} key={i} value={option.value}>
        {option.label}
        {/*{value?.map(item => item?.includes(option.value) !== -1)?.[i] && <Iconify color="#1e5ef3" icon="material-symbols:check" sx={{width: 24, height: 24}}/>}*/}
      </MenuItem>
    }
  })
}

const renderValue = (options = [], selected, multiple = false, placeholder = '') => {
  // return (!value || multiple) ? Placeholder(placeholder) : options.find(option => option.value === value)?.name;
  if(multiple) {
    return Placeholder(placeholder);
  } else {
    return selected || selected === 0 ? options.find(option => option.value === selected)?.name : Placeholder(placeholder)
  }
}

const renderChipsSelect = (options, value, onDelete) => {
  return <Stack flexDirection="row" flexWrap="wrap" justifyContent="flex-start">
    {options?.filter(option => value?.map(String)?.includes(option?.value))?.map((item, index) => {
      return <ChipDS
          key={index}
          sx={{padding: '5px 8px', color: '#455570', fontSize: 12, fontWeight: 500, mt: 2.5, ml: 0.5,}}
          label={item?.name}
          size="small"
          variant="filled"
          onDelete={() => onDelete(index)}
      />
    })}
  </Stack>
}

const SelectFilter = React.forwardRef((props, ref) => {
  const {control} = useFormContext();
  const {name, defaultValue, isRequired, title, placeholder, options, disabled, multiple = false} = props;
  const {remove} = useFieldArray({control, name});
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
          defaultValue={defaultValue || ""}
          render={({field, fieldState: {error}}) => (
              <Stack direction="column">
                {title && (<LabelStyle required={isRequired}>{title}</LabelStyle>)}
                <SelectFieldStyle
                    ref={ref}
                    {...field}
                    value={field.value}
                    displayEmpty
                    disabled={disabled}
                    error={!!error}
                    {...props}
                    onClose={() => setSearchText("")}
                    renderValue={(selected) => renderValue(options, selected, multiple, placeholder)}
                    MenuProps={{...MenuProps, classes: {paper: classes.paper}}}
                >
                  {options?.length > 3 && (
                      <TextFieldStyle
                          fullWidth
                          placeholder="Tìm kiếm..."
                          autoFocus
                          InputProps={{...InputProps}}
                          sx={{...SearchInputStyle}}
                          onChange={(e) => setSearchText(e.target.value)}
                          onKeyDown={(e) => e.stopPropagation()}
                      />
                  )}
                  {renderOptions(filterOptions, field.value, multiple)}
                </SelectFieldStyle>
                {multiple && renderChipsSelect(options, field.value, remove)}
                <FormHelperText
                    sx={{color: "#FF4842", fontSize: 12, fontWeight: 400}}>{error?.message}</FormHelperText>
              </Stack>
          )}
      />
  );
});

export default memo(SelectFilter);