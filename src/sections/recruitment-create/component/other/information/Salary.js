import DividerCard from "@/sections/recruitment-create/component/DividerCard";
import {Box, InputAdornment} from "@mui/material";
import {LabelStyle} from "@/components/hook-form/style";
import {RHFSelect} from "@/components/hook-form";
import {LIST_CURRENCY_TYPE, LIST_RECRUITMENT_SALARY_DISPLAY_TYPE} from "@/utils/formatString";
import InputNumberFormatFilter from "@/sections/dynamic-filter/InputNumberFormatFilter";
import {Currency} from "@/utils/enum";
import {BoxInnerStyle} from "@/sections/recruitment-create/style";
import React, {useEffect} from "react";
import {useFormContext, useWatch} from "react-hook-form";
import {isEmpty} from "lodash";

const Salary = ({ recruitment }) => {
    const {setValue} = useFormContext();
    const salaryDisplayType = useWatch({name: 'salaryDisplayType'});
    const currencyUnit = useWatch({name: 'currencyUnit'});

    useEffect(() => {
        if (!isEmpty(recruitment)) {
            setValue('salaryDisplayType', recruitment?.salaryDisplayType);
            setValue('currencyUnit', recruitment?.currencyUnit);
            setValue('minSalary', recruitment?.minSalary);
            setValue('maxSalary', recruitment?.maxSalary);
        }
    }, [recruitment])

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
                    {salaryDisplayType > 1 && (
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
                {
                    salaryDisplayType === 2 && (
                        <Box sx={{mb: 2, display: 'flex', justifyContent: 'space-between'}}>
                            <div style={{flex: 1, marginRight: 8}}>
                                <InputNumberFormatFilter
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
                                <InputNumberFormatFilter
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