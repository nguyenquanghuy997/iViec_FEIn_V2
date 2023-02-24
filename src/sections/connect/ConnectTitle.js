import React from 'react';
import {Stack, Tooltip} from "@mui/material";
import {TitleStyle, ButtonStyle} from "@/sections/connect/style";
import {QuestionIcon} from "@/sections/connect/ConnectIcon";

const ConnectTitle = ({title, ...props}) => {
  return (
      <Stack sx={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', mb: 2}} {...props}>
        <TitleStyle>{title}</TitleStyle>
        <Tooltip title="Title">
          <ButtonStyle>
            <QuestionIcon/>
          </ButtonStyle>
        </Tooltip>
      </Stack>
  )
}

export default React.memo(ConnectTitle);