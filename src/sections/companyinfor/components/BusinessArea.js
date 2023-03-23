import HeaderCard from "../HeaderCard";
import { Typography, Drawer, List, Button, Box, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay,
  Virtual,
} from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { useState } from "react";
import CloseIcon from "@/assets/CloseIcon";
import EditBusinessArea from "./EditBusinessArea";
SwiperCore.use([Navigation, Pagination, Autoplay, Virtual]);

export const SliderStyle = styled("div")(({}) => ({
  "& .swiper-pagination": {
    display: "flex",
    alignItems: "end",
  },
  "& .swiper-pagination-bullet": {
    background: "white",
  },
  "& .swiper-pagination-bullet.swiper-pagination-bullet-active": {
    background: "orange",
    width: 24,
    borderRadius: 8,
  },
}));

const BusinessArea = () => {
  const slides = [];
  const [open, setOpen] = useState();
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
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
        Chỉnh sửa Lĩnh vực kinh doanh
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
        <EditBusinessArea onClose={handleClose}/>
      </div>
    </Box>
  );
  for (let i = 0; i < 5; i++) {
    slides.push(
      <SwiperSlide key={`slide-${i}`} style={{ listStyle: "none" }}>
        <div
          className="slide"
          style={{
            height: "170px",
            // background: "#364d79",
            overflow: "hidden",
          }}
        >
          <hr
            style={{
              border: "3px solid #FF9800",
              width: "40px",
              borderRadius: "6px",
              marginBottom: "8px",
            }}
          />
          <p style={{ fontWeight: 700, fontSize: 16, marginBottom: "12px" }}>
            Chuyển đổi số
          </p>
          <p style={{ fontWeight: 500, fontSize: 14 }}>
            Giúp 1000+ công ty xây dựng phần mềm đáp ứng các nghiệp vụ phức tạp
          </p>
        </div>
      </SwiperSlide>
    );
  }
  return (
    <>
      <HeaderCard
        text="Lĩnh vực kinh doanh"
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
      <div
        style={{
          color: "white",
          width: "100%",
          height: "302px",
          backgroundImage: 'url("http://i.imgur.com/2tiJEnP.png")',
          backgroundsize: "cover",
          padding: "36px 40px",
        }}
      >
        <Typography variant="h4" sx={{ mb: "36px" }}>
          Lĩnh vực kinh doanh
        </Typography>
        <SliderStyle>
          <Swiper
            id="swiper"
            virtual
            slidesPerView={4}
            // slidesPerColumn={2}
            // slidesPerColumnFill="row"
            spaceBetween={50}
            // slidesPerGroup={2}
            // autoplay
            // loop
            // navigation
            pagination
          >
            {slides}
          </Swiper>
        </SliderStyle>
      </div>
    </>
  );
};
export default BusinessArea;
