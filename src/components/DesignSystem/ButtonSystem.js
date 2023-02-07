import { LoadingButton } from "@mui/lab";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as React from "react";

export default function ButtonSystem({
  loading,
  color,
  hoverColor,
  icon,
  text,
  variant,
  width,
  
}) {
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
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <LoadingButton
        color={color}
        loading={loading}
        loadingPosition="end"
        variant={variant}
        startIcon={icon}
        endIcon={icon}
        sx={{ width: { width }, minHeight: "44px", borderRadius: "6px",
        "&:hover": {
          backgroundColor: { hoverColor },
          // borderColor: '',
          boxShadow: "none",
        },
        "&:active": {
          boxShadow: "none",
          // backgroundColor: '',
          // borderColor: "#005cbf",
        },
        "&:focus": {
          // boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
        },}}
      >
        {text}
      </LoadingButton>
    </ThemeProvider>
  );
}
