import Page from "@/components/Page";
import { PERMISSION_PAGES } from "@/config";
import SettingLayout from "@/layouts/setting";
import PageWrapper from "@/components/PageWrapper";
import { NotificationContent } from "@/sections/notification/NotificationContent";

Setting.getLayout = function getLayout(pageProps, page) {
  return (
    // Todo edit permission
    <SettingLayout permissions={PERMISSION_PAGES.jobPosition} {...pageProps}>
      {page}
    </SettingLayout>
  );
};

export default function Setting() {
  return (
    <PageWrapper title={"Thông báo tự động"}>
      <Page title={"Thông báo tự động"}>
        <NotificationContent />
      </Page>
    </PageWrapper>
  );
}
