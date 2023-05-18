import { View } from "../FlexStyled";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import {useTheme} from "@mui/material/styles";

DividerDS.propTypes = {

}

export default function DividerDS() {
  const  theme = useTheme();
    return (
        <View>
             <Box mt={4} mb={4} />
            <Divider color={theme.palette.common.neutral100}/>
        </View>
    );
}
