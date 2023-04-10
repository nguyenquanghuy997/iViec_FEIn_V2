import Page from "@/components/Page";
import PageWrapper from "@/components/PageWrapper";
import {PERMISSION_PAGES} from "@/config";
import Layout from "@/layouts";
import {ApplicantItem,} from "@/sections/applicant";

Applicant.getLayout = function getLayout(pageProps, page) {
  return (
      <Layout permissions={PERMISSION_PAGES.applicant} {...pageProps}>
        {page}
      </Layout>
  );
};

export default function Applicant() {
  return (
      <PageWrapper title={"Ứng viên"}>
        <Page title={"Ứng viên"}>
          <ApplicantItem/>
        </Page>
      </PageWrapper>
  );
}
