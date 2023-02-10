import { View } from "@/components/FlexStyled";
import Logo from "@/components/Logo";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

SearchBar.propTypes = {};

export default function SearchBar() {
  return (
    <View style={{ backgroundColor: '#FDFDFD' }} width={"100%"}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100px"
      >
        <Logo />
      </Box>
      <Divider
        color="#FDFDFD"
        sx={{
          boxShadow:
            "0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)",
        }}
      />
    </View>
  );
}
