import {Stack, Typography} from "@mui/material";
import PropTypes from 'prop-types';

const RightNoteText = ({ title, texts, children, ...props }) => {
  return (
      <Stack sx={{ backgroundColor: 'transparent', mt: 8, mx: 4.5}} {...props}>
        <Typography sx={{ color: '#455570', fontSize: 14, fontWeight: 600, mb: 2 }}>
          {title}
        </Typography>
        {texts.map((text, index) => (
            <Typography key={index} sx={{ color: '#5C6A82', fontSize: 14, fontWeight: 400, fontStyle: 'italic', mb: 2}}>
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