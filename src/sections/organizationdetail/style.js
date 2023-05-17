import { styled } from "@mui/styles";
import { Box, Typography } from "@mui/material";
import { STYLE_CONSTANT as style } from "@/theme/palette";

const OrganizationNameStyle = styled(Typography)(({ theme }) => ({
  "&.organization-title": {
    fontSize: 24,
    fontWeight: 600,
    color: '#172B4D',
    mt: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
}));

const CardUserStyle = styled(Box)(({ theme }) => ({
  '&.card-user-item': {
    border: '1px solid #E7E9ED',
    backgroundColor: '#FDFDFD',
    padding: theme.spacing(2.5, 3),
    margin: theme.spacing(2, 0),
    borderRadius: 4,
  }
}));

const CardUserFormItemTitleStyle = styled(Box)(({ theme }) => ({
  '&.card-user-item-title': {
    display: 'flex',
    alignItems: 'center',
    color: style.COLOR_TEXT_PRIMARY,
    fontSize: style.FONT_BASE,
    fontWeight: style.FONT_SEMI_BOLD,
    marginBottom: theme.spacing(2),
    "& .MuiCheckbox-root": {
      padding: 0,
      marginRight: theme.spacing(2)
    },
    "& .card-user-item-subtitle": {
      color: style.COLOR_TEXT_PRIMARY,
      fontSize: style.FONT_13,
      fontWeight: style.FONT_NORMAL,
      marginTop: theme.spacing(0.5)
    }
  }
}));

const CardUserFormItemContentStyle = styled(Typography)(() => ({
  '&.card-user-item-content-text': {
    color: style.COLOR_TEXT_BLACK,
    fontSize: style.FONT_13,
    fontWeight: style.FONT_MEDIUM,
  }
}));


export {
  OrganizationNameStyle,
  CardUserStyle,
  CardUserFormItemTitleStyle,
  CardUserFormItemContentStyle
}