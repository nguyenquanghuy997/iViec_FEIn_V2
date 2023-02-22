import CloseIcon from "../../../../../public/assets/icons/candidate/CloseIcon";
import ExpanLess from "../../../../../public/assets/icons/candidate/ExpanLess";
import ExpanMore from "../../../../../public/assets/icons/candidate/ExpanMore";
import ModalReload from "./ModalReload";
import { ACTION_CONTENT } from "./config";
import { Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
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
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Container } from "@mui/system";
import React from "react";
import { useState } from "react";

const NotificationBoard = ({ icon, avatarSrc, action, manager, candidate }) => {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = React.useState(false);
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
            color: "#5C6A82",
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
            color: "#172B4D",
          }}
        >
          {reason}
        </span>
        <ModalReload />
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

  const renderBoxStatus = (action, text) => {
    return (
      <div>
        <p>
          <span style={{ fontWeight: 600 }}>{manager || candidate}</span>
          {text}{" "}
          {manager ? (
            <span style={{ color: ACTION_CONTENT[action]?.color }}>
              {ACTION_CONTENT[action]?.text}
            </span>
          ) : (
            ""
          )}
        </p>
      </div>
    );
  };

  return (
    <Container
      sx={{
        marginBottom: "40px",
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
          pt: 2,
          backgroundColor: !open ? "white" : "#F2F4F5",
          fontSize: "0.9rem!important",
          "&:hover": {
            background: "#F2F4F5",
          },
          "& .MuiListItemText-root+svg": {
            minWidth: "0.8rem",
          },
        }}
      >
        <ListItemIcon
          sx={{ margin: "7px 17px 0 0", color: ACTION_CONTENT[action].color }}
        >
          {icon}
        </ListItemIcon>

        <ListItemAvatar sx={{ marginTop: "3px !important" }}>
          <Avatar
            alt="Remy Sharp"
            src={avatarSrc}
            sx={{ width: "28px", height: "28px" }}
          />
        </ListItemAvatar>
        {candidate ? (
          <ListItemText
            primary={renderBoxStatus(action, " đã ứng tuyển.")}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{
                    display: "block",
                    fontSize: "12px",
                    marginTop: "4px",
                  }}
                  component="span"
                  variant="body2"
                  color="#5C6A82"
                >
                  15:00 17/02/2023
                </Typography>
              </React.Fragment>
            }
          />
        ) : (
          <div>
            <div>
              {renderBoxStatus(
                action,
                " đã chuyển ứng viên Đinh Tiến Thành từ bước Ứng tuyển sang bước "
              )}
            </div>
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
                  color="#5C6A82"
                >
                  15:00 17/02/2023
                </Typography>
                {action === "fail"
                  ? renderText("Lý do loại:", "kHÔNG THÍCH")
                  : ""}
              </React.Fragment>
            </div>
          </div>
        )}
        {open ? <ExpanMore style={{ color: "red" }} /> : <ExpanLess />}
      </ListItemButton>
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        sx={{
          pl: 13,
          backgroundColor: "#F2F4F5",
          pb: 2,
          "& .MuiButtonBase-root:hover": {
            backgroundColor: "#F2F4F5",
          },
        }}
      >
        <List component="div" disablePadding>
          <ListItemText sx={{ fontSize: "13px" }}>
            Đánh giá: <span style={{ marginLeft: "16px" }}>Đạt</span>
          </ListItemText>
        </List>
        <List>
          <ListItemText sx={{ fontSize: "13px" }}>
            Điểm TB: <span style={{ marginLeft: "16px" }}> 10</span>
          </ListItemText>
        </List>
        <List>
          <ListItemText sx={{ fontSize: "13px" }}>
            Kết luận:
            <span style={{ marginLeft: "16px" }}>
              {" "}
              Ứng viên khá sáng giá, tuyển thẳng luôn không cần phỏng vấn lần 2.
            </span>
          </ListItemText>
        </List>
        {ACTION_CONTENT[action]?.option ? (
          <ListItemButton
            sx={{
              "& .MuiButtonBase-root:hover": {
                backgroundColor: "#F2F4F5",
              },
            }}
          >
            <Button
              variant="outlined"
              sx={{ width: "100%" }}
              onClick={handleOpenModal}
            >
              {ACTION_CONTENT[action]?.option}
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
                {ACTION_CONTENT[action]?.option}
              </BootstrapDialogTitle>
              <Divider />
              <DialogContent>
                <Typography gutterBottom>
                  Cras mattis consectetur purus sit amet fermentum. Cras justo
                  odio, dapibus ac facilisis in, egestas eget quam. Morbi leo
                  risus, porta ac consectetur ac, vestibulum at eros.
                </Typography>
              </DialogContent>
              {/* <DialogActions>
          <Button autoFocus onClick={handleCloseModal}>
            Save changes
          </Button>
        </DialogActions> */}
            </BootstrapDialog>
          </ListItemButton>
        ) : (
          ""
        )}
      </Collapse>
    </Container>
  );
};

export default NotificationBoard;
