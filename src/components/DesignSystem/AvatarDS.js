import { View } from "../FlexStyled";
import { Avatar } from '@mui/material'
import PropTypes from "prop-types"
export const AvatarDS = (props) => {
    const { linkAvatar } = props;

    return (
        <View>
            <Avatar
                src={linkAvatar}
                sx={{ width: 48, height: 48 }}
            />
        </View>
    );
};

AvatarDS.prototype = {
    linkAvatar: PropTypes.any,
};