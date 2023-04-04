import HeaderCard from "../HeaderCard";
import { useGetCompanyInfoQuery } from "../companyInforSlice";
import EditHumanCompany from "../edit/EditHumanCompany";
import SwiperListHuman from "./SwiperListHuman";
import CloseIcon from "@/assets/CloseIcon";
import { Box, Drawer, List, Typography, Button, Divider } from "@mui/material";
import { useState } from "react";
import "react-multi-carousel/lib/styles.css";
import EmptyValue from "@/sections/companyinfor/components/EmptyValue";

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
    <Box sx={{ minHeight: '296px' }}>
      <HeaderCard
        text={"Con người công ty"}
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        data={Data}
      />
      {Data?.organizationHumans.length > 0 ? (
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
      ) : <EmptyValue text={"Hiện chưa có nội dung Con người công ty"} />}
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
    </Box>
  );
};

export default HumanCompany;
