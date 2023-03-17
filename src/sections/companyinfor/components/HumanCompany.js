import HeaderCard from "../HeaderCard";
import Simple from "./Simple";
import { Box } from "@mui/material";
import "react-multi-carousel/lib/styles.css";

const HumanCompany = ({ deviceType }) => {
  return (
    <>
      <HeaderCard text={"Con người công ty"} />
      <Box
        sx={{
          px: 5,
          py: 3,
          background: "white",
          "& li.react-multi-carousel-item": {
            maxWidth: "215px!important",
            objectFit: 'cover',
            mr: 2
          },
        }}
      >
        <Simple deviceType={deviceType} />
      </Box>
    </>
  );
};

// HumanCompany.getInitialProps = ({ req }) => {
//   let userAgent;
//   if (req) {
//     userAgent = req.headers["user-agent"];
//   } else {
//     userAgent = navigator.userAgent;
//   }
//   const parser = new UAParser();
//   parser.setUA(userAgent);
//   const result = parser.getResult();
//   const deviceType = (result.device && result.device.type) || "desktop";
//   return { deviceType };
// };
export default HumanCompany;
