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
import React from "react";
import palette from "@/theme/palette";


const ActiveModal = ({

  showConfirmMultiple,
  onClose,
  handleSave,
  isActivated,
  title
}) => {
  return (

    <DialogModelStyle
      open={showConfirmMultiple}
      onClose={onClose}
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
              <TitleModelStyle className="title" style={{ color: palette.light.common.blue700 }}>
                Bật trạng thái hoạt động cho {title}
              </TitleModelStyle>
              <DialogContentTextModelStyle
                id="alert-dialog-description"
                className="subtite"
                style={{ fontWeight: 400 }}
              >
                Bạn có chắc chắn muốn bật hoạt động cho {title} ?
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
              <TitleModelStyle className="title" style={{ color: theme.palette.common.neutral700 }}>
                Tắt trạng thái hoạt động cho {title}
              </TitleModelStyle>
              <DialogContentTextModelStyle
                id="alert-dialog-description"
                className="subtite"
                style={{ fontWeight: 400 }}
              >
                Bạn có chắc chắn muốn tắt hoạt động cho {title} ?
              </DialogContentTextModelStyle>
              <Divider />
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ borderTop: "1px solid " + palette.light.common.neutral100 }}>
          <ButtonCancel tittle="Hủy" onClick={onClose} />

          <ButtonDS tittle={isActivated != 1 ? "Bật" : "Tắt"} onClick={handleSave} />
        </DialogActions>
    </DialogModelStyle>
  );
};

export default React.memo(ActiveModal);
