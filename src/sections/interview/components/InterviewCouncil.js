import SelectCouncils from "./SelectCouncils";
import { useGetRecruitmentsQuery } from "@/sections/recruitment/RecruitmentSlice";
import { Typography, Box } from "@mui/material";
import React from "react";

const InterviewCouncil = ({ isEditmode, item,watchStep, action }) => {
  const { data: { items: Data = [] } = {} } = useGetRecruitmentsQuery({
    PageIndex: 1,
    PageSize: 20,
  });
  const coOwners = Data?.filter((item) => item.id === watchStep);

  return (
    <Box sx={{ p: 3 }}>
      <Typography sx={{ fontSize: "14px", fontWeight: "600", mb: 3 }}>
        Hội đồng phỏng vấn
      </Typography>
      {watchStep && (
        <SelectCouncils
          options={coOwners[0]?.coOwners?.map((i) => ({
            id: i.id,
            value: i.id,
            label: i.name,
            mail: i.email || "tuyetda@fpt.com.vn",
            name: i.name,
            // position: "Giám đốc tuyển dụng",
          }))}
          name="councilIds"
          defaultItem ={item}
          isEditmode={isEditmode}
          action={action}
          fullWidth
          multiple
          isRequired
        />
      )}
    </Box>
  );
};
export default InterviewCouncil;
