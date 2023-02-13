// @mui
// config
import { ICON, NAVBAR } from "@/config";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ListItemStyle = styled(ListItemButton, {
  shouldForwardProp: (prop) =>
    prop !== "activeRoot" && prop !== "activeSub" && prop !== "subItem",
})(({ activeRoot, activeSub, subItem, theme }) => ({
  // ...theme.typography.body2,
  // position: 'relative',
  // height: NAVBAR.DASHBOARD_ITEM_ROOT_HEIGHT,
  // textTransform: 'capitalize',
  // paddingLeft: theme.spacing(2),
  // paddingRight: theme.spacing(1.5),
  // marginBottom: theme.spacing(0.5),
  // color: theme.palette.text.secondary,
  // borderRadius: theme.shape.borderRadius,
  ...theme.typography.body2,
  margin: theme.spacing(0, 0.5),
  padding: theme.spacing(1, 2),
  borderRadius: theme.spacing(0.75),
  color: NAVBAR.DASHBOARD_MENU_ITEM_COLOR,
  fontWeight: NAVBAR.MENU_ITEM_WEIGHT_SEMIBOLD,
  textTransform: "none",
  height: NAVBAR.DASHBOARD_ITEM_HORIZONTAL_MENU_HEIGHT,
  "&:hover": {
    color: NAVBAR.DASHBOARD_MENU_ITEM_ACTIVE_COLOR,
    backgroundColor: NAVBAR.DASHBOARD_MENU_ITEM_BG_COLOR,
  },
  // activeRoot
  ...(activeRoot && {
    // ...theme.typography.subtitle2,
    // color: theme.palette.primary.main,
    // backgroundColor: alpha(
    //   theme.palette.primary.main,
    //   theme.palette.action.selectedOpacity
    // ),
    ...theme.typography.subtitle2,
    color: NAVBAR.DASHBOARD_MENU_ITEM_ACTIVE_COLOR,
    backgroundColor: NAVBAR.DASHBOARD_MENU_ITEM_BG_COLOR,
    "&:hover": {
      color: NAVBAR.DASHBOARD_MENU_ITEM_ACTIVE_COLOR,
      backgroundColor: NAVBAR.DASHBOARD_MENU_ITEM_BG_COLOR,
    },
  }),
  // activeSub
  ...(activeSub && {
    ...theme.typography.subtitle2,
    color: theme.palette.text.primary,
  }),
  // subItem
  ...(subItem && {
    height: NAVBAR.DASHBOARD_ITEM_SUB_HEIGHT,
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
