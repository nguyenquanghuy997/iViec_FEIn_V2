import React, {useState} from "react";
import {Box, Button, Divider, Drawer, List, Typography} from "@mui/material";

import HeaderCard from "../HeaderCard";
import EditHumanCompany from "../edit/EditHumanCompany";
import SwiperListHuman from "./SwiperListHuman";
import CloseIcon from "@/assets/CloseIcon";
import EmptyValue from "@/sections/companyinfor/components/EmptyValue";

import "react-multi-carousel/lib/styles.css";
import {useUpdateCompanyEndingMutation} from "@/sections/companyinfor/companyInforSlice";
import {useSnackbar} from "notistack";
import LoadingScreen from "@/components/LoadingScreen";

const HumanCompany = ({data}) => {
    const {enqueueSnackbar} = useSnackbar();

    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState(data?.isHumansVisible || true);
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
                isHumansVisible: checked
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
        <Box sx={{minHeight: '296px'}}>
            <HeaderCard
                text={"Con người công ty"}
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                data={data}
                handleChange={handleChangeChecked}
                checked={checked}
            />
            {data?.organizationHumans.length > 0 ? (
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
                    <SwiperListHuman data={data}/>
                </Box>
            ) : <EmptyValue text={"Hiện chưa có nội dung Con người công ty"}/>}
            {open && (
                <Drawer
                    anchor="right"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                >
                    <Box sx={{width: 700}}>
                        <List sx={{display: "flex", justifyContent: "space-between", p: 0,}}>
                            <Typography sx={{p: "22px 24px", fontSize: 16, fontWeight: 600}}>
                                Chỉnh sửa Con người công ty
                            </Typography>
                            <Button onClick={handleClose} sx={{"&:hover": {background: "#FDFDFD",},}}>
                                <CloseIcon/>
                            </Button>
                        </List>
                        <Divider/>
                        <div>
                            <EditHumanCompany onClose={handleClose}/>
                        </div>
                    </Box>
                </Drawer>
            )}
        </Box>
    );
};

export default HumanCompany;
