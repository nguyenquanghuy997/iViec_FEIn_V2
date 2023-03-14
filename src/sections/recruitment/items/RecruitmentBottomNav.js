import { useGetRecruitmentByIdQuery } from "../RecruitmentSlice";
import { DeleteIcon, EditIcon } from "@/assets/ActionIcon";
import Content from "@/components/BaseComponents/Content";
import { ButtonDS } from "@/components/DesignSystem";
import Iconify from "@/components/Iconify";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const RecruitmentBottomNav = ({
  selectedList,
  open,
  onClose,
  setShowDelete,
  setShowMultipleDelete,
  onGetParentNode,
  onOpenForm,
  setActionType,
}) => {
  const { data: organization } = useGetRecruitmentByIdQuery(
    {
      Id: selectedList[0],
    },
    { skip: selectedList.length !== 1 }
  );

  const handleShowDelete = (node) => {
    setShowDelete(true);
    onGetParentNode(node);
  };
  const handleCopy = (node) => {
    setShowDelete(true);
    onGetParentNode(node);
  };
  const handleShowMultipleDelete = () => {
    setShowMultipleDelete(true);
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
            {selectedList.length > 1 && (
              <IconButton
                size="small"
                sx={{ color: "#1976D2", mx: 2 }}
                onClick={handleShowMultipleDelete}
              >
                <DeleteIcon />
              </IconButton>
            )}
            <ButtonDS
              type="submit"
              variant="contained"
              tittle="Đóng tin"
              sx={{
                color: "#455570",
                backgroundColor: "#F3F4F6",
                boxShadow: "none",
                ":hover": {
                  backgroundColor: "#E7E9ED",
                },
                marginRight: "12px",
                textTransform: "none",
                padding: "6px 11px",
              }}
              onClick={handleCopy}
              icon={
                <Iconify
                  icon={"ri:file-copy-fill"}
                  width={20}
                  height={20}
                  color="#5C6A82"
                  mr={1}
                />
              }
            />
            {selectedList.length === 1 && (
              <>
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
                <ButtonDS
                  type="submit"
                  sx={{
                    padding: "8px",
                    minWidth: "unset",
                    backgroundColor: "#fff",
                    boxShadow: "none",
                    ":hover": {
                      backgroundColor: "#EFF3F7",
                    },
                    textTransform: "none",
                    marginLeft: "12px",
                  }}
                  onClick={handleCopy}
                  icon={
                    <Iconify
                      icon={"ri:file-copy-fill"}
                      width={20}
                      height={20}
                      color="#5C6A82"
                    />
                  }
                />
              </>
            )}

            {selectedList.length > 1 && (
              <>
                <IconButton
                  size="small"
                  sx={{ background: "#F3F4F6", color: "#1976D2", mx: 2 }}
                  onClick={handleShowMultipleDelete}
                >
                  <DeleteIcon />
                </IconButton>
              </>
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

export default React.memo(RecruitmentBottomNav);
