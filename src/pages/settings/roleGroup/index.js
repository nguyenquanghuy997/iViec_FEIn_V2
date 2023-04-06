import { RoleContainer } from "@/sections/rolegroup";
import PageWrapper from "@/components/PageWrapper";
import SettingLayout from "@/layouts/setting";
import { PERMISSION_GROUPS } from "@/config";

Setting.getLayout = function getLayout(pageProps, page) {
  return (
    <SettingLayout
      permission={PERMISSION_GROUPS.ACCESS_SETTINGS}
      {...pageProps}
    >
      {page}
    </SettingLayout>
  );
};

export default function Setting() {
  return (
    <PageWrapper title={"Vai trò"}>
      <RoleContainer />
    </PageWrapper>
  );
}
