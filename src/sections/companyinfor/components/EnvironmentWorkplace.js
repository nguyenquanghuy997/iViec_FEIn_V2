import HeaderCard from "../HeaderCard";
import {useUpdateCompanyEndingMutation} from "../companyInforSlice";
import CloseIcon from "@/assets/CloseIcon";
import {Box, Button, Divider, Drawer, List, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import {useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/swiper-bundle.css";
import EmptyValue from "@/sections/companyinfor/components/EmptyValue";
import {useSnackbar} from "notistack";
import LoadingScreen from "@/components/LoadingScreen";
import EditEnvironmentWorkplace from "@/sections/companyinfor/edit/EditEnvironmentWorkplace";
import {get} from "lodash";
import {DOMAIN_SERVER_API} from "@/config";
import {RiTreasureMapLine} from "react-icons/ri";
import {STYLE_CONSTANT as style} from "@/theme/palette";

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
                                {data?.organizationWorkingEnvironments.map((item, index) => (
                                        <SwiperSlide key={`slide-${index}`} style={{listStyle: "none"}}>
                                            <Box
                                                sx={{
                                                    minHeight: "465px",
                                                    backgroundImage: `url(${DOMAIN_SERVER_API}/Image/GetImage?imagePath=${get(item, 'image')})`,
                                                    padding: "36px 40px",
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundSize: 'cover',
                                                    position: 'relative'
                                                }}
                                            >
                                                <Box sx={{
                                                    maxWidth: '400px',
                                                    width: '100%',
                                                    padding: 2,
                                                    background: 'linear-gradient(90deg, rgba(9, 30, 66, 0.8) 0%, rgba(9, 30, 66, 0.4) 100%)',
                                                    color: style.COLOR_WHITE,
                                                    borderRadius: '4px 0px 0px 4px',
                                                    position: 'absolute',
                                                    right: 0,
                                                    bottom: 16
                                                }}>
                                                    <Box sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        mb: 1
                                                    }}>
                                                        <RiTreasureMapLine style={20} />
                                                        <Typography sx={{
                                                            ml: '10px',
                                                            fontSize: style.FONT_BASE,
                                                            fontWeight: style.FONT_SEMIBOLD,
                                                            lineHeight: '24px'
                                                        }}>{get(item, 'name')}</Typography>
                                                    </Box>
                                                    <Typography sx={{
                                                        fontSize: style.FONT_SM,
                                                        fontWeight: style.FONT_NORMAL
                                                    }}>
                                                        {get(item, 'description')}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </SwiperSlide>
                                    )
                                )}
                            </Swiper>
                        </SliderStyle>
                    ) : <EmptyValue text={"Hiện chưa nội dung Môi trường làm việc"}/>}
                </Box>
            </Box>
            {open && (
                <Drawer
                    anchor="right"
                    open={open}
                    onClose={handleClose}
                    PaperProps={{sx: {width: 800, position: 'fixed', top: '64px', right: 0}}}
                    componentsProps={{
                        backdrop: {
                            sx: {background: 'rgba(9, 30, 66, 0.25) !important', boxShadow: 'none !important'}
                        }
                    }}
                >
                    <Box sx={{width: 800}}>
                        <List sx={{display: "flex", justifyContent: "space-between", p: 0}}>
                            <Typography sx={{p: "22px 24px", fontSize: 16, fontWeight: 600}}>
                                Chỉnh sửa Môi trường làm việc
                            </Typography>
                            <Button onClick={handleClose} sx={{"&:hover": {background: "#FDFDFD"}}}>
                                <CloseIcon/>
                            </Button>
                        </List>
                        <Divider/>
                        <EditEnvironmentWorkplace data={data} onClose={handleClose} />
                    </Box>
                </Drawer>
            )}
        </>
    );
};

export default EnvironmentWorkplace;
