import { PipelineFormModal } from "../modals";
import PipelineActiveModal from "../modals/PipelineActiveModal";
import PipelineDeleteModal from "../modals/PipelineDeleteModal";
import { PipelineViewModal } from "../modals/PipelineViewModal";
import Content from "@/components/BaseComponents/Content";
import Iconify from "@/components/Iconify";
import { PERMISSIONS } from "@/config";
import useRole from "@/hooks/useRole";
import {
  ActionSwitchCheckedIcon,
  ActionSwitchUnCheckedIcon,
} from "@/sections/organization/component/Icon";
import { useGetPipelineByIdQuery } from "@/sections/pipeline";
import { BottomNavStyle, ButtonIcon } from "@/utils/cssStyles";
import { checkSameValue } from "@/utils/formatString";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useMemo, useState } from "react";

const PipelineBottomNav = ({
  open,
  onClose,
  itemSelected,
  setItemSelected,
  setselectedList,
}) => {
  const theme = useTheme();
  const { canAccess } = useRole();

  const canEdit = useMemo(
    () => canAccess(PERMISSIONS.CRUD_RECRUIT_PROCESS),
    []
  );

  const { data: pipeline } = useGetPipelineByIdQuery(
    { Id: itemSelected[0]?.id },
    { skip: itemSelected.length !== 1 }
  );

  const [showConfirmMultiple, setShowConfirmMultiple] = useState(false);
  const [typeConfirmMultiple, setTypeConfirmMultiple] = useState("");

  const onCloseModel = () => {
    setShowConfirmMultiple(false);
    setItemSelected([]);
    setselectedList([]);
  };

  const handleShowConfirmMultiple = (type) => {
    setTypeConfirmMultiple(type);
    setShowConfirmMultiple(true);
  };

  const checkSameApply = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > 0) {
        return false;
      }
    }
    return true;
  };

  const item = itemSelected.map((p) => p.isActivated);
  const isDefault = itemSelected.map((p) => p.isDefault);
  const ids = itemSelected.map((p) => p.id);
  const itemApply = itemSelected.map((p) => p.recruitmentAppliedCount);

  const enableEdit =
    itemSelected.length === 1 &&
    itemSelected[0]?.recruitmentAppliedCount === 0 &&
    canEdit;

  const enableDelete = checkSameApply(itemApply) && canEdit;

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
            {itemSelected[0]?.isDefault === false && checkSameValue(isDefault) && (
              <>
                {checkSameValue(item) && (
                  <>
                    {item.includes(true) ? (
                      <>
                        <ButtonIcon
                          onClick={() => handleShowConfirmMultiple("status")}
                          sx={{
                            backgroundColor: "unset !important",
                            padding: 0
                          }}
                          icon={<ActionSwitchCheckedIcon />}
                        />
                        <Typography
                          variant="body2"
                          sx={{ color: "#388E3C", fontSize: 13 }}
                        >
                          Đang hoạt động
                        </Typography>
                      </>
                    ) : (
                      <>
                        <ButtonIcon
                          onClick={() => handleShowConfirmMultiple("status")}
                          sx={{
                            backgroundColor: "unset !important",
                          }}
                          icon={<ActionSwitchUnCheckedIcon />}
                        />
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
                {itemSelected.length === 1 && (
                  <ButtonIcon
                    sx={{
                      marginLeft: "16px",
                    }}
                    tooltip="Xem"
                    onClick={() => handleShowConfirmMultiple("view")}
                    icon={
                      <Iconify
                        icon={"ri:eye-2-line"}
                        width={20}
                        height={20}
                        color={theme.palette.common.borderObject}
                      />
                    }
                  />
                )}
                {enableEdit && (
                  <ButtonIcon
                    sx={{
                      marginLeft: "16px",
                    }}
                    tooltip="Sửa"
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
                {enableDelete && (
                  <ButtonIcon
                    sx={{
                      marginLeft: "16px",
                    }}
                    tooltip="Xóa"
                    onClick={() => handleShowConfirmMultiple("delete")}
                    icon={
                      <Iconify
                        icon={"material-symbols:delete-outline-rounded"}
                        width={20}
                        height={20}
                        color="#D32F2F"
                      />
                    }
                  />
                )}
              </>
            )}
          </Stack>
          <Box
            sx={{ marginLeft: "16px", display: "flex", alignItems: "center" }}
          >
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
              Đã chọn: {itemSelected.length}
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
      {showConfirmMultiple && typeConfirmMultiple.includes("status") && (
        <PipelineActiveModal
          showConfirmMultiple={showConfirmMultiple}
          setShowConfirmMultiple={setShowConfirmMultiple}
          ids={ids}
          onClose={onCloseModel}
          isActivated={item[0]}
        />
      )}
      {showConfirmMultiple && typeConfirmMultiple.includes("view") && (
        <PipelineViewModal
          data={pipeline}
          show={showConfirmMultiple}
          onPressEdit={
            enableEdit ? () => handleShowConfirmMultiple("edit") : undefined
          }
          onPressDelete={
            enableDelete ? () => handleShowConfirmMultiple("delete") : undefined
          }
          onClose={onCloseModel}
          setShow={setShowConfirmMultiple}
        />
      )}
      {showConfirmMultiple && typeConfirmMultiple.includes("edit") && (
        <PipelineFormModal
          data={itemSelected[0]}
          show={showConfirmMultiple}
          setShow={setShowConfirmMultiple}
          onClose={onCloseModel}
        />
      )}
      {showConfirmMultiple && typeConfirmMultiple.includes("delete") && (
        <PipelineDeleteModal
          showConfirmMultiple={showConfirmMultiple}
          setShowConfirmMultiple={setShowConfirmMultiple}
          selectedListIds={ids}
          onClose={onCloseModel}
          isActivated={pipeline?.isActivated}
        />
      )}
    </BottomNavStyle>
  );
};

export default React.memo(PipelineBottomNav);
