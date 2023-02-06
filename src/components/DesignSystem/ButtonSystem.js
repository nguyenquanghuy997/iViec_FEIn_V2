import Button from "@mui/material/Button";
import * as React from "react";

export default function ButtonSystem({ className, icon, text, variant }) {
  return (
    <div>
      <Button
        className={className}
        variant={variant}
        startIcon={icon}
        endIcon={icon}
      >
        {text}
      </Button>
    </div>
  );
}
