import { RoleContainer } from "@/sections/rolegroup";
import PageWrapper from "@/components/PageWrapper";
import { PAGES } from "@/config";
import SettingLayout from "@/layouts/setting";
import { getRolesByPage } from "@/utils/role";

Setting.getLayout = function getLayout({ roles = [] }, page) {
  return <SettingLayout roles={roles}>{page}</SettingLayout>;
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
    <PageWrapper title={"Vai trò"}>
      <RoleContainer />
    </PageWrapper>
  );
}
