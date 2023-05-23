import HeaderCard from "../HeaderCard";
import { useUpdateCompanyEndingMutation } from "../companyInforSlice";
import EditBusinessArea from "../edit/EditBusinessArea";
import LoadingScreen from "@/components/LoadingScreen";
import { drawerPaperStyle } from "@/components/drawer-edit-form/styles";
import { DOMAIN_SERVER_API } from "@/config";
import EmptyValue from "@/sections/companyinfor/components/EmptyValue";
import { Box, Drawer, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { get } from "lodash";
import { useSnackbar } from "notistack";
import { useState } from "react";
import SwiperCore, {
  Autoplay,
  Navigation,
  Pagination,
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

const BusinessArea = ({ data }) => {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const [open, setOpen] = useState();
  const [checked, setChecked] = useState(data?.isBusinessesVisible);
  const [loading, setLoading] = useState(false);

  const [updateVisibleHuman] = useUpdateCompanyEndingMutation();

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleChangeChecked = async () => {
    setLoading(true);
    try {
      await updateVisibleHuman({
        organizationId: data?.id,
        isBusinessesVisible: !checked,
      }).unwrap();
      setChecked(!checked);
      enqueueSnackbar("Chỉnh sửa hiển thị thành công!", {
        autoHideDuration: 1000,
      });
      setLoading(false);
    } catch (e) {
      enqueueSnackbar(
        "Chỉnh sửa hiển thị không thành công, vui lòng thử lại!",
        {
          autoHideDuration: 1000,
          variant: "error",
        }
      );
      setLoading(false);
      return e;
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Box sx={{ minHeight: "296px" }}>
        <HeaderCard
          text="Lĩnh vực kinh doanh"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          handleChange={handleChangeChecked}
          checked={checked}
        />
        {get(data, "organizationBusiness.organizationBusinessDatas") ? (
          <Box
            style={{
              color: "white",
              width: "100%",
              minHeight: "302px",
              //   backgroundImage: `url(${DOMAIN_SERVER_API}/Image/GetImage?imagePath=${get(
              //     data,
              //     "organizationBusiness.businessPhoto"
              //   )})`,
              //   backgroundColor: "rgba(23, 43, 77, 0.65)",
              position: "relative",
              padding: "36px 40px",
            }}
          >
            <div
              style={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                position: "absolute",
              }}
            >
              <img
                src={`${DOMAIN_SERVER_API}/Image/GetImage?imagePath=${get(
                  data,
                  "organizationBusiness.businessPhoto"
                )}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
            <div
              style={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                position: "absolute",
                background: "rgba(23, 43, 77, 0.65)",
                backdropFilter: "blur(1px)",
              }}
            />

            <Typography variant="h4" sx={{ mb: "36px", position: "relative" }}>
              Lĩnh vực kinh doanh
            </Typography>
            <SliderStyle>
              <Swiper
                id="swiper"
                virtual
                slidesPerView={4}
                spaceBetween={50}
                pagination
                autoplay={{
                  delay: 2000,
                }}
              >
                {get(data, "organizationBusiness.organizationBusinessDatas") &&
                  get(
                    data,
                    "organizationBusiness.organizationBusinessDatas"
                  ).map((item, index) => (
                    <SwiperSlide
                      key={`slide-${index}`}
                      style={{ listStyle: "none" }}
                    >
                      <div className="slide" style={{ minHeight: "220px" }}>
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
                          {get(item, "name")}
                        </p>
                        <p
                          style={{
                            fontWeight: 500,
                            fontSize: 14,
                            marginBottom: "12px",
                          }}
                        >
                          {get(item, "description")}
                        </p>
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </SliderStyle>
          </Box>
        ) : (
          <EmptyValue text={"Hiện chưa có nội dung Lĩnh vực kinh doanh"} />
        )}
      </Box>
      {open && (
        <Drawer
          anchor="right"
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: drawerPaperStyle({ ...theme, width: 800 }),
          }}
          componentsProps={{
            backdrop: {
              sx: {
                background: "rgba(9, 30, 66, 0.25) !important",
                boxShadow: "none !important",
              },
            },
          }}
        >
          <EditBusinessArea data={data} onClose={handleClose} />
        </Drawer>
      )}
    </>
  );
};
export default BusinessArea;
