import { ButtonDS } from "@/components/DesignSystem";
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
  marginLeft: "12px",
}));
export const ButtonGray = styled(ButtonDS)(({}) => ({
  color: "#455570",
  backgroundColor: "#F3F4F6",
  boxShadow: "none",
  ":hover": {
    backgroundColor: "#E7E9ED",
  },
  textTransform: "none",
  marginLeft: "12px",
}));
