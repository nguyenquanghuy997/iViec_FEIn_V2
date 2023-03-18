import { ButtonDS } from "@/components/DesignSystem";
import Iconify from "@/components/Iconify";
import { Box, Divider, Drawer, IconButton, Typography } from "@mui/material";
import React from "react";
import {
  HeaderPreviewStyle,
  FooterPreviewStyle
} from "@/utils/cssStyles";
import { Stack } from "@mui/system";

 const RecruitmentAdPreviewModal = ({
  showConfirmMultiple,
  setShowConfirmMultiple,
  // recruitmentId,
  // onClose
}) => {


  return (
    <>
      <Drawer
       open={showConfirmMultiple}
       onClose={() => setShowConfirmMultiple(false)}
        anchor="right"
        PaperProps={{
          sx: {
            width: { xs: 1, sm: 560, md: 600 },
            boxShadow:
              "-3px 0px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)",
          },
        }}
      >
        <HeaderPreviewStyle className="form-head">
          <Typography
            variant="body1"
            sx={{ fontSize: "16px", fontWeight: 600, color: "#455570" }}
          >
            Xem chi tiết đơn vị
          </Typography>
          {/* <IconButton size="small" onClick={onClose}>
            <Iconify icon="ic:baseline-close" />
          </IconButton> */}
        </HeaderPreviewStyle>
        <Divider />
        <Box sx={{ py: 2, px: 2, mt: 8 }}>
          <Typography sx={{ fontSize: 24, fontWeight: 700, color: "#455570" }}>
           
          </Typography>

        </Box>
        <FooterPreviewStyle className="organization-form-footer">
          <Stack flexDirection="row">
            <ButtonDS
              variant="contained"
              tittle="Chỉnh sửa"
              // onClick={() => handleOpenFormWithCurrentNode(organization)}
            />
            {/* <ButtonCancelStyle onClick={onClose}>Đóng</ButtonCancelStyle> */}
          </Stack>
          <IconButton>
            <Iconify
              icon="ci:trash-full"
              // onClick={() => handleShowDelete(organization)}
            />
          </IconButton>
        </FooterPreviewStyle>
      </Drawer>
    </>
  );
};
export default React.memo(RecruitmentAdPreviewModal);