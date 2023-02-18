import { Avatar, Badge } from '@mui/material'
import PropTypes from "prop-types"
export default function AvatarDS(props) {
    const { src, sx } = props;

    return (
        <Badge
        variant="dot"
        color="success"
        sx={{
            marginRight:"8px",
          "& .MuiBadge-dot": {
            width: "6px",
            minWidth: "6px",
            height: "6px",
            top: 3,
            right: 3,
          },
        }}
      >
        <Avatar
          sx={{ ... sx }}
          src={src}
        />
      </Badge>
    );
}

AvatarDS.prototype = {
    src: PropTypes.element,
    sx: PropTypes.any,
};