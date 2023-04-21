import React from "react";
import { Box, Divider, Drawer, IconButton, Stack, Typography } from "@mui/material";
import Iconify from "@/components/Iconify";
import Content from "@/components/BaseComponents/Content";
import { DeleteIcon, EditIcon } from "@/assets/ActionIcon";
import { ActionSwitchCheckedIcon, ActionSwitchUnCheckedIcon } from "@/sections/organization/component/Icon";
import * as PropTypes from "prop-types";
import useRole from "@/hooks/useRole";
import { useMemo } from "react";
import { PERMISSIONS } from "@/config";

function OfferFormBottomNav(props) {
  let {
    selectedList,
    open,
    onClose,
    setShowDelete,
    setShowMultipleDelete,
    onGetParentNode,
    onOpenForm,
    setActionType,
    setActionTypeActive,
    setIsOpenActive,
    status,      // true if all item select is active = true,
    item,
  } = props;
  const handleShowDelete = (node) => {
    setShowDelete(true);
    onGetParentNode(node);
  }
  const handleShowMultipleDelete = () => {
    setShowMultipleDelete(true);
  }

  const handleShowActiveModal = (node) => {
    setIsOpenActive(true);
    setActionTypeActive(status ? 1 : 0);
    onGetParentNode(node);
  }

  const handleOpenForm = (node) => {
    onOpenForm(node);
    setActionType(1);
    onGetParentNode(node);
  }

  const { canAccess } = useRole();
  const canEdit = useMemo(() => canAccess(PERMISSIONS.CRUD_OFFER_TPL), []);

  return (<Drawer anchor={'bottom'} open={open} variant="persistent" onClose={onClose}>
    <Content>
      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Stack flexDirection="row" alignItems="center">
          {selectedList.length === 1 && <>
            {status ? (<>
              {
                canEdit && <IconButton size='small' sx={{ color: '#1976D2', mx: 0.5 }} onClick={() => handleShowActiveModal(null)}>
                  <ActionSwitchCheckedIcon />
                </IconButton>
              }
              <Typography variant="body2" sx={{ color: '#388E3C', fontSize: 13 }}>Đang hoạt động</Typography>
            </>) : (<>
              {
                canEdit && <IconButton size='small' sx={{ color: '#1976D2', mx: 0.5 }} onClick={() => handleShowActiveModal(null)}>
                  <ActionSwitchUnCheckedIcon />
                </IconButton>
              }
              <Typography variant="body2" sx={{ color: '#5C6A82', fontSize: 13 }}>Không hoạt động</Typography>
            </>)}
          </>}
          {selectedList.length > 1 && <>
            {status ? (<>
              {
                canEdit && <IconButton size='small' sx={{ color: '#1976D2', mx: 0.5 }} onClick={() => handleShowActiveModal(null)}>
                  <ActionSwitchCheckedIcon />
                </IconButton>
              }

              <Typography variant="body2" sx={{ color: '#388E3C', fontSize: 13 }}>Đang hoạt động</Typography>
            </>) : (<>
              {
                canEdit && <IconButton size='small' sx={{ color: '#1976D2', mx: 0.5 }} onClick={() => handleShowActiveModal(null)}>
                  <ActionSwitchUnCheckedIcon />
                </IconButton>
              }
              <Typography variant="body2" sx={{ color: '#5C6A82', fontSize: 13 }}>Không hoạt động</Typography>
            </>)}
          </>}
          {selectedList.length === 1 && canEdit && (<Box sx={{ ml: 2 }}>
            <IconButton size='small' sx={{ color: '#8A94A5', mx: 1 }} onClick={() => handleOpenForm(item)}>
              <EditIcon />
            </IconButton>
            <IconButton size='small' sx={{ color: '#1976D2', mx: 1 }} onClick={() => handleShowDelete(item)}>
              <DeleteIcon />
            </IconButton>
          </Box>)}
          {selectedList.length > 1 && canEdit &&
            <IconButton size='small' sx={{ color: '#1976D2', mx: 2 }} onClick={handleShowMultipleDelete}>
              <DeleteIcon />
            </IconButton>}
        </Stack>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ fontSize: '14px', fontWeight: 500}} >Đã chọn: {selectedList.length}</Typography>
          <Divider orientation="vertical" flexItem sx={{ mx: 2, width: '2px', backgroundColor: '#E7E9ED' }} />
          <IconButton size="medium" onClick={onClose}>
            <Iconify icon="ic:baseline-close" />
          </IconButton>
        </Box>
      </Box>
    </Content>
  </Drawer>)
}

OfferFormBottomNav.propTypes = {
  selectedList: PropTypes.any,
  open: PropTypes.any,
  onClose: PropTypes.any,
  setShowDelete: PropTypes.any,
  setShowMultipleDelete: PropTypes.any,
  onGetParentNode: PropTypes.any,
  onOpenForm: PropTypes.any,
  setActionType: PropTypes.any,
  setActionTypeActive: PropTypes.any,
  setIsOpenActive: PropTypes.any,
  status: PropTypes.any,
  item: PropTypes.any
}

export default React.memo(OfferFormBottomNav);