// @mui
// config
import { ICON, NAVBAR } from "@/config";
import { SIDEBAR_CONSTANTS } from "@/layouts/setting/SideBarConfig";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ListItemStyle = styled(ListItemButton, {
  shouldForwardProp: (prop) =>
    prop !== "activeRoot" && prop !== "activeSub" && prop !== "subItem",
})(({ activeRoot, activeSub, subItem, theme, hasChildren }) => ({
  ...theme.typography.body2,
  position: "relative",
  // margin: theme.spacing(0, 0.5),
  padding: theme.spacing(1.5, 2, 1.5, 2),
  marginBottom: theme.spacing(0.5),
  borderRadius: theme.spacing(0.5),
  color: SIDEBAR_CONSTANTS.MENU_ITEM_COLOR,
  fontWeight: SIDEBAR_CONSTANTS.MENU_ITEM_WEIGHT,
  height: '44px',
  textTransform: "none",
  "&:hover": {
    backgroundColor: SIDEBAR_CONSTANTS.MENU_ITEM_ACTIVE_BG_COLOR,
    fontWeight: SIDEBAR_CONSTANTS.MENU_ITEM_ACTIVE_WEIGHT,
  },
  // activeRoot
  // this is root link item
  ...((activeRoot && !hasChildren ) && {
    ...theme.typography.subtitle2,
    color: SIDEBAR_CONSTANTS.MENU_ITEM_ACTIVE_COLOR,
    backgroundColor: SIDEBAR_CONSTANTS.MENU_ITEM_ACTIVE_BG_COLOR,
    fontWeight: SIDEBAR_CONSTANTS.MENU_ITEM_ACTIVE_WEIGHT,
    // padding: theme.spacing(1.5,2,1.5, 4.5),
    "&:after": {
      content: '""',
      position: "absolute",
      border: '2px solid #2196F3',
      display: "block",
      width: 0,
      height: '24px',
      zIndex: 1,
      top: "50%",
      transform: 'translateY(-50%)',
      left: theme.spacing(0),
      borderRadius: 1
    },
    "&:hover": {
      color: SIDEBAR_CONSTANTS.MENU_ITEM_ACTIVE_COLOR,
      backgroundColor: SIDEBAR_CONSTANTS.MENU_ITEM_ACTIVE_BG_COLOR,
    },
  }),
  // this is root item and has children
  ...((activeRoot && hasChildren ) && {
    ...theme.typography.subtitle2,
    color: SIDEBAR_CONSTANTS.MENU_ITEM_ACTIVE_COLOR,
    fontWeight: SIDEBAR_CONSTANTS.MENU_ITEM_ACTIVE_WEIGHT,
    "&:hover": {
      color: SIDEBAR_CONSTANTS.MENU_ITEM_ACTIVE_COLOR,
      backgroundColor: SIDEBAR_CONSTANTS.MENU_ITEM_ACTIVE_BG_COLOR,
    },
  }),
  // activeSub
  ...(activeSub && {
    ...theme.typography.subtitle2,
    color: SIDEBAR_CONSTANTS.MENU_ITEM_ACTIVE_COLOR,
    backgroundColor: SIDEBAR_CONSTANTS.MENU_ITEM_ACTIVE_BG_COLOR,
    "&:after": {
      content: '""',
      position: "absolute",
      border: '2px solid #2196F3',
      display: "block",
      width: 0,
      height: '24px',
      zIndex: 1,
      top: "50%",
      transform: 'translateY(-50%)',
      left: theme.spacing(0),
      borderRadius: 1
    },
  }),
  // subItem
  ...(subItem && {
    height: NAVBAR.DASHBOARD_ITEM_SUB_HEIGHT,
    padding: theme.spacing(1.5,2,1.5, 4.5),
  }),
}));

export const ListItemTextStyle = styled(ListItemText, {
  shouldForwardProp: (prop) => prop !== "isCollapse",
})(({ isCollapse, theme }) => ({
  whiteSpace: "nowrap",
  transition: theme.transitions.create(["width", "opacity"], {
    duration: theme.transitions.duration.shorter,
  }),
  ...(isCollapse && {
    width: 0,
    opacity: 0,
  }),
}));

export const ListItemIconStyle = styled(ListItemIcon)({
  width: ICON.NAVBAR_ITEM,
  height: ICON.NAVBAR_ITEM,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& svg": { width: "100%", height: "100%" },
});
