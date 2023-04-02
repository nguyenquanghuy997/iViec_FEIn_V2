import {memo} from "react";
import {Box} from "@mui/material";
import {useWatch} from "react-hook-form";

import {RHFSelect} from "@/components/hook-form";
import RHFMuiAutocomplete from "@/components/hook-form/RHFMuiAutocomplete";
import DividerCard from "@/sections/recruitment-form/components/DividerCard";

import {API_GET_USER_FROM_ORGANIZATION} from "@/routes/api";

import {BoxInnerStyle} from "@/sections/recruitment-form/style";
import {LabelStyle} from "@/components/hook-form/style";
const Owner = () => {
    const organizationId = useWatch({name: 'organizationId'});

    return (
        <BoxInnerStyle>
            <DividerCard title="CÁN BỘ TUYỂN DỤNG VÀ HỘI ĐỒNG TUYỂN DỤNG"/>
            <Box sx={{
                px: 4,
                py: 3,
                boxShadow: ' 0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)',
            }}>
                {/*Cán bộ tuyển dụng */}
                <Box sx={{mb: 2, width: '50%'}}>
                    <LabelStyle required>Cán bộ tuyển dụng</LabelStyle>
                    <RHFSelect
                        remoteUrl={`${API_GET_USER_FROM_ORGANIZATION}?Id=${organizationId}`}
                        name="ownerId"
                        placeholder="Chọn 1 cán bộ"
                        fullWidth
                        showAvatar
                    />
                </Box>
                <Box sx={{mb: 2}}>
                    <RHFMuiAutocomplete
                        remoteUrl={`${API_GET_USER_FROM_ORGANIZATION}?Id=${organizationId}`}
                        name="coOwnerIds"
                        title="Đồng phụ tráchh"
                        placeholder="Chọn 1 hoặc nhiều cán bộ"
                        fullWidth
                        multiple
                        showAvatar
                        disableCloseOnSelect
                    />
                </Box>
                <Box sx={{mb: 2}}>
                    <RHFMuiAutocomplete
                        remoteUrl={`${API_GET_USER_FROM_ORGANIZATION}?Id=${organizationId}`}
                        name="recruitmentCouncilIds"
                        title="Thành viên hội đồng tuyển dụng"
                        placeholder="Chọn 1 hoặc nhiều cán bộ"
                        fullWidth
                        multiple
                        showAvatar
                        disableCloseOnSelect
                    />
                </Box>
            </Box>
        </BoxInnerStyle>
    )
}

export default memo(Owner);