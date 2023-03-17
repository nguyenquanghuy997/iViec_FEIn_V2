import { View } from "../FlexStyled";
import { LoadingButton } from "@mui/lab";
import PropTypes from "prop-types";

export default function ButtonDS(props) {
  const {
    size,
    isSubmitting,
    isDisabled,
    tittle,
    type,
    onClick,
    icon,
    sx,
    ...other
  } = props;

  return (
    <View
      sx={{
        "&:hover": {
          backgroundColor: "#E7E9ED !important",
          color: "#000",
        },
      }}
    >
      <LoadingButton
        {...other}
        variant="contained"
        loading={isSubmitting}
        type={type}
        size={size}
        onClick={onClick}
        disabled={isDisabled}
        sx={{
          borderRadius: "6px",
          backgroundColor: "#1976D2",
          fontWeight: 600,
          boxShadow: "unset",
          textTransform: "none",
          "&:disabled": {
            backgroundColor: "#D0D4DB",
            color: "#8A94A5",
          },
          ...sx,
        }}
      >
        {icon}
        {tittle}
      </LoadingButton>
    </View>
  );
}

ButtonDS.prototype = {
  type: PropTypes.any,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  isSubmitting: PropTypes.any,
  tittle: PropTypes.any,
  onClick: PropTypes.any,
  icon: PropTypes.any,
  sx: PropTypes.object,
  isDisabled: PropTypes.any,
};
