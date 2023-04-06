import React from 'react'
import {Box, Stack} from "@mui/material";
import Iconify from "@/components/Iconify";
import {ButtonAddStyle, SubTitleStyle, TitleStyle} from "@/sections/emailform/style";

const FormHeader = ({ onOpenModal, title, subtitle, showButton = true, buttonTitle = '', buttonIcon='material-symbols:add' }) => {
  return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
          <Stack>
              <TitleStyle className="form-title">{title}</TitleStyle>
              {subtitle && <SubTitleStyle className="form-subtitle">{subtitle}</SubTitleStyle>}
          </Stack>
        {showButton && <Box>
          <ButtonAddStyle
              className="button-add"
              onClick={onOpenModal}
              startIcon={<Iconify icon={buttonIcon} sx={{ width: 16, height: 16 }} />}
          >{buttonTitle}</ButtonAddStyle>
        </Box>}

      </Box>
  )
}

export default React.memo(FormHeader);