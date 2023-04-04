import Iconify from "@/components/Iconify";
import {Box, Button, Stack, Typography} from "@mui/material";
import Image from "@/components/Image";
import UploadImage from "@/assets/UploadImage";
import {RiDeleteBin6Line} from "react-icons/ri";
import {RHFTextField} from "@/components/hook-form";

const InputStyle = {width: "100%", minHeight: 40, background: "white"};

export const DragableItem = ({item, onChangeUploadImage, onDelete}) => {
    return (
        <Box sx={{mx: 3, my: 3, px: 3, py: 2, background: "#F2F4F5", display: "flex", borderRadius: "4px"}}>
            <Box sx={{display: "flex", alignItems: "center", pr: 1}}>
                <Iconify icon={"fluent:re-order-dots-vertical-16-filled"} width={20} height={20} color="#A2AAB7"/>
            </Box>
            <Image
                disabledEffect
                visibleByDefault
                src={item?.uploaded_file || '/assets/placeholder.png'}
                alt="image"
                sx={{display: "flex", width: "35%", height: 254, px: 2}}
            />
            <Box width="60%">
                <Box sx={{display: "flex", justifyContent: "space-between", marginBottom: "24px", marginTop: "12px",}}>
                    <Box>
                        <Button sx={{
                            cursor: "pointer",
                            borderRadius: "6px",
                            border: "1px dashed #1976D2",
                            padding: "8px 12px",
                            "&:hover": {background: "transparent"},
                            "&:focus": {background: "transparent"},
                        }}>
                            <Box sx={{display: "flex", alignItems: "center", textTransform: "initial"}}>
                                <UploadImage/>
                                <Typography sx={{fontSize: 14, fontWeight: 600, color: "#1976D2", ml: "8px"}}>
                                    Tải lên ảnh
                                </Typography>
                            </Box>
                            <input
                                accept="image/*"
                                id="image"
                                type="file"
                                onChange={onChangeUploadImage}
                                style={{
                                    position: "absolute",
                                    left: 0,
                                    height: "100%",
                                    opacity: 0,
                                    cursor: "pointer",
                                    width: "inherit",
                                }}
                            />
                        </Button>
                    </Box>
                    <RiDeleteBin6Line
                        color="#E53935"
                        onClick={onDelete}
                        cursor="pointer"
                    />
                </Box>
                <Stack sx={{mb: 3}}>
                    <RHFTextField
                        // name={`organizationHumans.${index}.name`}
                        title="Họ và tên"
                        isRequired
                        placeholder="Nhập họ và tên cán bộ"
                        style={{...InputStyle}}
                    />
                </Stack>
                <Stack sx={{mb: 3}}>
                    <RHFTextField
                        // name={`organizationHumans.${index}.description`}
                        title="Chức vụ"
                        placeholder="Nhập chức vụ của cán bộ"
                        style={{...InputStyle}}
                    />
                </Stack>
            </Box>
        </Box>
    );
};
