import { STYLE_CONSTANT as style } from "@/theme/palette";
import { Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";

const TextNote = ({ title, texts, children, ...props }) => {
  return (
    <Stack sx={{ mt: "36px", mx: "36px" }} {...props}>
      <Typography
        sx={{
          color: style.COLOR_TEXT_PRIMARY,
          fontSize: style.FONT_SM,
          fontWeight: style.FONT_SEMI_BOLD,
        }}
      >
        {title}
      </Typography>

      {texts.map((text, index) => (
        <Typography
          key={index}
          sx={{
            marginTop: index ? "24px" : "8px",
            color: style.COLOR_TEXT_SECONDARY,
            fontSize: style.FONT_SM,
            fontWeight: style.FONT_NORMAL,
          }}
        >
          {text}
        </Typography>
      ))}
      {children}
    </Stack>
  );
};

TextNote.propTypes = {
  title: PropTypes.string,
  texts: PropTypes.array,
};

TextNote.defaultProps = {
  title: "",
  texts: [],
};

export default TextNote;
