import React, {memo, useMemo, useState} from "react";
import {FormHelperText, InputAdornment, MenuItem, Stack, Typography} from "@mui/material";
import {Controller, useFieldArray, useFormContext} from "react-hook-form";
import Iconify from "@/components/Iconify";
import {containsText} from "@/utils/function";
import {
  LabelStyle,
  MenuItemStyle,
  SearchInputStyle,
  SelectFieldStyle,
  SelectStyle,
  TextFieldStyle,
  useStyles,
} from '@/components/hook-form/style';
import ChipDS from "@/components/DesignSystem/ChipDS";

const Placeholder = (placeholder) => {
  return <Typography variant="body2" sx={{color: '#8A94A5', fontSize: 14, fontWeight: 400}}>{placeholder}</Typography>
}

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 330,
    },
  },
};


const SelectFilter = React.forwardRef((props, ref) => {
  const {control} = useFormContext();
  const {name, isRequired, title, placeholder, options, disabled, multiple = false} = props;
  const {remove} = useFieldArray({control, name});
  const classes = useStyles();

  const [searchText, setSearchText] = useState("");
  const displayedOptions = useMemo(
      () => options?.filter((option) => containsText(option.name, searchText)),
      [searchText]
  );
  return (
      <Controller
          name={name}
          control={control}
          render={({field, fieldState: {error}}) => (
              <Stack direction="column">
                {title && (<LabelStyle required={isRequired}>{title}</LabelStyle>)}
                <SelectFieldStyle
                    ref={ref}
                    {...field}
                    value={multiple ? field?.value || [] : field?.value || ""}
                    defaultValue={""}
                    displayEmpty
                    disabled={disabled}
                    error={!!error}
                    {...props}
                    onClose={() => setSearchText("")}
                    renderValue={(!field?.value || multiple) ? () => Placeholder(placeholder) : () => options?.find(option => option?.value === field.value)?.name}
                    sx={{...SelectStyle}}
                    MenuProps={{...MenuProps, classes: {paper: classes.paper}}}
                >
                  {options?.length > 3 && (
                      <TextFieldStyle
                          ref={ref}
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
                  {searchText ? displayedOptions?.map((option) => (
                      option.value && <MenuItem sx={{...MenuItemStyle}} key={option?.value} value={option?.value}>
                        {option?.label}
                      </MenuItem>
                  )) : options?.map((option) => (
                      option.value && <MenuItem sx={{...MenuItemStyle}} key={option?.value} value={option?.value}>
                        {option?.label}
                      </MenuItem>
                  ))}
                </SelectFieldStyle>
                {multiple && (
                    <Stack flexDirection="row" flexWrap="wrap" justifyContent="flex-start">
                      {options?.filter(option => field?.value?.includes(option?.value))?.map((item, index) => {
                        return <ChipDS key={index} sx={{
                          padding: '5px 8px',
                          color: '#455570',
                          fontSize: 12,
                          fontWeight: 500,
                          mt: 2.5,
                          ml: 0.5,
                        }} label={item?.name} size="small" variant="filled" onDelete={() => remove(index)}
                        />
                      })}
                    </Stack>
                )}
                <FormHelperText sx={{color: "#FF4842", fontSize: 12, fontWeight: 400}}>{error?.message}</FormHelperText>
              </Stack>
          )}
      />
  );
});

export default memo(SelectFilter);