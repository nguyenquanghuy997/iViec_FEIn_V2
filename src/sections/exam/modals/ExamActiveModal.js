import { ButtonDS } from "@/components/DesignSystem";
import {
  ButtonCancel,
  DialogContentTextModelStyle,
  DialogModelStyle,
  TitleModelStyle,
} from "@/utils/cssStyles";
import {
  DialogActions,
  DialogContent,
  Divider,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";
import { useUpdateStatusExamMutation } from "../ExamSlice";


const ExamActiveModal = ({
  showConfirmMultiple,
  setShowConfirmMultiple,
  ids,
  onClose,
  isActivated,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [status] = useUpdateStatusExamMutation();

  const handleChangeStatus = (async () => {
    try {
      const data = {
        ids: ids,
        isActive: !isActivated,
      };
      await status(data).unwrap();
      enqueueSnackbar("Chuyển trạng thái thành công !");
      onClose();
    } catch (err) {
      enqueueSnackbar("Chuyển trạng thái thất bại !", {
        autoHideDuration: 1000,
        variant: "error",
      });
    }
  });
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
          {isActivated != 1 && (
            <>
              <img
                src={`/assets/icons/candidate/status-active.png`}
                style={{ margin: "0 auto" }}
              />
              <TitleModelStyle className="title" style={{ color: "#1976D2" }}>
                Bật trạng thái hoạt động cho đề thi
              </TitleModelStyle>
              <DialogContentTextModelStyle
                id="alert-dialog-description"
                className="subtite"
                style={{ fontWeight: 400 }}
              >
                Bạn có chắc chắn muốn bật hoạt động cho đề thi?
              </DialogContentTextModelStyle>
              <Divider />
            </>
          )}
          {isActivated == 1 && (
            <>
              <img
                src={`/assets/icons/candidate/status-inactive.png`}
                style={{ margin: "0 auto" }}
              />
              <TitleModelStyle className="title" style={{ color: "#455570" }}>
                Tắt trạng thái hoạt động cho đề thi
              </TitleModelStyle>
              <DialogContentTextModelStyle
                id="alert-dialog-description"
                className="subtite"
                style={{ fontWeight: 400 }}
              >
                Bạn có chắc chắn muốn tắt hoạt động cho đề thi?
              </DialogContentTextModelStyle>
              <Divider />
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ borderTop: "1px solid #E7E9ED" }}>
          <ButtonCancel tittle="Hủy" onClick={onClose} />

          <ButtonDS tittle={isActivated != 1 ? "Bật" : "Tắt"} onClick={handleChangeStatus} />
        </DialogActions>
    </DialogModelStyle>
  );
};

export default React.memo(ExamActiveModal);
