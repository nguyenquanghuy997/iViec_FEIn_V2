import { View } from "./FlexStyled";
import gravatar from "gravatar";
import PropTypes from "prop-types";

export const Avatar = (props) => {
  const { size = 24, children } = props;

  return (
    <View hidden size={size} borderRadius={size}>
      <img
        src={
          String(children).startsWith("http")
            ? String(children).trim()
            : gravatar.url(children, {
                size,
                default: "identicon",
              })
        }
        style={{ width: "100%", height: "100%" }}
      />
    </View>
  );
};

Avatar.prototype = {
  size: PropTypes.number,
  children: PropTypes.any,
};
