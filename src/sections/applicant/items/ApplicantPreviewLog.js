import { Activities } from "./DetailApplicantRight/Activities";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Grid } from "@mui/material";
import Tab from "@mui/material/Tab";
import { useState } from "react";

export const ApplicantPreviewLog = ({
  dataLog,
  dataApplicant,
  onReExploiting,
}) => {
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const dataHistoryMap = {
    ...dataLog,
    events: dataLog?.events?.map((p, index) => {
      var stagePrevious = "";
      var stageResultPrevious = "";
      if (index < dataLog?.events?.length) {
        stagePrevious =
          dataLog?.events[index + 1]?.recruitmentPipelineStateType;
        stageResultPrevious =
          dataLog?.events[index + 1]?.pipelineStateResultType;
      }
      return {
        ...p,
        stagePrevious: stagePrevious,
        stageResultPrevious: stageResultPrevious,
      };
    }),
  };
  const dataExamInterviewFilter = {
    ...dataHistoryMap,
    events: dataHistoryMap?.events?.filter(
      (p) =>
        p.recruitmentPipelineStateType == 1 ||
        p.recruitmentPipelineStateType == 2
    ),
  };
  const dataResultOfferFilter = {
    ...dataHistoryMap,
    events: dataHistoryMap?.events?.filter(
      (p) =>
        p.eventType == "SendOfferTemplateToApplicantEvent" ||
        p.eventType == "CreateApplicantReviewEvent"
    ),
  };

  return (
    <Grid item style={{ padding: "24px 24px 0 24px" }}>
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
              {/* <Tab label="Đánh giá và Offer" value="3" /> */}
            </TabList>
          </Box>
          <TabPanel value="1">
            <Activities
              dataLog={dataHistoryMap}
              dataApplicant={dataApplicant}
              onReExploiting={onReExploiting}
            />
          </TabPanel>
          <TabPanel value="2">
            <Activities
              dataLog={dataExamInterviewFilter}
              dataApplicant={dataApplicant}
              onReExploiting={onReExploiting}
            />
          </TabPanel>
          <TabPanel value="3">
            <Activities
              dataLog={dataResultOfferFilter}
              dataApplicant={dataApplicant}
              onReExploiting={onReExploiting}
            />
          </TabPanel>
        </TabContext>
      </Box>
    </Grid>
  );
};
