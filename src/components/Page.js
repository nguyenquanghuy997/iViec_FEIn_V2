import { DASHBOARD_CONTENT_WIDTH } from "@/config";
import styled from "@emotion/styled";
// @mui
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef } from "react";

const PageStyle = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3, 0),
  margin: '0 auto',
  [theme.breakpoints.up("lg")]: {
    width: "100%",
    maxWidth: DASHBOARD_CONTENT_WIDTH,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  [theme.breakpoints.up("xl")]: {
    width: "100%",
    maxWidth: "100%",
    paddingLeft: theme.spacing(34),
    paddingRight: theme.spacing(34),
    transition: theme.transitions.create("margin-left", {
      duration: theme.transitions.duration.shorter,
    }),
  },
}));

const Page = forwardRef(({ children, ...other }, ref) => (
  <PageStyle ref={ref} {...other}>
    {children}
  </PageStyle>
));

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  meta: PropTypes.node,
};

export default Page;
