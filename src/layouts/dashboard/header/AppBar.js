// @mui
// components
import { IconLogoAppBarLight } from "@/assets/icon_logo_appbar";
// config
import { HEADER, DASHBOARD_CONTENT_WIDTH } from "@/config";
// hooks
import AccountPopover from "@/layouts/dashboard/header/AccountPopover";
// utils
import cssStyles from "@/utils/cssStyles";
import { AppBar, Stack, Toolbar, Link, } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import NextLink from "next/link";
import { PATH_DASHBOARD } from "@/routes/paths";
import NavbarMenu from "../navbar/NavbarMenu";
import NavItemContent from "@/components/nav-section/horizontal/NavItem";
import { ListItemStyle } from "@/components/nav-section/horizontal/style";
import Iconify from "@/components/Iconify";

const RootStyle = styled(AppBar)(({ theme }) => ({
  ...cssStyles(theme).bgBlur(),
  boxShadow: "none",
  height: HEADER.MOBILE_HEIGHT,
  zIndex: theme.zIndex.appBar + 1,
  transition: theme.transitions.create(["width", "height"], { duration: theme.transitions.duration.shorter, }),
  [theme.breakpoints.up("lg")]: {
    height: HEADER.MOBILE_HEIGHT, // 64
    backgroundColor: '#263240',
    width: '100%',
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  maxWidth: DASHBOARD_CONTENT_WIDTH,
  width: '100%',
  margin: '0 auto',
  [theme.breakpoints.up("lg")]: {
    height: HEADER.MOBILE_HEIGHT, // 64
    backgroundColor: '#263240',
    width: '100%',
    padding: theme.spacing(0, 3)
  },
  [theme.breakpoints.up("md")]: {
    height: HEADER.MOBILE_HEIGHT, // 64
    backgroundColor: '#263240',
    width: '100%',
  },
}));

DashboardAppBar.propTypes = {
  isCollapse: PropTypes.bool,
  onOpenSidebar: PropTypes.func,
  verticalLayout: PropTypes.bool,
};

export default function DashboardAppBar() {
  return (
    <RootStyle>
      <ToolbarStyle>
        <Stack>
          <NextLink href={PATH_DASHBOARD.dashboard} passHref>
            <Link>
              <IconLogoAppBarLight />
            </Link>
          </NextLink>
        </Stack>
        <Stack sx={{ flexGrow: 1, mx: 4.5, display: 'flex', alignItems: 'center' }}>
          <NavbarMenu />
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 1.5 }}
        >
          <Stack sx={{ mr: 1 }}>
            <NextLink href={'/settings/pipeline'} passHref>
              <ListItemStyle>
                <NavItemContent icon={<Iconify icon='material-symbols:settings' />} title="Thiết lập" />
              </ListItemStyle>
            </NextLink>
          </Stack>
          <AccountPopover />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}
