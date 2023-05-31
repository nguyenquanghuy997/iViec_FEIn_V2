import { pxToRem } from "./getFontValue";
import { ButtonDS } from "@/components/DesignSystem";
import {
  Box,
  Dialog,
  DialogContentText,
  Drawer,
  Switch,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { RiArrowDropLeftLine, RiArrowDropRightLine } from "react-icons/ri";

function getDirection(value = "bottom") {
  return {
    top: "to top",
    right: "to right",
    bottom: "to bottom",
    left: "to left",
  }[value];
}
export default function cssStyles(theme) {
  return {
    bgBlur: (props) => {
      const color =
        props?.color || theme?.palette.background.paper || "#000000";

      const blur = props?.blur || 6;
      const opacity = props?.opacity || 0.8;

      return {
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`, // Fix on Mobile
        backgroundColor: alpha(color, opacity),
      };
    },
    bgGradient: (props) => {
      const direction = getDirection(props?.direction);
      const startColor = props?.startColor || `${alpha("#000000", 0)} 0%`;
      const endColor = props?.endColor || "#000000 75%";

      return {
        background: `linear-gradient(${direction}, ${startColor}, ${endColor});`,
      };
    },
    bgImage: (props) => {
      const url = props?.url || "/assets/bg_gradient.jpg";
      const direction = getDirection(props?.direction);
      const startColor =
        props?.startColor || alpha(theme?.palette.grey[900] || "#000000", 0.88);
      const endColor =
        props?.endColor || alpha(theme?.palette.grey[900] || "#000000", 0.88);

      return {
        background: `linear-gradient(${direction}, ${startColor}, ${endColor}), url(${url})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      };
    },
  };
}

export const ViewModel = styled("div")(({ theme }) => ({
  width: "42vw",
  marginTop: "64px",
  height: "calc(100% - 64px)",
  background: theme.palette.background.paper,
  display: "flex",
  flexDirection: "column",
  boxShadow:
    "-3px 0px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)",
}));

export const ButtonIcon = styled(ButtonDS)(({ theme }) => ({
  padding: "8px",
  minWidth: "unset",
  backgroundColor: theme.palette.background.paper,
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "#EFF3F7",
  },
  textTransform: "none",
}));
export const ButtonCancel = styled(ButtonDS)(({ theme }) => ({
  color: theme.palette.common.neutral700,
  backgroundColor: "transparent",
  borderRadius: 6,
  "&:hover": {
    color: theme.palette.common.neutral700,
    backgroundColor: "transparent",
  },
}));
export const ButtonGray = styled(ButtonDS)(({ theme }) => ({
  color: theme.palette.common.neutral700,
  backgroundColor: theme.palette.common.neutral50,
  boxShadow: "none",
  "&:hover": {
    backgroundColor: theme.palette.common.neutral100,
  },
  textTransform: "none",
}));
//Model
export const TitleModelStyle = styled(Typography)(({ theme }) => ({
  "&.title": {
    textAlign: "center",
    width: "100%",
    fontSize: "16px",
    fontWeight: 700,
    color: theme.palette.common.blue700,
    marginTop: "12px",
  },
}));
export const DialogModelStyle = styled(Dialog)(() => ({
  "& .MuiDialog-container": {
    "& .MuiPaper-root": {
      padding: 0,
      borderRadius: "6px",
      width: "100%",
      maxWidth: "600px !important",
      top: -200,
    },
  },
}));
export const DialogModel = styled(Dialog)(() => ({
  "& .MuiDialog-container": {
    "& .MuiPaper-root": {
      padding: 0,
      borderRadius: "6px",
      width: "max-content",
      maxWidth: "600px !important",
    },
  },
}));
export const DialogContentTextModelStyle = styled(DialogContentText)(
  ({ theme }) => ({
    "&.subtite": {
      textAlign: "center",
      width: "100%",
      fontSize: "14px",
      fontWeight: 700,
      display: "block",
      color: theme.palette.common.neutral700,
      marginTop: theme.spacing(1),
      "& .subtitle-name": {
        fontWeight: 600,
      },
    },
  })
);
export const HeaderPreviewStyle = styled(Box)(({ theme }) => ({
  "&.form-head": {
    position: "fixed",
    top: 0,
    right: 0,
    width: `600px`,
    backgroundColor: theme.palette.common.white,
    zIndex: 1,
    borderBottom: "1px solid #E7E9ED",
    padding: theme.spacing(2),
    height: theme.spacing(8),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

export const FooterPreviewStyle = styled(Box)(({ theme }) => ({
  "&.form-footer": {
    position: "fixed",
    bottom: 0,
    right: 0,
    width: 600,
    backgroundColor: theme.palette.common.white,
    zIndex: 1,
    borderTop: "1px solid #E7E9ED",
    padding: theme.spacing(2),
    height: theme.spacing(8),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));
export const GreenSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#388E3C",
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.green200, 0.08),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#388E3C",
  },
}));

export const TextElipsis = styled(Typography)(() => ({
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
  width: "100%",
}));
export const ReviewForm = styled("div")(({ theme }) => ({
  "&.block-review": {
    background: theme.palette.common.bgrMaster,
    borderRadius: "6px",
    padding: "16px",
    marginBottom: "28px",
  },
  "&.block-review .title": {
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "20px",
    color: theme.palette.common.neutral800,
    marginBottom: "8px",
  },
  "&.block-review .subTitleForm ": {
    fontWeight: 400,
    fontSize: "13px",
    lineHeight: "20px",
    color: theme.palette.common.neutral700,
    marginBottom: "16px",
  },
  "& .MuiBox-root": {
    width: "100%",
    marginTop: "16px",
  },
  "& .ant-rate": {
    width: "100%",
    display: "flex",
  },
  "& .ant-rate li, & .pagination-review li": {
    marginInlineEnd: "0 !important",
    display: "flex",
    cursor: "pointer",
    transition: "all 0.32s",
    width: "100%",
    height: "40px",
    border: "1px solid #ebecf4",
    alignItems: "center",
    justifyContent: "center",
    color: "#393b3e",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "24px",
    background: theme.palette.background.paper,
  },
  "& .ant-rate .ant-rate-star-second": {
    color: "#393b3e",
    fontWeight: "600",
    fontSize: "14px",
  },
  "& .ant-rate li:first-of-type, & .pagination-review li:first-of-type": {
    borderRadius: "4px 0 0 4px",
  },
  "& .ant-rate li:last-child, & .pagination-review li:last-child": {
    borderRadius: "0 4px 4px 0",
  },
  "& .ant-rate .ant-rate-star-full": {
    background: theme.palette.common.blue700 + "!important",
    color: theme.palette.background.paper,
    borderColor: "#1976D2",
  },
  "& .ant-rate .ant-rate-star-first": {
    width: "100%",
  },
  "& .ant-rate .ant-rate-star >div:hover": {
    transform: "unset",
  },
  "& .ant-rate .ant-rate-star-full .ant-rate-star-second": {
    color: theme.palette.background.paper,
  },
  "& .pagination-review": {
    display: "flex",
    marginBottom: 0,
    marginTop: "16px",
  },
  "&.block-review-result .MuiBox-root": {
    width: "unset",
    marginTop: 0,
  },
  "&.block-review-result .pagination-review li:hover": {
    background: theme.palette.common.bgrMaster,
  },
  "&.block-review-result .pagination-review li": {
    border: "1px solid #C9D9E0",
  },
  "&.block-review-result .pagination-review li:first-of-type": {
    borderRadius: "4px 0 0 0",
  },
  "&.block-review-result .pagination-review li:last-child": {
    borderRadius: "0 4px 0 0",
  },
}));

export const wrapStyle = {
  border: "1px solid #CCD4DC",
  borderRadius: 8,
  backgroundColor: "#fff",
  padding: "16px 24px",
};

export const WrapBox = styled(Box)(({ noBorder, theme: { palette } }) => ({
  ...wrapStyle,
  ...(noBorder && { border: "none" }),
  ".box-title": {
    padding: "0px 24px 14px",
    margin: "0 -24px 12px",
    borderBottom: "1px solid " + palette.text.border,
  },
  ".box-title-line": {
    position: "relative",
    paddingLeft: "11px",
    "&:before": {
      position: "absolute",
      top: 6,
      left: 0,
      content: `""`,
      width: 3,
      height: 16,
      background: palette.text.active,
      display: "block",
    },
  },
  ".box-title-desc": {
    "> svg": { marginRight: 6, transform: "translateY(3px)" },
    fontSize: pxToRem(13),
    color: palette.text.secondary,
    marginBottom: "8px",
  },
}));

export const SliderStyle = styled("div")(({ theme }) => ({
  "& .swiper-button-prev": {
    color: theme.palette.common.neutral700,
    background: theme.palette.common.neutral50,
    borderRadius: "100px",
    width: "30px",
    height: "30px",
    "&::after": {
      content: { RiArrowDropLeftLine },
      color: theme.palette.common.neutral700,
      fontSize: 14,
      fontWeight: 600,
    },
  },
  "& .swiper-button-next": {
    background: theme.palette.common.neutral50,
    borderRadius: "100px",
    width: "30px",
    height: "30px",
    "&::after": {
      content: { RiArrowDropRightLine },
      color: theme.palette.common.neutral700,
      fontSize: 14,
      fontWeight: 600,
    },
  },
}));

export const ExamContainer = styled(Box)(({ theme: { palette } }) => ({
  minHeight: "500px",
  ".exam-content": {
    marginRight: "24px",
    width: "calc(100% - 325px)",
  },
  ".exam-doing-status": {
    width: "325px",
    maxWidth: "100%",
  },

  ".question-item": {
    border: "none",
    padding: "24px",
  },
  ".answer-item": {
    display: "block",
    border: "1px solid " + palette.text.border,
    borderRadius: "6px",
    paddingLeft: "6px",
    margin: "0 0 16px 0",
    "&:last-of-type": {
      marginBottom: 0,
    },
    ".answer-content": {
      display: "inline-block",
      padding: "12px 16px 12px 0",
    },
    ".MuiButtonBase-root.Mui-checked": {
      color: palette.text.active,
    },

    "&.selected-answer": {
      borderColor: palette.text.active,
    },
  },

  ".status-content": {
    background: palette.background.paper,
    borderRadius: "4px",
    ".timer-box": {
      padding: "24px 20px 0 8px",
    },
    ".q-answers-box": {
      padding: "20px",
      paddingBottom: "8px",
    },
    ".questions": {
      display: "flex",
      flexWrap: "wrap",
      marginLeft: "-4px",
      marginRight: "-4px",
    },
    ".q-answer-item": {
      width: "20%",
      paddingLeft: "4px",
      paddingRight: "4px",
      marginBottom: "16px",
      ".MuiChip-root": {
        minWidth: "50px",
        minHeight: "32px",
        color: palette.text.search,
        fontWeight: 600,
      },
      "&.answered": {
        ".MuiChip-root": {
          background: palette.common.green50,
          color: palette.text.money,
        },
      },
      "&.active": {
        ".MuiChip-root": {
          background: palette.text.active,
          color: palette.background.paper,
        },
      },
    },
  },
}));
export const BottomNavStyle = styled(Drawer)(() => ({
  "& .MuiPaper-root": {
    boxShadow:
      "0px -1px 8px rgba(9, 30, 66, 0.15), 0px 0px 1px rgba(9, 30, 66, 0.3)",
  },
  "& .block-bottom": {
    padding: "20px 24px !important",
  },
}));
