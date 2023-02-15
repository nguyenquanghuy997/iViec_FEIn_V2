import React, {useMemo, useState, memo} from "react";
import {FormHelperText, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import {Controller, useFormContext} from "react-hook-form";
import Iconify from "@/components/Iconify";
import {containsText} from "@/utils/function";
import {
  InputLabelStyle,
  InputLabelErrorStyle,
  MenuItemStyle,
  SearchInputStyle,
  SelectStyle,
} from './style';

const Placeholder = (placeholder) => {
  return <Typography variant="body2" sx={{color: '#8A94A5', fontSize: 14, fontWeight: 400}}>{placeholder}</Typography>
}

function RHFDropdown({name, ...props}) {
  const {control} = useFormContext();
  const {hasLabel = true, htmlFor, required, label, placeholder, multiple = false, options} = props;

  const [searchText, setSearchText] = useState("");
  const displayedOptions = useMemo(
      () => options.filter((option) => containsText(option.name, searchText)),
      [searchText]
  );

  return (
      <Controller
          name={name}
          control={control}
          render={({field, fieldState: {error}}) => (
              <Stack direction="column">
                {hasLabel && (
                    <InputLabel
                        htmlFor={htmlFor || name}
                        required={required}
                        sx={
                          error
                              ? { ...InputLabelStyle, ...InputLabelErrorStyle }
                              : { ...InputLabelStyle }
                        }
                    >
                      {label}
                    </InputLabel>
                )}
                {multiple ? <>
                      <Select
                          {...field}
                          value={field.value}
                          defaultValue={field.value}
                          displayEmpty
                          fullWidth
                          error={!!error}
                          multiple
                          onClose={() => setSearchText("")}
                          required={false}
                          label={null}
                          renderValue={field.value?.length > 0 ? () => field.value?.map(i => `${i.name}, `) : () => Placeholder(placeholder)}
                          sx={{...SelectStyle}}
                      >
                        {options?.length > 3 && (
                            <TextField
                                placeholder="Tìm kiếm..."
                                fullWidth
                                InputProps={{
                                  startAdornment: (
                                      <InputAdornment position="start">
                                        <Iconify icon={"ri:search-2-line"} width={16} height={16} color="#5c6a82"/>
                                      </InputAdornment>
                                  )
                                }}
                                sx={{...SearchInputStyle}}
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
                      <FormHelperText sx={{color: "#FF4842", fontSize: 12, fontWeight: 400}}>{error?.message}</FormHelperText>
                    </> :
                    <>
                      <Select
                          {...field}
                          value={field.value || ''}
                          displayEmpty
                          fullWidth
                          error={!!error}
                          onClose={() => setSearchText("")}
                          required={false}
                          label={null}
                          renderValue={!field.value ? () => Placeholder(placeholder) : () => options.find(option => option.value === field.value)?.name}
                          sx={{...SelectStyle}}
                      >
                        {options?.length > 3 && (
                            <TextField
                                placeholder="Tìm kiếm..."
                                fullWidth
                                InputProps={{
                                  startAdornment: (
                                      <InputAdornment position="start">
                                        <Iconify icon={"ri:search-2-line"} width={16} height={16} color="#5c6a82"/>
                                      </InputAdornment>
                                  )
                                }}
                                sx={{...SearchInputStyle}}
                                onChange={(e) => setSearchText(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key !== "Escape") {
                                    e.stopPropagation();
                                  }
                                }}
                            />
                        )}
                        {displayedOptions?.map((option, i) => (
                            <MenuItem sx={{...MenuItemStyle}} key={i} value={option.value}>
                              {option.label}
                            </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText sx={{color: "#FF4842", fontSize: 12, fontWeight: 400}}>{error?.message}</FormHelperText>
                    </>
                }
              </Stack>
          )}
      />
  );
}

export default memo(RHFDropdown);