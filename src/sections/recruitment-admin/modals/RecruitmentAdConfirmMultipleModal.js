import { ButtonDS } from "@/components/DesignSystem";
import { ButtonCancel, DialogContentTextModelStyle, DialogModelStyle, TitleModelStyle } from "@/utils/cssStyles";
import { errorMessagesRe } from "@/utils/errorMessages";
import {
  DialogActions,
  DialogContent,
  Divider,
} from "@mui/material";
// import {AlertIcon} from "@/sections/recruitment/component/Icon";
// import RecruitmentDialogTitle from "@/sections/recruitment/component/RecruitmentDialogTitle";
// import {useDeleteMultipleRecruitmentMutation} from "@/sections/recruitment/override/OverrideRecruitmentSlice";
import { useSnackbar } from "notistack";
import React from "react";
import { useAddInternalApprovalRecruitmentsMutation } from "../RecruitmentAdSlice";





const RecruitmentAdConfirmMultipleModal = ({
  showConfirmMultiple,
  setShowConfirmMultiple,
 recruitmentIds,
 onClose
}) => {
  const { enqueueSnackbar } = useSnackbar();
   const [internalApprovalRecruitments] = useAddInternalApprovalRecruitmentsMutation();

  const handleApproveRecruitment = async () => {
    try {
       await internalApprovalRecruitments({"ids":recruitmentIds}).unwrap();
       var noti = "Phê duyệt thành công " + recruitmentIds?.length + " tin tuyển dụng"
      enqueueSnackbar(noti);
      onClose();
    } catch (err) {
      enqueueSnackbar(errorMessagesRe[`${err}`], {
        autoHideDuration: 1000,
        variant: "error",
      });
    }
  };
  return (
    <DialogModelStyle
      open={showConfirmMultiple}
      onClose={() => setShowConfirmMultiple(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {/* <RecruitmentDialogTitle onClose={onClose}/> */}
      <DialogContent
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          mt: 3,
        }}
      >
        <img
          src={`/assets/icons/candidate/status-active.png`}
          style={{ margin: "0 auto" }}
        />
        <TitleModelStyle className="title">
          Duyệt tin tuyển dụng
        </TitleModelStyle>
        <DialogContentTextModelStyle
          id="alert-dialog-description"
          className="subtite"
        >
          Bạn có chắc chắn muốn duyệt tin tuyển dụng đã chọn?
        </DialogContentTextModelStyle>
        <Divider />
      </DialogContent>
      <DialogActions sx={{ borderTop: "1px solid #E7E9ED" }}>
        <ButtonCancel tittle="Hủy" onClick={onClose}/>

        <ButtonDS tittle="Duyệt" onClick={handleApproveRecruitment} />
      </DialogActions>
    </DialogModelStyle>
  );
};

export default React.memo(RecruitmentAdConfirmMultipleModal);
