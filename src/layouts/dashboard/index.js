// import InstructionPopover from "../InstructionPopover";
import DashboardAppBar from "./header/AppBar";
import NavbarVertical from "./navbar/NavbarVertical";
import {HEADER, NAVBAR} from "@/config";
import useCollapseDrawer from "@/hooks/useCollapseDrawer";
import useResponsive from "@/hooks/useResponsive";
import useSettings from "@/hooks/useSettings";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useState } from "react";
import useRole from "@/hooks/useRole";
import Page403 from '@/pages/403';

const WrapperStyle = styled("div")(({ theme }) => ({
  maxWidth: "100%",
  minHeight: "100%",
  backgroundColor: "#F2F4F5",
  margin: theme.spacing(0),
  padding: theme.spacing(0),
}));

const MainStyle = styled("main", { shouldForwardProp: (prop) => prop !== "collapseClick"})(({ collapseClick, theme }) => ({
  position: 'relative',
  // paddingBottom: 24,
  paddingTop: HEADER.MOBILE_HEIGHT,
  [theme.breakpoints.up("xl")]: {
    width: "100%",
    transition: theme.transitions.create("margin-left", {
      duration: theme.transitions.duration.shorter,
    }),
    ...(collapseClick && {
      marginLeft: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
    }),
  },
  [theme.breakpoints.up("2k")]: {
    width: "100%",
    maxWidth: '100%',
    transition: theme.transitions.create("margin-left", {
      duration: theme.transitions.duration.shorter,
    }),
    ...(collapseClick && {
      marginLeft: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
    }),
  },
}));

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
  permissions: PropTypes.arrayOf(PropTypes.string), // Example ['ViewJob', 'ViewCandidate']
};

export default function DashboardLayout({ children, permissions }) {
  const { canAccess } = useRole();

  if (!canAccess(permissions)) {
    return <Page403 />
  }

  const { collapseClick, isCollapse } = useCollapseDrawer();
  const { themeLayout } = useSettings();
  const isDesktop = useResponsive("up", "lg");

  const [open, setOpen] = useState(false);
  const verticalLayout = themeLayout === "vertical";

  if (verticalLayout) {
    return (
      <>
        <DashboardAppBar
          onOpenSidebar={() => setOpen(true)}
          verticalLayout={verticalLayout}
        />
        {!isDesktop && verticalLayout && (
          <NavbarVertical
            isOpenSidebar={open}
            onCloseSidebar={() => setOpen(false)}
          />
        )}
        <WrapperStyle>
          <MainStyle collapseClick={collapseClick}>
            {children}
          </MainStyle>
          {/*<InstructionPopover />*/}
        </WrapperStyle>
      </>
    );
  }

  return (
    <Box
      sx={{
        display: { lg: "flex" },
        minHeight: { lg: 1 },
      }}
    >
      <DashboardAppBar
        isCollapse={isCollapse}
        onOpenSidebar={() => setOpen(true)}
      />
      <WrapperStyle>
        <MainStyle collapseClick={collapseClick}>
          {children}
        </MainStyle>
        {/*<InstructionPopover />*/}
      </WrapperStyle>
    </Box>
  );
}
