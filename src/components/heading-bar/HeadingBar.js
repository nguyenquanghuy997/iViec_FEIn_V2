import { DASHBOARD_CONTENT_WIDTH } from "@/config";
import { styled } from "@mui/styles";
import React from "react";

const HeadingBarStyle = styled("div")(() => ({
  width: "100%",
  boxShadow: "0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)",
  backgroundColor: "#FDFDFD",
}));

const HeadingBarInnerStyle = styled("div")(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(3),
  margin: '0 auto',
  maxWidth: DASHBOARD_CONTENT_WIDTH,
  [theme.breakpoints.up(1920)]: {
    maxWidth: "100%",
    padding: theme.spacing(0, 34),
  },
}));

const HeadingBar = ({ children }) => {
  return (
    <HeadingBarStyle>
      <HeadingBarInnerStyle>{children}</HeadingBarInnerStyle>
    </HeadingBarStyle>
  );
};

export default HeadingBar;
