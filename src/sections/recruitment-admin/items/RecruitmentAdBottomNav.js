import RecruitmentAdConfirmMultipleModal from "../modals/RecruitmentAdConfirmMultipleModal";
import RecruitmentAdPreviewModal from "../modals/RecruitmentAdPreviewModal";
import RecruitmentAdRejectModal from "../modals/RecruitmentAdRejectModal";
import Content from "@/components/BaseComponents/Content";
import { ButtonDS } from "@/components/DesignSystem";
import Iconify from "@/components/Iconify";
import { ButtonGray, ButtonIcon } from "@/utils/cssStyles";
import { Box, Divider, Drawer, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

const RecruitmentAdBottomNav = ({
  selectedList,
  open,
  onClose,
  setselectedList,
}) => {
  const [showConfirmMultiple, setShowConfirmMultiple] = useState(false);
  const [typeConfirmMultiple, setTypeConfirmMultiple] = useState("");
  const handleShowConfirmMultiple = (type) => {
    setTypeConfirmMultiple(type);
    setShowConfirmMultiple(true);
  };
  const onCloseModel = () => {
    setShowConfirmMultiple(false);
    setselectedList([]);
  };
  // const handleOpenFormWithCurrentNode = () => {
  //   onOpenForm();
  // };

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
            <ButtonDS
              tittle="Phê duyệt tin"
              sx={{
                marginRight: "16px",
                padding: "6px 11px",
              }}
              onClick={() => handleShowConfirmMultiple("approve")}
              icon={
                <Iconify
                  icon={"material-symbols:check-circle-outline-rounded"}
                  width={20}
                  height={20}
                  color="#FDFDFD"
                  mr={1}
                />
              }
            />
            {selectedList.length === 1 && (
              <>
                <ButtonGray
                  tittle="Từ chối tin"
                  sx={{
                    marginRight: "16px",
                    padding: "6px 11px",
                  }}
                  onClick={() => handleShowConfirmMultiple("reject")}
                  icon={
                    <Iconify
                      icon={"tabler:hexagon-off"}
                      width={20}
                      height={20}
                      color="#5C6A82"
                      mr={1}
                    />
                  }
                />
                <ButtonGray
                  tittle="Xem chi tiết tin"
                  sx={{
                    marginRight: "12px",
                    padding: "6px 11px",
                  }}
                  onClick={() => handleShowConfirmMultiple("preview")}
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
          </Stack>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
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
                  color="#5C6A82"
                />
              }
            />
          </Box>
        </Box>
      </Content>
      {showConfirmMultiple && typeConfirmMultiple.includes("approve") && (
        <RecruitmentAdConfirmMultipleModal
          showConfirmMultiple={showConfirmMultiple}
          setShowConfirmMultiple={setShowConfirmMultiple}
          recruitmentIds={selectedList}
          onClose={onCloseModel}
        />
      )}
      {showConfirmMultiple && typeConfirmMultiple.includes("reject") && (
        <RecruitmentAdRejectModal
          showConfirmMultiple={showConfirmMultiple}
          setShowConfirmMultiple={setShowConfirmMultiple}
          recruitmentId={selectedList[0]}
          onClose={onCloseModel}
        />
      )}
      {showConfirmMultiple && typeConfirmMultiple.includes("preview") && (
        <RecruitmentAdPreviewModal
          showConfirmMultiple={showConfirmMultiple}
          setShowConfirmMultiple={setShowConfirmMultiple}
          recruitmentId={selectedList[0]}
          onClose={onCloseModel}
          handleShowConfirmMultiple={() => handleShowConfirmMultiple("reject")}
        />
      )}
    </Drawer>
  );
};

export default React.memo(RecruitmentAdBottomNav);
