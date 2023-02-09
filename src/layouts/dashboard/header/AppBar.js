// @mui
// components
import NavbarMenu from "../navbar/NavbarMenu";
import { IconLogoAppBarLight } from "@/assets/icon_logo_appbar";
import Iconify from "@/components/Iconify";
import { IconButtonAnimate } from "@/components/animate";
import NavItemContent from "@/components/nav-section/horizontal/NavItem";
import { ListItemStyle } from "@/components/nav-section/horizontal/style";
// config
import { HEADER, DASHBOARD_CONTENT_WIDTH } from "@/config";
// hooks
// hooks
import useOffSetTop from "@/hooks/useOffSetTop";
import useResponsive from "@/hooks/useResponsive";
//
import AccountPopover from "@/layouts/dashboard/header/AccountPopover";
import { PATH_DASHBOARD } from "@/routes/paths";
// utils
import cssStyles from "@/utils/cssStyles";
import { AppBar, Stack, Toolbar, Link } from "@mui/material";
import { styled } from "@mui/material/styles";
import NextLink from "next/link";
import PropTypes from "prop-types";

const RootStyle = styled(AppBar, {
  shouldForwardProp: (prop) =>
    prop !== "isCollapse" && prop !== "isOffset" && prop !== "verticalLayout",
})(({ isCollapse, isOffset, verticalLayout, theme }) => ({
  ...cssStyles(theme).bgBlur(),
  boxShadow: "none",
  height: HEADER.MOBILE_HEIGHT,
  zIndex: theme.zIndex.appBar + 1,
  transition: theme.transitions.create(["width", "height"], {
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up("lg")]: {
    height: HEADER.MOBILE_HEIGHT, // 64
    backgroundColor: "#263240",
    width: "100%",
    ...(isCollapse && {
      width: `100%`,
    }),
    ...(isOffset && {
      height: HEADER.MOBILE_HEIGHT,
    }),
    ...(verticalLayout && {
      width: "100%",
      height: HEADER.MOBILE_HEIGHT,
      backgroundColor: "#263240",
    }),
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  maxWidth: DASHBOARD_CONTENT_WIDTH,
  width: "100%",
  margin: "0 auto",
  [theme.breakpoints.up("lg")]: {
    height: HEADER.MOBILE_HEIGHT, // 64
    backgroundColor: "#263240",
    width: "100%",
    padding: theme.spacing(0, 3),
  },
  [theme.breakpoints.up("md")]: {
    height: HEADER.MOBILE_HEIGHT, // 64
    backgroundColor: "#263240",
    width: "100%",
  },
}));

DashboardAppBar.propTypes = {
  isCollapse: PropTypes.bool,
  onOpenSidebar: PropTypes.func,
  verticalLayout: PropTypes.bool,
};

export default function DashboardAppBar({
  onOpenSidebar,
  isCollapse = false,
  verticalLayout = false,
}) {
  const isOffset =
    useOffSetTop(HEADER.DASHBOARD_DESKTOP_HEIGHT) && !verticalLayout;

  const isDesktop = useResponsive("up", "lg");
  return (
    <RootStyle
      isCollapse={isCollapse}
      isOffset={isOffset}
      verticalLayout={verticalLayout}
    >
      <ToolbarStyle>
        {isDesktop && verticalLayout && (
          <Stack>
            <NextLink href={PATH_DASHBOARD.dashboard} passHref>
              <Link>
                <IconLogoAppBarLight />
              </Link>
            </NextLink>
          </Stack>
        )}

        {!isDesktop && (
          <IconButtonAnimate
            onClick={onOpenSidebar}
            sx={{ mr: 1, color: "text.primary" }}
          >
            <Iconify icon="eva:menu-2-fill" />
          </IconButtonAnimate>
        )}

        {isDesktop && verticalLayout && (
          <Stack
            sx={{ flexGrow: 1, mx: 4.5, display: "flex", alignItems: "center" }}
          >
            <NavbarMenu />
          </Stack>
        )}
        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 1.5 }}
        >
          <Stack sx={{ mr: 1 }}>
            <NextLink href={"/settings/companyinfor"} passHref>
              <ListItemStyle>
                <NavItemContent
                  icon={<Iconify icon="material-symbols:settings" />}
                  title="Thiết lập"
                />
              </ListItemStyle>
            </NextLink>
          </Stack>
          <AccountPopover />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}
