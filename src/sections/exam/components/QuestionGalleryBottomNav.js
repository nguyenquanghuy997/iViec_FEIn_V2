import { DeleteIcon, EditIcon } from "@/assets/ActionIcon";
import Content from "@/components/BaseComponents/Content";
import Iconify from "@/components/Iconify";
import {
  ActionSwitchCheckedIcon,
  ActionSwitchUnCheckedIcon,
} from "@/sections/organization/component/Icon";
import { BottomNavStyle, ButtonIcon } from "@/utils/cssStyles";
import {
  Box,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default ({
  list,
  listSelected,
  setListSelected,
  setShowForm,
  setShowConfirmDelete,
  setShowConfirmSwitchActive,
}) => {
  const firstActiveStatus = list.find(
    (i) => i.id === listSelected[0]
  )?.isActive;
  const theme = useTheme();
  const showSwitchActive = !list.some(
    (i) => listSelected.includes(i.id) && i.isActive !== firstActiveStatus
  );
  const showEdit = listSelected.length === 1;

  const onClose = () => {
    setListSelected([]);
  };

  return (
    <BottomNavStyle
      anchor={"bottom"}
      open={listSelected.length > 0}
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
            {showSwitchActive && (
              <>
                <ButtonIcon
                  size="small"
                  sx={{backgroundColor: "unset !important", color: theme.palette.common.blue700, mx: 0.5, padding: 0 }}
                  onClick={() => setShowConfirmSwitchActive(true)}
                  icon={firstActiveStatus ? (
                    <ActionSwitchCheckedIcon />
                  ) : (
                    <ActionSwitchUnCheckedIcon />
                  )}
                >
                </ButtonIcon>
                <Typography
                  variant="body2"
                  sx={{
                    color: firstActiveStatus ? "#388E3C" : theme.palette.common.borderObject,
                    fontSize: 13,
                  }}
                >
                  {firstActiveStatus ? "Đang hoạt động" : "Ngừng hoạt động"}
                </Typography>
              </>
            )}
            <Box sx={{ display: 'flex', flexDirection: 'row', ml: 2 }}>
              {showEdit && (
                <ButtonIcon
                  tooltip='Sửa'
                  icon={<EditIcon />}
                  size="small"
                  sx={{ color: theme.palette.common.neutral500, mx: 1 }}
                  onClick={() => setShowForm(true)}
                >
                </ButtonIcon>
              )}
              <ButtonIcon
                tooltip='Xóa'
                icon={<DeleteIcon />}
                size="small"
                sx={{ color: theme.palette.common.blue700, mx: 1 }}
                onClick={() => setShowConfirmDelete(true)}
              >
              </ButtonIcon>
            </Box>
          </Stack>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
              Đã chọn: {listSelected.length}
            </Typography>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ mx: 2, width: "2px", backgroundColor: theme.palette.common.neutral100 }}
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
