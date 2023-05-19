import { alpha } from "@mui/material/styles";

function createGradient(color1, color2) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

//SETUP COLORS
const PRIMARY = {
  lighter: "#C8FACD",
  light: "#5BE584",
  main: "#00AB55",
  dark: "#007B55",
  darker: "#005249",
};
const SECONDARY = {
  lighter: "#D6E4FF",
  light: "#84A9FF",
  main: "#3366FF",
  dark: "#1939B7",
  darker: "#091A7A",
};
const INFO = {
  lighter: "#D0F2FF",
  light: "#74CAFF",
  main: "#1890FF",
  dark: "#0C53B7",
  darker: "#04297A",
};
const SUCCESS = {
  lighter: "#E9FCD4",
  light: "#AAF27F",
  main: "#54D62C",
  dark: "#229A16",
  darker: "#08660D",
};
const WARNING = {
  lighter: "#FFF7CD",
  light: "#FFE16A",
  main: "#FFC107",
  dark: "#B78103",
  darker: "#7A4F01",
};
const ERROR = {
  lighter: "#FFE7D9",
  light: "#FFA48D",
  main: "#FF4842",
  dark: "#B72136",
  darker: "#7A0C2E",
};

const GREY = {
  0: "#FFFFFF",
  100: "#F9FAFB",
  200: "#F4F6F8",
  300: "#DFE3E8",
  400: "#C4CDD5",
  500: "#919EAB",
  600: "#637381",
  700: "#454F5B",
  800: "#172B4D",
  900: "#161C24",
  500_8: alpha("#919EAB", 0.08),
  500_12: alpha("#919EAB", 0.12),
  500_16: alpha("#919EAB", 0.16),
  500_24: alpha("#919EAB", 0.24),
  500_32: alpha("#919EAB", 0.32),
  500_48: alpha("#919EAB", 0.48),
  500_56: alpha("#919EAB", 0.56),
  500_80: alpha("#919EAB", 0.8),
};

const GRADIENTS = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main),
};

const CHART_COLORS = {
  violet: ["#826AF9", "#9E86FF", "#D0AEFF", "#F7D2FF"],
  blue: ["#2D99FF", "#83CFFF", "#A5F3FF", "#CCFAFF"],
  green: ["#2CD9C5", "#60F1C8", "#A4F7CC", "#C0F2DC"],
  yellow: ["#FFE700", "#FFEF5A", "#FFF7AE", "#FFF3D6"],
  red: ["#FF6C40", "#FF8F6D", "#FFBD98", "#FFF2D4"],
};

// const COMMON = {
//   common: {black: '#000', white: '#fff'},
// primary: {...PRIMARY, contrastText: '#fff'},
// secondary: {...SECONDARY, contrastText: '#fff'},
// info: {...INFO, contrastText: '#fff'},
// success: {...SUCCESS, contrastText: GREY[800]},
// warning: {...WARNING, contrastText: GREY[800]},
// error: {...ERROR, contrastText: '#fff'},
// grey: GREY,
// gradients: GRADIENTS,
// chart: CHART_COLORS,
// divider: GREY[500_24],
// action: {
//   hover: GREY[500_8],
//   selected: GREY[500_16],
//   disabled: GREY[500_80],
//   disabledBackground: GREY[500_24],
//   focus: GREY[500_24],
//   hoverOpacity: 0.08,
//   disabledOpacity: 0.48,
// },
//}

const COMMON = {
  common: {
    white: "#FDFDFD",
    black: "#000",
    bgrMaster: "#F2F4F5",
    bgrObject: "#EFF3F6",
    bgrUnActive: "#E9EAEE",
    strokeDividerLine: "#CCD4DC",
    borderObject: "#5C6A82",

    neutral50: "#F3F4F6",
    neutral100: "#E7E9ED",
    neutral200: "#D0D4DB",
    neutral300: "#B9BFC9",
    neutral400: "#A2AAB7",
    neutral500: "#8A94A5",
    neutral600: "#5C6A82",
    neutral700: "#455570",
    neutral800: "#172B4D",
    neutral900: "#091E42",

    blue50: "#E3F2FD",
    blue100: "#BBDEFB",
    blue200: "#90CAF9",
    blue300: "#64B5F6",
    blue400: "#42A5F5",
    blue500: "#2196F3",
    blue600: "#1E88E5",
    blue700: "#1976D2",
    blue800: "#1565C0",
    blue900: "#0D47A1",

    orange50: "#FFF3E0",
    orange100: "#FFE0B2",
    orange200: "#FFCC80",
    orange300: "#FFB74D",
    orange400: "#FFA726",
    orange500: "#FF9800",
    orange600: "#FB8906",
    orange700: "#F77A0C",
    orange800: "#F26A12",
    orange900: "#EE5B18",

    green50: "#E8F5E9",
    green100: "#C8E6C9",
    green200: "#A5D6A7",
    green300: "#81C784",
    green400: "#66BB6A",
    green500: "#4CAF50",
    green600: "#43A047",

    red50: "#FFEBEE",
    red100: "#FFCDD2",
    red200: "#EF9A9A",
    red300: "#E57373",
    red400: "#EF5350",
    red500: "#F44336",
    red600: "#E53935",

    yellow50: "#FFF8E1",
    yellow100: "#FFF0B6",
    yellow200: "#FEE88B",
    yellow300: "#FEE060",
    yellow400: "#FDD835",
    yellow500: "#FCCF32",
    yellow600: "#FBC62F",
  },
  primary: { ...PRIMARY, contrastText: "#fff" },
  secondary: { ...SECONDARY, contrastText: "#fff" },
  info: { ...INFO, contrastText: "#fff" },
  success: { ...SUCCESS, contrastText: GREY[800] },
  warning: { ...WARNING, contrastText: GREY[800] },
  error: { ...ERROR, contrastText: "#fff" },
  grey: GREY,
  gradients: GRADIENTS,
  chart: CHART_COLORS,
  divider: GREY[500_24],
};

const palette = {
  light: {
    mode: "light",
    ...COMMON,
    text: {
      primary: COMMON.common.neutral800,
      active: COMMON.common.orange700,
      secondary: COMMON.common.neutral600,
      sub: COMMON.common.neutral700,
      search: COMMON.common.neutral500,
      border: COMMON.common.strokeDividerLine,
      bgGray: COMMON.common.bgrMaster,
      warning: COMMON.common.red600,
      disabled: COMMON.common.neutral400,
    },
    background: {
      active: COMMON.common.orange50,
      MasterBg: COMMON.common.bgrMaster,
      paper: '#fff',
      greyDetail: '#F4F6F8',
      disabled: COMMON.common.bgrUnActive,
      bgrObject: "#EFF3F6",
    },
    action: {
      active: "#637381",
      hover: alpha("#919EAB", 0.08),
      selected: alpha("#919EAB", 0.16),
      disabled: alpha("#919EAB", 0.8),
      focus: alpha("#919EAB", 0.24),
    },
  },
  dark: {
    mode: "dark",
    ...COMMON,
    text: {
      primary: COMMON.common.neutral800,
      active: COMMON.common.orange700,
      secondary: COMMON.common.neutral600,
      sub: COMMON.common.neutral700,
      search: COMMON.common.neutral500,
      border: COMMON.common.strokeDividerLine,
      bgGray: COMMON.common.bgrMaster,
      warning: COMMON.common.red600,
      disabled: COMMON.common.neutral400,
    },
    background: {
      active: COMMON.common.orange50,
      MasterBg: COMMON.common.bgrMaster,
      paper: '#fff',
      greyDetail: '#F4F6F8',
      disabled: COMMON.common.bgrUnActive,
    },
    action: {
      active: "#637381",
      hover: alpha("#919EAB", 0.08),
      selected: alpha("#919EAB", 0.16),
      disabled: alpha("#919EAB", 0.8),
      focus: alpha("#919EAB", 0.24),
    },
  },
};

export const STYLE_CONSTANT = {
  // font size
  FONT_2XL: 24,
  FONT_XL: 20,
  FONT_LG: 18,
  FONT_BASE: 16,
  FONT_SM: 14,
  FONT_13: 13,
  FONT_XS: 12,
  // font weight
  FONT_THIN: 100,
  FONT_LIGHT: 300,
  FONT_NORMAL: 400,
  FONT_MEDIUM: 500,
  FONT_SEMI_BOLD: 600,
  FONT_BOLD: 700,
  FONT_EXTRA_BOLD: 800,
  FONT_BLACK: 900,
  // width
  WIDTH_FULL: "100%",
  WIDTH_AUTO: "auto",
  "WIDTH_1/2": "50%",
  "WIDTH_1/3": "33.333333%",
  "WIDTH_2/3": "66.666667%",
  "WIDTH_1/4": "25%",
  "WIDTH_2/4": "50%",
  "WIDTH_3/4": "75%",
  // text color
  COLOR_WHITE: COMMON.common.white,
  COLOR_PRIMARY: COMMON.common.blue700,
  COLOR_TEXT_PRIMARY: COMMON.common.neutral700,
  COLOR_TEXT_SECONDARY: COMMON.common.neutral600,
  COLOR_TEXT_BLACK: COMMON.common.neutral800,
  COLOR_TEXT_GRAY: COMMON.common.neutral500,
  COLOR_TEXT_DANGER: COMMON.common.red600,
  COLOR_DIVIDER: COMMON.common.neutral100,
  COLOR_SUCCESS: "#388E3C",
  COLOR_MAIN: COMMON.common.orange700,
  BG_GRAY: COMMON.common.bgrMaster,
};

export default palette;
