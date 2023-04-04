import HeaderCard from "../HeaderCard";
import {useGetCompanyInfoQuery, useUpdateCompanyEndingMutation} from "../companyInforSlice";
import EditorEnding from "./EditorEnding";
import CloseIcon from "@/assets/CloseIcon";
import {Box, Button, Divider, Drawer, List, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import React, {useState} from "react";
import EmptyValue from "@/sections/companyinfor/components/EmptyValue";
import {useSnackbar} from "notistack";
import LoadingScreen from "@/components/LoadingScreen";

const PlaceholderStyle = styled("div")(() => ({
    background: "white",
    padding: "12px 96px",
    height: 150,
    "& .content": {
        backgroundColor: "white",
        color: "#455570",
        background: "#F2F4F5",
        position: "relative",
        padding: "24px 96px",
    },

    "& blockquote:before": {
        content: '" ,, "',
        position: "absolute",
        // content: "\f10d";
        top: -100,
        left: "20px",
        fontSize: "128px",
        color: "#A2AAB7",
    },
}));

const renderItem = (value, main) => {
    return (
        <div style={{flex: main ? undefined : 1}}>
            {String(value).startsWith("<") ? (
                <p dangerouslySetInnerHTML={{__html: value}}/>
            ) : (
                <span style={{
                    display: "flex",
                    fontSize: 14,
                    lineHeight: 24 / 16,
                    color: "#172B4D",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis"
                }}>{value}</span>
            )}
        </div>
    );
};

const Ending = ({data}) => {
    const {enqueueSnackbar} = useSnackbar();

    const {data: Data} = useGetCompanyInfoQuery();
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
        <>
            <Box sx={{minHeight: '296px'}}>
                <HeaderCard
                    text="Lời kết"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    handleChange={handleChangeChecked}
                    checked={checked}
                />
                {Data?.conclusion ? (
                    <PlaceholderStyle>
                        <div className="content" style={{height: 100}}>
                            <blockquote>{renderItem(Data?.conclusion)}</blockquote>
                        </div>
                    </PlaceholderStyle>
                ) : <EmptyValue text={"Hiện chưa có nội dung Lời kết"}/>}
            </Box>
            {open && (
                <Drawer
                    anchor="right"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                >
                    <Box sx={{width: 700}}>
                        <List sx={{display: "flex", justifyContent: "space-between", p: 0}}>
                            <Typography sx={{p: "22px 24px", fontSize: 16, fontWeight: 600}}>
                                Chỉnh sửa Lời kết
                            </Typography>
                            <Button onClick={handleClose} sx={{"&:hover": {background: "#FDFDFD"}}}>
                                <CloseIcon/>
                            </Button>
                        </List>
                        <Divider/>
                        <EditorEnding data={Data} onClose={handleClose}/>
                    </Box>
                </Drawer>
            )}
        </>
    );
};
export default Ending;
