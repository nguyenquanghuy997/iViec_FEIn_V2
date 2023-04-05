import { ModalBox } from "./styles";
import {
  Typography,
  Modal as MuiModal,
  Box,
  IconButton,
} from "@mui/material";
import { RiCloseFill } from "react-icons/ri";
import { Button } from "../DesignSystem";

export default function Modal({
  open,
  onCloseModal,
  title,
  cancelText = 'Hủy',
  okText = 'Xác nhận',
  confirmLoading = false,
  confirmDisabled = false,
  width = 600,
  sx = {},
  onOk,
  children,
}) {
  const sxModal = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3001,
    ...sx,
  };

  return (
    <MuiModal open={open} sx={sxModal}>
      <ModalBox width={width} className="modal-content-box">
        <Box className="modal-header">
          <Typography>{title}</Typography>
          <IconButton onClick={onCloseModal}>
            <RiCloseFill />
          </IconButton>
        </Box>

        <Box className="modal-body">{children}</Box>

        <Box className="modal-footer">
          <Button
            className="btn-cancel"
            onClick={onCloseModal}
            height={36}
            color="basic"
            sx={{ mr: 1 }}
          >
            {cancelText}
          </Button>

          <Button
            className="btn-ok"
            onClick={onOk}
            height={36}
            loading={confirmLoading}
            color="secondary"
            variant="contained"
            disabled={confirmDisabled}
          >
            {okText}
          </Button>
        </Box>
      </ModalBox>
    </MuiModal>
  );
}
