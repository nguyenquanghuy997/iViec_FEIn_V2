import RHFSelectMultiple from "./RHFSelectMultiple";
import { Label } from "@/components/hook-form/style";
import { useGetApplicantByPipeLineQuery } from "@/sections/interview/InterviewSlice";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

const ListCandidate = ({ option, isEditmode, applicantId }) => {
  const { watch, setValue } = useFormContext();
  const { palette } = useTheme();
  const res = useGetApplicantByPipeLineQuery(
    { RecruitmentPipelineStateId: watch("recruitmentPipelineStateId") },
    { skip: !watch("recruitmentPipelineStateId") }
  );

  const { data: { items } = { items: [] } } = res;

  useEffect(() => {
    if (option) {
      setValue("applicantIdArray", [option?.applicantId]);
    }
  }, [option]);

  return (
    <Box height={"100%"}>
      <Label mb={3}>
        <Typography variant={"subtitle2"} color={palette.text.primary}>
          Danh sách ứng viên
        </Typography>
      </Label>

      <RHFSelectMultiple
        options={items?.map((i) => ({
          id: i.id,
          value: i.id,
          label: i.fullName,
          phone: i.phoneNumber,
          name: i.fullName,
          image: `http://103.176.149.158:5001/api/Image/GetImage?imagePath=${i?.portraitImage}`,
        }))}
        name={`applicantIdArray`}
        fullWidth
        disabled={
          applicantId || !watch("recruitmentPipelineStateId") ? true : false
        }
        isEditmode={isEditmode}
        multiple
        isRequired
        open={open}
      />
    </Box>
  );
};

export default ListCandidate;
