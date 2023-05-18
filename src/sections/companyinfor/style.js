import {styled} from "@mui/styles";
import {Box} from "@mui/material";
import {STYLE_CONSTANT as style} from "@/theme/palette";

const BoxInfoStyle = styled(Box)(({theme}) => ({
  "&.box-info": {
    display: "flex",
    padding: theme.spacing(2, 5),
    background: style.COLOR_WHITE,
    "& .box-image": {
      display: 'flex',
      justifyContent: 'center',
      width: 150,
      position: 'relative',
      "& .avatar-image": {
        width: "120px",
        height: "120px",
        border: "3px solid #FDFDFD",
        backgroundColor: '#E7E9ED',
        borderRadiuA5D6A7s: "50%",
        zIndex: 1000,
        position: 'absolute',
        top: '0%',
        left: 0,
        transform: 'translateY(-50%)',
        cursor: 'pointer',
      },
      "& .avatar-image.avatar-placeholder": {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
      }
    }
  }
}));

export {
  BoxInfoStyle
}