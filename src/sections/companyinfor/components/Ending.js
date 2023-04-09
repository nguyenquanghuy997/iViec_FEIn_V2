import HeaderCard from "../HeaderCard";
import {useUpdateCompanyEndingMutation} from "../companyInforSlice";
import EditorEnding from "../edit/EditorEnding";
import CloseIcon from "@/assets/CloseIcon";
import {Box, Button, Divider, Drawer, List, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import React, {useState} from "react";
import EmptyValue from "@/sections/companyinfor/components/EmptyValue";
import {useSnackbar} from "notistack";
import LoadingScreen from "@/components/LoadingScreen";
import {QuoteIcon} from "@/sections/companyinfor/icon";

const PlaceholderStyle = styled("div")(() => ({
    background: "white",
    padding: "8px 96px 24px 96px",
    minHeight: 150,
    position: 'relative',
    "& .content": {
        backgroundColor: "white",
        color: "#455570",
        background: "#F2F4F5",
        position: "relative",
        padding: "24px 96px",
        "& .quote-icon": {
            position: "absolute",
            top: -100,
            left: "40px",
            fontSize: "128px",
            color: "#A2AAB7",
        },
    },
}));

const Ending = ({data}) => {
    const {enqueueSnackbar} = useSnackbar();

    const [open, setOpen] = useState(false);

    const [checked, setChecked] = useState(data?.isConclusionVisible);
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
                isConclusionVisible: !checked
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
                {data?.conclusion ? (
                    <PlaceholderStyle style={{borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px'}}>
                        <div className="content" style={{borderRadius: '4px',}}>
                            <div className={"quote-icon"}>
                                <QuoteIcon />
                            </div>
                            <Typography sx={{ fontSize: 14, fontWeight: 400, color: '#455570' }} dangerouslySetInnerHTML={{ __html: data?.conclusion }} />
                            <Typography sx={{ textAlign: 'end', fontSize: 14, fontWeight: 500, color: '#455570', fontStyle: 'italic' }}>{data?.name}</Typography>
                        </div>
                    </PlaceholderStyle>
                ) : <EmptyValue text={"Hiện chưa có nội dung Lời kết"}/>}
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
                                Chỉnh sửa Lời kết
                            </Typography>
                            <Button onClick={handleClose} sx={{"&:hover": {background: "#FDFDFD"}}}>
                                <CloseIcon/>
                            </Button>
                        </List>
                        <Divider/>
                        <EditorEnding data={data} onClose={handleClose}/>
                    </Box>
                </Drawer>
            )}
        </>
    );
};
export default Ending;
