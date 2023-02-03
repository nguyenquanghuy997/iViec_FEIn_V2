import { View } from "../FlexStyled";
import Box from '@mui/material/Box';
import Logo from "@/components/Logo";
import Divider from '@mui/material/Divider';

LogoHeader.propTypes = {

}

export default function LogoHeader() {

    return (
        <View bgColor="#FDFDFD" width={"100%"}>
            <Box  display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100px"
            >
                <Logo />

            </Box>


            {/* <Box mb={"28px"} /> */}
            <Divider color="#FDFDFD" sx={{ boxShadow: "0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)" }} />
        </View>
    );
}
