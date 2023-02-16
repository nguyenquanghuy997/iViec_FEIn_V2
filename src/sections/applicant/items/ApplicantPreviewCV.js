import { ApplicantInfo } from "./ApplicationInfo";
import {ApplicantCV} from './ApplicantCV'
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Grid, Box } from "@mui/material";
import Tab from "@mui/material/Tab";
import React, { useState } from "react";

export const ApplicantPreviewCV = () => {
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    console.log(event)
    setValue(newValue);
  };
  return (
    <Grid item sx={{ padding: "24px 24px 0 24px" }}>
      <Box sx={{ width: "100%", typography: "body1", mb: 3 }}>
        <TabContext value={value}>
          <Box>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              sx={{
                "& .Mui-selected": {
                  color: "white !important",
                  backgroundColor: "#455570",
                  borderRadius: "6px",
                  padding: "0 12px",
                },
                "& .MuiTabs-indicator": {
                  display: "none",
                },
              }}
            >
              <Tab
                label="CV"
                value="1"
                sx={{
                  "&:not(:last-of-type)": {
                    marginRight: "28px",
                  },
                  '& button':{
                    fontSize:'14px'
                  }
                }}
              />
              <Tab label="Thông tin ứng viên" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1"><ApplicantCV /></TabPanel>
          <TabPanel value="2">
            <ApplicantInfo />
          </TabPanel>
        </TabContext>
      </Box>
    </Grid>
  );
};
