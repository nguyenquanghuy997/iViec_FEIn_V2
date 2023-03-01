import React from 'react';
import GuestGuard from "@/guards/GuestGuard";
import Page from "@/components/Page";
import {LogoHeader} from "@/components/BaseComponents";
import {Box} from "@mui/material";

const Policy = () => {
  return (
      <GuestGuard>
        <Page title="Chính sách">
          <LogoHeader />
          <Box>
            Chính sách bảo mật
          </Box>
        </Page>
      </GuestGuard>
  );
}

export default Policy;