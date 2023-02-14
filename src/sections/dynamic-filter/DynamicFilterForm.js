import React, {memo} from 'react';
// lib
import {
    Divider,
    FormControlLabel,
    InputAdornment,
    Radio,
    RadioGroup,
    Stack,
    Typography
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { vi } from 'date-fns/locale'
// component
import InputFilter from "@/sections/dynamic-filter/InputFilter";
import SelectFilter from "@/sections/dynamic-filter/SelectFilter";
import Iconify from "@/components/Iconify";

const TypographyStyle = {
    color: '#455570',
    fontSize: "14px",
    fontWeight: "600",
    mb: 2
}

const DynamicFilterForm = (props) => {
    const {
        // select
        selectMultiFilter,
        onChangeMultiSelectFilter,
        onDeleteSelect,
        // input
        handleChange,
        stateFilter,
        // date
        valuesDate,
        onChangeDate,
    } = props;
    console.log(stateFilter)
        return (
            <Stack>
                {props.columns.map((column) => {
                    if (column.children && column.between && column.type === "date") {
                        return (
                            <Stack key={column.dataIndex}>
                                <Stack sx={{py: 2}}>
                                    <Typography variant="body1" sx={{...TypographyStyle}}>{column.label}</Typography>
                                    {
                                        column.children.map((item) => {
                                            return (
                                                <LocalizationProvider key={item.name} adapterLocale={vi} dateAdapter={AdapterDateFns}>
                                                    <DatePicker
                                                        value={valuesDate[item.name] || null}
                                                        name={item.name}
                                                        onChange={onChangeDate(item.name)}
                                                        InputProps={{
                                                            startAdornment: item.startIcon && (
                                                                <InputAdornment position='start' sx={{ color: '#000' }}>
                                                                    {item.startIcon}
                                                                </InputAdornment>
                                                            ),
                                                            endAdornment: item.endIcon && (
                                                                <InputAdornment position='end'>
                                                                    {item.endIcon}
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                        renderInput={(params) => (
                                                            <InputFilter sx={{mb: 2}}  name={item.name} {...params} inputProps={{ ...params.inputProps, placeholder: item.placeholder }} />
                                                        )}
                                                        inputFormat="dd/MM/yyyy"
                                                    />
                                                </LocalizationProvider>
                                            )
                                        })
                                    }
                                </Stack>
                                <Divider/>
                            </Stack>
                        )
                    }
                    if (column.children && column.between && column.type === "select") {
                        return (
                            <Stack key={column.dataIndex}>
                                <Stack sx={{py: 2}}>
                                    <Typography variant="body1" sx={{...TypographyStyle}}>{column.label}</Typography>
                                    {
                                        column.children.map((item) => {
                                            return (
                                                <div key={item.name} style={{ marginBottom: 12 }}>
                                                    <Typography variant="body1" sx={{...TypographyStyle, fontWeight: 500, mb: 1}}>{item.label}</Typography>
                                                    <SelectFilter
                                                        options={item.options}
                                                        name={item.name}
                                                        multiple={item.multiple || false}
                                                        placeholder={item.placeholder || "Tìm kiếm..."}
                                                        value={selectMultiFilter[item.name]}
                                                        data={item.options}
                                                        onChange={onChangeMultiSelectFilter}
                                                    />
                                                </div>
                                            )
                                        })
                                    }
                                </Stack>
                                <Divider/>
                            </Stack>
                        )
                    }
                    if (column.children) {
                        return (
                            <Stack key={column.dataIndex}>
                                <Stack sx={{py: 2}}>
                                    <Typography variant="body1" sx={{...TypographyStyle}}>{column.label}</Typography>
                                    {
                                        column.children.map((item) => {
                                            return (
                                                <InputFilter
                                                    key={item.name}
                                                    sx={{mb: 2}}
                                                    name={item.name}
                                                    value={stateFilter[item.name]}
                                                    placeholder={item.placeholder}
                                                    type={item.type}
                                                    onChange={handleChange}
                                                    InputProps={{
                                                        startAdornment: item.startIcon && (
                                                            <InputAdornment position='start'>
                                                                {item.startIcon}
                                                            </InputAdornment>
                                                        ),
                                                        endAdornment: item.endIcon && (
                                                            <InputAdornment position='end'>
                                                                {item.endIcon}
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            )
                                        })
                                    }
                                </Stack>
                                <Divider/>
                            </Stack>
                        )
                    }
                    if (column.type === 'radio') {
                        return <Stack key={column.dataIndex}>
                            <Stack sx={{py: 2}}>
                                <Typography variant="body1" sx={{...TypographyStyle}}>{column.label}</Typography>
                                <RadioGroup onChange={handleChange} value={stateFilter[column.name] || "1"} name={column.name} row sx={{ justifyContent: 'space-between' }}>
                                    {column.options.map((option) => (
                                        <FormControlLabel
                                            key={option.value}
                                            value={option.value}
                                            control={<Radio />}
                                            label={option.label}
                                        />
                                    ))}
                                </RadioGroup>
                            </Stack>
                            <Divider/>
                        </Stack>
                    }
                    if (column.type === "select") {
                        return (
                            <Stack key={column.dataIndex}>
                                <Stack sx={{py: 2}}>
                                    <Typography variant="body1" sx={{...TypographyStyle}}>{column.label}</Typography>
                                    <SelectFilter
                                        options={column.options}
                                        name={column.name}
                                        multiple={column.multiple || false}
                                        placeholder={column.placeholder || "Tìm kiếm..."}
                                        value={selectMultiFilter[column.name]}
                                        data={column.options}
                                        onChange={onChangeMultiSelectFilter}
                                        onDeleteSelect={column.multiple ? onDeleteSelect : null}
                                    />
                                </Stack>
                                <Divider/>
                            </Stack>
                        )
                    }
                    return (
                        <Stack key={column.dataIndex}>
                            <Stack sx={{py: 2}}>
                                <Typography variant="body1" sx={{...TypographyStyle}}>{column.label}</Typography>
                                <InputFilter
                                    name={column.name}
                                    placeholder="Tìm kiếm..."
                                    type={column.type || "text"}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                                <Iconify icon={'eva:search-fill'} sx={{color: 'text.disabled', width: 20, height: 20}}/>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Stack>
                            <Divider/>
                        </Stack>
                    )
                })
                }
            </Stack>
        );
    }
;

export default memo(DynamicFilterForm);