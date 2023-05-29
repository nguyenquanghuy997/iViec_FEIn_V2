import { RHFSelect } from "@/components/hook-form";
import { LabelStyle } from "@/components/hook-form/style";
import { API_GET_ORGANIZATION_USERS } from "@/routes/api";
import DividerCard from "@/sections/recruitment-form/components/DividerCard";
import { BoxInnerStyle } from "@/sections/recruitment-form/style";
import { Box } from "@mui/material";
import { memo } from "react";
import { useWatch } from "react-hook-form";

const Owner = ({ recruitment }) => {
  const organizationId = useWatch({ name: "organizationId" });
  return (
    <BoxInnerStyle
      sx={{
        borderBottomRightRadius: "6px",
        borderBottomLeftRadius: "6px",
      }}
    >
      <DividerCard title="CÁN BỘ TUYỂN DỤNG VÀ HỘI ĐỒNG TUYỂN DỤNG" />
      <Box
        sx={{
          px: 4,
          py: 3,
          boxShadow:
            " 0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)",
        }}
      >
        {/*Cán bộ tuyển dụng */}
        <Box sx={{ mb: 2, width: "50%" }}>
          <LabelStyle required>Cán bộ tuyển dụng</LabelStyle>
          <RHFSelect
            remoteUrl={`${API_GET_ORGANIZATION_USERS}?OrganizationId=${organizationId}`}
            selectedOptions={[
              {
                id: recruitment?.ownerId,
                value: recruitment?.ownerId,
                label: recruitment?.ownerEmail || recruitment?.ownerName,
                name: recruitment?.ownerEmail || recruitment?.ownerName,
              },
            ]}
            name="ownerId"
            placeholder="Chọn 1 cán bộ"
            fullWidth
            showAvatar
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <LabelStyle>Đồng phụ trách</LabelStyle>
          <RHFSelect
            remoteUrl={`${API_GET_ORGANIZATION_USERS}?OrganizationId=${organizationId}`}
            selectedOptions={recruitment?.coOwners?.map((coOwner) => ({
              id: coOwner?.id,
              label: coOwner?.email || coOwner?.name,
              name: coOwner?.email || coOwner?.name,
            }))}
            name="coOwnerIds"
            placeholder="Chọn 1 hoặc nhiều cán bộ"
            fullWidth
            multiple
            showAvatar
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <LabelStyle>Thành viên hội đồng tuyển dụng</LabelStyle>
          <RHFSelect
            remoteUrl={`${API_GET_ORGANIZATION_USERS}?OrganizationId=${organizationId}`}
            selectedOptions={recruitment?.recruitmentCouncils?.map(
              (coOwner) => ({
                id: coOwner?.councilUserId,
                label: coOwner?.councilEmail || coOwner?.councilName,
                name: coOwner?.councilEmail || coOwner?.councilName,
              })
            )}
            name="recruitmentCouncilIds"
            placeholder="Chọn 1 hoặc nhiều cán bộ"
            fullWidth
            multiple
            showAvatar
          />
        </Box>
      </Box>
    </BoxInnerStyle>
  );
};

export default memo(Owner);
