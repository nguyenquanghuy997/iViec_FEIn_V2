import Page from "@/components/Page";
import {PAGES} from "@/config";
import SettingLayout from "@/layouts/setting";
import {getRolesByPage} from "@/utils/role";
import ConnectContent from "@/sections/connect/ConnectContent";

Connect.getLayout = function getLayout({roles = []}, page) {
  return (
      <SettingLayout roles={roles}>
        {page}
      </SettingLayout>
  );
};

export default function Connect() {
  return (
      <Page title="Kết nối">
        <ConnectContent />
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
