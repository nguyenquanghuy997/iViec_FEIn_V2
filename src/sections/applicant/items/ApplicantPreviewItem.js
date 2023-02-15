import { PipelineApplicant } from "../others";
import { ApplicantPreviewCV } from "./ApplicantPreviewCV";
import { ApplicantPreviewLog } from "./ApplicantPreviewLog";
import {
  AvatarDS,
  ButtonDS,
  SelectAutoCompleteDS,
} from "@/components/DesignSystem";
import Iconify from "@/components/Iconify";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { RejectApplicantModal } from "../modals";

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
  const pipelines = [
    { id: 5141, name: "Ứng tuyển", isActive: 0, stageType: 1, type: null },
    { id: 214, name: "Thi tuyển1", isActive: 0, stageType: 2, type: null },
    { id: 213, name: "Thi tuyển2", isActive: 0, stageType: 2, type: null },
    { id: 3155, name: "Phỏng vấn1", isActive: 0, stageType: 3, type: null },
    { id: 3155, name: "Phỏng vấn2", isActive: 0, stageType: 3, type: null },
    { id: 3155, name: "Phỏng vấn3", isActive: 0, stageType: 3, type: null },
    { id: 3155, name: "Kết quả - Đạt", isActive: 1, stageType: 4, type: 1 },
    //{ id: 3155, name: "Kết quả - Cân nhắc", isActive:1, stageType:4, type:2 },
    // { id: 3155, name: "Kết quả - Loại", isActive:1, stageType:4, type:3 },
    { id: 3155, name: "Mời nhận việc", isActive: 0, stageType: 4, type: 4 },
  ];
  const pipeline1s = [
    { id: 5141, name: "Ứng tuyển", isActive: 0, stageType: 1, type: null },
    { id: 3155, name: "Phỏng vấn3", isActive: 0, stageType: 3, type: null },
    { id: 3155, name: "Kết quả - Đạt", isActive: 1, stageType: 4, type: 1 },
    { id: 3155, name: "Kết quả - Cân nhắc", isActive:1, stageType:4, type:2 },
     { id: 3155, name: "Kết quả - Loại", isActive:1, stageType:4, type:3 },
    { id: 3155, name: "Mời nhận việc", isActive: 0, stageType: 4, type: 4 },
  ];
  const [selectedOption, setSelectedOption] = useState(allOptions[0].name);
  const [pipe, setPipe] = useState(pipelines);
  const [showRejectApplicant, setRejectApplicant] = useState(false);

  const onChangeRecruiment = (e) => {
    setSelectedOption(e.target.value);
    setPipe(pipeline1s)
  };
  
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
              <AvatarDS
                sx={{ height: "60px", width: "60px", borderRadius: "14px" }}
                src={
                  "https://freedesignfile.com/upload/2016/03/Abstract-geometric-petals-vector-graphic-03.jpg"
                }
              ></AvatarDS>
              <Box pl={1}>
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
            <Grid>
              <SelectAutoCompleteDS
                width="35%"
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                onChange={onChangeRecruiment}
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
            <Grid
              container
              justifyContent="space-between"
              alignItems="flex-end"
              marginTop="28px"
            >
              <Grid md={10} container>
                <Grid sx={{ width: "80%" }}>
                  <PipelineApplicant steps={pipe} />
                </Grid>
                <Grid sx={{ display: "flex" }}>
                  <ButtonDS
                    tittle={"Chuyển bước"}
                    type="submit"
                    sx={{
                      color: "#455570",
                      backgroundColor: "#F3F4F6",
                      boxShadow: "none",
                      ":hover": {
                        backgroundColor: "#E7E9ED",
                      },
                      textTransform: "none",
                    }}
                    icon={
                      <Iconify
                        icon={"ci:transfer"}
                        width={16}
                        height={16}
                        color="#455570"
                        mr={1}
                      />
                    }
                  />
                  <ButtonDS
                    type="submit"
                    sx={{
                      padding: "8px",
                      minWidth: "unset",
                      backgroundColor: "#fff",
                      boxShadow: "none",
                      ":hover": {
                        backgroundColor: "#EFF3F7",
                      },
                      textTransform: "none",
                      marginLeft: "12px",
                    }}
                    onClick={() => setRejectApplicant(true)}
                    icon={
                      <Iconify
                        icon={"ic:outline-remove-circle"}
                        width={20}
                        height={20}
                        color="#D32F2F"
                      />
                    }
                  />
                </Grid>
              </Grid>
              <Grid color="#455570" fontSize="13px">
                <div>{"Phụ trách"}</div>
                <Grid
                  sx={{
                    display: "flex",
                    marginTop: "8px",
                  }}
                >
                  <AvatarDS
                    sx={{
                      height: "20px",
                      width: "20px",
                      borderRadius: "100px",
                    }}
                    src={
                      "https://www.elle.vn/wp-content/uploads/2017/07/25/hinh-anh-dep-1.jpg"
                    }
                  ></AvatarDS>
                  <Typography fontSize="14px" fontWeight="600" color="#172B4D">
                    {"Phạm Xuân Chung"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
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

      <RejectApplicantModal
        applicantId= {"5141"}
        recruimentId= {"123"}
        show={showRejectApplicant}
        setShow={setRejectApplicant}
      />
    </Card>
  );
}

export default ApplicantPreviewItem;
