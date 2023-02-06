import { Card, CardContent, Grid } from "@mui/material";
import React from "react";
import { ApplicantPreviewCV } from "./ApplicantPreviewCV";
import { ApplicantPreviewLog } from "./ApplicantPreviewLog";


function ApplicantPreviewItem({}) {

  return (
    <Card
      sx={{
        height: "fit-content",
        "& .MuiTableContainer-root": { padding: 0 },
      }}
    >
      <CardContent>
        <Grid item xs={12} md={7}>

          <div>{"Thông tin uv"}</div>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={7}>
            <ApplicantPreviewCV />
          </Grid>
          <Grid item xs={5} md={5}>
            <ApplicantPreviewLog />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default ApplicantPreviewItem;
