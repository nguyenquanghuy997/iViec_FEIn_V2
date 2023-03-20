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
} from '@/components/hook-form/style';
import ChipDS from "@/components/DesignSystem/ChipDS";
import {STYLE_CONSTANT as style} from "@/theme/palette";

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

const renderOptions = (options, value, multiple) => {
  if (multiple) {
    return options?.map((option, i) => {
      return <MenuItem
              sx={{...MenuItemStyle, textAlign: 'left', justifyContent: 'flex-start'}}
              key={i}
              value={option.value}
      >
        {option.label}
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
          sx={{padding: '5px 8px', color: '#455570', fontSize: 12, fontWeight: 500, mt: 2.5, ml: 0.5,}}
          label={item?.name || item?.label}
          size="medium"
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
                <FormHelperText sx={{
                  color: style.COLOR_TEXT_DANGER,
                  fontSize: style.FONT_XS,
                  fontWeight: style.FONT_NORMAL
                }}>{error?.message}</FormHelperText>
              </Stack>
          )}
      />
  );
});

export default memo(SelectFilter);