import SelectCouncils from "./SelectCouncils";
import { useGetAllApplicantUserOrganizationByIdQuery } from "@/sections/organization/override/OverrideOrganizationSlice";
import { Typography, Box } from "@mui/material";
import React from "react";

const InterviewCouncil = ({ value, action }) => {
  const { data: { items: Data = [] } = {}, isLoading } =
    useGetAllApplicantUserOrganizationByIdQuery();
  if (isLoading) return null;

  return value == 1 ? (
    <Box sx={{ p: 3 }}>
      <Typography sx={{ fontSize: "14px", fontWeight: "600", mb: 3 }}>
        Hội đồng phỏng vấn
      </Typography>
      <SelectCouncils
        options={Data?.map((i) => ({
          id: i.id,
          value: i.id,
          label: i.lastName,
          mail: i.email || "tuyetda@fpt.com.vn",
          name: i.lastName,
          position: "Giám đốc tuyển dụng",
        }))}
        name="councilIds"
        action={action}
        fullWidth
        multiple
        isRequired
      />
    </Box>
  ) : (
    <Box sx={{ p: 3 }}>
      <Typography sx={{ fontSize: "14px", fontWeight: "600", mb: 3 }}>
        Hội đồng phỏng vấn
      </Typography>
    </Box>
  );
};
export default InterviewCouncil;
