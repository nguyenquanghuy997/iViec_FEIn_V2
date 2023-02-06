import PropTypes from "prop-types";
import { Stack, Typography } from "@mui/material";
import { STYLE_CONSTANT } from "./constants";

const RegisterFormSectionLabel = ({ title }) => {
  return (
    <Stack
      sx={{
        mb: 2.5,
        mt: 5,
        height: 64,
        backgroundColor: STYLE_CONSTANT.COLOR_BG_GRAY,
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <Typography
        variant="body1"
        sx={{
          fontSize: STYLE_CONSTANT.FONT_SM,
          color: STYLE_CONSTANT.COLOR_TEXT_SECONDARY,
          width: STYLE_CONSTANT.WIDTH_FULL,
          fontWeight: STYLE_CONSTANT.FONT_SEMIBOLD,
          py: 2.75,
          px: 2,
        }}
      >
        {title}
      </Typography>
    </Stack>
  );
};

RegisterFormSectionLabel.propTypes = {
  title: PropTypes.string,
};

RegisterFormSectionLabel.defaultProps = {
  title: "",
};

export default RegisterFormSectionLabel;
