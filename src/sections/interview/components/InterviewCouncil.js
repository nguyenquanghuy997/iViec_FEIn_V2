import SelectCouncils from "./SelectCouncils";
import { Label } from "@/components/hook-form/style";
import { Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useFormContext } from "react-hook-form";
import { useGetRecruitmentPersonInChargeIdsQuery } from "../InterviewSlice";

const InterviewCouncil = () => {
  const { watch } = useFormContext();
  const { palette } = useTheme();
  const { data: { items: coOwners = [] } = {} } = useGetRecruitmentPersonInChargeIdsQuery(watch("recruitmentId"));

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
