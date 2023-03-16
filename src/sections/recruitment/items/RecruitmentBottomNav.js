import { useGetRecruitmentByIdQuery } from "../RecruitmentSlice";
import RecruitmentConfirmMultipleModal from "../modals/RecruitmentConfirmMultipleModal";
import { DeleteIcon, EditIcon } from "@/assets/ActionIcon";
import Content from "@/components/BaseComponents/Content";
import { ButtonDS } from "@/components/DesignSystem";
import Iconify from "@/components/Iconify";
import { DivProcessStatus } from "@/utils/enum";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const RecruitmentBottomNav = ({ selectedList, open, onClose, onOpenForm }) => {
  const { data: organization } = useGetRecruitmentByIdQuery(
    {
      Id: selectedList[0],
    },
    { skip: selectedList.length !== 1 }
  );
  const [showConfirmMultiple, setShowConfirmMultiple] = useState(false);
  const [, setTypeConfirmMultiple] = useState("");
  const handleShowConfirmMultiple = (type) => {
    setTypeConfirmMultiple(type);
    setShowConfirmMultiple(true);
  };

  const handleOpenFormWithCurrentNode = () => {
    onOpenForm();
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
                <div style={{ fontWeight: 500, fontSize: 14, marginRight: 16 }}>
                  {DivProcessStatus(organization?.processStatus)}
                </div>
                <ButtonDS
                  type="submit"
                  variant="contained"
                  tittle="Chi tiết"
                  sx={{
                    marginRight: "16px",
                    textTransform: "none",
                    padding: "6px 11px",
                  }}
                  href={"recruitment/" + organization?.id}
                  icon={
                    <Iconify
                      icon={
                        "material-symbols:arrow-circle-right-outline-rounded"
                      }
                      width={20}
                      height={20}
                      color="#FDFDFD"
                      mr={1}
                    />
                  }
                />
                <ButtonDS
                  type="submit"
                  variant="contained"
                  tittle="Xem tin tuyển dụng"
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
                  onClick={() => handleShowConfirmMultiple("CloseRecruitment")}
                  icon={
                    <Iconify
                      icon={"ri:share-box-line"}
                      width={20}
                      height={20}
                      color="#5C6A82"
                      mr={1}
                    />
                  }
                />
              </>
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
              onClick={() => handleShowConfirmMultiple("CloseRecruitment")}
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
              <IconButton
                size="small"
                sx={{ color: "#8A94A5", mx: 1 }}
                onClick={() => handleOpenFormWithCurrentNode(organization)}
              >
                <EditIcon />
              </IconButton>
            )}
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
              onClick={() => handleOpenFormWithCurrentNode(organization)}
              icon={
                <Iconify
                  icon={"vscode-icons:file-type-excel"}
                  width={20}
                  height={20}
                />
              }
            />
            {selectedList.length === 1 && (
              <>
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
                  onClick={() => handleOpenFormWithCurrentNode(organization)}
                  icon={
                    <Iconify
                      icon={"ri:file-copy-fill"}
                      width={20}
                      height={20}
                      color="#5C6A82"
                    />
                  }
                />
                <IconButton
                  size="small"
                  sx={{ color: "#1976D2", mx: 1 }}
                  onClick={() => handleShowConfirmMultiple(organization)}
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
      {showConfirmMultiple && (
        <RecruitmentConfirmMultipleModal
          showConfirmMultiple={showConfirmMultiple}
          setShowConfirmMultiple={setShowConfirmMultiple}
          organizationIds={selectedList}
          setSelected={selectedList}
        />
      )}
    </Drawer>
  );
};

export default React.memo(RecruitmentBottomNav);
