import React, {memo} from 'react';
import {IconButton, Stack} from "@mui/material";
import {SettingLogo} from "@/assets/SettingIcon";
import {BoxHeaderWrapperStyle, TitleStyle} from "@/sections/job-position/style";
import ChipDS from "@/components/DesignSystem/ChipDS";

const JobPositionHeader = () => {
    return (
        <BoxHeaderWrapperStyle>
            <Stack flexDirection="row" justifyConent="flex-start" alignItems="center">
                <IconButton sx={{padding: 0}}>
                    <SettingLogo/>
                </IconButton>
                <TitleStyle>DANH SÁCH VỊ TRÍ CÔNG VIỆC</TitleStyle>
                <ChipDS label={115} sx={{ml: 1, color: '#455570', height: 28}}/>
            </Stack>
        </BoxHeaderWrapperStyle>
    )
}

export default memo(JobPositionHeader);