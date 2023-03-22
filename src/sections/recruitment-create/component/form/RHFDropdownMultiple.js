import React, {memo, useEffect, useState} from "react";
import {Box, MenuItem, Stack} from "@mui/material";
import {Controller, useFieldArray, useFormContext} from "react-hook-form";
import Iconify from "@/components/Iconify";
import {containsText} from "@/utils/function";
import {AvatarDS} from "@/components/DesignSystem";
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
  useStyles
} from "@/components/hook-form/style";
import {CloseIcon} from "@/theme/overrides/CustomIcons";
import ChipDS from "@/components/DesignSystem/ChipDS";
import HelperText from "@/components/BaseComponents/HelperText";

const renderOptions = (options, value, type, disabledOption) => {
  if (type === 'avatar') {
    return options?.map((option, i) => {
      return <MenuItem sx={{...MenuItemStyle}} key={i} value={option.value}>
        <Box>
          <AvatarDS sx={{height: "24px", width: "24px", borderRadius: '50%', fontSize: "10px"}} name={option.name}/>
          {option.label || option.name}
        </Box>
        {value.includes(option.value) && <Iconify color="#1e5ef3" icon="material-symbols:check" sx={{width: 24, height: 24}}/>}
      </MenuItem>
    })
  }
  return options?.map((option, i) => {  // disable
    return <MenuItem sx={{...MenuItemStyle}} key={i} value={option.value} disabled={disabledOption}>
      {option.label || option.name}
      {value.includes(option.value) && <Iconify color="#1e5ef3" icon="material-symbols:check" sx={{width: 24, height: 24}}/>}
    </MenuItem>
  })
}

const renderValue = (options = [], selected, onDelete, placeholder) => {
  return selected.length > 0 ? <Box sx={{display: 'flex', flexWrap: 'wrap', height: '100%'}}>
    {
      selected.map((item, index) => <ChipDS
          label={options.find(option => option.value === item)?.name}
          key={index}
          deleteIcon={<CloseIcon onMouseDown={(event) => event.stopPropagation()}/>}
          sx={{...ChipSelectStyle}}
          variant="filled"
          onDelete={() => onDelete(index)}
      />)
    }
  </Box> : Placeholder(placeholder)
}

function RHFDropdownMultiple({name, ...props}) {
  const {control} = useFormContext();
  const classes = useStyles();
  const {defaultValue, placeholder, isRequired, title, options, type, disabledOption, ...other} = props;
  const {remove} = useFieldArray({control, name});
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
          defaultValue={defaultValue || []}
          render={({field, fieldState: {error}}) => (
              <Stack direction="column">
                {title && <LabelStyle required={isRequired}>{title}</LabelStyle>}
                <SelectFieldStyle
                    {...field}
                    displayEmpty
                    error={!!error}
                    multiple
                    onClose={() => setSearchText("")}
                    renderValue={(selected) => renderValue(options, selected, remove, placeholder)}
                    MenuProps={{...MenuProps, classes: {paper: classes.paper}}}
                    {...other}
                >
                  
                  {options?.length > 3 && (
                      <TextFieldStyle
                          inputRef={(input) => {
                            if (input != null) {
                              input.focus();
                            }
                          }}
                          placeholder="Tìm kiếm..."
                          fullWidth
                          autoFocus
                          sx={{...SearchInputStyle}}
                          InputProps={{...InputProps}}
                          onChange={(e) => setSearchText(e.target.value)}
                          onKeyDown={(e) => e.stopPropagation()}
                      />
                  )}
                  {renderOptions(filterOptions, field.value, type, disabledOption)}
                </SelectFieldStyle>
                <HelperText errorText={error?.message}/>
              </Stack>
          )}
      />
  );
}

export default memo(RHFDropdownMultiple);