import Page from "@/components/Page";
import {PAGES} from "@/config";
import SettingLayout from "@/layouts/setting";
import {getRolesByPage} from "@/utils/role";
import OrganizationContent from "@/sections/organization/OrganizationContent";

Organization.getLayout = function getLayout({roles = []}, page) {
  return (
      <SettingLayout roles={roles}>
        {page}
      </SettingLayout>
  );
};

export default function Organization() {
  return (
      <Page title="Cơ cấu tổ chức">
        <OrganizationContent />
      </Page>
  );
}

export async function getStaticProps() {
  return {
    props: {
      roles: getRolesByPage(PAGES.Industry),
    },
  };
}
