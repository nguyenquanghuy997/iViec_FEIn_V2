import React, {memo, useEffect, useState} from "react";
import {Box, FormHelperText, InputAdornment, MenuItem, Stack, Typography} from "@mui/material";
import {Controller, useFieldArray, useFormContext} from "react-hook-form";
import Iconify from "@/components/Iconify";
import {containsText} from "@/utils/function";
import {AvatarDS} from "@/components/DesignSystem";
import {
  LabelStyle,
  MenuItemStyle,
  SearchInputStyle,
  SelectFieldStyle,
  TextFieldStyle, useStyles
} from "@/components/hook-form/style";
import {STYLE_CONSTANT as style} from "@/theme/palette";
import {CloseIcon} from "@/theme/overrides/CustomIcons";
import ChipDS from "@/components/DesignSystem/ChipDS";

const Placeholder = (placeholder) => {
  return <Typography variant="body2" sx={{
    color: style.COLOR_TEXT_GRAY,
    fontSize: style.FONT_SM,
    fontWeight: style.FONT_NORMAL
  }}>{placeholder}</Typography>
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

const renderOptions = (options, type = "text") => {
  if (type === 'avatar') {
    return options?.map((option, i) => {
      return <MenuItem sx={{...MenuItemStyle}} key={i} value={option.value}>
        <Box>
          <AvatarDS sx={{height: "24px", width: "24px", borderRadius: '50%', fontSize: "10px"}} name={option.name}/>
          {option.label || option.name}
        </Box>
      </MenuItem>
    })
  }
  return options?.map((option, i) => {
    return <MenuItem sx={{...MenuItemStyle}} key={i} value={option.value}>
      {option.label || option.name}
    </MenuItem>
  })
}

const renderValue = (options = [], selected, onDelete, placeholder) => {
  return selected.length > 0 ? <Box sx={{ display: 'flex', flexWrap: 'wrap', height: '100%' }}>
    {
      selected.map((item, index) => <ChipDS
          label={options.find(option => option.value === item)?.name}
          key={index}
          deleteIcon={<CloseIcon onMouseDown={(event) => event.stopPropagation()}/>}
          sx={{padding: '5px 8px', color: style.COLOR_TEXT_PRIMARY, fontSize: style.FONT_XS, fontWeight: style.FONT_MEDIUM, borderRadius: '4px', mr: 1, my: 0.5}}
          size="small"
          variant="filled"
          onDelete={() => onDelete(index)}
      />)
    }
  </Box> : Placeholder(placeholder)
}

function RHFDropdownMultiple({name, ...props}) {
  const {control} = useFormContext();
  const classes = useStyles();
  const {defaultValue, placeholder, isRequired, title, options, disabled, type = 'text'} = props;
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
          defaultValue={defaultValue || ''}
          render={({field, fieldState: {error}}) => (
              <Stack direction="column">
                {title && <LabelStyle required={isRequired}>{title}</LabelStyle>}
                <SelectFieldStyle
                    {...field}
                    displayEmpty
                    disabled={disabled}
                    error={!!error}
                    multiple
                    onClose={() => setSearchText("")}
                    renderValue={(selected) => renderValue(options, selected, remove, placeholder)}
                    MenuProps={{...MenuProps, classes: {paper: classes.paper}}}
                >
                  
                  {options?.length > 3 && (
                      <TextFieldStyle
                          placeholder="Tìm kiếm..."
                          fullWidth
                          autoFocus
                          sx={{...SearchInputStyle}}
                          InputProps={{...InputProps}}
                          onChange={(e) => setSearchText(e.target.value)}
                          onKeyDown={(e) => e.stopPropagation()}
                      />
                  )}
                  {renderOptions(filterOptions, type)}
                </SelectFieldStyle>
                <FormHelperText sx={{
                  color: style.COLOR_TEXT_DANGER,
                  fontSize: style.FONT_XS,
                  fontWeight: style.FONT_NORMAL
                }}>{error?.message}</FormHelperText>
              </Stack>
          )}
      />
  );
}

export default memo(RHFDropdownMultiple);