import { Divider, Drawer, IconButton, Typography } from "@mui/material";
import { BoxFlex } from "@/sections/emailform/style";
import Content from "@/components/BaseComponents/Content";
import CloseIcon from "@/assets/CloseIcon";
import Iconify from "@/components/Iconify";
import { ButtonIcon } from "@/utils/cssStyles";
import React from "react";

const ListQuestionBottomNav = ({ open, onClose, itemSelected, canEdit, onEdit, onDelete }) => {
  return (
    <Drawer anchor={"bottom"} open={open} variant="persistent" onClose={onClose}>
      <Content sx={{ '&.MuiBox-root': { p: '20px 24px' } }}>
        <BoxFlex>
          <BoxFlex justifyContent="flex-start">
            {
              itemSelected.length == 1 && canEdit &&
              <ButtonIcon
                sx={{
                  marginLeft: "16px",
                }}
                onClick={onEdit}
                icon={
                  <Iconify
                    icon={"ri:edit-2-fill"}
                    width={20}
                    height={20}
                    color="#5C6A82"
                  />
                }
              />
            }

            <ButtonIcon
              sx={{
                marginLeft: "16px",
              }}
              onClick={onDelete}
              icon={
                <Iconify
                  icon={"material-symbols:delete-outline-rounded"}
                  width={20}
                  height={20}
                  color="#D32F2F"
                />
              }
            />
          </BoxFlex>
          <BoxFlex justifyContent="flex-end">
            <Typography variant="textSize14500" color="#091E42">Đã chọn: {itemSelected.length ?? 1}</Typography>
            <Divider orientation="vertical" flexItem sx={{ mx: 2, width: "2px", backgroundColor: "#E7E9ED" }} />
            <IconButton size="medium" onClick={onClose} sx={{ backgroundColor: '#F3F4F6', borderRadius: '6px', }}>
              <CloseIcon />
            </IconButton>
          </BoxFlex>
        </BoxFlex>
      </Content>
    </Drawer>
  )
}
export default React.memo(ListQuestionBottomNav);