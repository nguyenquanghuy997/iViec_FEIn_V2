import { ButtonDS } from "@/components/DesignSystem";
import { Box, Dialog, DialogContentText } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { Typography } from "antd";

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
        props?.color || theme?.palette.background.default || "#000000";

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

export const ViewModel = styled("div")(({}) => ({
  width: "42vw",
  background: "#fff",
  display: "flex",
  flexDirection: "column",
}));

export const ButtonIcon = styled(ButtonDS)(({}) => ({
  padding: "8px",
  minWidth: "unset",
  backgroundColor: "#fff",
  boxShadow: "none",
  ":hover": {
    backgroundColor: "#EFF3F7",
  },
  textTransform: "none",
}));
export const ButtonCancel = styled(ButtonDS)(({}) => ({
    color: "#455570",
    backgroundColor: "transparent",
    borderRadius: 6,
    "&:hover": {
      color: "#455570",
      backgroundColor: "transparent",
    },
}));
export const ButtonGray = styled(ButtonDS)(({}) => ({
  color: "#455570",
  backgroundColor: "#F3F4F6",
  boxShadow: "none",
  ":hover": {
    backgroundColor: "#E7E9ED",
  },
  textTransform: "none",
}));
//Model
export const TitleModelStyle = styled(Typography)(({ }) => ({
  "&.title": {
    textAlign: "center",
    width: "100%",
    fontSize: "16px",
    fontWeight: 700,
    color: "#1976D2",
    marginTop: "12px",
  },
}));
export const DialogModelStyle = styled(Dialog)(({ }) => ({
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
export const DialogContentTextModelStyle = styled(DialogContentText)(({ theme }) => ({
  "&.subtite": {
    textAlign: "center",
    width: "100%",
    fontSize: "14px",
    fontWeight: 700,
    display: "block",
    color:"#455570",
    marginTop: theme.spacing(2),
    "& .subtitle-name": {
      fontWeight: 600,
    },
  },
}));
export const HeaderPreviewStyle = styled(Box)(({theme}) => ({
  "&.form-head": {
    position: "fixed",
    top: 0,
    right: 0,
    width: `600px`,
    backgroundColor: '#FDFDFD',
    zIndex: 1,
    borderBottom: '1px solid #E7E9ED',
    padding: theme.spacing(2),
    height: theme.spacing(8),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }

}));

export const FooterPreviewStyle  = styled(Box)(({theme}) => ({
  "&.form-footer": {
    position: "fixed",
    bottom: 0,
    right: 0,
    width: 600,
    backgroundColor: '#FDFDFD',
    zIndex: 1,
    borderTop: '1px solid #E7E9ED',
    padding: theme.spacing(2),
    height: theme.spacing(8),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
}));