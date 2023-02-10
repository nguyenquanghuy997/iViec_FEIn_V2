import { ApplicantPreviewCV } from "./ApplicantPreviewCV";
import { ApplicantPreviewLog } from "./ApplicantPreviewLog";
import { ButtonDS, SelectAutoCompleteDS } from "@/components/DesignSystem";
import Iconify from "@/components/Iconify";
import {
  Avatar,
  Badge,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { PipelineApplicant } from "../others";

function ApplicantPreviewItem({}) {
  const allOptions = [
    { id: 5141, name: "Tuyển nhân viên kinh doanh phần mềm tại Hà Nội" },
    { id: 214, name: "Tiêu đề tin tuyển dụng 2" },
    { id: 3155, name: "Tiêu đề tin tuyển dụng 3" },
    { id: 3155, name: "Tiêu đề tin tuyển dụng 4" },
    { id: 3155, name: "Tiêu đề tin tuyển dụng 5" },
    { id: 3155, name: "Tiêu đề tin tuyển dụng 6" },
    { id: 3155, name: "Tiêu đề tin tuyển dụng 7" },
    { id: 3155, name: "Tiêu đề tin tuyển dụng 8" },
    { id: 3155, name: "Tiêu đề tin tuyển dụng 9" },
    { id: 3155, name: "Tiêu đề tin tuyển dụng 10" },
    { id: 3155, name: "Tiêu đề tin tuyển dụng 11" },
    { id: 3155, name: "Tiêu đề tin tuyển dụng 12" },
    { id: 3155, name: "Tiêu đề tin tuyển dụng 13" },
    { id: 3155, name: "Tiêu đề tin tuyển dụng 14" },
    { id: 3155, name: "Tiêu đề tin tuyển dụng 15" },
  ];

  const [selectedOption, setSelectedOption] = useState(allOptions[0].name);
  return (
    <Card
      sx={{
        borderRadius: "6px",
        filter:
          "drop-shadow(0px 3px 5px rgba(9, 30, 66, 0.2)) drop-shadow(0px 0px 1px rgba(9, 30, 66, 0.3))",
        height: "fit-content",
        "& .MuiCardContent-root": {
          padding: 0,
          paddingBottom: "0 !important",
        },
      }}
    >
      <CardContent>
        <Grid
          xs={12}
          md={7}
          padding="32px 24px"
          borderBottom="1px solid #D0D4DB"
        >
          <Grid
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            marginBottom={"32px"}
          >
            <Grid
              display="flex"
              alignItems="center"
              sx={{
                "& .MuiBadge-dot": {
                  width: "6px",
                  minWidth: "6px",
                  height: "6px",
                  top: 3,
                  right: 3,
                },
              }}
            >
              <Badge badgeContent="" variant="dot" color="success">
                <Avatar
                  variant={"rounded"}
                  sx={{ height: "60px", width: "60px", borderRadius: "14px" }}
                  src={
                    "https://freedesignfile.com/upload/2016/03/Abstract-geometric-petals-vector-graphic-03.jpg"
                  }
                />
              </Badge>

              <Box pl={2}>
                <Typography
                  display="flex"
                  fontSize="20px"
                  fontWeight="600"
                  alignItems="center"
                >
                  Đinh Tiến Thành
                  <Iconify
                    icon={"ri:edit-2-fill"}
                    width={20}
                    height={20}
                    color="#8A94A5"
                    ml={1}
                  />
                </Typography>
                <Stack
                  direction="row"
                  divider={<Divider orientation="vertical" flexItem />}
                  spacing={2}
                  color="#172B4D"
                >
                  <Typography fontSize="14px">0123456789</Typography>
                  <Typography fontSize="14px">ThanhDT58@fpt.com.vn</Typography>
                </Stack>
              </Box>
            </Grid>
            <Grid display="flex">
              <ButtonDS
                tittle={"Thêm vào tin khác"}
                type="submit"
                sx={{
                  color: "#455570",
                  backgroundColor: "#F3F4F6",
                  boxShadow: "none",
                  ":hover": {
                    backgroundColor: "#E7E9ED",
                  },
                  marginRight: "12px",
                  fontSize: "14px",
                  padding: "6px 12px",
                }}
                icon={
                  <Iconify
                    icon={"icon-park-outline:share-three"}
                    width={20}
                    height={20}
                    color="#455570"
                    mr={1}
                  />
                }
              />
              <ButtonDS
                tittle={"Đặt lịch phỏng vấn"}
                type="submit"
                sx={{
                  color: "#fdfdfd",
                  backgroundColor: "#1976D2",
                  boxShadow: "none",
                  ":hover": {
                    backgroundColor: "#1565C0",
                  },
                  marginRight: "12px",
                  fontSize: "14px",
                  padding: "6px 12px",
                  textTransform: "none",
                }}
                icon={
                  <Iconify
                    icon={"mdi:calendar-check"}
                    width={20}
                    height={20}
                    color="#fdfdfd"
                    mr={1}
                  />
                }
              />
              <ButtonDS
                tittle={"Đánh giá"}
                type="submit"
                isDisabled="true"
                mr={2}
                sx={{
                  color: "#8A94A5",
                  backgroundColor: "#1976D2",
                  boxShadow: "none",
                  ":hover": {
                    backgroundColor: "#01B6A7",
                  },
                  marginRight: "12px",
                  textTransform: "none",
                }}
                icon={
                  <Iconify
                    icon={"ph:user-focus-fill"}
                    width={20}
                    height={20}
                    color="#8A94A5"
                    mr={1}
                  />
                }
              />
              <ButtonDS
                tittle={"Gửi offer"}
                type="submit"
                isDisabled="true"
                sx={{
                  color: "#8A94A5",
                  backgroundColor: "#1976D2",
                  boxShadow: "none",
                  ":hover": {
                    backgroundColor: "#01B6A7",
                  },
                  textTransform: "none",
                }}
                icon={
                  <Iconify
                    icon={"ri:pen-nib-fill"}
                    width={20}
                    height={20}
                    color="#8A94A5"
                    mr={1}
                  />
                }
              />
            </Grid>
          </Grid>
          <Grid
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid gap={3}>
              <SelectAutoCompleteDS
                width="35%"
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                data={allOptions}
                sx={{
                  background: "#F3F4F6",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#F3F4F6",
                    borderRadius: "6px",
                  },
                  "&:hover, &.Mui-focused": {
                    background: "#E7E9ED",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline, , &.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#E7E9ED",
                    },
                }}
              />
            </Grid>
            <PipelineApplicant />
          </Grid>
        </Grid>
        <Grid container>
          <Grid xs={12} md={7} borderRight="1px solid #D0D4DB">
            <ApplicantPreviewCV />
          </Grid>
          <Grid xs={5} md={5}>
            <ApplicantPreviewLog />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default ApplicantPreviewItem;
