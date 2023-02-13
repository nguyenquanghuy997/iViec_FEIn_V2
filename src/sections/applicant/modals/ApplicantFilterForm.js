import React, {useState} from 'react';
// lib
import {Divider, FormControlLabel, Radio, RadioGroup, Stack, Typography} from "@mui/material";

// component
import InputFilter from "@/sections/dynamic-filter/InputFilter";
import SelectFilter from "@/sections/dynamic-filter/SelectFilter";

const TypographyStyle = {
    color: '#455570',
    fontSize: "14px",
    fontWeight: "600",
    mb: 2
}

// const fieldsSelectBetween = ['height', 'salary']
// const getFieldSelectBetween = () => {
//
// }

const ApplicantFilterForm = ({columns = []}) => {
        const [stateFilter] = useState({
            experience: "",
            companyOptions: []
        })

        const handleChange = (e) => {
            console.log(e)
            // setStateFilter({
            //     ...stateFilter,
            //     [e.target.name]: e.target.value,
            // })
        }

        return (
            <Stack>
                {columns.map((column, index) => {
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
                                            name="company"
                                            multiple={column.multiple}
                                            placeholder="Tìm kiếm..."
                                            selectedOption={stateFilter.companyOptions}
                                            setSelectedOption={handleChange}
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
                                        type={column.type}
                                        label={null}
                                        hasLabel={false}
                                        onChange={handleChange}
                                        // inputProps={column.numberic && { inputMode: 'numeric', pattern: '[0-9]*' }}
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
