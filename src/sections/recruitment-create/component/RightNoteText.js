import {Stack, Typography} from "@mui/material";
import PropTypes from 'prop-types';
import {STYLE_CONSTANT as style} from "@/theme/palette";

const RightNoteText = ({ title, texts, children, ...props }) => {
  return (
      <Stack sx={{ backgroundColor: 'transparent', mt: 8, mx: 4.5}} {...props}>
        <Typography sx={{ color: style.COLOR_TEXT_PRIMARY, fontSize: style.FONT_SM, fontWeight: style.FONT_SEMIBOLD, mb: 2 }}>
          {title}
        </Typography>
        {texts.map((text, index) => (
            <Typography key={index} sx={{ color: style.COLOR_TEXT_SECONDARY, fontSize: style.FONT_SM, fontWeight: style.FONT_NORMAL, fontStyle: 'italic', mb: 2}}>
              {text}
            </Typography>
        ))}
        {children}
      </Stack>
  )
}

RightNoteText.propTypes = {
  title: PropTypes.string,
  texts: PropTypes.array,
};

RightNoteText.defaultProps = {
  title: '',
  texts: [],
};

export default RightNoteText;