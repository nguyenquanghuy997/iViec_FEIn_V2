import SideBar from "./SideBar";
import { sidebarConfig, SIDEBAR_CONSTANTS } from "./SideBarConfig";
import { NAVBAR } from "@/config";
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
  padding: theme.spacing(0),
}));

const SideBarWrapper = ({ isOpenSidebar, onCloseSidebar }) => {
  const { pathname } = useRouter();
  const isDesktop = useResponsive("up", "lg");
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
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{ sx: { width: NAVBAR.DASHBOARD_WIDTH } }}
        >
          <SideBar navConfig={sidebarConfig} isCollapse={isCollapse} />
        </Drawer>
      )}

      {isDesktop && (
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
  const isDesktop = useResponsive("up", "lg");
  return (
    <AuthGuard>
      <DashboardLayout roles={roles}>
        <Box sx={{ display: "flex" }}>
          {isDesktop && <SideBarWrapper />}
          <Box sx={{ width: "100%", paddingLeft: isDesktop ? 4.5 : 0 }}>
            {children}
          </Box>
        </Box>
      </DashboardLayout>
    </AuthGuard>
  );
}
