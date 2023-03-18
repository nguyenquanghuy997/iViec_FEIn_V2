import CloseIcon from "../../assets/CloseIcon";
import WarningIcon from "../../assets/WarningIcon";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider,} from "@mui/material";
import React from "react";
import {ACTION_CONTENT} from './config';
import ToggleLineIcon from "@/assets/ToggleLineIcon";
import ToggleFillIcon from "@/assets/ToggleFillIcon";

const ApproveProcessDialog = (props) => {
  const {onClose, onAccept, open, type, content} = props;
  return (
    <Dialog
      onClose={onClose}
      open={open}
      sx={{
        "& .MuiPaper-root": {
          width: "100%",
          borderRadius: "6px!important",
        },
      }}
    >
      <DialogTitle sx={{p: 0, display: "flex", justifyContent: "end"}}>
        <DialogActions onClick={onClose}>
          {" "}
          <CloseIcon/>
        </DialogActions>
      </DialogTitle>
      <DialogTitle sx={{p: 0, display: "flex", justifyContent: "center"}}>
        {(() => {
          switch (type) {
            case 'approveProcessDelete':
              return <WarningIcon/>
            case 'approveProcessActive':
              return <ToggleLineIcon/>
            case 'approveProcessDeActive':
              return <ToggleFillIcon/>
            case 'approveProcessLevelDelete':
              return <WarningIcon/>
          }
        })()}
      </DialogTitle>

      <DialogTitle
        sx={{color: ACTION_CONTENT[type].color, display: "flex", justifyContent: "center"}}
      >
        {ACTION_CONTENT[type].confirm}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          sx={{textAlign: "center"}}
        >
          {ACTION_CONTENT[type].text} <strong>{content}</strong> ?
        </DialogContentText>
      </DialogContent>
      <Divider/>
      <DialogActions>
        <Button onClick={onClose} sx={{color: "#455570"}}>
          Hủy
        </Button>
        <Button
          onClick={() => {
            onClose();
            onAccept();
          }}
          autoFocus
          sx={{color: "white", background: ACTION_CONTENT[type].color,}}
        >
          {ACTION_CONTENT[type].textButton}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApproveProcessDialog;