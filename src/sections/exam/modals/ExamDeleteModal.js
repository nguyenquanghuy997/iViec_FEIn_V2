import { useDeleteExamMutation } from "@/sections/exam/ExamSlice";
import { ButtonDS } from "@/components/DesignSystem";
import Iconify from "@/components/Iconify";
import {
  ButtonCancel,
  DialogContentTextModelStyle,
  DialogModelStyle,
  TitleModelStyle,
} from "@/utils/cssStyles";
import { DialogActions, DialogContent, Divider } from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";

const ExamDeleteModal = ({
  showConfirmMultiple,
  setShowConfirmMultiple,
  jobTypeIds,
  onClose,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [deletejob] = useDeleteExamMutation();

  const handleChangeStatus = async () => {
    try {
      await deletejob({"ids":jobTypeIds}).unwrap();
      enqueueSnackbar("Thực hiện thành công !");
      onClose();
    } catch (err) {
      enqueueSnackbar("Thực hiện thất bại !", {
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
      <DialogContent
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Iconify
          icon={"mdi:alert-circle-outline"}
          width={60}
          height={60}
          color="#E53935"
        />
        <TitleModelStyle className="title" style={{ color: "#E53935" }}>
          Xác nhận xóa vị trí công việc
        </TitleModelStyle>
        <DialogContentTextModelStyle
          id="alert-dialog-description"
          className="subtite"
          style={{ fontWeight: 400 }}
        >
          Bạn có chắc chắn muốn xóa vị trí công việc?
        </DialogContentTextModelStyle>
        <Divider />
      </DialogContent>
      <DialogActions sx={{ borderTop: "1px solid #E7E9ED" }}>
        <ButtonCancel tittle="Hủy" onClick={onClose} />

        <ButtonDS
          tittle="Xóa"
          onClick={handleChangeStatus}
          sx={{
            color: "#FDFDFD",
            backgroundColor: "#D32F2F",
            "&:hover": {
              backgroundColor: "#E53935",
            },
          }}
        />
      </DialogActions>
    </DialogModelStyle>
  );
};

export default React.memo(ExamDeleteModal);
