import { useGetRecruitmentPersonInChargeIdsQuery } from "../InterviewSlice";
import SelectCouncils from "./SelectCouncils";
import { Label } from "@/components/hook-form/style";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

const InterviewCouncil = () => {
  const { setValue, watch } = useFormContext();
  const { palette } = useTheme();
  const { data: { items: coOwners = [] } = {} } =
    useGetRecruitmentPersonInChargeIdsQuery(watch("recruitmentId"));

  useEffect(() => {
    if (!coOwners?.length) return;
    setValue(
      "councilIds",
      coOwners.map((i) => i.id)
    );
  }, [coOwners]);

  return (
    <Box sx={{ p: 3 }}>
      <Label mb={3}>
        <Typography variant={"subtitle2"} color={palette.text.primary}>
          Hội đồng phỏng vấn
        </Typography>
      </Label>

      <SelectCouncils
        options={coOwners?.map((i) => ({
          id: i.id,
          value: i.id,
          label: i.name,
          mail: i.email || "tuyetda@fpt.com.vn",
          name: i.name,
        }))}
        name="councilIds"
        disabled={watch("recruitmentId") ? false : true}
        fullWidth
        multiple
        isRequired
      />
    </Box>
  );
};
export default InterviewCouncil;
