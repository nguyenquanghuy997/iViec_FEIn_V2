import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Grid, Box } from "@mui/material";
import Tab from "@mui/material/Tab";
import React from "react";
import PersonalInterview from './PersonalInterview'

export const FormInterview = ({handleChange,value}) => {
  return (
    <Grid item sx={{ padding: "24px 24px 0 24px" }}>
      <Box sx={{ width: "100%", typography: "body1", mb: 3 }}>
        <TabContext value={value}>
          <Box>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              sx={{
                "& .MuiTab-root": {
                  minHeight: "36px",
                  textTransform: "unset",
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
              <Tab label="Phỏng vấn cá nhân" value="1" />
              <Tab
                label="Phỏng vấn nhóm"
                value="2"
                sx={{
                  "& .MuiButtonBase-root:not(:last-of-type)": {
                   mr:'1px!important',
                  },
                  "& button": {
                    fontSize: "14px",
                  },
                }}
              />
            </TabList>
          </Box>
          <TabPanel value="1"><PersonalInterview /></TabPanel>
          <TabPanel value="2"><PersonalInterview /></TabPanel>
        </TabContext>
      </Box>
    </Grid>
  );
};
