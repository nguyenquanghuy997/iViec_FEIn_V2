import {
  LabelStyle,
  MenuItemStyle,
  SearchInputStyle,
  SelectFieldStyle,
  TextFieldStyle,
  useStyles,
} from "./style";
import { AvatarDS } from "@/components/DesignSystem";
import Iconify from "@/components/Iconify";
import { containsText } from "@/utils/function";
import {
  Box,
  FormHelperText,
  InputAdornment,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

const Placeholder = (placeholder) => {
  return (
    <Typography
      variant="body2"
      sx={{ color: "#8A94A5", fontSize: 14, fontWeight: 400 }}
    >
      {placeholder}
    </Typography>
  );
};

const MenuProps = {
  PaperProps: {
    style: { maxHeight: 330 },
  },
  disableAutoFocusItem: true,
  MenuListProps: {
    disableListWrap: true,
  },
  // disableScrollLock: true
};

const InputProps = {
  startAdornment: (
    <InputAdornment position="start">
      <Iconify icon={"ri:search-2-line"} color="#5c6a82" />
    </InputAdornment>
  ),
};

const renderOptions = (options, value, type = "text") => {
  if (type === "avatar") {
    return options?.map((option, i) => {
      return (
        <MenuItem sx={{ ...MenuItemStyle }} key={i} value={option.value}>
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
            {option.label || option.name}
          </Box>
          {value === option.value && (
            <Iconify
              color="#1e5ef3"
              icon="material-symbols:check"
              sx={{ width: 24, height: 24 }}
            />
          )}
        </MenuItem>
      );
    });
  }
  return options?.map((option, i) => {
    return (
      <MenuItem sx={{ ...MenuItemStyle }} key={i} value={option.value}>
        {option.label || option.name}
        {value === option.value && (
          <Iconify
            color="#1e5ef3"
            icon="material-symbols:check"
            sx={{ width: 24, height: 24 }}
          />
        )}
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
  return value || value === 0
    ? options.find((option) => option.value === value)?.[keyObj]
    : Placeholder(placeholder);
};

function RHFDropdown({ name, ...props }) {
  const { control } = useFormContext();
  const {
    defaultValue,
    isRequired,
    title,
    placeholder,
    options,
    disabled,
    keyObj,
    type = "text",
  } = props;
  const classes = useStyles();
  const [searchText, setSearchText] = useState("");
  const [filterOptions, setFilterOptions] = useState([]);

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
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ""}
      render={({ field, fieldState: { error } }) => (
        <Stack direction="column">
          {title && <LabelStyle required={isRequired}>{title}</LabelStyle>}
          <SelectFieldStyle
            {...field}
            value={field.value}
            displayEmpty
            disabled={disabled}
            error={!!error}
            onClose={() => setSearchText("")}
            renderValue={() =>
              renderValue(options, field.value, placeholder, keyObj)
            }
            MenuProps={{ ...MenuProps, classes: { paper: classes.paper } }}
          >
            {options?.length > 3 && (
              <TextFieldStyle
                placeholder="Tìm kiếm..."
                fullWidth
                autoFocus
                InputProps={{ ...InputProps }}
                sx={{ ...SearchInputStyle }}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => e.stopPropagation()}
              />
            )}
            {renderOptions(filterOptions, field.value, type)}
          </SelectFieldStyle>
          <FormHelperText
            sx={{ color: "#FF4842", fontSize: 12, fontWeight: 400 }}
          >
            {error?.message}
          </FormHelperText>
        </Stack>
      )}
    />
  );
}

export default memo(RHFDropdown);
