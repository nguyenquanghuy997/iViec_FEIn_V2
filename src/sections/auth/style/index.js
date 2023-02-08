import { STYLE_CONSTANT } from "../register/constants";

// box style
const BoxWrapperStyle = {
  mt: "36px",
  mb: "36px",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const BoxInnerStyle = {
  px: 7.5,
  py: 5,
  bgcolor: STYLE_CONSTANT.COLOR_BACKGROUND,
  width: "560px",
  mb: 4.5,
  borderRadius: 0.75,
  boxShadow:
    "0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)",
  position: "relative",
};

// card label
const CardLabelStyle = {
  textAlign: "center",
  fontSize: STYLE_CONSTANT.FONT_XL,
  fontWeight: STYLE_CONSTANT.FONT_BOLD,
  mb: 1,
  width: STYLE_CONSTANT.WIDTH_FULL,
  color: STYLE_CONSTANT.COLOR_TEXT_PRIMARY,
};

const CardSubInfoLabelStyle = {
  textAlign: "center",
  fontSize: 13,
  fontWeight: STYLE_CONSTANT.FONT_NORMAL,
  color: STYLE_CONSTANT.COLOR_TEXT_PRIMARY,
};

export {
  BoxWrapperStyle,
  BoxInnerStyle,
  CardLabelStyle,
  CardSubInfoLabelStyle,
};
