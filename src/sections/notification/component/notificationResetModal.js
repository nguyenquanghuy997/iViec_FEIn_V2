import { ButtonDS } from "@/components/DesignSystem";
import { ButtonCancel, DialogContentTextModelStyle, DialogModelStyle, TitleModelStyle, } from "@/utils/cssStyles";
import { DialogActions, DialogContent, Divider, } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";

const NotificationResetModal = ({
  open,
  setOpen,
  onSuccess,
}) => {
  const theme = useTheme();
  const handleSuccess = () => {
    setOpen(false);
    onSuccess();
  }
  return (
    <DialogModelStyle
      open={open}
      onClose={() => setOpen(false)}
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
        <img
          src={`/assets/icons/settings-3-fill.svg`}
          style={{margin: "0 auto"}}
        />
        <TitleModelStyle className="title" style={{color: theme.palette.common.blue700}}>
          Đặt lại thông báo về nội dung mặc định của iVIEC
        </TitleModelStyle>
        <DialogContentTextModelStyle
          id="alert-dialog-description"
          className="subtite"
          style={{fontWeight: 400}}
        >
          Các nội dung bạn chỉnh sửa sẽ không còn lưu trên hệ thống
        </DialogContentTextModelStyle>
        <Divider/>
      </DialogContent>
      <DialogActions sx={{borderTop: "1px solid #E7E9ED"}}>
        <ButtonCancel tittle="Hủy" onClick={() => setOpen(false)}/>
        <ButtonDS tittle={"Đặt lại về mặc định"} onClick={handleSuccess}/>
      </DialogActions>
    </DialogModelStyle>
  );
};

export default React.memo(NotificationResetModal);
