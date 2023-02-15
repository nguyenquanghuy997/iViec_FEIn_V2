import React, {useMemo, useState} from "react";
import {FormControl, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField} from "@mui/material";
import Iconify from "@/components/Iconify";
import ChipDS from "@/components/DesignSystem/ChipDS";
import {
  MenuItemStyle,
  SearchInputStyle,
  SelectStyle,
} from '@/components/hook-form/style';
import {containsText} from "@/utils/function";


const SelectFilter = ({options, value, data, name, multiple, placeholder, onChange, onDeleteSelect, ...props}) => {
  const [searchText, setSearchText] = useState("");
  const displayedOptions = useMemo(
      () => data?.filter((option) => containsText(option.name, searchText)),
      [searchText]
  );

  return (
      <FormControl fullWidth>
        {!multiple && <InputLabel sx={{ fontSize: '14px',
          "&.MuiInputLabel-root[data-shrink='false']": {
              transform: 'translate(14px, 12px) scale(1)'
          }
        }}>{placeholder}</InputLabel>}
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
            {value?.map((item, index) => {
              return <ChipDS key={index} sx={{
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
            placeholder={placeholder}
            label={placeholder}
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
              <MenuItem sx={{...MenuItemStyle}} key={i} value={option.id}>
                {option.name}
              </MenuItem>
          ))}
        </Select>}
      </FormControl>
  );
};

export default SelectFilter;
