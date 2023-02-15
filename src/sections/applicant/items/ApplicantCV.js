import { Box, Grid } from "@mui/material";
import React from "react";
// import FileViewer from "react-file-viewer";

export const ApplicantCV = () => {
  // const onError =(e)=>{
  //   console.log(e, "error in file-viewer");
  // }
  return (
    <Grid item sx={{ padding: "24px 0 0 0" }}>
      <Box sx={{ backgroundColor: "#F2F4F5", borderRadius: "4px", p: 2 }}>
      {/* <div className="App">
      <h1>React File Viewer Demo</h1>
      <h2>Displaying file extensions:</h2>

      <summary>.pdf</summary> */}
      {/* <FileViewer
        fileType="pdf"
        filePath="../../../../public/test.pdf"
        onError={onError}
      /> */}
    {/* </div> */}
      </Box>
    </Grid>
  );
};
