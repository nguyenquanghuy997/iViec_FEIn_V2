import { View } from "../FlexStyled";
import { LoadingButton } from "@mui/lab";
import PropTypes from "prop-types";
import { memo } from 'react'
import {useTheme} from "@mui/material/styles";

function ButtonDS(props) {
  const theme = useTheme();
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
          backgroundColor: theme.palette.common.neutral100 + " !important",
          color: theme.palette.common.black,
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
          backgroundColor: theme.palette.common.blue700,
          fontWeight: 600,
          boxShadow: "unset",
          textTransform: "none",
          "&:disabled": {
            backgroundColor: theme.palette.common.neutral200,
            color: theme.palette.common.neutral500,
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

export default memo(ButtonDS);