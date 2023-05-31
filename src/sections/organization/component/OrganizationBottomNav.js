import { DeleteIcon, EditIcon } from "@/assets/ActionIcon";
import Content from "@/components/BaseComponents/Content";
import Iconify from "@/components/Iconify";
import { useGetOrganizationByIdQuery } from "@/sections/organization/OrganizationSlice";
import {
  ActionSwitchCheckedIcon,
  ActionSwitchUnCheckedIcon,
} from "@/sections/organization/component/Icon";
import { BottomNavStyle, ButtonIcon } from "@/utils/cssStyles";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";

const OrganizationBottomNav = ({
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
  status, // true if all organization select is active
}) => {
  const { data: organization } = useGetOrganizationByIdQuery(
    {
      OrganizationId: selectedList[0],
    },
    { skip: selectedList.length !== 1 }
  );
  const theme = useTheme();
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
    <BottomNavStyle
      anchor={"bottom"}
      open={open}
      variant="persistent"
      onClose={onClose}
    >
      <Content className="block-bottom">
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
                      disableRipple
                      size="small"
                      sx={{
                        padding: 0,
                        backgroundColor: "unset !important",
                        color: theme.palette.common.blue700,
                        mx: 0.5,
                      }}
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
                      disableRipple
                      size="small"
                      sx={{
                        padding: 0,
                        backgroundColor: "unset !important",
                        color: theme.palette.common.blue700,
                        mx: 0.5,
                      }}
                      onClick={() => handleShowActiveModal(organization)}
                    >
                      <ActionSwitchUnCheckedIcon />
                    </IconButton>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.common.borderObject,
                        fontSize: 13,
                      }}
                    >
                      Không hoạt động
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
                      disableRipple
                      size="small"
                      sx={{ color: theme.palette.common.blue700, mx: 0.5 }}
                      onClick={() => handleShowActiveModal(null)}
                    >
                      <ActionSwitchCheckedIcon />
                    </IconButton>
                    <Typography
                      variant="body2"
                      sx={{
                        padding: 0,
                        backgroundColor: "unset !important",
                        color: "#388E3C",
                        fontSize: 13,
                      }}
                    >
                      Đang hoạt động
                    </Typography>
                  </>
                ) : (
                  <>
                    <IconButton
                      disableRipple
                      size="small"
                      sx={{
                        padding: 0,
                        backgroundColor: "unset !important",
                        color: theme.palette.common.blue700,
                        mx: 0.5,
                      }}
                      onClick={() => handleShowActiveModal(null)}
                    >
                      <ActionSwitchUnCheckedIcon />
                    </IconButton>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.common.borderObject,
                        fontSize: 13,
                      }}
                    >
                      Không hoạt động
                    </Typography>
                  </>
                )}
              </>
            )}
            {selectedList.length === 1 && (
              <Box sx={{ ml: 2, display: "flex" }}>
                <ButtonIcon
                  sx={{ color: theme.palette.common.blue700, mx: 1 }}
                  tooltip="Sửa"
                  onClick={() => handleOpenFormWithCurrentNode(organization)}
                  icon={<EditIcon />}
                />
                <ButtonIcon
                  sx={{ color: theme.palette.common.blue700, mx: 1 }}
                  tooltip="Xóa"
                  onClick={() => handleShowDelete(organization)}
                  icon={<DeleteIcon />}
                />
              </Box>
            )}
            {selectedList.length > 1 && (
              <ButtonIcon
                sx={{ color: theme.palette.common.blue700, mx: 2 }}
                tooltip="Xóa"
                onClick={handleShowMultipleDelete}
                icon={<DeleteIcon />}
              />
            )}
          </Stack>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
              Đã chọn: {selectedList.length}
            </Typography>
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                mx: 2,
                width: "2px",
                backgroundColor: theme.palette.common.neutral100,
              }}
            />
            <ButtonIcon
              sx={{
                textTransform: "none",
              }}
              onClick={onClose}
              icon={
                <Iconify
                  icon={"ic:baseline-close"}
                  width={20}
                  height={20}
                  color={theme.palette.common.borderObject}
                />
              }
            />
          </Box>
        </Box>
      </Content>
    </BottomNavStyle>
  );
};

export default React.memo(OrganizationBottomNav);
