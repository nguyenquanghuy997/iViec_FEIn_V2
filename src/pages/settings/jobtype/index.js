
import Page from "@/components/Page";
import { PERMISSION_PAGES } from "@/config";
import SettingLayout from "@/layouts/setting";
import {
  JobTypeItem,
} from "@/sections/jobtype";
import PageWrapper from "@/components/PageWrapper";

Setting.getLayout = function getLayout(pageProps, page) {
  return (
    <SettingLayout permissions={PERMISSION_PAGES.jobPosition} {...pageProps}>
      {page}
    </SettingLayout>
  );
};

export default function Setting() {
  return (
    <PageWrapper title={"Vị trí công việc"}>
      <Page title={"Vị trí công việc"}>
        <JobTypeItem />
      </Page>
    </PageWrapper>
  );
}
