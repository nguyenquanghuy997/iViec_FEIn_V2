import React from 'react'
import SettingLayout from "@/layouts/setting";
import {getRolesByPage} from "@/utils/role";
import {PAGES} from "@/config";
import Page from "@/components/Page";
import OrganizationDetailContent from "@/sections/organizationdetail/OrganizationDetailContent";

OrganizationDetail.getLayout = function getLayout({roles = []}, page) {
  return (
      <SettingLayout roles={roles}>
        {page}
      </SettingLayout>
  );
};

export async function getServerSideProps() {
  return {
    props: {
      roles: getRolesByPage(PAGES.Organization),
    },
  };
}

function OrganizationDetail() {
  return (
      <Page title="Thông tin chi tiết đơn vị">
          <OrganizationDetailContent />
      </Page>
  )
}

export default OrganizationDetail;