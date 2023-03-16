import {Typography} from "@mui/material";
import {DividerCardStyle} from "@/sections/recruitment-create/style";

const DividerCard = ({title, sx, ...props}) => {
  return (
      <DividerCardStyle sx={{ ...sx }}>
        <Typography sx={{color: '#FDFDFD', fontSize: 14, fontWeight: 700}} {...props}>
          {title}
        </Typography>
      </DividerCardStyle>
  )
}

export default DividerCard;