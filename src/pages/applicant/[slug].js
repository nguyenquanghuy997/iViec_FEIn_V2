import Page from "@/components/Page";
import { PERMISSION_PAGES } from "@/config";
import useLocales from "@/hooks/useLocales";
import Layout from "@/layouts";
import ApplicantPreviewItem from "@/sections/applicant/items/ApplicantPreviewItem";

Applicant.getLayout = function getLayout(pageProps, page) {
  return <Layout permissions={PERMISSION_PAGES.applicantDetail} {...pageProps}>{page}</Layout>;
};

function Applicant() {
  const { translate } = useLocales();
  return (
    <Page title={translate("Chi tiết ứng viên")}>
      <ApplicantPreviewItem />
    </Page>
  );
}

export default Applicant;
