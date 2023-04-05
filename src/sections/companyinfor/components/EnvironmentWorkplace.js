import HeaderCard from "../HeaderCard";
import {useUpdateCompanyEndingMutation} from "../companyInforSlice";
import CloseIcon from "@/assets/CloseIcon";
import {Box, Button, Divider, Drawer, List, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import React, {useState} from "react";
// import { RiFlagLine } from "react-icons/ri";
// import "react-multi-carousel/lib/styles.css";
// import SwiperCore, {
//   Navigation,
//   Pagination,
//   Autoplay,
//   Virtual,
// } from "swiper/core";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/swiper-bundle.css";
import EmptyValue from "@/sections/companyinfor/components/EmptyValue";
import {useSnackbar} from "notistack";
import LoadingScreen from "@/components/LoadingScreen";

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
    const {enqueueSnackbar} = useSnackbar();
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
                isWorkingEnvironmentVisible: !checked
            }).unwrap();
            enqueueSnackbar("Chỉnh sửa hiển thị thành công!", {
                autoHideDuration: 1000
            });
            setChecked(!checked);
            setLoading(false);
        } catch (e) {
            enqueueSnackbar("Chỉnh sửa hiển thị không thành công, vui lòng thử lại!", {
                autoHideDuration: 1000,
                variant: 'error',
            });
            setLoading(false);
            return e;
        }
    }

    if (loading) {
        return (
            <LoadingScreen/>
        )
    }

    return (
        <>
            <Box sx={{minHeight: '296px'}}>
                <HeaderCard
                    text={"Môi trường làm việc"}
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    handleChange={handleChangeChecked}
                    checked={checked}
                />
                <Box
                    sx={{
                        px: 12,
                        pb: 3,
                        background: "white",
                        width: "100%",
                    }}
                >
                    {data?.organizationWorkingEnvironments ? (
                        <SliderStyle>
                            <Swiper
                                id="swiper"
                                virtual
                                slidesPerView={1}
                                spaceBetween={50}
                                pagination
                            >
                                {data?.organizationBusiness?.organizationBusinessDatas.map(
                                    (item, index) => (
                                        <SwiperSlide
                                            key={`slide-${index}`}
                                            style={{listStyle: "none"}}
                                        >
                                            {/* <div
                      style={{
                        color: "white",
                        width: "100%",
                        height: "302px",
                        // backgroundImage: `url(https://media.istockphoto.com/id/840091762/vi/anh/n%E1%BB%81n-m%E1%BB%9D-n%E1%BB%99i-th%E1%BA%A5t-y-t%E1%BA%BF-b%E1%BB%87nh-vi%E1%BB%87n.jpg?s=612x612&w=0&k=20&c=j3wnEX_ey606LK9IC9oZ0aM-Vtug6bYMrzJiUtVApWY=)`,
                        // backgroundsize: "cover",
                        // padding: "36px 40px",
                        // display: "flex",
                        // alignItems: "end",
                      }}
                    >
                      <>
                        <div>
                          <source
                            src="//vjs.zencdn.net/v/oceans.mp4"
                            type="video/mp4"
                          ></source>
                        </div>
                        {/* <div
                          style={{
                            padding: "16px",
                            backgroundImage:
                              "linear-gradient(90deg, rgba(9, 30, 66, 0.8) 0%, rgba(9, 30, 66, 0.4) 100%)",
                            borderRadius: "6px 0 0 6px",
                            position: "absolute",
                            right: 0,
                            width: "400px",
                          }}
                        >
                          <p
                            style={{
                              fontWeight: 500,
                              fontSize: 14,
                            }}
                          >
                            <RiFlagLine /> Trụ sở miền Bắc
                          </p>
                          <span style={{ fontSize: "12px" }}>
                            Số 6 Quang Trung, phường Trần Hưng Đạo, Quận Hoàn
                            Kiếm, Thành Phố Hà Nội, Việt Nam
                          </span>
                        </div>
                      //</SwiperSlide>
                    //</SliderStyle></div> */}

                                        </SwiperSlide>
                                    )
                                )}
                            </Swiper>
                        </SliderStyle>
                    ) : <EmptyValue text={"Hiện chưa nội dung Môi trường làm việc"}/>}
                    {/* <SwiperColumn/> */}
                </Box>
            </Box>
            {open && (
                <Drawer anchor="right" open={open} onClose={handleClose} onOpen={handleOpen}>
                    <Box sx={{width: 700}}>
                        <List sx={{display: "flex", justifyContent: "space-between", p: 0}}>
                            <Typography sx={{p: "22px 24px", fontSize: 16, fontWeight: 600}}>
                                Chỉnh sửa Lĩnh vực kinh doanh
                            </Typography>
                            <Button onClick={handleClose} sx={{"&:hover": {background: "#FDFDFD"}}}>
                                <CloseIcon/>
                            </Button>
                        </List>
                        <Divider/>
                        <div>{/* <EditBusinessArea onClose={handleClose} /> */}</div>
                    </Box>
                </Drawer>
            )}
        </>
    );
};

export default EnvironmentWorkplace;
