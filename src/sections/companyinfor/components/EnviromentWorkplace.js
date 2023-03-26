import HeaderCard from "../HeaderCard";
import { Box } from "@mui/material";
import "react-multi-carousel/lib/styles.css";

const EnviromentWorkplace = () => {
  return (
    <>
      <HeaderCard text={"Môi trường làm việc"} />
      <Box
        sx={{
          px: 12,
          pb: 3,
          background: "white",
          width: "100%",
        }}
      >
       {/* <SwiperColumn/> */}
      </Box>
    </>
  );
};

export default EnviromentWorkplace;
