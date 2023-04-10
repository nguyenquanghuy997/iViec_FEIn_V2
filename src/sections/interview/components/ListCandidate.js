import RHFSelectMultiple from "./RHFSelectMultiple";
import { Label } from "@/components/hook-form/style";
import { useGetApplicantByPipeLineQuery } from "@/sections/interview/InterviewSlice";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

const ListCandidate = ({ option, model, isEditmode, applicantId }) => {
  const { watch, setValue } = useFormContext();
  const { palette } = useTheme();
  const res = useGetApplicantByPipeLineQuery(
    {RecruitmentPipelineStateId: watch("recruitmentPipelineStateId")},
    {skip: !watch("recruitmentPipelineStateId")}
  );

  let { data: { items = [] } = {} } = res;
  const [dataApplicant, setDataApplicant] = useState([]);

  useEffect(() => {
    if (option) {
      setValue("applicantIdArray", [option?.applicantId]);
    }
  }, [option]);

  useEffect(() => {
    setDataApplicant(items);
    if(isEditmode && model) {
      model.forEach(item => {
        item.bookingCalendarApplicants.forEach(itemData => {
          setDataApplicant(oldArray  => [...oldArray, itemData.applicant])
        })
      })
    }
  }, [items]);

  return (
    <Box height={"100%"}>
      <Label mb={3}>
        <Typography variant={"subtitle2"} color={palette.text.primary}>
          Danh sách ứng viên
        </Typography>
      </Label>

      
      <RHFSelectMultiple
        options={dataApplicant?.map((i) => ({
          id: i.id,
          value: i.id,
          label: i.fullName,
          phone: i.phoneNumber,
          name: i.fullName,
          image: `http://103.176.149.158:5001/api/Image/GetImage?imagePath=${i?.portraitImage}`,
        }))}
        name={'applicantIdArray'}
        fullWidth
        disabled={
          applicantId || !watch("recruitmentPipelineStateId") ? true : false
        }
        multiple
        isRequired
        open={open}
      />
    
    </Box>
  );
};

export default ListCandidate;
