import Button from "@mui/material/Button";
import * as React from "react";

export default function ButtonSystem({ color, icon, text, variant }) {
  return (
    <div>
      <Button
        color={color}
        variant={variant}
        startIcon={icon}
        endIcon={icon}
        sx={{ width: "444px", minHeight: "44px", borderRadius: "6px",}}
      >
        {text}
      </Button>
    </div>
  );
}
