import {Box, Typography} from "@mui/material";
import {pxToRem} from "@/utils/getFontValue";
import { ButtonIcon } from "@/utils/cssStyles";
import Iconify from "@/components/Iconify";
import palette from "@/theme/palette";
const FormModalHead = ({ title, onClose }) => {
  return (
      <Box display="flex" alignItems="center" justifyContent="space-between" className="edit-header">
        <Typography fontSize={pxToRem(16)} fontWeight={600}>
          {title}
        </Typography>
        <ButtonIcon
           sx={{
             textTransform: "none",
           }}
           onClick={onClose}
           icon={
             <Iconify
               icon={"ic:baseline-close"}
               width={20}
               height={20}
               color={palette.light.common.borderObject}
             />
           }
         />
      </Box>
  )
}

export default FormModalHead;