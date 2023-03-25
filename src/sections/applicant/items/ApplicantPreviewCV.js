import { ApplicantInfo } from "./ApplicationInfo";
import {ApplicantCV} from './ApplicantCV'
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Grid, Box } from "@mui/material";
import Tab from "@mui/material/Tab";
import React, { useState } from "react";

export const ApplicantPreviewCV = ({data}) => {
  const [value, setValue] = useState("2");
  const handleChange = (event, newValue) => {
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
                "& .MuiTab-root":{
                  minHeight: '36px',
                  textTransform: 'unset',
                  padding: "8px 12px",
                },
                "& .Mui-selected": {
                  color: "white !important",
                  backgroundColor: "#455570",
                  borderRadius: "6px",
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
                    marginRight: "16px",
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
            <ApplicantInfo data={data} />
          </TabPanel>
        </TabContext>
      </Box>
    </Grid>
  );
};
