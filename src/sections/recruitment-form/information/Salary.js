import React from "react";
import {Box, InputAdornment} from "@mui/material";
import {useWatch} from "react-hook-form";

import {RHFSelect} from "@/components/hook-form";
import MuiInputNumber from "@/components/form/MuiInputNumber";
import DividerCard from "@/sections/recruitment-form/components/DividerCard";

import {LIST_CURRENCY_TYPE, LIST_RECRUITMENT_SALARY_DISPLAY_TYPE} from "@/utils/formatString";
import {Currency} from "@/utils/enum";

import {BoxInnerStyle} from "@/sections/recruitment-form/style";
import {LabelStyle} from "@/components/hook-form/style";

const Salary = () => {
    const salaryDisplayType = useWatch({name: 'salaryDisplayType'});
    const currencyUnit = useWatch({name: 'currencyUnit'});

    return (
        <BoxInnerStyle>
            <DividerCard title="MỨC LƯƠNG"/>
            <Box sx={{px: 4, py: 3}}>
                <Box sx={{mb: 2, display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{flex: 1, marginRight: 8}}>
                        <LabelStyle required>Cách hiển thị</LabelStyle>
                        <RHFSelect
                            name="salaryDisplayType"
                            placeholder="Chọn 1 cách hiển thị"
                            fullWidth
                            options={LIST_RECRUITMENT_SALARY_DISPLAY_TYPE}
                        />
                    </div>
                    {Number(salaryDisplayType) > 1 && (
                        <div style={{flex: 1, marginLeft: 8}}>
                            <LabelStyle required>Loại tiền tệ</LabelStyle>
                            <RHFSelect
                                name="currencyUnit"
                                placeholder="VNĐ"
                                fullWidth
                                options={LIST_CURRENCY_TYPE}
                            />
                        </div>
                    )}
                </Box>
                {Number(salaryDisplayType) === 2 && (
                    <Box sx={{mb: 2, display: 'flex', justifyContent: 'space-between'}}>
                        <div style={{flex: 1, marginRight: 8}}>
                            <MuiInputNumber
                                name="minSalary"
                                title="Mức lương tối thiểu"
                                placeholder="Nhập số tiền"
                                isRequired
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            {Currency(currencyUnit)}
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                        <div style={{flex: 1, marginLeft: 8}}>
                            <MuiInputNumber
                                name="maxSalary"
                                title="Mức lương tối đa"
                                placeholder="Nhập số tiền"
                                isRequired
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            {Currency(currencyUnit)}
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                    </Box>
                )
                }
            </Box>
        </BoxInnerStyle>
    )
}

export default Salary;