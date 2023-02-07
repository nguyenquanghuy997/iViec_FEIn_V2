
import Button from "@mui/material/Button";
import * as React from "react";

export default function ButtonIcon({content}) {
  return(
    <Button variant="text" sx={{ padding: `13.67px 13.67px`, minWidth: `44px` }}>
      {content}
    </Button>

  );
}
