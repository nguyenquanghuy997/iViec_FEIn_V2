import { View } from "../FlexStyled";
import { LoadingButton } from "@mui/lab";
import PropTypes from "prop-types";

export default function ButtonDS(props) {
  const { size, loading, tittle, color, type, width } = props;

  return (
    <View>
      <LoadingButton
        variant="contained"
        loading={loading}
        color={color}
        type={type}
        size={size}
        style={{
          width: width,
          height: 44,
          borderRadius: 6,
          backgroundColor: "#1976D2",
        }}
        {...props}
      >
        {tittle}
      </LoadingButton>
    </View>
  );
}

ButtonDS.prototype = {
  type: PropTypes.any,
  color: PropTypes.any,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  loading: PropTypes.bool,
  tittle: PropTypes.any,
};
