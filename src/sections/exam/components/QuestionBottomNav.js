import { DeleteIcon, EditIcon } from "@/assets/ActionIcon";
import Content from "@/components/BaseComponents/Content";
import Iconify from "@/components/Iconify";
import {
  ActionSwitchCheckedIcon,
  ActionSwitchUnCheckedIcon,
} from "@/sections/organization/component/Icon";
import { CopyIcon } from "@/sections/recruitment/others/Icon";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import {useTheme} from "@mui/material/styles";

export default ({
  list,
  listSelected,
  setListSelected,
  setShowForm,
  setShowConfirmDelete,
  setShowConfirmSwitchActive,
  setShowTransferQuestionGroup,
  setShowCopyQuestion
}) => {
  const firstActiveStatus = list.find(
    (i) => i.id === listSelected[0]
  )?.isActive;
const  theme = useTheme();
  const showSwitchActive = !list.some(
    (i) => listSelected.includes(i.id) && i.isActive !== firstActiveStatus
  );
  const showEdit = listSelected.length === 1;

  const onClose = () => {
    setListSelected([]);
  };

  return (
    <Drawer
      anchor={"bottom"}
      open={listSelected.length > 0}
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
            padding: '20px 24px !important'
          }}
        >
          <Stack flexDirection="row" alignItems="center">
            {showSwitchActive && (
              <>
                <IconButton
                  size="small"
                  sx={{ color: theme.palette.common.blue200, mx: 0.5 }}
                  onClick={() => setShowConfirmSwitchActive(true)}
                >
                  {firstActiveStatus ? (
                    <ActionSwitchCheckedIcon />
                  ) : (
                    <ActionSwitchUnCheckedIcon />
                  )}
                </IconButton>
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

            <Box sx={{ ml: 2 }}>
              {showEdit && (
                <IconButton
                  size="small"
                  sx={{ color: theme.palette.common.neutral500, mx: 1 }}
                  onClick={() => setShowForm(true)}
                >
                  <EditIcon />
                </IconButton>
              )}

              <IconButton
                size="small"
                sx={{ color: theme.palette.common.neutral500, mx: 1 }}
                onClick={() => setShowTransferQuestionGroup()}
              >
                <Iconify
                  icon={"ri:share-forward-2-fill"}
                  width={20}
                  height={20}
                  color={theme.palette.common.borderObject}
                />
              </IconButton>

              {
                showEdit && <IconButton
                  size="small"
                  sx={{ color: "#5C6A82", mx: 1 }}
                  onClick={() => setShowCopyQuestion()}
                >
                  <CopyIcon />
                </IconButton>
              }

              <IconButton
                size="small"
                sx={{ color: theme.palette.common.blue700, mx: 1 }}
                onClick={() => setShowConfirmDelete(true)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Stack>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography>Đã chọn: {listSelected.length}</Typography>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ mx: 2, width: "2px", backgroundColor: theme.palette.common.neutral100 }}
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
