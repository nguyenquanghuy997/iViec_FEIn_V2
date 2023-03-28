import {Box, InputAdornment, Typography} from "@mui/material";
import FormModal from "@/components/BaseComponents/FormModal";
import RHFDropdown from "@/components/hook-form/RHFDropdown";
import InputNumberFormatFilter from "@/sections/dynamic-filter/InputNumberFormatFilter";
import { STYLE_CONSTANT as style } from "@/theme/palette";

const ExaminationForm = ({open, onClose, options, ...props}) => {
  return (
      <FormModal open={open} onClose={onClose} maxWidth={'600px'} {...props}>
        <Box sx={{width: '100%'}}>
          <RHFDropdown
              title="Đề thi"
              name="examinationId"
              isRequired
              fullWidth
              options={options}
              placeholder={"Chọn đề thi"}
          />
        </Box>
        <Box sx={{width: '100%', mt: 2}}>
          <InputNumberFormatFilter
              name="expiredTime"
              title="Số ngày tồn tại đề thi"
              otherTitle={
                <Typography sx={{
                  fontSize: style.FONT_13,
                  fontWeight: style.FONT_NORMAL,
                  color: style.COLOR_TEXT_PRIMARY,
                  fontStyle: 'italic',
                  mb: 1
                }}>
                  Tính từ thời điểm Ứng viên chuyển sang bước thi tuyển
                </Typography>
              }
              placeholder="Nhập số ngày"
              isRequired
              fullWidth
              InputProps={{
                endAdornment: (
                    <InputAdornment position='end'>
                      <Typography
                          sx={{
                            fontSize: style.FONT_SM,
                            fontWeight: style.FONT_NORMAL,
                            color: style.COLOR_TEXT_SECONDARY,
                            mx: 0.5
                          }}>
                        Ngày
                      </Typography>
                    </InputAdornment>
                ),
              }}
          />
        </Box>
      </FormModal>
  )
}

export default ExaminationForm;