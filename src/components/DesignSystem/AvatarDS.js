import { Avatar, Badge } from '@mui/material'
import PropTypes from "prop-types";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}
function stringAvatar(name) {
  if(name){
    return {
      sx: {
        bgcolor: stringToColor(name),

      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }
  
}
export default function AvatarDS(props) {
    const { src, sx, name } = props;
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
        {...stringAvatar(name)}
          sx={{ ... sx }}
          src={src}
        />
      </Badge>
    );
}
AvatarDS.prototype = {
  src: PropTypes.element,
  sx: PropTypes.any,
  name: PropTypes.any,
};