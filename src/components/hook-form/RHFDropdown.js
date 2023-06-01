import {
  InputProps,
  LabelStyle,
  MenuItemStyle,
  MenuProps,
  Placeholder,
  SearchInputStyle,
  SelectFieldStyle,
  useStyles,
} from "./style";
import HelperText from "@/components/BaseComponents/HelperText";
import { AvatarDS } from "@/components/DesignSystem";
import Iconify from "@/components/Iconify";
import { containsText } from "@/utils/function";
import { Box, IconButton, MenuItem, Stack, TextField } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTheme } from "@mui/material/styles";


export const CheckedIconOutlined = () => {
  
  return (
    <Iconify
      color="#1e5ef3"
      icon="material-symbols:check"
      sx={{width: 24, height: 24}}
    />
  );
};

const renderOptions = (options, value, type = "text") => {
  if (type === "avatar") {
    return options?.map((option, i) => {
      return (
        <MenuItem sx={{...MenuItemStyle}} key={i} value={option.value}>
          <Box>
            <AvatarDS
              sx={{
                height: "24px",
                width: "24px",
                borderRadius: "100px",
                fontSize: "10px",
              }}
              name={option.lastName}
            />
            {option.label || option.name || option.email}
          </Box>
          {value === option.value && <CheckedIconOutlined/>}
        </MenuItem>
      );
    });
  }
  return options?.map((option, i) => {
    return (
      <MenuItem sx={{...MenuItemStyle}} key={i} value={option.value}>
        {option.label || option.name || option.email}
        {value === option.value && <CheckedIconOutlined/>}
      </MenuItem>
    );
  });
};

const renderValue = (
  options = [],
  value,
  placeholder = "",
  keyObj = "name"
) => {
  const displayLabelWithKey = options.find(
    (option) => option.value === value
  )?.[keyObj];
  const displayLabel = options.find((option) => option.value === value)?.name;
  return value || value === 0
    ? displayLabelWithKey
      ? displayLabelWithKey
      : displayLabel
    : Placeholder(placeholder);
};

const RHFDropdown = React.forwardRef((props, ref) => {
  const {control, setValue} = useFormContext();
  const {
    name,
    defaultValue,
    isRequired,
    title,
    placeholder,
    options,
    disabled,
    keyObj,
    allowClear,
    type = "text",
    ...other
  } = props;
  
  const classes = useStyles();
  const [searchText, setSearchText] = useState("");
  const [filterOptions, setFilterOptions] = useState([]);
  const theme = useTheme();
  useEffect(() => {
    if (searchText) {
      setFilterOptions(
        options?.filter((option) => containsText(option.name, searchText))
      );
    } else {
      setFilterOptions(options);
    }
  }, [searchText, options]);
  
  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || ""}
        render={({field, fieldState: {error}}) => (
          <Stack direction="column">
            {title && <LabelStyle required={isRequired}>{title}</LabelStyle>}
            <SelectFieldStyle
              ref={ref}
              {...field}
              displayEmpty
              disabled={disabled}
              error={!!error}
              onClose={() => setSearchText("")}
              renderValue={() => renderValue(options, field.value, placeholder, keyObj)}
              MenuProps={{...MenuProps, classes: {paper: classes.paper}}}
              sx={{
                "& .MuiSelect-iconOutlined": {
                  display: field.value && allowClear === true ? "none" : "",
                  color: theme.palette.common.neutral700,
                  width: "20px",
                  height: "20px",
                  marginRight: "8px",
                  marginTop: "-2px"
                },
              }}
              endAdornment={
                allowClear === true ? (
                  <IconButton
                    sx={{visibility: field.value ? "visible" : "hidden"}}
                    onClick={() => setValue(field.name, "")}
                  >
                    <Iconify
                      icon={"ic:round-clear"}
                      width={16}
                      height={16}
                      color={theme.palette.common.borderObject}
                    />
                  </IconButton>
                ) : (
                  ""
                )
              }
              {...other}
            >
              <TextField
                placeholder="Tìm kiếm..."
                fullWidth
                autoFocus
                inputRef={(input) => {
                  if (input != null) {
                    input.focus();
                  }
                }}
                InputProps={{...InputProps}}
                sx={{...SearchInputStyle}}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => e.stopPropagation()}
              />
              {renderOptions(filterOptions, field.value, type)}
            </SelectFieldStyle>
            <HelperText errorText={error?.message}/>
          </Stack>
        )}
      />
    </>
  );
});

export default memo(RHFDropdown);