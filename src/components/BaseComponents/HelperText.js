import React from 'react';
import {STYLE_CONSTANT as style} from "@/theme/palette";
import {FormHelperText} from "@mui/material";

const HelperText = ({errorText}) => {
  return (
      <FormHelperText
          sx={{
            color: style.COLOR_TEXT_DANGER,
            fontSize: style.FONT_XS,
            fontWeight: style.FONT_NORMAL
          }}
      >
        {errorText}
      </FormHelperText>
  )
}

export default HelperText;