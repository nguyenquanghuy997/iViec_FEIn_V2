import { View } from "../FlexStyled";
import Logo from "@/components/Logo";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";

LogoHeader.propTypes = {};

export default function LogoHeader() {
  const theme = useTheme();
  return (
    <View style={{ backgroundColor: theme.palette.common.white }} width={"100%"}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100px"
      >
        <Logo />
      </Box>
      <Divider
        color= {theme.palette.common.white}
        sx={{
          boxShadow:
            "0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)",
        }}
      />
    </View>
  );
}
