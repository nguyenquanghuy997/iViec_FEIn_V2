import {Box, Typography} from "@mui/material";
import NoInformation from "@/assets/NoInformation";
const EmptyValue = ({ text, ...props }) => {
  return (
      <Box sx={{ minHeight: '200px', backgroundColor: '#FDFDFD' }} {...props}>
        <Box sx={{ textAlign: 'center' }}>
          <NoInformation />
        </Box>
        <Typography sx={{ mt: 2, textAlign: "center", fontSize: 14, fontWeight: 400, color: '#A2AAB7' }}>
          {text}
        </Typography>
      </Box>
  )
}

export default EmptyValue;