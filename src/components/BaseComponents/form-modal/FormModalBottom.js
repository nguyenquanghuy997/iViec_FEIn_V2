import {Box, Stack} from "@mui/material";
import MuiButton from "@/components/BaseComponents/MuiButton";

const FormModalBottom = ({ onSubmit, loading, onClose, btnConfirm, btnClose, otherAction, ...props }) => {

  const {title: titleConfirm = '', sx: sxConfirm, ...otherConfirm} = btnConfirm || {};
  const {title: titleClose = '', sx: sxClose, ...otherClose} = btnClose || {};
  const sxConfirmProps = {
    height: 36,
    ...sxConfirm,
  }
  const sxCloseProps = {
    height: 36,
    ...sxClose,
  }

  return (
      <Box className={'edit-footer'} {...props}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Stack flexDirection={'row'}>
            <MuiButton
                type="submit"
                loading={loading}
                variant="contained"
                onClick={onSubmit}
                title={titleConfirm || 'Xác nhận'}
                sx={{...sxConfirmProps}}
                {...otherConfirm}
            />
            <MuiButton
                title={titleClose || "Hủy"}
                color={"basic"}
                onClick={onClose}
                sx={{...sxCloseProps}}
                {...otherClose}
            />
          </Stack>
          {otherAction && <>{otherAction}</>}
        </Box>
      </Box>
  )
}

export default FormModalBottom;