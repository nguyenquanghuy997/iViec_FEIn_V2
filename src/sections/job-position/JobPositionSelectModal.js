import React from 'react'
import {Box, Divider, FormControlLabel, IconButton, Stack, Switch, Typography} from "@mui/material";
import {styled} from "@mui/styles";
import {CancelIcon} from "@/assets/ActionIcon";

const ActiveSwitch = styled(Switch)(({}) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
        color: '#388E3C',
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: '#388E3C',
    },
}));

const JobPositionSelectModal = () => {
    return (
        <Box>
            <Stack flexDirection="row" alignItems="center">
                <FormControlLabel control={<ActiveSwitch defaultChecked/>} label="Đang hoạt động"/>
                <FormControlLabel control={<Switch color="default"/>} label="Ngừng hoạt động"/>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Typography>Đã chọn: 1</Typography>
                    <Divider orientation="vertical" flexItem sx={{mx: 2, width: '2px', backgroundColor: '#E7E9ED'}}/>
                    <IconButton size="large">
                        <CancelIcon/>
                    </IconButton>
                </Box>
            </Stack>
        </Box>
    )
}

export default React.memo(JobPositionSelectModal);