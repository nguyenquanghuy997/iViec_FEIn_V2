import { ButtonDS } from "@/components/DesignSystem";
import {
  Box,
  Dialog,
  DialogContentText,
  Switch,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { styled } from "@mui/material/styles";

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

export const ViewModel = styled("div")(() => ({
  width: "42vw",
  background: "#fff",
  display: "flex",
  flexDirection: "column",
}));

export const ButtonIcon = styled(ButtonDS)(() => ({
  padding: "8px",
  minWidth: "unset",
  backgroundColor: "#fff",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "#EFF3F7",
  },
  textTransform: "none",
}));
export const ButtonCancel = styled(ButtonDS)(() => ({
  color: "#455570",
  backgroundColor: "transparent",
  borderRadius: 6,
  "&:hover": {
    color: "#455570",
    backgroundColor: "transparent",
  },
}));
export const ButtonGray = styled(ButtonDS)(() => ({
  color: "#455570",
  backgroundColor: "#F3F4F6",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "#E7E9ED",
  },
  textTransform: "none",
}));
//Model
export const TitleModelStyle = styled(Typography)(() => ({
  "&.title": {
    textAlign: "center",
    width: "100%",
    fontSize: "16px",
    fontWeight: 700,
    color: "#1976D2",
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
      color: "#455570",
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
    backgroundColor: "#FDFDFD",
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
    backgroundColor: "#FDFDFD",
    zIndex: 1,
    borderTop: "1px solid #E7E9ED",
    padding: theme.spacing(2),
    height: theme.spacing(8),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));
export const GreenSwitch = styled(Switch)(() => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#388E3C",
    "&:hover": {
      backgroundColor: alpha("#A5D6A7", 0.08),
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
export const ReviewForm = styled("div")(() => ({
  "&.block-review": {
    background: "#F2F4F5",
    borderRadius: "6px",
    padding: "16px",
    marginBottom: "28px",
  },
  "&.block-review .title": {
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "20px",
    color: "#172B4D;",
    marginBottom: "8px",
  },
  "&.block-review .subTitleForm ": {
    fontWeight: 400,
    fontSize: "13px",
    lineHeight: "20px",
    color: "#455570;",
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
    background: "#fff",
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
    background: "#1976D2 !important",
    color: '#fff',
    borderColor: '#1976D2'
  },
  "& .ant-rate .ant-rate-star-first": {
    width:'100%'
  },
  "& .ant-rate .ant-rate-star >div:hover": {
    transform: 'unset'
  },
  "& .ant-rate .ant-rate-star-full .ant-rate-star-second": {
    color: '#fff'
  },
  "& .pagination-review": {
    display: "flex",
    marginBottom: 0,
    marginTop: "16px",
  },
  "&.block-review-result .MuiBox-root": {
    width: 'unset',
    marginTop: 0,
  },
  "&.block-review-result .pagination-review li:hover": {
    background: "#F2F4F5",
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
