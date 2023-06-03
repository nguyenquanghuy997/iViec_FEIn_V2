import ExpanLess from "../../../../../public/assets/icons/candidate/ExpanLess";
import ExpanMore from "../../../../../public/assets/icons/candidate/ExpanMore";
import { AvatarDS } from "@/components/DesignSystem";
import { Text, View } from "@/components/FlexStyled";
import { PipelineStateType } from "@/utils/enum";
import { fTimeDate } from "@/utils/formatTime";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { Container } from "@mui/system";
import React, { useState } from "react";

const NotificationBoard = ({
  icon,
  avatarSrc,
  avatarName,
  title,
  isShow,
  data,
  children,
  isReview,
  expanded,
  setIsOpenReviewView,
  setItemLog,
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (!isReview && !children) return;
    setOpen(!open);
  };

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

        <div style={{ maxWidth: "370px", paddingRight: "14px" }}>
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
                color={theme.palette.common.borderObject}
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

          {isReview ? (
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
                  Điểm TB:{" "}
                  <span style={{ marginLeft: "13px", fontWeight: 600 }}>
                    {data?.averagePoint?.toFixed(2)}
                  </span>
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

              <View
                flexRow
                contentCenter
                pv={5}
                mt={16}
                borderWidth={1}
                borderRadius={6}
                borderColor={theme.palette.common.blue700}
                onPress={(e) => {
                  e.stopPropagation();
                  setIsOpenReviewView(true);
                  setItemLog(data);
                }}
              >
                <Text
                  ml={8}
                  fontSize={12}
                  fontWeight={"600"}
                  color={theme.palette.common.blue700}
                >
                  {"Xem chi tiết đánh giá"}
                </Text>
              </View>

              {children}
            </Collapse>
          ) : children ? (
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
              {children}
            </Collapse>
          ) : null}

          {expanded}
        </div>
        <div style={{ margin: "auto" }}>
          {isShow && (open ? <ExpanMore /> : <ExpanLess />)}
        </div>
      </ListItemButton>
    </Container>
  );
};

export default NotificationBoard;
