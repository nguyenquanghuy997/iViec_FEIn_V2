import Page from "@/components/Page";
import {PAGES} from "@/config";
import SettingLayout from "@/layouts/setting";
import {CompanyInfor} from "@/sections/companyinfor";
import {getRolesByPage} from "@/utils/role";

Setting.getLayout = function getLayout({roles = []}, page) {
  return (
      <SettingLayout roles={roles}>
        {page}
      </SettingLayout>
  );
};

export default function Setting() {
  return (
      <Page title={"Thông tin công ty"}>
        <CompanyInfor/>
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
