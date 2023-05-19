import { PERMISSIONS } from "@/config";
import Content from "@/components/BaseComponents/Content";
import Iconify from "@/components/Iconify";
import useRole from "@/hooks/useRole";
import { ActionSwitchCheckedIcon, ActionSwitchUnCheckedIcon, } from "@/sections/organization/component/Icon";
import { ButtonIcon } from "@/utils/cssStyles";
import { checkSameValue } from "@/utils/formatString";
import { Box, Divider, Drawer, Stack, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { NotificationFormModal } from "@/sections/notification/component/notificationFormModal";
import NotifcationActiveModal from "@/sections/notification/component/notificationActiveModal";

const NotificationBottomNav = ({
  selectedList,
  open,
  onClose,
  setselectedList,
  itemSelected,
  setItemSelected
}) => {
  const [showConfirmMultiple, setShowConfirmMultiple] = useState(false);
  const [typeConfirmMultiple, setTypeConfirmMultiple] = useState("");
  const theme = useTheme();
  const onCloseModel = () => {
    setShowConfirmMultiple(false);
    setselectedList([]);
    setItemSelected([]);
  };
  
  const {canAccess} = useRole();
  const canEdit = useMemo(() => canAccess(PERMISSIONS.CRUD_JOB_POS), []);
  
  const handleShowConfirmMultiple = (type) => {
    setTypeConfirmMultiple(type);
    setShowConfirmMultiple(true);
  };
  
  let item = itemSelected.map((p) => p.isActive);
  
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
            padding: "12px 0 !important",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Stack flexDirection="row" alignItems="center">
            {checkSameValue(item) && (
              <>
                {item.includes(true) ? (
                  <>
                    {
                      canEdit && <ButtonIcon
                        onClick={() => handleShowConfirmMultiple("status")}
                        sx={{
                          backgroundColor: "unset !important",
                        }}
                        icon={<ActionSwitchCheckedIcon/>}
                      />
                    }
                    
                    <Typography
                      variant="body2"
                      sx={{color: "#388E3C", fontSize: 13}}
                    >
                      Đang hoạt động
                    </Typography>
                  </>
                ) : (
                  <>
                    {
                      canEdit && <ButtonIcon
                        onClick={() => handleShowConfirmMultiple("status")}
                        sx={{
                          backgroundColor: "unset !important",
                        }}
                        icon={<ActionSwitchUnCheckedIcon/>}
                      />
                    }
                    
                    <Typography
                      variant="body2"
                      sx={{color: theme.palette.common.borderObject, fontSize: 13}}
                    >
                      Không hoạt động
                    </Typography>
                  </>
                )}
              </>
            )}
            {itemSelected.length === 1 && canEdit && (
              <ButtonIcon
                sx={{
                  marginLeft: "16px",
                }}
                onClick={() => handleShowConfirmMultiple("edit")}
                icon={
                  <Iconify
                    icon={"ri:edit-2-fill"}
                    width={20}
                    height={20}
                    color={theme.palette.common.borderObject}
                  />
                }
              />
            )}
          </Stack>
          <Box sx={{display: "flex", alignItems: "center"}}>
            <Typography sx={{fontSize: 14, fontWeight: 600}}>
              Đã chọn: {selectedList.length}
            </Typography>
            <Divider
              orientation="vertical"
              flexItem
              sx={{mx: 2, width: "2px", backgroundColor: theme.palette.common.neutral100}}
            />
            <ButtonIcon
              sx={{
                textTransform: "none",
                backgroundColor: theme.palette.common.neutral50,
                '&:hover': {
                  backgroundColor: theme.palette.common.neutral100,
                }
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
      {showConfirmMultiple && typeConfirmMultiple.includes("status") && (
        <NotifcationActiveModal
          showConfirmMultiple={showConfirmMultiple}
          setShowConfirmMultiple={setShowConfirmMultiple}
          ids={selectedList}
          onClose={onCloseModel}
          isActivated={item[0]}
        />
      )}
      {showConfirmMultiple && typeConfirmMultiple.includes("edit") && (
        <NotificationFormModal
          show={showConfirmMultiple}
          setShow={setShowConfirmMultiple}
          onClose={onCloseModel}
          data={{id: selectedList[0]}}
        />
      )}
    </Drawer>
  );
};

export default React.memo(NotificationBottomNav);
