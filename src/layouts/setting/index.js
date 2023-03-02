import SideBar from "./SideBar";
import { sidebarConfig, SIDEBAR_CONSTANTS } from "./SideBarConfig";
import { NAVBAR, DASHBOARD_CONTENT_WIDTH } from "@/config";
// guards
import AuthGuard from "@/guards/AuthGurad";
import useCollapseDrawer from "@/hooks/useCollapseDrawer";
import useResponsive from "@/hooks/useResponsive";
// components
import DashboardLayout from "@/layouts/dashboard";
import styled from "@emotion/styled";
import { Drawer } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useEffect } from "react";

const RootStyle = styled("div")(({ theme }) => ({
  minWidth: SIDEBAR_CONSTANTS.SIDEBAR_WIDTH,
  paddingLeft: theme.spacing(3),
}));

const BoxWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  margin: "0 auto",
  [theme.breakpoints.up("lg")]: {
    paddingTop: theme.spacing(4.5),
    width: DASHBOARD_CONTENT_WIDTH,
  },
  [theme.breakpoints.up("2k")]: {
    paddingTop: theme.spacing(4.5),
    width: "100%",
  },
}));

const BoxContentStyle = styled(Box)(({ isdesktop, theme }) => ({
  marginLeft: isdesktop ? theme.spacing(4.5) : theme.spacing(0),
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${SIDEBAR_CONSTANTS.SIDEBAR_WIDTH}px - ${theme.spacing(
      4.5
    )} - ${theme.spacing(3)})`,
  },
  [theme.breakpoints.up("2k")]: {
    width: "100%",
  },
}));

const SideBarWrapper = ({ isOpenSidebar, onCloseSidebar }) => {
  const { pathname } = useRouter();
  const isdesktop = useResponsive("up", "lg");
  const { isCollapse, collapseClick } = useCollapseDrawer();
  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
  }, [pathname]);

  return (
    <RootStyle
      sx={{
        width: {
          lg: isCollapse
            ? NAVBAR.DASHBOARD_COLLAPSE_WIDTH
            : NAVBAR.DASHBOARD_WIDTH,
        },
        ...(collapseClick && {
          position: "absolute",
        }),
      }}
    >

      {!isdesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{ sx: { width: NAVBAR.DASHBOARD_WIDTH } }}
        >
          <SideBar navConfig={sidebarConfig} isCollapse={isCollapse} />
        </Drawer>
      )}

      {isdesktop && (
        <SideBar navConfig={sidebarConfig} isCollapse={isCollapse} />
      )}
    </RootStyle>
  );
};

SideBarWrapper.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function SettingLayout({ roles, children }) {
  const isdesktop = useResponsive("up", "lg");
  return (
    <AuthGuard>
      <DashboardLayout roles={roles}>
        <BoxWrapper>
          {isdesktop && <SideBarWrapper />}
          <BoxContentStyle isdesktop={isdesktop.toString()}>{children}</BoxContentStyle>
        </BoxWrapper>
      </DashboardLayout>
    </AuthGuard>
  );
}
