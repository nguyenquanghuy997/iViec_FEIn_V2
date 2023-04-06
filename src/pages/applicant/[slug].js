import Page from "@/components/Page";
import { PERMISSION_PAGES } from "@/config";
import useLocales from "@/hooks/useLocales";
import Layout from "@/layouts";
import ApplicantPreviewItem from "@/sections/applicant/items/ApplicantPreviewItem";
import { useRouter } from "next/router";
import React from "react";

Applicant.getLayout = function getLayout(pageProps, page) {
  return <Layout
    permissions={PERMISSION_PAGES.applicantDetail}
    {...pageProps}
  >{page}</Layout>;
};

function Applicant() {
  const { translate } = useLocales();
  const router = useRouter();
  const applicantId = router.query.slug;
  const applicantCorrelationId = router.query.co;
  const organizationId = router.query.or;
  const recruitmentId = router.query.re;

  return (
    <Page title={translate("Chi tiết ứng viên")}>
      <ApplicantPreviewItem ApplicantId={applicantId} ApplicantCorrelationId={applicantCorrelationId} OrganizationId={organizationId} RecruitmentId={recruitmentId} />
    </Page>
  );
}

export default Applicant;
