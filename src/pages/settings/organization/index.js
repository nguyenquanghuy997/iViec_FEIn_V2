import Page from "@/components/Page";
import SettingLayout from "@/layouts/setting";
import OrganizationContent from "@/sections/organization/OrganizationContent";

Organization.getLayout = function getLayout({roles = ['Admin']}, page) {
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
