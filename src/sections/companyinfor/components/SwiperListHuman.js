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
import {DOMAIN_SERVER_API} from "@/config";

SwiperCore.use([Navigation, Pagination, Autoplay, Virtual]);
export const SliderStyle = styled("div")(({theme}) => ({
  "& .swiper-button-prev": {
    color: theme.palette.common.neutral700,
    background: theme.palette.common.neutral50,
    borderRadius: "100px",
    width: "48px",
    height: "48px",
    "&::after": {
      content: { RiArrowDropLeftLine },
      color: theme.palette.common.neutral700,
      fontSize: 14,
      fontWeight: 600,
    },
  },
  "& .swiper-button-next": {
    background: theme.palette.common.neutral50,
    borderRadius: "100px",
    width: "48px",
    height: "48px",
    "&::after": {
      content: { RiArrowDropRightLine },
      color: theme.palette.common.neutral700,
      fontSize: 14,
      fontWeight: 600,
    },
  },
}));
export default function SwiperListHuman({ data }) {

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
                src={!item?.avatar ? '/assets/placeholder.png' : `${DOMAIN_SERVER_API}/Image/GetImage?imagePath=${item?.avatar}`}
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
                  mb: '4px'
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
