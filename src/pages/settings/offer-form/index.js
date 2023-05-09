import Page from "@/components/Page";
import { PERMISSION_PAGES } from "@/config";
import SettingLayout from "@/layouts/setting";
import OfferFormContent from "@/sections/offer-form/OfferFormContent";

OfferForm.getLayout = function getLayout(pageProps, page) {
  return (
      <SettingLayout permissions={PERMISSION_PAGES.offerTemplate} {...pageProps}>
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

