import React from "react";
import {Box, Divider, Drawer, IconButton, Stack, Typography} from "@mui/material";
import Iconify from "@/components/Iconify";
import Content from "@/components/BaseComponents/Content";
import {DeleteIcon, EditIcon} from "@/assets/ActionIcon";
import {ActionSwitchCheckedIcon, ActionSwitchUnCheckedIcon} from "@/sections/organization/component/Icon";

function OrganizationUserBottomNav(props) {
  const {
    selectedList,
    open,
    onClose,
    onOpenForm,
    onOpenActive,
    status,
    item,
  } = props;

  const handleShowActiveModal = () => {
    onOpenActive();
  }

  const handleOpenForm = (node) => {
    onOpenForm(node);
  }

  return (<Drawer anchor={'bottom'} open={open} variant="persistent" onClose={onClose}>
    <Content>
      <Box sx={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <Stack flexDirection="row" alignItems="center">
          {selectedList === 1 && <>
            {status ? (<>
              <IconButton size='small' sx={{color: '#1976D2', mx: 0.5}} onClick={() => handleShowActiveModal(null)}>
                <ActionSwitchCheckedIcon/>
              </IconButton>
              <Typography variant="body2" sx={{color: '#388E3C', fontSize: 13}}>Đang hoạt động</Typography>
            </>) : (<>
              <IconButton size='small' sx={{color: '#1976D2', mx: 0.5}} onClick={() => handleShowActiveModal(null)}>
                <ActionSwitchUnCheckedIcon/>
              </IconButton>
              <Typography variant="body2" sx={{color: '#5C6A82', fontSize: 13}}>Dừng hoạt động</Typography>
            </>)}
          </>}
          {selectedList > 1 && <>
            {status ? (<>
              <IconButton size='small' sx={{color: '#1976D2', mx: 0.5}} onClick={() => handleShowActiveModal(item)}>
                <ActionSwitchCheckedIcon/>
              </IconButton>
              <Typography variant="body2" sx={{color: '#388E3C', fontSize: 13}}>Đang hoạt động</Typography>
            </>) : (<>
              <IconButton size='small' sx={{color: '#1976D2', mx: 0.5}} onClick={() => handleShowActiveModal(item)}>
                <ActionSwitchUnCheckedIcon/>
              </IconButton>
              <Typography variant="body2" sx={{color: '#5C6A82', fontSize: 13}}>Dừng hoạt động</Typography>
            </>)}
          </>}
          {selectedList === 1 && (<Box sx={{ml: 2}}>
            <IconButton size='small' sx={{color: '#8A94A5', mx: 1}} onClick={() => handleOpenForm(item)}>
              <EditIcon/>
            </IconButton>
            <IconButton size='small' sx={{color: '#1976D2', mx: 1}}>
              <DeleteIcon/>
            </IconButton>
          </Box>)}
          {selectedList > 1 &&
              <IconButton size='small' sx={{color: '#1976D2', mx: 2}}>
                <DeleteIcon/>
              </IconButton>}
        </Stack>
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <Typography>Đã chọn: {selectedList}</Typography>
          <Divider orientation="vertical" flexItem sx={{mx: 2, width: '2px', backgroundColor: '#E7E9ED'}}/>
          <IconButton size="medium" onClick={onClose}>
            <Iconify icon="ic:baseline-close"/>
          </IconButton>
        </Box>
      </Box>
    </Content>
  </Drawer>)
}

export default React.memo(OrganizationUserBottomNav);