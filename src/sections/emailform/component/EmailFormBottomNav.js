import { DeleteIcon, EditIcon } from "@/assets/ActionIcon";
import ConfirmModal from "@/components/BaseComponents/ConfirmModal";
import Content from "@/components/BaseComponents/Content";
import Iconify from "@/components/Iconify";
import { PERMISSIONS } from "@/config";
import useRole from "@/hooks/useRole";
import {
  ActionSwitchCheckedIcon,
  ActionSwitchUnCheckedIcon,
  AlertIcon,
} from "@/sections/organization/component/Icon";
import { STYLE_CONSTANT as style } from "@/theme/palette";
import { BottomNavStyle, ButtonIcon } from "@/utils/cssStyles";
import {
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import * as PropTypes from "prop-types";
import React, { useMemo, useState } from "react";

function EmailFormBottomNav(props) {
  let {
    selectedList,
    open,
    onClose,
    onDelete,
    onGetParentNode,
    onOpenForm,
    setActionType,
    setActionTypeActive,
    setIsOpenActive,
    status, // true if all item select is active = true,
  } = props;
  const theme = useTheme();
  const [openDelete, setOpenDelete] = useState(false);
  const handleDeleteSubmit = () => {
    let ids = selectedList.map((item) => item.id);
    onDelete(ids);
    onClose(true);
  };
  const handleShowActiveModal = (node) => {
    setIsOpenActive(true);
    setActionTypeActive(status ? 1 : 0);
    onGetParentNode(node);
  };

  const handleOpenForm = (node) => {
    onOpenForm(node);
    setActionType(1);
    onGetParentNode(node);
  };

  const { canAccess } = useRole();
  const canEdit = useMemo(() => canAccess(PERMISSIONS.CRUD_EMAIL), []);

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
                    {canEdit && (
                      <IconButton
                        size="small"
                        sx={{
                          background: "unset !important",
                          padding: 0,
                          color: "#1976D2",
                          mx: 0.5,
                        }}
                        onClick={() => handleShowActiveModal(selectedList[0])}
                      >
                        <ActionSwitchCheckedIcon />
                      </IconButton>
                    )}
                    <Typography
                      variant="body2"
                      sx={{ color: "#388E3C", fontSize: 13 }}
                    >
                      Đang hoạt động
                    </Typography>
                  </>
                ) : (
                  <>
                    {canEdit && (
                      <IconButton
                        size="small"
                        sx={{
                          background: "unset !important",
                          padding: 0,
                          color: "#1976D2",
                          mx: 0.5,
                        }}
                        onClick={() => handleShowActiveModal(selectedList[0])}
                      >
                        <ActionSwitchUnCheckedIcon />
                      </IconButton>
                    )}
                    <Typography
                      variant="body2"
                      sx={{ color: "#5C6A82", fontSize: 13 }}
                    >
                      Không hoạt động
                    </Typography>
                  </>
                )}
              </>
            )}
            {selectedList.length === 1 && canEdit && (
              <Box sx={{ ml: 2,  display: "flex" }}>
                <ButtonIcon
                  tooltip="Sửa"
                  icon={<EditIcon />}
                  size="small"
                  sx={{ color: theme.palette.common.borderObject, mx: 1 }}
                  onClick={() => handleOpenForm(selectedList[0])}
                ></ButtonIcon>
                <ButtonIcon
                  tooltip="Xóa"
                  icon={<DeleteIcon />}
                  size="small"
                  sx={{ color: theme.palette.common.borderObject, mx: 1 }}
                  onClick={() => setOpenDelete(true)}
                ></ButtonIcon>
              </Box>
            )}
            {selectedList.length > 1 && canEdit && (
              <ButtonIcon
                tooltip="Xóa"
                icon={<DeleteIcon />}
                size="small"
                sx={{ color: theme.palette.common.borderObject, mx: 2 }}
                onClick={() => setOpenDelete(true)}
              ></ButtonIcon>
            )}
          </Stack>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
              Đã chọn: {selectedList.length}
            </Typography>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ mx: 2, width: "2px", backgroundColor: "#E7E9ED" }}
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
      {openDelete && (
        <ConfirmModal
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          icon={<AlertIcon />}
          title={
            <Typography
              sx={{
                textAlign: "center",
                width: "100%",
                fontSize: style.FONT_BASE,
                fontWeight: style.FONT_SEMI_BOLD,
                color: style.COLOR_TEXT_DANGER,
                marginTop: 2,
              }}
            >
              Xác nhận xóa ứng viên
            </Typography>
          }
          subtitle={
            selectedList.length > 1 ? (
              <>
                Bạn có chắc chắn muốn xóa{" "}
                <span className="subtitle-confirm-name">
                  {selectedList.length} mẫu email
                </span>{" "}
                này??
              </>
            ) : (
              <>
                Bạn có chắc chắn muốn xóa mẫu email
                <span className="subtitle-confirm-name">
                  {selectedList[0]?.name}
                </span>{" "}
                ?
              </>
            )
          }
          data={selectedList}
          onSubmit={handleDeleteSubmit}
          btnCancelProps={{
            title: "Hủy",
          }}
          btnConfirmProps={{
            title: "Xóa",
          }}
        />
      )}
    </BottomNavStyle>
  );
}

EmailFormBottomNav.propTypes = {
  selectedList: PropTypes.any,
  open: PropTypes.any,
  onClose: PropTypes.any,
  onDelete: PropTypes.any,
  onGetParentNode: PropTypes.any,
  onOpenForm: PropTypes.any,
  setActionType: PropTypes.any,
  setActionTypeActive: PropTypes.any,
  setIsOpenActive: PropTypes.any,
  status: PropTypes.any,
};

export default React.memo(EmailFormBottomNav);
