import CloseIcon from "../../../assets/CloseIcon";
import { FormInterview } from "./FormInterview";
import InterviewCouncil from "./InterviewCouncil";
import ListCandidate from "./ListCandidate";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Typography, Grid } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";

const CreateInterview = ({ open, onClose, onOpen }) => {
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    console.log(event);
    setValue(newValue);
  };
  console.log(value);

  const BoxInnerStyle = styled("Box")(({ theme }) => ({
    [theme.breakpoints.up("xl")]: {
      width: "1500px",
    },
    [theme.breakpoints.up("2k")]: {
      width: "100%",
    },
  }));

  const list = () => (
    <BoxInnerStyle>
      <List
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: 0,
        }}
      >
        <Typography sx={{ p: "22px 24px", fontSize: 16, fontWeight: 600 }}>
          Đặt lịch phỏng vấn
        </Typography>
        <Button
          onClick={onClose}
          sx={{
            "&:hover": {
              background: "white",
            },
          }}
        >
          <CloseIcon />
        </Button>
      </List>

      <Box>
        <Grid container border="1px solid #E7E9ED">
          <Grid item xs={12} md={6} borderRight="1px solid #E7E9ED">
            <FormInterview handleChange={handleChange} value={value} />
          </Grid>
          <Grid item xs={5} md={3} borderRight="1px solid #E7E9ED">
            <ListCandidate value={value} />
          </Grid>
          <Grid item xs={5} md={3}>
            <InterviewCouncil value={value} />
          </Grid>
        </Grid>
      </Box>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: 12,
          position: "fixed",
          bottom: 0,
          background: "#FDFDFD",
          width: "100%",
          padding: "16px 24px",
          border: "1px solid #EFF3F6",
        }}
      >
        <LoadingButton
          type="submit"
          variant="contained"
          // loading={isSubmitting}
          sx={{ backgroundColor: "#1976D2", p: 1, fontSize: 14 }}
        >
          {"Lưu"}
        </LoadingButton>
        <div style={{ width: 8 }} />

        <LoadingButton variant="text" sx={{ color: "#455570" }}>
          {"Hủy"}
        </LoadingButton>
      </div>
    </BoxInnerStyle>
  );

  return (
    <div>
      <Drawer anchor="right" open={open} onClose={onClose} onOpen={onOpen}>
        {list("right")}
      </Drawer>
    </div>
  );
};
export default CreateInterview;
