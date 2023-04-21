import {styled} from "@mui/styles";
import {Box, Typography} from "@mui/material";
import { STYLE_CONSTANT as style } from "@/theme/palette";

const JobTitleStyle = styled(Typography)(() => ({
  "&.job-title": {
    fontSize: style.FONT_XL,
    fontWeight: style.FONT_SEMIBOLD,
    color: style.COLOR_TEXT_BLACK,
  }
}));
const BoxWrapperStyle = styled(Box)(() => ({
  width: style.WIDTH_FULL,
  borderRadius: 6,
}))

const BoxInnerStyle = styled(Box)(() => ({
  backgroundColor: style.BG_WHITE,
  boxShadow: ' 0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)',
  maxWidth: '844px',
  flex: 1
}))

const DividerCardStyle = styled(Box)(({theme}) => ({
  backgroundColor: '#455570',
  width: '844px',
  height: '52px',
  padding: theme.spacing(2, 3),
}))

export {
  JobTitleStyle,
  DividerCardStyle,
  BoxWrapperStyle,
  BoxInnerStyle,
}
