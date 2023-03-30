import DividerCard from "@/sections/recruitment-create/component/DividerCard";
import {Box} from "@mui/material";
import {LabelStyle} from "@/components/hook-form/style";
import {RHFSelect} from "@/components/hook-form";
import {BoxInnerStyle} from "@/sections/recruitment-create/style";
import {memo} from "react";
import {API_GET_USER_FROM_ORGANIZATION} from "@/routes/api";
import RHFMuiAutocomplete from "@/components/hook-form/RHFMuiAutocomplete";

const Owner = ({ organizationId }) => {
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
                AutocompleteProps={{
                  disableCloseOnSelect: true
                }}
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
                AutocompleteProps={{
                  disableCloseOnSelect: true
                }}
            />
          </Box>
        </Box>
      </BoxInnerStyle>
  )
}

export default memo(Owner);