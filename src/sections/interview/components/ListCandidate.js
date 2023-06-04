import RHFSelectMultiple from "./RHFSelectMultiple";
import { Label } from "@/components/hook-form/style";
import { DOMAIN_SERVER_API } from "@/config";
import { useGetApplicantByPipeLineQuery } from "@/sections/interview/InterviewSlice";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

const ListCandidate = ({option, isEditMode, detailCandidate, error}) => {
  const {watch, setValue} = useFormContext();
  const {palette} = useTheme();
  const {data: {items: dataApplicant = []} = {}} =
    useGetApplicantByPipeLineQuery(
      {RecruitmentPipelineStateId: watch("recruitmentPipelineStateId")},
      {skip: !watch("recruitmentPipelineStateId")}
    );
  const [dataUserDisplayEdit, setDataUserDisplayEdit] = useState([]);
  const dataBooking = watch("bookingCalendarGroups");
  useEffect(() => {
    if (isEditMode && dataBooking) {
      let dataUserDisplay = [];
      dataBooking[0].bookingCalendarApplicants.forEach(item => {
        dataUserDisplay.push({
          id: item.applicant?.id,
          fullName: item.applicant?.fullName,
          phoneNumber: item.applicant?.phoneNumber,
          portraitImage: item.applicant?.portraitImage
        })
      });
      setDataUserDisplayEdit(dataUserDisplay);
      setValue("applicantIdArray", dataUserDisplay.map(item => item.id));
    }
  }, [isEditMode, dataBooking]);
  
  useEffect(() => {
    if (option) {
      setValue("applicantIdArray", [option?.applicantId]);
    }
  }, [option]);
  
  useEffect(() => {
    if (detailCandidate) {
      setValue("applicantIdArray", [detailCandidate?.id]);
    }
  }, [detailCandidate]);
  
  return (
    <Box>
      <Label mb={3}>
        <Typography variant={"subtitle2"} color={palette.text.primary}>
          Danh sách ứng viên
        </Typography>
      </Label>
      
      <RHFSelectMultiple
        options={[...dataApplicant, ...dataUserDisplayEdit]?.map((i) => ({
          id: i.id,
          value: i.id,
          label: i.fullName,
          phone: i.phoneNumber,
          name: i.fullName,
          image: `${DOMAIN_SERVER_API}/Image/GetImage?imagePath=${i?.portraitImage}`,
        }))}
        name={"applicantIdArray"}
        fullWidth
        // disabled={
        //   applicantId || !watch("recruitmentPipelineStateId")
        // }
        error={error}
        multiple
        isRequired
        open={open}
      />
    </Box>
  );
};

export default ListCandidate;
