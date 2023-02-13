import React, {useState} from 'react';
// lib
import {Divider, FormControlLabel, InputAdornment, Radio, RadioGroup, Stack, Typography} from "@mui/material";

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

const ApplicantFilterForm = ({columns = []}) => {
        const [stateFilter] = useState({
            experience: "",
            companyOptions: []
        })
        console.log(stateFilter)

        const [selectedOption, setSelectedOption] = useState();
        const [focus, setFocused] = useState(false);
        const [hasValue] = useState(false);
        const onFocus = () => setFocused(true);
        const onBlur = () => setFocused(false);

        const handleChange = (e) => {
            console.log(e)
        }

        return (
            <Stack>
                {columns.map((column, index) => {
                    if (column.children && column.type === "select_between") {
                        return (
                            <Stack key={index}>
                                <Stack sx={{py: 2}}>
                                    <Typography variant="body1" sx={{...TypographyStyle}}>{column.label}</Typography>
                                    {
                                        column.children.map((item) => {
                                            return (
                                                <>
                                                    <Typography variant="body1"
                                                                sx={{...TypographyStyle}}>{item.label}</Typography>
                                                    <SelectFilter
                                                        options={item.options}
                                                        name={item.name}
                                                        placeholder={column.placeholder || "Tìm kiếm..."}
                                                        selectedOption={selectedOption}
                                                        setSelectedOption={setSelectedOption}
                                                    />
                                                </>
                                            )
                                        })
                                    }
                                </Stack>
                                <Divider/>
                            </Stack>
                        )
                    }
                    if (column.children && column.type === "date") {
                        return (
                            <Stack key={index}>
                                <Stack sx={{py: 2}}>
                                    <Typography variant="body1" sx={{...TypographyStyle}}>{column.label}</Typography>
                                    {
                                        column.children.map((item) => {
                                            return (
                                                <InputFilter
                                                    sx={{ mb: 2 }}
                                                    name={column.name}
                                                    placeholder="Tìm kiếm..."
                                                    type={hasValue || focus ? "date" : "text"}
                                                    label={null}
                                                    hasLabel={false}
                                                    onChange={handleChange}
                                                    onFocus={onFocus}
                                                    onBlur={onBlur}
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
                                                />
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
                            <Stack key={index}>
                                <Stack sx={{py: 2}}>
                                    <Typography variant="body1" sx={{...TypographyStyle}}>{column.label}</Typography>
                                    {
                                        column.children.map((item) => {
                                            return (
                                                <InputFilter
                                                    sx={{mb: 2}}
                                                    name={item.name}
                                                    placeholder={item.placeholder}
                                                    type={item.type}
                                                    label={null}
                                                    hasLabel={false}
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
                        return <Stack key={index}>
                            <Stack sx={{py: 2}}>
                                <Typography variant="body1" sx={{...TypographyStyle}}>{column.label}</Typography>
                                <RadioGroup row>
                                    {column.options.map((option) => (
                                        <FormControlLabel
                                            key={option.value}
                                            value={option.value}
                                            control={<Radio/>}
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
                            <Stack key={index}>
                                <Stack sx={{py: 2}}>
                                    <Typography variant="body1" sx={{...TypographyStyle}}>{column.label}</Typography>
                                    <SelectFilter
                                        options={column.options}
                                        name={column.name}
                                        // multiple={column.multiple || false}
                                        placeholder={column.placeholder || "Tìm kiếm..."}
                                        selectedOption={selectedOption}
                                        setSelectedOption={setSelectedOption}
                                    />
                                </Stack>
                                <Divider/>
                            </Stack>
                        )
                    }
                    return (
                        <Stack key={index}>
                            <Stack sx={{py: 2}}>
                                <Typography variant="body1" sx={{...TypographyStyle}}>{column.label}</Typography>
                                <InputFilter
                                    name={column.name}
                                    placeholder="Tìm kiếm..."
                                    type={column.type || "text"}
                                    label={null}
                                    hasLabel={false}
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

export default ApplicantFilterForm;
