// @mui
// components
import NavbarMenu from "../navbar/NavbarMenu";
import {IconLogoAppBarLight} from "@/assets/icon_logo_appbar";
import Iconify from "@/components/Iconify";
import {IconButtonAnimate} from "@/components/animate";
import {getActive} from "@/components/nav-section";
import {NavItemRoot} from "@/components/nav-section/vertical/NavItem";
// config
import {DASHBOARD_CONTENT_WIDTH, HEADER, PERMISSION_GROUPS } from "@/config";
// hooks
// hooks
import useOffSetTop from "@/hooks/useOffSetTop";
import useResponsive from "@/hooks/useResponsive";
//
import AccountPopover from "@/layouts/dashboard/header/AccountPopover";
import NotificationsPopover from './NotificationsPopover'
import {PATH_DASHBOARD} from "@/routes/paths";
// utils
import cssStyles from "@/utils/cssStyles";
import {AppBar, Link, Stack, Toolbar} from "@mui/material";
import {styled} from "@mui/material/styles";
import NextLink from "next/link";
import {useRouter} from "next/router";
import PropTypes from "prop-types";
import useRole from "@/hooks/useRole";

const RootStyle = styled(AppBar, { shouldForwardProp: (prop) => prop !== "isCollapse" && prop !== "isOffset" && prop !== "verticalLayout",})(({isCollapse, isOffset, verticalLayout, theme}) => ({
    ...cssStyles(theme).bgBlur(),
    boxShadow: "none",
    // height: HEADER.MOBILE_HEIGHT,
    zIndex: theme.zIndex.appBar + 1,
    transition: theme.transitions.create(["width", "height"], {
        duration: theme.transitions.duration.shorter,
    }),
    [theme.breakpoints.up("xl")]: {
        height: HEADER.MOBILE_HEIGHT,
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

const ToolbarStyle = styled(Toolbar)(({theme}) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    margin: "0 auto",
    backgroundColor: "#263240",
    height: HEADER.MOBILE_HEIGHT, // 64
    [theme.breakpoints.down("md")]: {
        backgroundColor: "white",
    },
    [theme.breakpoints.up("xl")]: {
        maxWidth: DASHBOARD_CONTENT_WIDTH,
        padding: theme.spacing(0, 3),
    },
    [theme.breakpoints.up("2k")]: {
        maxWidth: "100%",
        height: HEADER.MOBILE_HEIGHT, // 64
        padding: theme.spacing(0, 34),
    },
}));

DashboardAppBar.propTypes = {
    isCollapse: PropTypes.bool,
    onOpenSidebar: PropTypes.func,
    verticalLayout: PropTypes.bool,
};

export default function DashboardAppBar({ onOpenSidebar, isCollapse = false, verticalLayout = false }) {
    const { canAccess } = useRole();
    const router = useRouter();
    const activeSettingPath = getActive(
        "/settings",
        router.pathname,
        router.asPath
    );
    const isOffset =
        useOffSetTop(HEADER.DASHBOARD_DESKTOP_HEIGHT) && !verticalLayout;

    const isDesktop = useResponsive("up", "lg");
    return (
        <RootStyle isCollapse={isCollapse} isOffset={isOffset} verticalLayout={verticalLayout}>
            <ToolbarStyle>
                {isDesktop && verticalLayout && (
                    <Stack>
                        <NextLink href={PATH_DASHBOARD.dashboard} passHref>
                            <Link>
                                <IconLogoAppBarLight/>
                            </Link>
                        </NextLink>
                    </Stack>
                )}

                {!isDesktop && (
                    <IconButtonAnimate
                        onClick={onOpenSidebar}
                        sx={{mr: 1, color: "text.primary"}}
                    >
                        <Iconify icon="eva:menu-2-fill"/>
                    </IconButtonAnimate>
                )}

                {isDesktop && verticalLayout && (
                    <Stack
                        sx={{flexGrow: 1, mx: 4.5, display: "flex", alignItems: "center"}}
                    >
                        <NavbarMenu/>
                    </Stack>
                )}
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={{xs: 0.5, sm: 1.5}}
                >
                    {isDesktop && verticalLayout && canAccess(PERMISSION_GROUPS.ACCESS_SETTINGS) && (
                        <NavItemRoot
                            item={{
                                icon: <Iconify icon="material-symbols:settings"/>,
                                path: "/settings/companyinfor",
                                title: "Thiết lập",
                            }}
                            active={activeSettingPath}
                        />
                    )}
                    <NotificationsPopover/>
                    <AccountPopover/>
                </Stack>
            </ToolbarStyle>
        </RootStyle>
    );
}
