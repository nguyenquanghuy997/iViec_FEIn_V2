import HeaderCard from "../HeaderCard";
import {useGetCompanyInfoQuery, useUpdateCompanyEndingMutation} from "../companyInforSlice";
import EditHirePipeline from "./EditHirePipeline";
import CloseIcon from "@/assets/CloseIcon";
import IconRole1 from "@/assets/IconRole1";
import {PipelineStateType} from "@/utils/enum";
import {Box, Button, Divider, Drawer, List, Typography} from "@mui/material";
import React, {useState} from "react";
import EmptyValue from "@/sections/companyinfor/components/EmptyValue";
import LoadingScreen from "@/components/LoadingScreen";
import {useSnackbar} from "notistack";

const HireProcess = ({data}) => {
    const {enqueueSnackbar} = useSnackbar();

    const {data: Data} = useGetCompanyInfoQuery();

    const [open, setOpen] = useState();
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
        <>
            <Box sx={{minHeight: '296px'}}>
                <HeaderCard
                    text="Quy trình tuyển dụng"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    handleChange={handleChangeChecked}
                    checked={checked}
                />
                {Data ? (
                    <Box sx={{background: "white", py: 2, display: "flex", px: 5}}>
                        {Data?.organizationProfilePipelines.map((item, index) => (
                            <Box sx={{minWidth: "200px"}}>
                                <div style={{display: "flex", justifyContent: "center"}}>
                                    {<IconRole1/>}
                                </div>
                                <Typography
                                    sx={{fontSize: 28, color: "#F77A0C", display: "flex", justifyContent: "center",}}
                                    color="text.secondary" gutterBottom>
                                    {index + 1}
                                </Typography>
                                <Typography sx={{
                                    mb: 1.5,
                                    fontSize: 16,
                                    fontWeight: 600,
                                    display: "flex",
                                    justifyContent: "center"
                                }} color="#172B4D">
                                    {PipelineStateType(item?.type)}
                                </Typography>

                                <Typography variant="body2"
                                            sx={{display: "flex", justifyContent: "center", textAlign: "center"}}>
                                    {item?.description}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                ) : <EmptyValue text={"Hiện chưa có nội dung Con người công ty"}/>}
            </Box>
            {open && (
                <Drawer anchor="right" open={open} onClose={handleClose} onOpen={handleOpen}>
                    <Box sx={{width: 700}}>
                        <List sx={{display: "flex", justifyContent: "space-between", p: 0}}>
                            <Typography sx={{p: "22px 24px", fontSize: 16, fontWeight: 600}}>
                                Chỉnh sửa Quy trình tuyển dụng
                            </Typography>
                            <Button onClick={handleClose} sx={{"&:hover": {background: "#FDFDFD"}}}>
                                <CloseIcon/>
                            </Button>
                        </List>
                        <Divider/>
                        <div>
                            <EditHirePipeline data={Data} onClose={handleClose}/>
                        </div>
                    </Box>
                </Drawer>
            )}
        </>
    );
};
export default HireProcess;
