import CloseIcon from "../../../../../public/assets/icons/candidate/CloseIcon";
import ExpanLess from "../../../../../public/assets/icons/candidate/ExpanLess";
import ExpanMore from "../../../../../public/assets/icons/candidate/ExpanMore";
import { AvatarDS } from "@/components/DesignSystem";
import { PipelineStateType } from "@/utils/enum";
import { fTimeDate } from "@/utils/formatTime";
import { Button } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import {styled, useTheme} from "@mui/material/styles";
import { Container } from "@mui/system";
import React from "react";
import { useState } from "react";

const NotificationBoard = ({
  icon,
  avatarSrc,
  avatarName,
  title,
  isShow,
  data,
  option,
}) => {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const theme = useTheme();
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleClick = () => {
    setOpen(!open);
  };

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
    "& .MuiPaper-rounded": {
      borderRadius: "6px!important",
    },
  }));

  const renderText = (title, reason) => {
    return (
      <div style={{ marginTop: "16px" }}>
        <span
          style={{
            display: "inline",
            fontSize: 13,
            margin: "16px 8px 12px 0",
            color: theme.palette.common.borderObject,
            width: "160px",
          }}
        >
          {title}
        </span>

        <span
          style={{
            display: "inline",
            fontSize: 13,
            fontWeight: 500,
            color: theme.palette.common.neutral800,
          }}
        >
          {reason}
        </span>
        {/* {resultType && <ModalReload />} */}
      </div>
    );
  };

  function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }

  return (
    <Container
      sx={{
        paddingLeft: "0 !important",
        paddingRight: "0 !important",
        marginBottom: "12px",
        "& .MuiListItemText-root+ svg": {
          width: "1em",
          transform: "translateY(2.5em)",
        },
      }}
    >
      <ListItemButton
        alignItems="flex-start"
        onClick={handleClick}
        sx={{
          padding: "20px 12px",
          backgroundColor: !open ? "white" : theme.palette.common.bgrMaster,
          color: theme.palette.common.neutral800,
          fontSize: "0.9rem!important",
          "&:hover": {
            background: theme.palette.common.bgrMaster,
          },
          "& .MuiListItemText-root+svg": {
            minWidth: "0.8rem",
          },
        }}
      >
        <ListItemIcon sx={{ marginTop: "5px" }}>{icon}</ListItemIcon>

        <ListItemAvatar
          sx={{ marginTop: "3px !important", marginRight: "8px" }}
        >
          <AvatarDS
            sx={{
              height: "28px",
              width: "28px",
              borderRadius: "100px",
              fontSize: "12px",
              marginRight: 0,
            }}
            name={avatarName}
            src={avatarSrc}
          ></AvatarDS>
        </ListItemAvatar>

        <div style={{ paddingRight: "14px" }}>
          <div>{title}</div>
          <div>
            <React.Fragment>
              <Typography
                sx={{
                  display: "block",
                  fontSize: "12px",
                  marginTop: "4px",
                }}
                component="span"
                variant="body2"
                color= {theme.palette.common.borderObject}
              >
                {fTimeDate(data?.occurredAt)}
              </Typography>
              {data?.recruitmentPipelineStateType === 3 &&
                (data.pipelineStateResultType === 2
                  ? renderText(
                      "Lý do loại:",
                      data?.note,
                      data.pipelineStateResultType
                    )
                  : renderText("Ghi chú:", data?.note))}
            </React.Fragment>
          </div>

          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
            sx={{
              backgroundColor: theme.palette.common.bgrMaster,
              pb: 2,
              pt: 2,
              "& .MuiButtonBase-root:hover": {
                backgroundColor: theme.palette.common.bgrMaster,
              },
            }}
          >
            <List component="div" disablePadding>
              <Typography fontSize={13}>
                Đánh giá:
                <span
                  style={{
                    marginLeft: "13px",
                    fontWeight: 600,
                    color:
                      data?.applicantReviewResultType === 2 &&
                      (data?.applicantReviewResultType === 0
                        ? "#388E3C"
                        : data?.applicantReviewResultType === 1
                        ? theme.palette.common.orange700
                        : theme.palette.common.red600),
                  }}
                >
                  {PipelineStateType(2, data?.applicantReviewResultType)}
                </span>
              </Typography>
            </List>
            <List>
              <Typography fontSize={13}>
                Điểm TB: <span style={{ marginLeft: "13px", fontWeight: 600 }}>{data?.averagePoint?.toFixed(2)}</span>
              </Typography>
            </List>
            <List component="div" disablePadding>
              <Typography fontSize={13}>
                Kết luận:
                <span style={{ marginLeft: "13px", fontWeight: 600 }}>
                {data?.comment}
                </span>
              </Typography>
            </List>
            {option?.includes("Xem chi tiết đánh giá") && (
              <ListItemButton
                sx={{
                  "& .MuiButtonBase-root:hover": {
                    backgroundColor: theme.palette.common.bgrMaster,
                  },
                }}
              >
                <Button
                  variant="outlined"
                  sx={{ width: "100%" }}
                  onClick={handleOpenModal}
                >
                  {"Xem chi tiết đánh giá"}
                </Button>
                <BootstrapDialog
                  onClose={handleCloseModal}
                  aria-labelledby="customized-dialog-title"
                  open={openModal}
                >
                  <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleCloseModal}
                  >
                    {"Xem chi tiết đánh giá"}
                  </BootstrapDialogTitle>
                  <Divider />
                  <DialogContent>
                    <Typography gutterBottom>
                      Cras mattis consectetur purus sit amet fermentum. Cras
                      justo odio, dapibus ac facilisis in, egestas eget quam.
                      Morbi leo risus, porta ac consectetur ac, vestibulum at
                      eros.
                    </Typography>
                  </DialogContent>
                </BootstrapDialog>
              </ListItemButton>
            )}

          </Collapse>
        </div>
        <div style={{ margin: "auto" }}>
          {isShow && (open ? <ExpanMore /> : <ExpanLess />)}
        </div>
      </ListItemButton>
    </Container>
  );
};

export default NotificationBoard;
