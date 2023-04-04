import {memo} from "react";
import {Box, Typography} from "@mui/material";
import {styled} from "@mui/styles";
import {EmailInviteIcon} from "@/sections/organization/component/Icon";

const NameStyle = styled(Typography)(({theme, status}) => {
  return ({
    color: status === false ? '#E53935' : '#388E3C',
    fontSize: 14,
    fontWeight: 600,
    marginBottom: theme.spacing(0.5)
  });
});

const renderStatus = (text, color = '#388E3C') => {
  return <Typography
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        textAlign: 'right',
        fontSize: 13,
        fontWeight: 600
      }}><EmailInviteIcon fill={color}/><span style={{ marginLeft: 8 }}>{text}</span></Typography>
}

const OrganizationInviteResultCard = ({item}) => {
  const {
    name = 'Name',
    email = 'Email',
    roleGroup = 'Role',
    organizations = ['Organization 1', 'Organization 2'],
    status = false
  } = item;
  return (
      <>
        <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              backgroundColor: status ? '#E8F5E9' : '#FFEBEE',
              padding: 2,
              mb: 3
        }}>
          <Box>
            <NameStyle status={status}>{name}</NameStyle>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
              <Typography sx={{ fontSize: 13, fontWeight: 400 }}>{email}</Typography>
              <span style={{width: '3px', height: '3px', backgroundColor: '#172B4D', marginLeft: 4, marginRight: 4, borderRadius: '50%'}}/>
              <Typography sx={{ fontSize: 13, fontWeight: 400 }}>{roleGroup}</Typography>
            </Box>
            <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
              {
                organizations.map((organization, index) => {
                  return (
                      <Typography key={index} sx={{
                        padding: '5px 8px',
                        backgroundColor: '#FDFDFD',
                        fontSize: 12,
                        fontWeight: 500,
                        color: '#172B4D',
                        mr: 1,
                        mb: 1,
                        borderRadius: '4px'
                      }}>{organization?.name}</Typography>
                  )
                })
              }
            </Box>
          </Box>
          <Box sx={{textAlign: 'right'}}>
            <Box sx={{color: status ? '#388E3C' : '#E53935'}}>
              {status ? renderStatus('Gửi thành công') : renderStatus('Gửi thất bại', '#E53935')}
            </Box>
            <Typography
                sx={{
                  color: '#E53935',
                  fontSize: 13,
                  fontWeight: 400,
                  fontStyle: 'italic',
                  marginTop: 0.5
                }}
            >{status ? '' : 'Trong danh sách đơn vị đã tồn tại người dùng này'}</Typography>
          </Box>
        </Box>
      </>
  )
}

export default memo(OrganizationInviteResultCard);