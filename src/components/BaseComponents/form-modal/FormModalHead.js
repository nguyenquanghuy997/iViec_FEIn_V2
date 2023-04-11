import {Box, IconButton, Typography} from "@mui/material";
import {pxToRem} from "@/utils/getFontValue";
import {RiCloseLine} from "react-icons/ri";
const FormModalHead = ({ title, onClose }) => {
  return (
      <Box display="flex" alignItems="center" justifyContent="space-between" className="edit-header">
        <Typography fontSize={pxToRem(16)} fontWeight={600}>
          {title}
        </Typography>
        <IconButton onClick={onClose}>
          <RiCloseLine size={20} />
        </IconButton>
      </Box>
  )
}

export default FormModalHead;