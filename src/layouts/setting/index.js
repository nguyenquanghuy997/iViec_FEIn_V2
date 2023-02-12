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
  padding: theme.spacing(0),
}));

const BoxWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  margin: "0 auto",
  padding: theme.spacing(4.5, 3, 0, 3),
  maxWidth: DASHBOARD_CONTENT_WIDTH,
}));

const BoxContentStyle = styled(Box)(({ isDesktop, theme }) => ({
  paddingLeft: isDesktop ? theme.spacing(4.5) : theme.spacing(0),
  minWidth: isDesktop ? "1020px" : "100%",
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
        <BoxWrapper>
          {isDesktop && <SideBarWrapper />}
          <BoxContentStyle isDesktop>{children}</BoxContentStyle>
        </BoxWrapper>
      </DashboardLayout>
    </AuthGuard>
  );
}
