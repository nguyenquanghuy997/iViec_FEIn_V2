import { View } from "../FlexStyled";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

DividerDS.propTypes = {

}

export default function DividerDS() {

    return (
        <View>
             <Box mt={4} mb={4} />
            <Divider color="#E7E9ED"/>
        </View>
    );
}
