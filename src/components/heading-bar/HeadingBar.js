import { DASHBOARD_CONTENT_WIDTH } from "@/config";
import { styled } from "@mui/styles";
import React from "react";

const HeadingBarStyle = styled("div")(({ theme }) => ({
  width: "100%",
  boxShadow: "0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)",
  backgroundColor: theme.palette.common.white,
  padding: theme.spacing(3, 0),
  position: 'fixed',
  left: 0,
  top: theme.spacing(8),
  zIndex: 1000
}));

const HeadingBarInnerStyle = styled("div")(({ theme }) => ({
  width: "100%",
  margin: '0 auto',
  position: 'relative',
  padding: '0 12px',
  "& .btn-collapse-header": {
    height: '30px',
    width: '30px',
    position: 'absolute',
    right: 0,
    bottom: -40,
    border: '1px solid ' + theme.palette.common.neutral100,
    boxShadow: '0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)',
    borderRadius: '50%',
    padding: 0
  },
  [theme.breakpoints.up("xl")]: {
    maxWidth: DASHBOARD_CONTENT_WIDTH,
    padding: theme.spacing(0, 3),
    "& .btn-collapse-header": {
      right: -40,
      bottom: -40,
    }
  },
  [theme.breakpoints.up("2k")]: {
    maxWidth: "100%",
    padding: theme.spacing(0, 34),
  },
}));


const HeadingBar = ({ children, ...props }) => {
  return (
    <HeadingBarStyle {...props}>
      <HeadingBarInnerStyle>{children}</HeadingBarInnerStyle>
    </HeadingBarStyle>
  );
};

export default HeadingBar;
