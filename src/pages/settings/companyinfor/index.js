import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Page from "@/components/Page";
import {PAGES} from "@/config";
import SettingLayout from "@/layouts/setting";
import {CompanyInfor} from "@/sections/companyinfor";
import {getRolesByPage} from "@/utils/role";
import PageWrapper from "@/components/PageWrapper";

Setting.getLayout = function getLayout({ roles = [] }, page) {
  return (
    <SettingLayout roles={roles}>
      {page}
    </SettingLayout>
  );
};

export default function Setting() {
  return (
    <PageWrapper title={"Thông tin công ty"}>
        <Page>
            <HeaderBreadcrumbs heading={"Thông tin công ty"} />
            <CompanyInfor />
        </Page>
    </PageWrapper>
  );
}

export async function getStaticProps() {
  return {
    props: {
      roles: getRolesByPage(PAGES.Industry),
    },
  };
}
