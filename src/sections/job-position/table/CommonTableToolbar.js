import React, {memo} from "react";
import {InputAdornment, Stack, Toolbar} from "@mui/material";
import {FormProvider, RHFTextField} from "@/components/hook-form";
import {ButtonAddStyle, ButtonFilterStyle} from "@/sections/job-position/table/style";
import {FilterIcon} from "@/assets/FilterIcon";
import {SearchIcon} from "@/assets/SearchIcon";
import {styled} from "@mui/styles";
import {AddIcon} from "@/assets/ActionIcon";

const ToolbarStyle = styled(Toolbar)(({}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}));

const CommonTableToolbar = ({methods, onOpenFilterForm}) => {
    return (
        <ToolbarStyle>
            <Stack flexDirection="row" alignItems="center">
                <FormProvider methods={methods}>
                    <RHFTextField
                        name="search"
                        placeholder="Tìm kiếm tên vị trí công việc..."
                        sx={{width: '300px', height: '36px', backgroundColor: '#F2F4F5'}}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start' sx={{ml: 1.5}}>
                                    <SearchIcon/>
                                </InputAdornment>
                            ),
                        }}
                    />
                </FormProvider>
                <ButtonFilterStyle onClick={onOpenFilterForm} startIcon={<FilterIcon/>}>
                    Bộ lọc
                </ButtonFilterStyle>
            </Stack>
            <Stack flexDirection="row" alignItems="center">
                <ButtonAddStyle onClick={onOpenFilterForm} startIcon={<AddIcon />}>
                    Thêm vị trí công việc
                </ButtonAddStyle>
            </Stack>
        </ToolbarStyle>
    )
}

export default memo(CommonTableToolbar);