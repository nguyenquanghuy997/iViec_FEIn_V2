import HeaderCard from "../HeaderCard";
import { useGetCompanyInfoQuery } from "../companyInforSlice";
import EditHumanCompany from "../edit/EditHumanCompany";
import SwiperListHuman from "./SwiperListHuman";
import CloseIcon from "@/assets/CloseIcon";
import NoInformation from "@/assets/NoInformation";
import { Box, Drawer, List, Typography, Button, Divider } from "@mui/material";
// import { textAlign } from "@mui/system";
import { useState } from "react";
import "react-multi-carousel/lib/styles.css";

const HumanCompany = () => {
  const [open, setOpen] = useState();
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const { data: Data } = useGetCompanyInfoQuery();
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
          Chỉnh sửa Con người công ty
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
        <EditHumanCompany onClose={handleClose} />
      </div>
    </Box>
  );
  return (
    <>
      <HeaderCard
        text={"Con người công ty"}
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
      />
      {Data ? (
        <Box
          sx={{
            px: 5,
            pb: 3,
            background: "white",
            "& li.react-multi-carousel-item": {
              maxWidth: "215px!important",
              objectFit: "cover",
              mr: 2,
            },
          }}
        >
          <SwiperListHuman data={Data} />
        </Box>
      ) : (
        <Box sx={{ bgcolor: "white" }}>
          {" "}
          <Box sx={{ display: "flex", justifyContent: "center", pt:4 }}>
            <NoInformation />
          </Box>
          <Typography sx={{ textAlign: "center", pb:6 }}>
            Hiện chưa có nội dung
          </Typography>
        </Box>
      )}
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
    </>
  );
};

export default HumanCompany;
