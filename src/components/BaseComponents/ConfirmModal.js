import Iconify from "../Iconify";
import MuiButton from "@/components/BaseComponents/MuiButton";
import { ButtonIcon } from "@/utils/cssStyles";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/styles";
import { isEmpty } from "lodash";
import React from "react";

export const DialogContentTextStyle = styled(DialogContentText)(
  ({ theme }) => ({
    textAlign: "center",
    width: "100%",
    fontSize: "14px !important",
    fontWeight: 400,
    color: theme.palette.common.neutral700 + " !important",
    display: "block",
    "& strong": {
      fontWeight: 600,
      marginLeft: theme.spacing(0.5),
    },
    "& span": {
      fontWeight: 600,
      marginLeft: theme.spacing(0.5),
    },
  })
);

export const MuiDialogTitle = ({ children, onClose, ...other }) => {
  const theme = useTheme();
  return (
    <DialogTitle
      id="customized-dialog-title"
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        m: 0,
        px: 3,
        py: 2,
        borderBottom: "1px solid #E7E9ED",
        minHeight: "68px",
      }}
      {...other}
    >
      {children}
      {onClose ? (
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
              color={theme.palette.common.borderObject}
            />
          }
        />
      ) : null}
    </DialogTitle>
  );
};

const ConfirmModal = ({
  data, // list id
  open,
  icon,
  title,
  subtitle,
  onClose,
  onSubmit,
  titleProps,
  btnCancelProps,
  btnConfirmProps,
  dialogProps,
  contentProps,
  actionsProps,
  maxWidth = "sm",
  ...props
}) => {
  const { title: btnTitleCancel, ...otherCancel } = btnCancelProps;
  const { title: btnTitleConfirm, ...otherConfirm } = btnConfirmProps;
  const { wrapperSx, ...otherDialogProps } = dialogProps || {};
  const { contentSx, ...otherContentProps } = contentProps || {};
  const { actionsSx, ...otherActionsProps } = actionsProps || {};
  const theme = useTheme();
  const handleSubmit = (data) => {
    if (!isEmpty(data)) {
      onSubmit(data);
    } else {
      onSubmit();
    }
  };

  const wrapperSxProps = {
    boxShadow:
      " 0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)",
    borderRadius: "6px",
    minHeight: "600px",
    "& .MuiDialog-container": {
      "& .MuiPaper-root": {
        borderRadius: "6px",
        width: "100%",
      },
    },
    ...wrapperSx,
  };

  const contentSxProps = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    ...contentSx,
  };

  const actionsSxProps = {
    minHeight: "68px",
    padding: " 16px 24px !important",
    borderTop: "1px solid #E7E9ED",
    "& .btn-actions": {
      height: "36px",
    },
    ...actionsSx,
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="dialog-confirm"
      sx={{ ...wrapperSxProps }}
      maxWidth={maxWidth}
      {...otherDialogProps}
      {...props}
    >
      <MuiDialogTitle onClose={onClose} />
      <DialogContent sx={{ ...contentSxProps }} {...otherContentProps}>
        <Box sx={{ my: 2 }}>{icon}</Box>
        <Typography
          sx={{
            textAlign: "center",
            width: "100%",
            fontSize: 16,
            fontWeight: 600,
            marginBottom: 1,
          }}
          {...titleProps}
        >
          {title}
        </Typography>
        <DialogContentText
          id="alert-dialog-description"
          className="subtitle-confirm"
          sx={{
            textAlign: "center",
            width: "100%",
            fontSize: "14px !important",
            fontWeight: 400,
            color: theme.palette.common.neutral700 + " !important",
            display: "block",
            "& strong": {
              fontWeight: 600,
              marginLeft: 0.5,
            },
            "& span": {
              fontWeight: 600,
              marginLeft: 0.5,
            },
          }}
        >
          {subtitle}
        </DialogContentText>
        <Divider />
      </DialogContent>
      <DialogActions sx={{ ...actionsSxProps }} {...otherActionsProps}>
        <MuiButton
          title={btnTitleCancel}
          color="basic"
          className={"btn-actions btn-cancel"}
          onClick={onClose}
          {...otherCancel}
        />
        <MuiButton
          title={btnTitleConfirm}
          color={"primary"}
          className={"btn-actions btn-confirm"}
          onClick={() => handleSubmit(data)}
          {...otherConfirm}
        />
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmModal;
