import Page from "@/components/Page";
import {PAGES} from "@/config";
import SettingLayout from "@/layouts/setting";
import {getRolesByPage} from "@/utils/role";
import OfferFormContent from "@/sections/offerform/OfferFormContent";

OfferForm.getLayout = function getLayout({roles = []}, page) {
  return (
      <SettingLayout roles={roles}>
        {page}
      </SettingLayout>
  );
};

export default function OfferForm() {
  return (
      <Page title="Mẫu thư mời nhận việc">
        <OfferFormContent />
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
