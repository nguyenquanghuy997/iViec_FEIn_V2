import { alpha } from '@mui/material/styles'

function createGradient(color1, color2) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`
}

// SETUP COLORS
const PRIMARY = {
  lighter: '#C8FACD',
  light: '#5BE584',
  main: '#00AB55',
  dark: '#007B55',
  darker: '#005249',
}
const SECONDARY = {
  lighter: '#D6E4FF',
  light: '#84A9FF',
  main: '#3366FF',
  dark: '#1939B7',
  darker: '#091A7A',
}
const INFO = {
  lighter: '#D0F2FF',
  light: '#74CAFF',
  main: '#1890FF',
  dark: '#0C53B7',
  darker: '#04297A',
}
const SUCCESS = {
  lighter: '#E9FCD4',
  light: '#AAF27F',
  main: '#54D62C',
  dark: '#229A16',
  darker: '#08660D',
}
const WARNING = {
  lighter: '#FFF7CD',
  light: '#FFE16A',
  main: '#FFC107',
  dark: '#B78103',
  darker: '#7A4F01',
}
const ERROR = {
  lighter: '#FFE7D9',
  light: '#FFA48D',
  main: '#FF4842',
  dark: '#B72136',
  darker: '#7A0C2E',
}

const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#172B4D',
  900: '#161C24',
  500_8: alpha('#919EAB', 0.08),
  500_12: alpha('#919EAB', 0.12),
  500_16: alpha('#919EAB', 0.16),
  500_24: alpha('#919EAB', 0.24),
  500_32: alpha('#919EAB', 0.32),
  500_48: alpha('#919EAB', 0.48),
  500_56: alpha('#919EAB', 0.56),
  500_80: alpha('#919EAB', 0.8),
}

const GRADIENTS = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main),
}

const CHART_COLORS = {
  violet: ['#826AF9', '#9E86FF', '#D0AEFF', '#F7D2FF'],
  blue: ['#2D99FF', '#83CFFF', '#A5F3FF', '#CCFAFF'],
  green: ['#2CD9C5', '#60F1C8', '#A4F7CC', '#C0F2DC'],
  yellow: ['#FFE700', '#FFEF5A', '#FFF7AE', '#FFF3D6'],
  red: ['#FF6C40', '#FF8F6D', '#FFBD98', '#FFF2D4'],
}

const COMMON = {
  common: { black: '#000', white: '#fff' },
  primary: { ...PRIMARY, contrastText: '#fff' },
  secondary: { ...SECONDARY, contrastText: '#fff' },
  info: { ...INFO, contrastText: '#fff' },
  success: { ...SUCCESS, contrastText: GREY[800] },
  warning: { ...WARNING, contrastText: GREY[800] },
  error: { ...ERROR, contrastText: '#fff' },
  grey: GREY,
  gradients: GRADIENTS,
  chart: CHART_COLORS,
  divider: GREY[500_24],
  action: {
    hover: GREY[500_8],
    selected: GREY[500_16],
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
}

const palette = {
  light: {
    ...COMMON,
    mode: 'light',
    text: {
      primary: '#172B4D',
      active: '#F77A0C',
      secondary: '#5C6A82',
      sub: '#455570',
      search: '#8A94A5',
      money: '#2E7D32',
      border: '#CCD4DC',
      placeholder: '#8A94A5',
      disabled: '#8A94A5',
      bgGray: '#F2F4F5',
      warning: '#E53935',
    },
    background: { active: '#FFF3E0', paper: '#fff', default: '#fff', neutral: GREY[200] },
    action: { active: GREY[600], ...COMMON.action },
  },
  dark: {
    ...COMMON,
    mode: 'dark',
    text: {
      primary: '#172B4D',
      active: '#F77A0C',
      secondary: '#5C6A82',
      sub: '#455570',
      search: '#8A94A5',
      money: '#2E7D32',
      border: '#CCD4DC',
      placeholder: '#8A94A5',
      disabled: '#8A94A5',
      bgGray: '#F2F4F5',
      warning: '#E53935',
    },
    background: { active: '#FFF3E0', paper: '#fff', default: '#fff', neutral: GREY[200] },
    action: { active: GREY[500], ...COMMON.action },
  },
}

export const STYLE_CONSTANT= {
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
  FONT_SEMIBOLD: 600,
  FONT_BOLD: 700,
  FONT_EXTRABOLD: 800,
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
  COLOR_WHITE: "#FDFDFD",
  COLOR_PRIMARY: "#1976D2",
  COLOR_TEXT_PRIMARY: "#455570",
  COLOR_TEXT_SECONDARY: "#5C6A82",
  COLOR_TEXT_BLACK: "#172B4D",
  COLOR_TEXT_GRAY: "#8A94A5",
  COLOR_TEXT_DANGER: "#E53935",
  COLOR_DIVIDER: "#E7E9ED",
  COLOR_SUCCESS: '#388E3C',
  COLOR_MAIN: "#F77A0C",
  // bg color
  BG_TRANSPARENT: "transparent",
  BG_LIGHT: "#FDFDFD",
  BG_WHITE: "#FDFDFD",
  BG_PRIMARY: "#1976D2",
  BG_GRAY: "#F2F4F5",
  BG_GRAY_LIGHT: "#F3F4F6",
};


export default palette
