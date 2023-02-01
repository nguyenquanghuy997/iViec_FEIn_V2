import { View } from "../FlexStyled";
import PropTypes from "prop-types";
import { LoadingButton } from "@mui/lab";
export default function ButtonDS(props) {
  const {size,isSubmitting,tittle,color ,type,width} = props;
  
  return (
    <View>
      <LoadingButton
        variant="contained"
        loading={isSubmitting}
        color={color}
        type={type}
        size={size}
        style={{
          width:width,
          height:44,
          borderRadius: 6,
          backgroundColor: "#1976D2",
      }}
      >
        {tittle}
      </LoadingButton>
      </View>
  );
}

ButtonDS.prototype = {
  type:PropTypes.any,
  color:PropTypes.any,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  isSubmitting:PropTypes.any,
  tittle:PropTypes.any,
};
