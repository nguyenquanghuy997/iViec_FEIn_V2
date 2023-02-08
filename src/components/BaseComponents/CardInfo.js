import { CardLabelStyle, CardSubInfoLabelStyle } from "@/sections/auth/style";
import { Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

// Card Label
export const CardInfoLabel = ({ variant, label, ...props }) => {
  return (
    <>
      <Typography
        variant={variant}
        {...props}
        sx={{ ...CardLabelStyle, ...props?.sx }}
      >
        {label}
      </Typography>
    </>
  );
};
CardInfoLabel.propTypes = {
  variant: PropTypes.string,
  label: PropTypes.string,
};
CardInfoLabel.defaultProps = {
  variant: "body1",
  label: "",
};

// Card Sub Label
export const CardSubInfoLabel = ({ variant, children, ...props }) => {
  return (
    <>
      <Typography
        variant={variant}
        {...props}
        sx={{ ...CardSubInfoLabelStyle, ...props?.sx }}
      >
        {children}
      </Typography>
    </>
  );
};
CardSubInfoLabel.propTypes = {
  variant: PropTypes.string,
  label: PropTypes.string,
};
CardSubInfoLabel.defaultProps = {
  variant: "body2",
  label: "",
};

// Card Image/Icon
export const CardInfoIcon = ({ children, ...props }) => {
  return <Stack {...props}>{children}</Stack>;
};
CardInfoIcon.propTypes = {
  children: PropTypes.node.isRequired,
};

// Card Body
export const CardInfoBody = ({ children, ...props }) => {
  return <Stack {...props}>{children}</Stack>;
};
CardInfoBody.propTypes = {
  children: PropTypes.node.isRequired,
  tag: PropTypes.string,
};
CardInfoBody.defaultProps = {
  tag: "div",
};

// Card Wrapper
const CardInfo = ({ children, ...props }) => {
  return <Stack {...props}>{children}</Stack>;
};
CardInfo.propTypes = {
  children: PropTypes.node.isRequired,
  tag: PropTypes.string,
};
CardInfo.defaultProps = {
  tag: "div",
};

export default CardInfo;
