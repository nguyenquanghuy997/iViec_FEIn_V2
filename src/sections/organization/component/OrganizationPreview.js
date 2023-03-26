import React from "react";
import {get, isEmpty} from 'lodash'
import {Box, Divider, Drawer, IconButton, Stack, Typography} from "@mui/material";
import {OrganizationFromFooterStyle, OrganizationFromHeadStyle} from "@/sections/organization/style";
import Iconify from "@/components/Iconify";
import {useGetOrganizationByIdQuery} from "@/sections/organization/OrganizationSlice";
import {useRouter} from "next/router";
import MuiButton from "@/components/BaseComponents/MuiButton";

const renderInfoOrganization = (key, value) => {
  return (
      <Box sx={{display: 'flex', alignItems: 'flex-start', my: 3}}>
        <Typography sx={{fontSize: 14, fontWeight: 400, color: '#455570', minWidth: '150px'}}>{key}:</Typography>
        <Typography sx={{fontSize: 14, fontWeight: 400, color: '#455570', minWidth: '120px'}}>{value}</Typography>
      </Box>
  )
}

const OrganizationPreview = ({isOpen, onClose, nodes, setShowDelete, onGetParentNode, onOpenForm, setActionType}) => {
  const router = useRouter();
  const {data: organization} = useGetOrganizationByIdQuery({
    OrganizationId: nodes?.id
  }, {skip: !nodes?.id});

  const handleRedirectViewDetail = (id) => {
    return router.push({ pathname: `${router.pathname}/${id}` }, undefined, { shallow: true })
  }

  const handleShowDelete = (node) => {
    setShowDelete(true);
    onGetParentNode(node);
    onClose();
  }

  const handleOpenFormWithCurrentNode = (node) => {
    onClose();
    onOpenForm();
    setActionType(1);
    onGetParentNode(node);
  }

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
            }}
        >
          <OrganizationFromHeadStyle className="organization-form-head">
            <Typography variant="body1" sx={{fontSize: '16px', fontWeight: 600, color: "#455570"}}>
              Xem chi tiết đơn vị
            </Typography>
            <IconButton size="small" onClick={onClose}><Iconify icon="ic:baseline-close"/></IconButton>
          </OrganizationFromHeadStyle>
          <Divider/>
          <Box sx={{py: 2, px: 2, mt: 8}}>
            <Typography sx={{fontSize: 24, fontWeight: 700, color: '#455570'}}>
              {get(organization, 'name') && get(organization, 'name')}
            </Typography>
            {renderInfoOrganization('Mã đơn vị', get(organization, 'code') && get(organization, 'code'))}
            {renderInfoOrganization('Email', get(organization, 'email') && get(organization, 'email'))}
            {renderInfoOrganization('Số điện thoại', get(organization, 'phoneNumber') && get(organization, 'phoneNumber'))}
            {renderInfoOrganization('Địa chỉ',
                `${!isEmpty(get(organization, 'address')) ? `${get(organization, 'address')}, ` : ''}` +
                `${!isEmpty(get(organization, 'districtName')) ? `${get(organization, 'districtName')}, ` : ''}` +
                `${!isEmpty(get(organization, 'provinceName')) ? `${get(organization, 'provinceName')}` : ''}`
              )}
            {renderInfoOrganization('Trực thuộc', get(organization, 'parentOrganizationName') && get(organization, 'parentOrganizationName'))}
            {renderInfoOrganization('Đơn vị trực thuộc', get(organization, 'subsidiaryNames')?.map((sub, index, arr) => index < arr.length - 1 ? `${sub}, ` : `${sub}`))}
            <MuiButton
              title={"Danh sách người dùng"}
              onClick={() => handleRedirectViewDetail(get(organization, 'id'))}
              endIcon={<Iconify icon='material-symbols:arrow-right'/>}
              sx={{width: '100%', fontWeight: 600, justifyContent: 'center'}}
            />
          </Box>
          <OrganizationFromFooterStyle className="organization-form-footer">
            <Stack flexDirection="row">
              <MuiButton
                  type="button"
                  title="Chỉnh sửa"
                  onClick={() => handleOpenFormWithCurrentNode(organization)}
                  sx={{ px: 2, py: 1, minWidth: 24 }}
              />
              <MuiButton
                  title={"Đóng"}
                  onClick={onClose}
                  color={"basic"}
                  sx={{ color: '#455570', fontWeight: 600, ml: 1 }}
              />
            </Stack>
            <IconButton>
              <Iconify icon="ci:trash-full" onClick={() => handleShowDelete(organization)} />
            </IconButton>
          </OrganizationFromFooterStyle>
        </Drawer>
      </>
  )
}

export default React.memo(OrganizationPreview);