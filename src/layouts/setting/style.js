import { NAVBAR } from "@/config";
import { styled } from "@mui/material/styles";

export const ListItemStyle = styled("div")(({ theme }) => ({
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
}));
