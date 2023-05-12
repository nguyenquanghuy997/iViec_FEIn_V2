import PropTypes from 'prop-types';
import {Stack, Typography} from "@mui/material";
import {STYLE_CONSTANT as style} from "@/theme/palette";

const TextNote = ({ title, texts, children, ...props }) => {
  return (
      <Stack sx={{ backgroundColor: 'transparent', mt: 8, mx: 4.5}} {...props}>
        <Typography sx={{ color: style.COLOR_TEXT_PRIMARY, fontSize: style.FONT_SM, fontWeight: style.FONT_SEMI_BOLD, mb: 2 }}>
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

TextNote.propTypes = {
  title: PropTypes.string,
  texts: PropTypes.array,
};

TextNote.defaultProps = {
  title: '',
  texts: [],
};

export default TextNote;