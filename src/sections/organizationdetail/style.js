import {styled} from "@mui/styles";
import {Typography} from "@mui/material";

const OrganizationNameStyle = styled(Typography)(({theme}) => ({
  "&.organization-title": {
    fontSize: 24,
    fontWeight: 600,
    color: '#172B4D',
    mt: theme.spacing(2)
  }
}));

export {
  OrganizationNameStyle
}