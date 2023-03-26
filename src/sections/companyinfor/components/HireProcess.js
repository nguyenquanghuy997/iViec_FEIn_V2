import IconRole1 from "@/assets/IconRole1";
import HeaderCard from "../HeaderCard";
import { useState } from "react";
import { Box, List,Drawer, Typography, Button, Divider } from "@mui/material";
import CloseIcon from "@/assets/CloseIcon";
import EditHirePipeline from "./EditHirePipeline";
import { useGetCompanyInfoQuery } from "../companyInforSlice";

const HireProcess = () => {
  const { data: Data } = useGetCompanyInfoQuery();
   const [open, setOpen] = useState();
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
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
  const list = () => (
    <Box
      sx={{ width: 700 }}
      role="presentation"
      // onKeyDown={toggleDrawer(false)}
    >
      <List
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: 0,
        }}
      >
        <Typography sx={{ p: "22px 24px", fontSize: 16, fontWeight: 600 }}>
        Chỉnh sửa Quy trình tuyển dụng 
        </Typography>
        <Button
          onClick={handleClose}
          sx={{
            "&:hover": {
              background: "white",
            },
          }}
        >
          <CloseIcon />
        </Button>
      </List>
      <Divider />
      <div>
        <EditHirePipeline data ={Data} onClose={handleClose}/>
      </div>
    </Box>
  );
  return (
    <>
      <HeaderCard 
      text="Quy trình tuyển dụng"   
      open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        />
        {open && (
        <Drawer
          anchor="right"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
        >
          {list("right")}
        </Drawer>
      )}
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
                textAlign:'center'
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
