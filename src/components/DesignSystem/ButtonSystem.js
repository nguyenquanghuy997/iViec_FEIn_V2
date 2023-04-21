import PropTypes from 'prop-types';
import { LoadingButton } from '@mui/lab';
import { createTheme, ThemeProvider } from "@mui/material/styles";

const ButtonSystem = ({
  height = 44,
  loading = false,
  styles = {},
  sx = {},
  border = true,
  color,
  hoverColor,
  variant,
  width,
  onRef,
  children,
  ...props
}) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1976D2",
        contrastText: "#fff",
      },
      secondary: {
        main: "#F77A0C",
        contrastText: "#fff",
      },
      basic: {
        main: "#455570",
        contrastText: "#fff",
      },
      success: {
        main: "#388E3C",
        contrastText: "#fff",
      },
      error: {
        main: "#D32F2F",
        contrastText: "#fff",
      },
      warning: {
        main: "#FBBD2B",
        contrastText: "#fff",
      },
      default: {
        main: '#F3F4F6',
        contrastText: '#455570',
      },
      active: {
        main: '#FFF3E0',
        contrastText: '#F26A12',
      },
      successOpacity: {
        main: '#E8F5E9',
        contrastText: '#388E3C',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <LoadingButton
        color={color}
        loading={loading}
        variant={variant}
        sx={{
          ...(width ? { width } : {}),
          ...(!border && { border: 'none' }),
          fontFamily: 'inherit',
          boxShadow: 'none',
          minHeight: height,
          borderRadius: '6px',
          lineHeight: 1.5,
          textTransform: 'none',
          fontWeight: 600,
          px: 2,
          "&:hover": {
            backgroundColor: { hoverColor },
            boxShadow: "none",
            ...(!border && { border: 'none' }),
          },
          "&:active": {
            boxShadow: "none",
          },
          ...styles,
          ...sx,
        }}
        {...(onRef && {ref: (ref) => onRef(ref)})}
        {...props}
      >
        {children}
      </LoadingButton>
    </ThemeProvider>
  );
}

ButtonSystem.propTypes = {
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  loading: PropTypes.bool,
  icon: PropTypes.node,
  styles: PropTypes.object,
  sx: PropTypes.object,
  color: PropTypes.string,
  hoverColor: PropTypes.string,
  variant: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  children: PropTypes.node,
  ...LoadingButton.propTypes
}

export default ButtonSystem;