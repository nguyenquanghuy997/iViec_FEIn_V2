import RHFSelectMultiple from "./RHFSelectMultiple";
import { useGetApplicantQuery } from "@/sections/interview/InterviewSlice";
import {
  Box,
  Typography,
} from "@mui/material";

const ListCandidate = ({ watch }) => {
  const { data: listApplicant } = useGetApplicantQuery(
    { PipelineStateId: watch },
    {
      skip: !watch,
    }
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography sx={{ fontSize: "14px", fontWeight: "600", mb: 3 }}>
        Danh sách ứng viên
      </Typography>
      {watch && (
        <RHFSelectMultiple
          options={listApplicant?.items?.map((i) => ({
            id: i.id,
            value: i.id,
            label: i.fullName,
            phone: i.phoneNumber,
            name: i.fullName,
          }))}
          name="bookingCalendarGroups"
          fullWidth
          multiple
          isRequired
        />
      )}
    </Box>
  );
};

export default ListCandidate;
