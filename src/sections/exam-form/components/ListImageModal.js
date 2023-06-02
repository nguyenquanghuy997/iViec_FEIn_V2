import { DOMAIN_SERVER_API } from '@/config'
import { SliderStyle } from '@/utils/cssStyles'
import { Box, Dialog, useTheme } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { View } from '@/components/DesignSystem/FlexStyled';
import { ButtonDS } from '@/components/DesignSystem';
import Iconify from '@/components/Iconify';

function ListImageModal({ images, show, onClose }) {
  const theme = useTheme()
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <Dialog
      fullWidth
      maxWidth='md'
      open={show}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiDialog-container": {
          alignItems: 'start',
        },
        "& .MuiPaper-root": {
          top: "100px !important",
          padding: "0 !important",
          borderRadius: "6px !important",
          background: 'transparent',
          boxShadow: 'none',
        },
        ".MuiModal-backdrop": {
          background: 'rgba(9, 30, 66, 0.5)'
        }
      }}
    >
      <SliderStyle>
        <Box sx={{ position: 'relative', display: 'flex' }}>
          <Swiper
            spaceBetween={10}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
          >
            {
              images.map((item, index) => (
                <SwiperSlide key={`slide-${index}`} style={{ listStyle: "none" }}>
                  <View jccenter={'true'} flexrow={'true'}>
                    <img
                      src={`${DOMAIN_SERVER_API}/Image/GetImage?imagePath=${item}`}
                      alt="image"
                      style={{ height: "538px", width: '538px', objectFit: "cover" }}
                    />

                  </View>
                </SwiperSlide>
              ))
            }
          </Swiper>
          <ButtonDS
            type="button"
            sx={{
              position: 'absolute',
              top: 0,
              right: 125,
              zIndex: 1,
              backgroundColor: 'rgba(92, 106, 130, 0.75)',
              boxShadow: "none",
              ":hover": {
                backgroundColor: 'rgba(92, 106, 130, 0.75)',
              },
              textTransform: "none",
              padding: "12px",
              minWidth: "unset",
            }}
            onClick={onClose}
            icon={
              <Iconify
                icon={"mi:close"}
                width={20}
                height={20}
                color={theme.palette.common.white}
              />
            }
          />
        </Box>

        <Box mt={'100px'}>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={0}
            slidesPerView={6}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className='swiper-center'
          >
            {images.map((item, index) => (
              <SwiperSlide key={`slide-${index}`} style={{ listStyle: "none", }}>
                <img
                  src={`${DOMAIN_SERVER_API}/Image/GetImage?imagePath=${item}`}
                  alt="image"
                  style={{ height: "100px", width: '100px', objectFit: "cover" }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </SliderStyle>
    </Dialog>
  )
}

export default ListImageModal