import RHFSelectMultiple from "./RHFSelectMultiple";
import { useGetApplicantByPipeLineQuery } from "@/sections/interview/InterviewSlice";
import { Box, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { Label } from "@/components/hook-form/style";
import React from "react";
import { useTheme } from "@mui/material/styles";

const ListCandidate = ({ isEditmode }) => {
  const { watch } = useFormContext();
  const { palette } = useTheme();
  const res = useGetApplicantByPipeLineQuery(
    { RecruitmentPipelineStateId: watch("recruitmentPipelineStateId") },
    { skip: !watch("recruitmentPipelineStateId") }
  );
  const { data: { items } = { items: [] } } = res;
  return (
    <Box height={"100%"}>
      <Label mb={3}>
        <Typography variant={"subtitle2"} color={palette.text.primary}>
          Danh sách ứng viên
        </Typography>
      </Label>
      {watch("recruitmentPipelineStateId") && (
        <RHFSelectMultiple
          options={items?.map((i) => ({
            id: i.id,
            value: i.id,
            label: i.fullName,
            phone: i.phoneNumber,
            name: i.fullName,
            image: `http://103.176.149.158:5001/api/Image/GetImage?imagePath=${i?.portraitImage}`
          }))}
          name="bookingCalendarGroups"
          fullWidth
          isEditmode={isEditmode}
          multiple
          isRequired
          open={open}
        />
      )}
    </Box>
  );
};

export default ListCandidate;
