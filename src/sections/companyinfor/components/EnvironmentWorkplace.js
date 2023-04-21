import HeaderCard from "../HeaderCard";
import { useUpdateCompanyEndingMutation } from "../companyInforSlice";
import LoadingScreen from "@/components/LoadingScreen";
import { DOMAIN_SERVER_API } from "@/config";
import EmptyValue from "@/sections/companyinfor/components/EmptyValue";
import EditEnvironmentWorkplace from "@/sections/companyinfor/edit/EditEnvironmentWorkplace";
import { STYLE_CONSTANT as style } from "@/theme/palette";
import {Box, Drawer, Typography, useTheme} from "@mui/material";
import { styled } from "@mui/material/styles";
import {get} from "lodash";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { RiTreasureMapLine } from "react-icons/ri";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import {drawerPaperStyle} from "@/components/drawer-edit-form/styles";

export const SliderStyle = styled("div")(() => ({
  "& .swiper-pagination": {
    display: "flex",
    alignItems: "end",
    marginLeft: "36px",
    marginBottom: "30px",
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

const EnvironmentWorkplace = ({ data }) => {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const [checked, setChecked] = useState(data?.isWorkingEnvironmentVisible);
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
        isWorkingEnvironmentVisible: !checked,
      }).unwrap();
      enqueueSnackbar("Chỉnh sửa hiển thị thành công!", {
        autoHideDuration: 1000,
      });
      setChecked(!checked);
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
          text={"Môi trường làm việc"}
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          handleChange={handleChangeChecked}
          checked={checked}
        />
        {get(data, 'organizationWorkingEnvironments')?.length > 0 ? (
          <Box
            sx={{
              px: 12,
              pb: 3,
              background: "white",
              width: "100%",
            }}
          >
            <SliderStyle>
              <Swiper
                id="swiper"
                virtual
                slidesPerView={1}
                spaceBetween={50}
                pagination
              >
                {get(data, 'organizationWorkingEnvironments')?.map((item, index) => (
                  <SwiperSlide
                    key={`slide-${index}`}
                    style={{ listStyle: "none" }}
                  >
                    <Box
                      sx={{
                        minHeight: "465px",
                        backgroundImage: !get(item, "image") ? `url(/assets/placeholder.png)` :`url(${DOMAIN_SERVER_API}/Image/GetImage?imagePath=${get(
                          item,
                          "image"
                        )})`,
                        padding: "36px 40px",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        position: "relative",
                      }}
                    >
                      <Box
                        sx={{
                          maxWidth: "400px",
                          width: "100%",
                          padding: 2,
                          background: "linear-gradient(90deg, rgba(9, 30, 66, 0.8) 0%, rgba(9, 30, 66, 0.4) 100%)",
                          color: style.COLOR_WHITE,
                          borderRadius: "4px 0px 0px 4px",
                          position: "absolute",
                          right: 0,
                          bottom: 16,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 1,
                          }}
                        >
                          <RiTreasureMapLine style={20} />
                          <Typography
                            sx={{
                              ml: "10px",
                              fontSize: style.FONT_BASE,
                              fontWeight: style.FONT_SEMIBOLD,
                              lineHeight: "24px",
                            }}
                          >
                            {get(item, "name")}
                          </Typography>
                        </Box>
                        <Typography
                          sx={{
                            fontSize: style.FONT_SM,
                            fontWeight: style.FONT_NORMAL,
                          }}
                        >
                          {get(item, "description")}
                        </Typography>
                      </Box>
                    </Box>
                  </SwiperSlide>
                ))}
              </Swiper>
            </SliderStyle>
          </Box>
        ) : (
          <EmptyValue text={"Hiện chưa có nội dung Môi trường làm việc"} />
        )}
      </Box>
      {open && (
        <Drawer
          anchor="right"
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: drawerPaperStyle({...theme, width: 800}),
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
          <EditEnvironmentWorkplace data={data} onClose={handleClose} />
        </Drawer>
      )}
    </>
  );
};

export default EnvironmentWorkplace;
