import HeaderCard from "../HeaderCard";
import { useGetCompanyInfoQuery } from "../companyInforSlice";
import EditBusinessArea from "./EditBusinessArea";
import CloseIcon from "@/assets/CloseIcon";
import NoInformation from "@/assets/NoInformation";
import { Typography, Drawer, List, Button, Box, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { useState } from "react";
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay,
  Virtual,
} from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

SwiperCore.use([Navigation, Pagination, Autoplay, Virtual]);

export const SliderStyle = styled("div")(() => ({
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
  const { data: Data } = useGetCompanyInfoQuery();
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
        <EditBusinessArea onClose={handleClose} />
      </div>
    </Box>
  );

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
      {Data ? (
        <div
          style={{
            color: "white",
            width: "100%",
            height: "302px",
            backgroundImage: `url(http://103.176.149.158:5001/api/Image/GetImage?imagePath=${Data?.organizationBusiness?.businessPhoto})`,
            // backgroundsize: "cover",
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
              spaceBetween={50}
              pagination
            >
              {Data?.organizationBusiness?.organizationBusinessDatas.map(
                (item, index) => (
                  <SwiperSlide
                    key={`slide-${index}`}
                    style={{ listStyle: "none" }}
                  >
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
                      <p
                        style={{
                          fontWeight: 700,
                          fontSize: 16,
                          marginBottom: "12px",
                        }}
                      >
                        {item?.name}
                      </p>
                      <p style={{ fontWeight: 500, fontSize: 14, height:'76px', overflow:'hidden' }}>
                        {item?.description}
                      </p>
                    </div>
                  </SwiperSlide>
                )
              )}
            </Swiper>
          </SliderStyle>
        </div>
      ) : (
        <Box sx={{ bgcolor: "white" }}>
          {" "}
          <Box sx={{ display: "flex", justifyContent: "center", pt: 4 }}>
            <NoInformation />
          </Box>
          <Typography sx={{ textAlign: "center", pb: 6 }}>
            Hiện chưa có nội dung
          </Typography>
        </Box>
      )}
    </>
  );
};
export default BusinessArea;
