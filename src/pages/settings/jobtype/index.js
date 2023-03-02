
import Page from "@/components/Page";
import { PAGES } from "@/config";
import SettingLayout from "@/layouts/setting";
import {
  JobTypeItem,
} from "@/sections/jobtype";
import { getRolesByPage } from "@/utils/role";
import PageWrapper from "@/components/PageWrapper";

Setting.getLayout = function getLayout({ roles = [] }, page) {
  return (
    <SettingLayout roles={roles}>
      {page}
    </SettingLayout>
  );
};

export async function getStaticProps() {
  return {
    props: {
      roles: getRolesByPage(PAGES.Industry),
    },
  };
}

export default function Setting() {
  return (
    <PageWrapper title={"Vị trí công việc"}>
      <Page title={"Vị trí công việc"}>
        <JobTypeItem />
      </Page>
    </PageWrapper>
  );
}
