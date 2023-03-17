import { ButtonDS } from "@/components/DesignSystem";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Divider,
  Typography,
} from "@mui/material";
// import {AlertIcon} from "@/sections/recruitment/component/Icon";
import { styled } from "@mui/styles";
// import RecruitmentDialogTitle from "@/sections/recruitment/component/RecruitmentDialogTitle";
// import {useDeleteMultipleRecruitmentMutation} from "@/sections/recruitment/override/OverrideRecruitmentSlice";
import { useSnackbar } from "notistack";
import React from "react";

const DialogStyle = styled(Dialog)(({ theme }) => ({
  "& .dialog-delete": {
    boxShadow:
      " 0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)",
    borderRadius: "6px",
    backgroundColor: "#FDFDFD",
    padding: theme.spacing(3),
  },
  "& .MuiDialog-container": {
    "& .MuiPaper-root": {
      padding: theme.spacing(0, 2),
      borderRadius: "6px",
      width: "100%",
      maxWidth: "600px !important",
      top: -200,
    },
  },
}));
const TitleAlertStyle = styled(Typography)(({ theme }) => ({
  "&.title-delete": {
    textAlign: "center",
    width: "100%",
    fontSize: "16px",
    fontWeight: 600,
    color: "#E53935",
    marginTop: theme.spacing(2),
  },
}));

const DialogContentTextStyle = styled(DialogContentText)(({ theme }) => ({
  "&.subtite-delete": {
    textAlign: "center",
    width: "100%",
    fontSize: "14px",
    fontWeight: 400,
    display: "block",
    marginTop: theme.spacing(2),
    "& .subtitle-delete-name": {
      fontWeight: 600,
    },
  },
}));

const ButtonCancelStyle = styled(Button)(({}) => ({
  "&.button-cancel": {
    fontSize: 14,
    fontWeight: 600,
    color: "#455570",
    backgroundColor: "transparent",
    borderRadius: 6,
    "&:hover": {
      color: "#455570",
      backgroundColor: "transparent",
    },
  },
}));

const RecruitmentAdConfirmMultipleModal = ({
  setSelected,
  showConfirmMultiple,
  setShowConfirmMultiple,
  // recruitmentIds,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  // const [deleteMultipleRecruitment] = useDeleteMultipleRecruitmentMutation();

  const onClose = () => {
    setShowConfirmMultiple(false);
    setSelected([]);
  };

  const handleApproveRecruitment = async () => {
    try {
      // await deleteMultipleRecruitment({recruitmentIds}).unwrap();
      enqueueSnackbar("Duyệt tin thành công!");
      onClose();
    } catch (err) {
      enqueueSnackbar("Thực hiện thất bại!", {
        autoHideDuration: 1000,
        variant: "error",
      });
      console.log(err);
    }
  };
  return (
    <DialogStyle
      open={showConfirmMultiple}
      onClose={() => setShowConfirmMultiple(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="dialog-delete"
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
        <TitleAlertStyle className="title-delete">
          Duyệt tin tuyển dụng
        </TitleAlertStyle>
        <DialogContentTextStyle
          id="alert-dialog-description"
          className="subtite-delete"
        >
          Bạn có chắc chắn muốn duyệt tin tuyển dụng đã chọn?
        </DialogContentTextStyle>
        <Divider />
      </DialogContent>
      <DialogActions sx={{ borderTop: "1px solid #E7E9ED" }}>
        <ButtonCancelStyle className="button-cancel" onClick={onClose}>
          Hủy
        </ButtonCancelStyle>
        <ButtonDS tittle="Duyệt" onClick={handleApproveRecruitment} />
      </DialogActions>
    </DialogStyle>
  );
};

export default React.memo(RecruitmentAdConfirmMultipleModal);
