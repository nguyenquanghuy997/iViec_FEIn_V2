import IconRole1 from "../../../assets/IconRole1";
import HeaderCard from "../HeaderCard";
import { Typography, Box } from "@mui/material";

const HireProcess = () => {
  const steps = [
    {
      icon: <IconRole1 />,
      order: 1,
      name: "Ứng tuyển",
      detail: "Ứng tuyển trên Jobsite hoặc nhà tuyển dụng thêm vào tin.",
    },
    {
      icon: <IconRole1 />,
      order: 2,
      name: "Ứng tuyển",
      detail: "Ứng tuyển trên Jobsite hoặc nhà tuyển dụng thêm vào tin.",
    },

    {
      icon: <IconRole1 />,
      order: 3,
      name: "Ứng tuyển",
      detail: "Ứng tuyển trên Jobsite hoặc nhà tuyển dụng thêm vào tin.",
    },
    {
      icon: <IconRole1 />,
      order: 4,
      name: "Ứng tuyển",
      detail: "Ứng tuyển trên Jobsite hoặc nhà tuyển dụng thêm vào tin.",
    },
    {
      icon: <IconRole1 />,
      order: 5,
      name: "Ứng tuyển",
      detail: "Ứng tuyển trên Jobsite hoặc nhà tuyển dụng thêm vào tin.",
    },
  ];
  return (
    <>
      <HeaderCard text="Quy trình tuyển dụng" />
      <Box sx={{ background: "white", py: 2, display: "flex", px: 5 }}>
        {steps?.map((item) => (
          <Box sx={{ minWidth: "200px" }}>
            <div style={{display:'flex', justifyContent:'center'}}>{item.icon}</div>
            <Typography
              sx={{
                fontSize: 28,
                color: "#F77A0C",
                display: "flex",
                justifyContent: "center",
              }}
              color="text.secondary"
              gutterBottom
            >
              {item?.order}
            </Typography>
            <Typography
              sx={{
                mb: 1.5,
                fontSize: 16,
                fontWeight: 600,
                display: "flex",
                justifyContent: "center",
              }}
              color="#172B4D"
            >
              {item?.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {item?.detail}
            </Typography>
          </Box>
        ))}
      </Box>
    </>
  );
};
export default HireProcess;
