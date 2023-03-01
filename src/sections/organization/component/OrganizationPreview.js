import React, {useEffect, useState} from "react";
import {Box, Button, Divider, Drawer, IconButton, Stack, Typography} from "@mui/material";
import Scrollbar from "@/components/Scrollbar";
import {OrganizationFromFooterStyle, OrganizationFromHeadStyle} from "@/sections/organization/style";
import Iconify from "@/components/Iconify";
import {ButtonDS} from "@/components/DesignSystem";
import {ButtonCancelStyle} from "@/sections/applicant/style";
import {useLazyGetOrganizationBySlugQuery} from "@/sections/organization/OrganizationSlice";

const renderInfoOrganization = (key, value) => {
  return (
      <Box sx={{ display: 'flex', alignItems: 'flex-start', my: 3 }}>
          <Typography sx={{ fontSize: 14, fontWeight: 400, color: '#455570', minWidth: '150px' }}>{key}:</Typography>
          <Typography sx={{ fontSize: 14, fontWeight: 400, color: '#455570', minWidth: '120px' }}>{value}</Typography>
      </Box>
  )
}

const OrganizationPreview = ({isOpen, onClose, nodes}) => {

  const [getOrganizationBySlug, { data: organization }] = useLazyGetOrganizationBySlugQuery()

  useEffect(() => {
    if (nodes?.slug) {
      getOrganizationBySlug({ Slug: nodes?.slug })
    }
  }, [nodes?.slug])

  const [, setIsScrolled] = useState(false);

  const handleScroll = (e) => {
    setIsScrolled(e.target.scrollTop > 10);
  };

  return (
      <>
        <Drawer
            open={isOpen}
            onClose={onClose}
            anchor="right"
            PaperProps={{
              sx: {
                width: {xs: 1, sm: 560, md: 600},
                boxShadow: '-3px 0px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)',
              },
              onScroll: handleScroll
            }}
        >
          <Scrollbar sx={{zIndex: 9999, "& label": {zIndex: 0}}}>
            <OrganizationFromHeadStyle className="organization-form-head">
              <Typography variant="body1" sx={{fontSize: '16px', fontWeight: 600, color: "#455570"}}>
                Xem chi tiết đơn vị
              </Typography>
              <IconButton size="small" onClick={onClose}><Iconify icon="ic:baseline-close"/></IconButton>
            </OrganizationFromHeadStyle>
            <Divider/>

            <Box sx={{py: 2, px: 2, mt: 8}}>
              <Typography sx={{fontSize: 24, fontWeight: 700, color: '#455570'}}>
                {organization?.name}
              </Typography>
              {renderInfoOrganization('Mã đơn vị', organization?.code)}
              {renderInfoOrganization('Email', organization?.email)}
              {renderInfoOrganization('Số điện thoại', organization?.phoneNumber)}
              {renderInfoOrganization('Địa chỉ',`${organization?.address}, ${organization?.districtName}, ${organization?.provinceName}`)}
              {renderInfoOrganization('Trực thuộc', '')}
              {renderInfoOrganization('Đơn vị trực thuộc', '')}

              <Button
                  variant="contained"
                  sx={{ py: '12px', textTransform: 'none', width: '100%', backgroundColor: '#1976D2', borderRadius: 0.75 }}
                  endIcon={<Iconify icon='material-symbols:arrow-right' />}
              >
                Danh sách người dùng
              </Button>
            </Box>

            <OrganizationFromFooterStyle className="organization-form-footer">
              <Stack flexDirection="row">
                <ButtonDS
                    variant="contained"
                    tittle="Chỉnh sửa"
                />
                <ButtonCancelStyle onClick={onClose}>Hủy</ButtonCancelStyle>
              </Stack>
            </OrganizationFromFooterStyle>
          </Scrollbar>
        </Drawer>
      </>
  )
}

export default React.memo(OrganizationPreview);