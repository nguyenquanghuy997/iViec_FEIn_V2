import { DeleteIcon, EditIcon } from "@/assets/ActionIcon";
import Content from "@/components/BaseComponents/Content";
import Iconify from "@/components/Iconify";
import {
  ActionSwitchCheckedIcon,
  ActionSwitchUnCheckedIcon,
} from "@/sections/organization/component/Icon";
import {
  // useGetAllFilterPipelineMutation,
  useGetRoleGroupListQuery,
} from "@/sections/rolegroup";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const RoleContainerBottomNav = ({
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
  status, 
}) => {
  const { data: organization } = useGetRoleGroupListQuery(
    {
      OrganizationId: selectedList[0],
    },
    { skip: selectedList.length !== 1 }
  );

  const handleShowDelete = (node) => {
    setShowDelete(true);
    onGetParentNode(node);
  };
  const handleShowMultipleDelete = () => {
    setShowMultipleDelete(true);
  };

  const handleShowActiveModal = (node) => {
    setIsOpenActive(true);
    setActionTypeActive(status ? 1 : 0);
    onGetParentNode(node);
  };

  const handleOpenFormWithCurrentNode = (node) => {
    onOpenForm();
    setActionType(1);
    onGetParentNode(node);
  };

  return (
    <Drawer
      anchor={"bottom"}
      open={open}
      variant="persistent"
      onClose={onClose}
    >
      <Content>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Stack flexDirection="row" alignItems="center">
            {selectedList.length === 1 && (
              <>
                {status ? (
                  <>
                    <IconButton
                      size="small"
                      sx={{ color: "#1976D2", mx: 0.5 }}
                      onClick={() => handleShowActiveModal(organization)}
                    >
                      <ActionSwitchCheckedIcon />
                    </IconButton>
                    <Typography
                      variant="body2"
                      sx={{ color: "#388E3C", fontSize: 13 }}
                    >
                      Đang hoạt động
                    </Typography>
                  </>
                ) : (
                  <>
                    <IconButton
                      size="small"
                      sx={{ color: "#1976D2", mx: 0.5 }}
                      onClick={() => handleShowActiveModal(organization)}
                    >
                      <ActionSwitchUnCheckedIcon />
                    </IconButton>
                    <Typography
                      variant="body2"
                      sx={{ color: "#5C6A82", fontSize: 13 }}
                    >
                      Dừng hoạt động
                    </Typography>
                  </>
                )}
              </>
            )}
            {selectedList.length > 1 && (
              <>
                {status ? (
                  <>
                    <IconButton
                      size="small"
                      sx={{ color: "#1976D2", mx: 0.5 }}
                      onClick={() => handleShowActiveModal(null)}
                    >
                      <ActionSwitchCheckedIcon />
                    </IconButton>
                    <Typography
                      variant="body2"
                      sx={{ color: "#388E3C", fontSize: 13 }}
                    >
                      Đang hoạt động
                    </Typography>
                  </>
                ) : (
                  <>
                    <IconButton
                      size="small"
                      sx={{ color: "#1976D2", mx: 0.5 }}
                      onClick={() => handleShowActiveModal(null)}
                    >
                      <ActionSwitchUnCheckedIcon />
                    </IconButton>
                    <Typography
                      variant="body2"
                      sx={{ color: "#5C6A82", fontSize: 13 }}
                    >
                      Dừng hoạt động
                    </Typography>
                  </>
                )}
              </>
            )}
            {selectedList.length === 1 && (
              <Box sx={{ ml: 2 }}>
                <IconButton
                  size="small"
                  sx={{ color: "#8A94A5", mx: 1 }}
                  onClick={() => handleOpenFormWithCurrentNode(organization)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{ color: "#1976D2", mx: 1 }}
                  onClick={() => handleShowDelete(organization)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}
            {selectedList.length > 1 && (
              <IconButton
                size="small"
                sx={{ color: "#1976D2", mx: 2 }}
                onClick={handleShowMultipleDelete}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Stack>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography>Đã chọn: {selectedList.length}</Typography>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ mx: 2, width: "2px", backgroundColor: "#E7E9ED" }}
            />
            <IconButton size="medium" onClick={onClose}>
              <Iconify icon="ic:baseline-close" />
            </IconButton>
          </Box>
        </Box>
      </Content>
    </Drawer>
  );
};

export default RoleContainerBottomNav;
