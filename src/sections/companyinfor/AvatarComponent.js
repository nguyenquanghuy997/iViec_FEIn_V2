import { Avatar, Badge } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
// import { RiImageFill } from "react-icons/ri";

const AvatarComponent = ({ linkAvatar, online, variant, ...props }) => {
  const inputProps = {
    variant: variant,
    src:
      `http://103.176.149.158:5001/api/Image/GetImage?imagePath=${linkAvatar}` ,
  };

  const StyledBadge = styled(Badge)(() => ({
    "& .MuiBadge-badge": online
      ? {
          top: "7%",
          backgroundColor: "#44b700",
          color: "#44b700",
          "&::after": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            border: "1px solid currentColor",
            content: '""',
          },
        }
      : null,
    "& .MuiBadge-anchorOriginTopRight": variant === "rounded" && {
      top: 2,
      right: 2,
    },
  }));

  return (
    <StyledBadge
      overlap="circular"
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      variant="dot"
      sx={{ marginRight: "5px", height: "auto" }}
    >
      <Avatar {...inputProps} {...props} />
    </StyledBadge>
  );
};

AvatarComponent.prototype = {
  linkAvatar: PropTypes.any,
  online: PropTypes.bool,
  variant: PropTypes.oneOf(["circular", "rounded", "square"]),
};

export default AvatarComponent;
