import RHFSelectMultiple from "./RHFSelectMultiple";
import { useGetApplicantByPipeLINEQuery } from "@/sections/interview/InterviewSlice";
import {
  Box,
  Typography,
} from "@mui/material";

const ListCandidate = ({ item, watch, isEditmode }) => {
  const res = useGetApplicantByPipeLINEQuery({ RecruitmentPipelineStateId: watch }, {skip: !watch, });
  const { data: { items } = { items: [] }} = res;

  return (
    <Box sx={{ p: 3 }}>
      <Typography sx={{ fontSize: "14px", fontWeight: "600", mb: 3 }}>
        Danh sách ứng viên
      </Typography>
      {watch && (
        <RHFSelectMultiple
          options={items?.map((i) => ({
            id: i.id,
            value: i.id,
            label: i.fullName,
            phone: i.phoneNumber,
            name: i.fullName,
          }))}
          name="bookingCalendarGroups"
          fullWidth
          isEditmode={isEditmode}
          defaultItem ={item}
          multiple
          isRequired
          open={open}
          
        />
      )}
    </Box>
  );
};

export default ListCandidate;
