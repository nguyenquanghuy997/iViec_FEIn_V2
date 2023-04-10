import SelectCouncils from "./SelectCouncils";
import { Label } from "@/components/hook-form/style";
import { useGetRecruitmentsQuery } from "@/sections/recruitment/RecruitmentSlice";
import { Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useFormContext } from "react-hook-form";

const InterviewCouncil = () => {
  const { watch } = useFormContext();
  const { palette } = useTheme();
  const { data: { items: Data = [] } = {} } = useGetRecruitmentsQuery({
    PageIndex: 1,
    PageSize: 20,
  });
  const coOwners = Data?.filter((item) => item.id === watch("recruitmentId"));

  return (
    <Box sx={{ p: 3 }}>
      <Label mb={3}>
        <Typography variant={"subtitle2"} color={palette.text.primary}>
          Hội đồng phỏng vấn
        </Typography>
      </Label>

      <SelectCouncils
        options={coOwners[0]?.coOwners?.map((i) => ({
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
