import React from "react";
import {Box, Divider, Drawer, FormControlLabel, IconButton, Stack, Switch, Typography} from "@mui/material";
import {styled} from "@mui/styles";
import Iconify from "@/components/Iconify";
import Content from "@/components/BaseComponents/Content";
import {DeleteIcon} from "@/assets/ActionIcon";

const ActiveSwitch = styled(Switch)(({}) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#388E3C',
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#388E3C',
  },
}));

const OrganizationBottomNav = ({ selecedLength, open, onClose, setShowDelete, ...props }) => {
  return (
      <Drawer
          anchor={'bottom'}
          open={open}
          variant="persistent"
          onClose={onClose}
          {...props}
      >
        <Content>
          <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Stack flexDirection="row" alignItems="center">
              <FormControlLabel control={<ActiveSwitch defaultChecked/>} label="Đang hoạt động"/>
              <FormControlLabel control={<Switch color="default"/>} label="Ngừng hoạt động"/>
              <IconButton
                  size='small'
                  sx={{ color: '#1976D2', mx: 0.5 }}
                  onClick={() => setShowDelete(true)}
              ><DeleteIcon /></IconButton>
            </Stack>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
              <Typography>Đã chọn: {selecedLength}</Typography>
              <Divider orientation="vertical" flexItem sx={{mx: 2, width: '2px', backgroundColor: '#E7E9ED'}}/>
              <IconButton size="medium" onClick={onClose}>
                <Iconify icon="ic:baseline-close"/>
              </IconButton>
            </Box>
          </Box>
        </Content>
      </Drawer>
  )
}

export default React.memo(OrganizationBottomNav);