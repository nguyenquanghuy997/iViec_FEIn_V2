import React, {useState} from 'react'
import {Box, IconButton, Link, Stack, Typography} from "@mui/material";
import {useRouter} from "next/router";
import {useGetOrganizationByIdQuery} from "@/sections/organization/OrganizationSlice";
import {OrganizationNameStyle} from "@/sections/organizationdetail/style";
import Iconify from "@/components/Iconify";
import {EmailIcon, MapIcon, PhoneIcon} from "@/sections/organizationdetail/component/Icon";
import OrganizationDetailTable from "@/sections/organizationdetail/component/OrganizationDetailTable";
import OrganizationDetailHeader from "@/sections/organizationdetail/component/OrganizationDetailHeader";
import {PATH_DASHBOARD} from "@/routes/paths";
import NextLink from "next/link";
import OrganizationForm from "@/sections/organization/component/OrganizationForm";

const OrganizationDetailContent = () => {
  const router = useRouter();
  const {id} = router.query;

  const {data: organization = {}, isLoading} = useGetOrganizationByIdQuery({
    OrganizationId: id
  }, {skip: !id});
  const [isOpen, setIsOpen] = useState(false)
  const handleOpenForm = () => {
    setIsOpen(true);
  }

  const handleCloseForm = () => {
    setIsOpen(false);
  }

  if(isLoading) return <div>Loading....</div>
  return (
      <Box>
        {/* Name */}
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <NextLink href={PATH_DASHBOARD.organization.root} passHref>
            <Link>
              <IconButton size='small' sx={{color: '#172B4D', mr: 1}}>
                <Iconify icon="material-symbols:arrow-back"/></IconButton>
            </Link>
          </NextLink>
          <OrganizationNameStyle className="organization-title">{organization?.name}</OrganizationNameStyle>
          <IconButton onClick={handleOpenForm} size='small' sx={{color: '#8A94A5', ml: 1}}><Iconify icon="ri:edit-2-fill"/></IconButton>
        </Box>
        {/* End Name */}

        {/* Sub info */}
        <Box sx={{display: 'flex', alignItems: 'center', mt: 2}}>
          <Box sx={{display: 'flex', alignItems: 'center', mr: 3.5}}>
            <EmailIcon/>
            <Typography sx={{fontSize: 13, fontWeight: 500, color: '#455570', ml: 1}}>{organization?.email}</Typography>
          </Box>
          <Box sx={{display: 'flex', alignItems: 'center', mr: 3.5}}>
            <PhoneIcon/>
            <Typography sx={{fontSize: 13, fontWeight: 500, color: '#455570', ml: 1}}>{organization?.phoneNumber}</Typography>
          </Box>
          <Box sx={{display: 'flex', alignItems: 'center', mr: 3.5}}>
            <MapIcon/>
            <Typography sx={{
              fontSize: 13,
              fontWeight: 500,
              color: '#455570',
              ml: 1
            }}>{`${organization?.address}, ${organization?.districtName}, ${organization?.provinceName}`}</Typography>
          </Box>
        </Box>
        {/* End Sub info */}

        <Stack sx={{ mt: 3 }}>
          <OrganizationDetailHeader total={organization} />
        </Stack>

        <OrganizationDetailTable />
      {/* Table */}

      {/*  Modal Edit */}
        <OrganizationForm
          actionType={1}
          isOpen={isOpen}
          onClose={handleCloseForm}
          parentNode={organization}
        />
      </Box>
  )
}

export default OrganizationDetailContent;