import { useGetPipelineByIdQuery } from "../PipelineFormSlice";
import PipelineActiveModal from "../modals/PipelineActiveModal";
import Content from "@/components/BaseComponents/Content";
import Iconify from "@/components/Iconify";
import {
  ActionSwitchCheckedIcon,
  ActionSwitchUnCheckedIcon,
} from "@/sections/organization/component/Icon";
import { ButtonIcon } from "@/utils/cssStyles";
import {
  Box,
  Divider,
  Drawer,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { checkSameValue } from "@/utils/formatString";
import PipelineDeleteModal from "../modals/PipelineDeleteModal";
import { PipelineFormModal } from "../modals";

const PipelineBottomNav = ({
  open,
  onClose,
  itemSelected,
  setItemSelected,
  setselectedList
}) => {
  const [showConfirmMultiple, setShowConfirmMultiple] = useState(false);
  const [typeConfirmMultiple, setTypeConfirmMultiple] = useState("");

  const onCloseModel = () => {
    setShowConfirmMultiple(false);
    setItemSelected([]);
    setselectedList([]);
  };

  const { data: pipeline } = useGetPipelineByIdQuery(
    {
      Id: itemSelected[0]?.id,
    },
    { skip: itemSelected.length !== 1 }
  );

  const handleShowConfirmMultiple = (type) => {
    setTypeConfirmMultiple(type);
    setShowConfirmMultiple(true);
  };
  let item = itemSelected.map((p) => p.isActivated);
  let ids = itemSelected.map((p) => p.id);
  let itemApply = itemSelected.map((p) => p.recruitmentAppliedCount);
  function checkSameApply(arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] > 0 ) {
          return false;
        }
      }
    return true;
  }
  return (
    <Drawer
      anchor={"bottom"}
      open={open}
      variant="persistent"
      onClose={onClose}
    >
      <Content sx={{ padding: "20px 24px" }}>
        <Box
          sx={{
            width: "100%",
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
                    <ButtonIcon
                      onClick={() => handleShowConfirmMultiple("status")}
                      sx={{
                        backgroundColor: "unset !important",
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
                      sx={{ color: "#5C6A82", fontSize: 13 }}
                    >
                      Không hoạt động
                    </Typography>
                  </>
                )}
              </>
            )}
             {itemSelected.length === 1 && itemSelected[0]?.recruitmentAppliedCount == 0 && (
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
                    color="#5C6A82"
                  />
                }
              />
            )}
            {checkSameApply(itemApply) && (
              <ButtonIcon
                sx={{
                  marginLeft: "16px",
                }}
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
          </Stack>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
              Đã chọn: {itemSelected.length}
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
                  color="#5C6A82"
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
      {showConfirmMultiple && typeConfirmMultiple.includes("edit") && (
        <PipelineFormModal
          show={showConfirmMultiple}
          setShow={setShowConfirmMultiple}
          onClose={onCloseModel}
          data={pipeline}
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
    </Drawer>
  );
};

export default React.memo(PipelineBottomNav);
