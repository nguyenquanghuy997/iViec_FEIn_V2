import {Box, Typography} from "@mui/material";
import NoInformation from "@/assets/NoInformation";
import {useTheme} from "@mui/material/styles";

const EmptyValue = ({ text, ...props }) => {
  const theme = useTheme();
  return (
      <Box sx={{ minHeight: '200px', backgroundColor: theme.palette.common.white }} {...props}>
        <Box sx={{ textAlign: 'center' }}>
          <NoInformation />
        </Box>
        <Typography sx={{ mt: 2, textAlign: "center", fontSize: 14, fontWeight: 400, color: theme.palette.common.neutral400 }}>
          {text}
        </Typography>
      </Box>
  )
}

export default EmptyValue;