import React from 'react';
import PropTypes from 'prop-types';
import LoadingButton from '@mui/lab/LoadingButton';
import {STYLE_CONSTANT as style} from "@/theme/palette";
import {createTheme, ThemeProvider} from "@mui/material/styles";

const MuiButton = ({title, type, variant, size, color, startIcon, endIcon, sx, loading, ...props}) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: style.COLOR_PRIMARY,
        contrastText: style.COLOR_WHITE,
      },
      default: {
        main: "#F2F4F5",
        darker: '#053e85',
        contrastText: style.COLOR_TEXT_PRIMARY,
      },
      secondary: {
        main: "#F77A0C",
        contrastText: style.COLOR_WHITE,
      },
      basic: {
        main: style.COLOR_WHITE,
        contrastText: style.COLOR_TEXT_PRIMARY,
      },
      success: {
        main: style.COLOR_SUCCESS,
        contrastText: style.COLOR_WHITE,
      },
      error: {
        main: "#D32F2F",
        contrastText: style.COLOR_WHITE,
      },
      warning: {
        main: "#FBBD2B",
        contrastText: style.COLOR_WHITE,
      },
      dark: {
        main: "#455570",
        contrastText: style.COLOR_WHITE,
      },
    },
  });

  const sxProps = {
    padding: '12px 16px',
    borderRadius: '6px',
    textTransform: 'none',
    maxHeight: '44px',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: style.FONT_SM,
    fontWeight: style.FONT_MEDIUM,
    boxShadow: 'none',
    "&:hover": {
      backgroundColor: {theme},
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
    },
    "&:focus": {
      boxShadow: "none",
    },
    ...sx,
  }
  return (
      <ThemeProvider theme={theme}>
        <LoadingButton
            loading={loading}
            variant={variant}
            type={type}
            size={size}
            startIcon={startIcon}
            endIcon={endIcon}
            color={color}
            sx={{...sxProps}}
            {...props}
        >
          {title}
        </LoadingButton>
      </ThemeProvider>
  )
}

MuiButton.propTypes = {
  title: PropTypes.any,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  color: PropTypes.oneOf(['primary', 'secondary', 'default', 'basic', 'success', 'error', 'warning']),
  variant: PropTypes.oneOf(['contained', 'outlined']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  startIcon: PropTypes.any,
  endIcon: PropTypes.any,
  loading: PropTypes.bool,
};

MuiButton.defaultProps = {
  title: "",
  type: 'button',
  color: "primary",
  size: "medium",
  variant: "contained",
  startIcon: null,
  endIcon: null,
  loading: false
};

export default MuiButton;