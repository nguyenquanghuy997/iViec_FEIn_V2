import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Grid, Box } from "@mui/material";
import Tab from "@mui/material/Tab";
import React, { useState } from "react";
import { Activities } from "./DetailApplicantRight/Activities";

export const ApplicantPreviewLog = () => {
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    console.log(event)
    setValue(newValue);
  };
  return (
    <Grid item style={{padding:'24px 24px 0 24px'}}>
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
                label="Tất cả hoạt động"
                value="1"
                sx={{
                  "&:not(:last-of-type)": {
                    marginRight: "16px",
                  },
                }}
              />
              <Tab label="Thi tuyển và phỏng vấn" value="2" />
              <Tab label="Đánh giá và Offer" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Activities />
          </TabPanel>
          <TabPanel value="2">
            "hi"
          </TabPanel>
        </TabContext>
      </Box>
    </Grid>
  );
};
