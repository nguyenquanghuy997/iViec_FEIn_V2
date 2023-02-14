import React, {useMemo, useState} from "react";
import {FormControl, InputAdornment, MenuItem, Select, Stack, TextField} from "@mui/material";
import Iconify from "@/components/Iconify";
import {isEmpty} from 'lodash';
import ChipDS from "@/components/DesignSystem/ChipDS";
import {STYLE_CONSTANT} from "@/sections/auth/register/constants";

const containsText = (text, searchText) => text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

const SelectStyle = {
  "&.MuiInputBase-root": {
    height: "44px",
    fontSize: STYLE_CONSTANT.FONT_SM,
    borderRadius: 0.75,
    width: STYLE_CONSTANT.WIDTH_FULL,
  },
  "& .MuiSelect-select": {
    borderRadius: 0.75,
  },
  ".MuiFormHelperText-root": {
    marginTop: 1,
    marginLeft: 0,
  },
}

const SearchInputStyle = {
  boxShadow: "inset 0px -1px 0px #E7E9ED",
  "& .MuiInputBase-input": {
    color: "#5C6A82",
    padding: "10px 0",
    fontFamily: "Inter",
    fontWeight: "500",
    fontSize: "15px",
    lineHeight: "20px",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
    padding: 0,
  },
}

const MenuItemStyle = {
  color: "#172B4D",
  padding: "10px 16px",
  fontSize: "14px",
  fontWeight: 400
}

const SelectFilter = ({options, value, data, name, multiple, placeholder, onChange, onDeleteSelect, ...props}) => {
  const [searchText, setSearchText] = useState("");
  const displayedOptions = useMemo(
      () => data?.filter((option) => containsText(option.name, searchText)),
      [searchText]
  );

  return (
      <FormControl fullWidth>
        {multiple ? <>
          <Select
              value={value}
              defaultValue={value}
              name={name}
              multiple={multiple}
              onChange={onChange}
              displayEmpty
              onClose={() => setSearchText("")}
              renderValue={() => <>{placeholder}</>}
              {...props}
              sx={{...SelectStyle}}
          >
              {options?.length > 3 && (
                  <TextField
                      placeholder="Tìm kiếm..."
                      fullWidth
                      sx={{...SearchInputStyle}}
                      InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                              <Iconify icon={"ri:search-2-line"} width={16} height={16} color="#5c6a82" />
                            </InputAdornment>
                        )
                      }}
                      onChange={(e) => setSearchText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key !== "Escape") {
                          e.stopPropagation();
                        }
                      }}
                  />
              )}
            {displayedOptions?.map((option, i) => (
                <MenuItem sx={{...MenuItemStyle}} key={i} value={option}>
                  {option.name}
                </MenuItem>
            ))}
          </Select>
          <Stack flexDirection="row" flexWrap="wrap" justifyContent="flex-start">
            {value?.map((item) => {
              return <ChipDS key={item?.value} sx={{
                padding: '5px 8px',
                color: '#455570',
                fontSize: 12,
                fontWeight: 500,
                mt: 2.5,
              }} onDelete={() => onDeleteSelect(item, name)} label={item?.name} size="small" variant="filled"/>
            })}
          </Stack>
        </> : <Select
            value={value || ""}
            name={name}
            onChange={onChange}
            displayEmpty
            onClose={() => setSearchText("")}
            renderValue={() => isEmpty(value) ? placeholder : value.name}
            {...props}
            sx={{...SelectStyle}}
        >
            {options?.length > 3 && (
                <TextField
                    placeholder="Tìm kiếm..."
                    fullWidth
                    sx={{...SearchInputStyle}}
                    InputProps={{
                      startAdornment: (
                          <InputAdornment position="start">
                            <Iconify icon={"ri:search-2-line"} width={16} height={16} color="#5c6a82" />
                          </InputAdornment>
                      )
                    }}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key !== "Escape") {
                        e.stopPropagation();
                      }
                    }}
                />
            )}
          {displayedOptions?.map((option, i) => (
              <MenuItem sx={{...MenuItemStyle}} key={i} value={option}>
                {option.name}
              </MenuItem>
          ))}
        </Select>}
      </FormControl>
  );
};

export default SelectFilter;
