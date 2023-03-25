import {
  Box,
  Typography,
  FormControlLabel,
  Button,
  Switch,
} from "@mui/material";
import { styled } from "@mui/styles";

const ActiveSwitch = styled(Switch)(() => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#388E3C",
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#388E3C",
  },
}));

const HeaderCard = ({ text }) => {
  return (
    <Box
      sx={{
        background: "white",
        mt: 3,
        pt: 2.5,
        px: 5,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Typography sx={{ m: "auto 0" }}>{text}</Typography>
      <Box>
        <FormControlLabel
          control={<ActiveSwitch defaultChecked />}
          label="Hiển thị"
        />
        <Button
          sx={{
            padding: "8px 12px 8px 14px",
            background: "#F3F4F6",
            textDecoration: "none",
            color: "#455570",
            ml:2,
            fontWeight:500
          }}
          // onClick={toggleDrawer(true)}
        >
          {"Chỉnh sửa "}
        </Button>
      </Box>
    </Box>
  );
};
export default HeaderCard;
