import HeaderCard from "../HeaderCard";
import { Box } from "@mui/material";

// const data = [
//   {
//     title: "Chuyển đổi số",
//     detail:
//       "Giúp 1000+ công ty xây dựng phần mềm đáp ứng các nghiệp vụ phức tạp",
//   },
//   {
//     title: "Chuyển đổi số",
//     detail:
//       "Giúp 1000+ công ty xây dựng phần mềm đáp ứng các nghiệp vụ phức tạp",
//   },
//   {
//     title: "Chuyển đổi số",
//     detail:
//       "Giúp 1000+ công ty xây dựng phần mềm đáp ứng các nghiệp vụ phức tạp",
//   },
//   {
//     title: "Chuyển đổi số",
//     detail:
//       "Giúp 1000+ công ty xây dựng phần mềm đáp ứng các nghiệp vụ phức tạp",
//   },
// ];
const NestedGrid = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        "& .MuiGrid-root": {
          maxwWidth: "100%",
          flexBasis: "100%",
        },
      }}
    >
     
    </Box>
  );
};

const BusinessArea = () => {
  return (
    <>
      <HeaderCard text="Lĩnh vực kinh doanh" />
      <Box sx={{ position: "relative", pt: 2, background: "white" }}>
        <img
          src={
            "data:image/jpeg;base64,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"
          }
          alt="tesst"
          style={{ width: "100%", height: "302px" }}
        />
        <p
          style={{
            color: "white",
            position: "absolute",
            top: "11%",
            fontSize: "24px",
            fontWeight: 700,
            left: "4%",
          }}
        >
          Lĩnh vực kinh doanh
        </p>
        <div
          className="tesst"
          style={{
            position: "absolute",
            top: "33%",
            left: "5.5%",
            width: "100%",
          }}
        >
          <NestedGrid />
        </div>
      </Box>
    </>
  );
};
export default BusinessArea;
