import {Box, Stack, Typography} from "@mui/material";
import React from "react";
import {styled} from "@mui/styles";

const BoxItemStyle = styled(Box)(({theme}) => ({
  '&.card-pipeline-item': {
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2),
    padding: theme.spacing(2, 2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: '1px solid #B9BFC9',
    borderRadius: 6,
    backgroundColor: '#FDFDFD'
  }
}));

const RecruitmentPipelineCard = ({title, subtitle, moreTitle}) => {
  return (
      <BoxItemStyle className="card-pipeline-item">
        {/*{showIconByFileType(fileType)}*/}
        <Stack sx={{mx: 1}}>
          <Typography sx={{color: '#455570', fontSize: 13, fontWeight: 600}}>{title}</Typography>
          <Typography sx={{color: '#1565C0', fontSize: 12, fontWeight: 600, py: 0.5}}>{moreTitle}</Typography>
          <Typography sx={{color: '#455570', fontSize: 12, fontWeight: 400}}>{subtitle}</Typography>
        </Stack>
      </BoxItemStyle>
  )
}

export default RecruitmentPipelineCard;