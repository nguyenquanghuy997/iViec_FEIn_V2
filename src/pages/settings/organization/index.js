import Page from "@/components/Page";
import SettingLayout from "@/layouts/setting";
import OrganizationContent from "@/sections/organization/OrganizationContent";
import { PERMISSION_PAGES } from "@/config";

Organization.getLayout = function getLayout(pageProps, page) {
  return (
      <SettingLayout permissions={PERMISSION_PAGES.organization} {...pageProps}>
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
