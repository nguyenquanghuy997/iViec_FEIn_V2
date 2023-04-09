import Page from "@/components/Page";
import PageWrapper from "@/components/PageWrapper";
import { PERMISSION_PAGES } from "@/config";
import Layout from "@/layouts";
import {
  ApplicantItem,
  useGetAllFilterApplicantQuery,
} from "@/sections/applicant";
import { useRouter } from "next/router";

Applicant.getLayout = function getLayout(pageProps, page) {
  return (
    <Layout permissions={PERMISSION_PAGES.applicant} {...pageProps}>
      {page}
    </Layout>
  );
};

export default function Applicant() {
  const router = useRouter();
  const { query = { PageIndex: 1, PageSize: 10 }, isReady } = router;
  const { data: Data, isLoading } = useGetAllFilterApplicantQuery(query, {
    skip: !isReady,
  });

  return (
    <PageWrapper title={"Ứng viên"}>
      <Page title={"Ứng viên"}>
        <ApplicantItem
          Data={Data}
          isLoading={isLoading}
        />
      </Page>
    </PageWrapper>
  );
}
