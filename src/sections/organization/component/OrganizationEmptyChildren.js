import React from 'react';
import {Box, Button, Typography} from "@mui/material";
import {OrganizationEmptyIcon} from "@/sections/organization/component/Icon";
import {styled} from '@mui/styles'
import Iconify from "@/components/Iconify";

const BoxEmptyStyle = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  marginTop: theme.spacing(6)
}));

const TypographyEmptyStyle = styled(Typography)(({theme}) => ({
  '&.organization-empty-text': {
    color: '#A2AAB7',
    fontSize: '14px',
    fontWeight: 500,
    display: 'block',
    marginTop: theme.spacing(2)
  }
}));

const ButtonAddEmptyStyle = styled(Button)(({theme}) => ({
  '&.organization-empty-button': {
    padding: theme.spacing(1.5, 2),
    color: '#FDFDFD',
    marginTop: theme.spacing(2),
    fontSize: 14,
    fontWeight: 600,
    minWidth: 144,
    height: 44,
    borderRadius: 6,
    backgroundColor: '#1976D2',
    "&:hover": {
      backgroundColor: '#1976D2',
    }
  }
}));

const OrganizationEmptyChildren = ({ onOpenForm }) => {
  return (
      <BoxEmptyStyle>
        <OrganizationEmptyIcon/>
        <TypographyEmptyStyle className="organization-empty-text">
          Hiện chưa có đơn vị nào trực thuộc công ty của bạn
        </TypographyEmptyStyle>
        <ButtonAddEmptyStyle
            onClick={onOpenForm}
            className="organization-empty-button"
            startIcon={<Iconify icon="material-symbols:add" sx={{ height: 20, width: 20 }} />}>Thêm đơn vị</ButtonAddEmptyStyle>
      </BoxEmptyStyle>
  )
}

export default OrganizationEmptyChildren;