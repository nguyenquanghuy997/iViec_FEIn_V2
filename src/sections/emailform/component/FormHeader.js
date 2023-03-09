import React from 'react'
import {Box, Stack} from "@mui/material";
import Iconify from "@/components/Iconify";
import {ButtonAddStyle, SubTitleStyle, TitleStyle} from "@/sections/emailform/style";

const FormHeader = ({ onOpenForm, title, subtitle, buttonTitle = '', buttonIcon='material-symbols:add' }) => {
  return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
          <Stack>
              <TitleStyle className="form-title">{title}</TitleStyle>
              <SubTitleStyle className="form-subtitle">{subtitle}</SubTitleStyle>
          </Stack>
          <Box>
            <ButtonAddStyle
                className="button-add"
                onClick={() => onOpenForm(null)}
                startIcon={<Iconify icon={buttonIcon} sx={{ width: 16, height: 16 }} />}
            >{buttonTitle}</ButtonAddStyle>
          </Box>
      </Box>
  )
}

export default React.memo(FormHeader);