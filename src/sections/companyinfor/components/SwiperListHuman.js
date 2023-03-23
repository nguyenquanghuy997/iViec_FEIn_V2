import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { RiArrowDropLeftLine, RiArrowDropRightLine } from "react-icons/ri";
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay,
  Virtual,
} from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

SwiperCore.use([Navigation, Pagination, Autoplay, Virtual]);
export const SliderStyle = styled("div")(({}) => ({
  "& .swiper-button-prev": {
    color: "#455570",
    background: "#F3F4F6",
    borderRadius: "100px",
    width: "48px",
    height: "48px",
    "&::after": {
      content: { RiArrowDropLeftLine },
      color: "#455570",
      fontSize: 14,
      fontWeight: 600,
    },
  },
  "& .swiper-button-next": {
    background: "#F3F4F6",
    borderRadius: "100px",
    width: "48px",
    height: "48px",
    "&::after": {
      content: { RiArrowDropRightLine },
      color: "#455570",
      fontSize: 14,
      fontWeight: 600,
    },
  },
}));
export default function SwiperListHuman({ data }) {
  const slides = [];

  for (let i = 0; i < 5; i++) {
    slides.push(
      <SwiperSlide key={`slide-${i}`} style={{ listStyle: "none" }}>
        <Box>
          <img
            src={
              "https://i.pinimg.com/236x/7c/ec/9b/7cec9b3ce82bd81f11aec198115adc5a.jpg"
            }
            alt="image"
            style={{ height: "254px" }}
          />
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 16,
              display: "flex",
              justifyContent: "center",
              mt: 2,
            }}
          >
            Nguyễn thu thủy
          </Typography>
          <Typography
            sx={{ fontSize: 14, display: "flex", justifyContent: "center" }}
          >
            Trưởng phòng vận hành
          </Typography>
        </Box>
      </SwiperSlide>
    );
  }

  return (
    <SliderStyle>
      <Swiper
        id="swiper"
        virtual
        slidesPerView={4}
        spaceBetween={50}
        navigation
        //   pagination
      >
        {data?.organizationHumans.map((item, index) => (
          <SwiperSlide key={`slide-${index}`} style={{ listStyle: "none" }}>
            <Box>
              <img
                src={`http://103.176.149.158:5001/api/Image/GetImage?imagePath=${item?.avatar}`}
                alt="image"
                style={{ height: "254px", objectFit: "cover" }}
              />
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: 16,
                  display: "flex",
                  justifyContent: "center",
                  mt: 2,
                }}
              >
                {item?.name}
              </Typography>
              <Typography
                sx={{ fontSize: 14, display: "flex", justifyContent: "center" }}
              >
                {item?.description}
              </Typography>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </SliderStyle>
  );
}
