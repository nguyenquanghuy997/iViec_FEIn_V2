import {styled} from "@mui/styles";
import {Accordion, Box, Button, Typography} from "@mui/material";

const BoxFlex = styled(Box)((
    {
      theme,
      alignItems = 'center',
      justifyContent = 'space-between',
      flexWrap = 'wrap',
      flexDirection = 'row',
      padding = theme.spacing(0),
      margin = theme.spacing(0),
    }) => {
  return {
    display: 'flex',
    padding: padding,
    margin: margin,
    alignItems: alignItems,
    justifyContent: justifyContent,
    flexWrap: flexWrap,
    flexDirection: flexDirection
  }
});

const ButtonAddStyle = styled(Button)(({theme}) => ({
  '&.button-add': {
    padding: theme.spacing(1, 1.5),
    backgroundColor: '#1976D2',
    borderRadius: 6,
    color: "#FDFDFD",
    minHeight: '36px',
    fontSize: 14,
    fontWeight: 600,
    textTransform: 'none',
    "&:hover": {
      backgroundColor: '#1976D2',
      color: "#FDFDFD",
    },
  }
}));

const TitleStyle = styled(Typography)(({theme}) => ({
  '&.form-title': {
    color: '#172B4D',
    fontSize: 20,
    fontWeight: 700,
    marginBottom: theme.spacing(1)
  }
}));

const SubTitleStyle = styled(Typography)(({}) => ({
  '&.form-subtitle': {
    color: '#455570',
    fontSize: 14,
    fontWeight: 400,
  }
}));

const CardEmailFormItemStyle = styled(Accordion)(({theme}) => ({
  '&.card-email-item': {
    border: '1px solid #E7E9ED',
    backgroundColor: '#FDFDFD',
    padding: theme.spacing(2.5, 3),
    marginBottom: theme.spacing(2),
    borderRadius: 4,
    "&.Mui-expanded": {
      borderRadius: 4,
      boxShadow: 'none',
    },
    "& .MuiAccordionSummary-root": {
      paddingLeft: 0,
      minHeight: theme.spacing(3),
      alignItems: 'flex-start',
      "& .MuiAccordionSummary-expandIconWrapper": {
        position: 'absolute',
        top: 10,
        right: 6
      }
    },
    "& .MuiAccordionSummary-content": {
      marginBottom: 0,
      marginTop: 0,
      display: 'block'
    },
    "& .MuiAccordionDetails-root": {
      padding: 0,
      marginTop: theme.spacing(3)
    }
  }
}));
const CardEmailFormItemTitleStyle = styled(Typography)(({theme}) => ({
  '&.card-email-item-title': {
    display: 'flex',
    alignItems: 'center',
    color: '#455570',
    fontSize: 16,
    fontWeight: 600,
    marginBottom: theme.spacing(3),
    "& .MuiCheckbox-root": {
      padding: 0,
      marginRight: theme.spacing(2)
    },
    "& .card-email-item-subtitle": {
      color: '#455570',
      fontSize: 13,
      fontWeight: 400,
      marginLeft: theme.spacing(0.5)
    }
  }
}));

const CardEmailFormItemSubTitleStyle = styled(Typography)(({theme}) => ({
    "& .card-email-item-subtitle": {
      color: '#455570',
      fontSize: 13,
      fontWeight: 400,
      marginLeft: theme.spacing(0.5)
    }
}));

const CardEmailFormItemContentStyle = styled(Typography)(({theme}) => ({
  '&.card-email-item-content-text': {
    display: 'flex',
    alignItems: 'flex-end',
    color: '#172B4D',
    fontSize: 12,
    fontWeight: 400,
    "& .card-email-item-content-subtext": {
      color: '#5C6A82',
      fontSize: 12,
      fontWeight: 400,
      marginLeft: theme.spacing(0.5)
    }
  }
}));

// modal form
const EmailFormHeadStyle = styled(Box)(({theme}) => ({
  "&.email-form-head": {
    position: "fixed",
    top: 0,
    right: 0,
    minWidth: 800,
    backgroundColor: '#FDFDFD',
    zIndex: 1,
    borderBottom: '1px solid #E7E9ED',
    padding: theme.spacing(2),
    height: theme.spacing(8),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
}));

const EmailFormFooterStyle = styled(Box)(({theme}) => ({
  "&.email-form-footer": {
    position: "fixed",
    bottom: 0,
    right: 0,
    minWidth: 800,
    backgroundColor: '#FDFDFD',
    zIndex: 1,
    borderTop: '1px solid #E7E9ED',
    padding: theme.spacing(2),
    height: theme.spacing(8),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
}));

export {
  BoxFlex,
  ButtonAddStyle,
  TitleStyle,
  SubTitleStyle,
  CardEmailFormItemStyle,
  CardEmailFormItemTitleStyle,
  CardEmailFormItemContentStyle,
  CardEmailFormItemSubTitleStyle,
  EmailFormHeadStyle,
  EmailFormFooterStyle
}