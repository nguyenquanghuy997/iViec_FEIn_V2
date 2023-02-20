import Page from "@/components/Page";
import { PAGES } from "@/config";
import useLocales from "@/hooks/useLocales";
import Layout from "@/layouts";
import { useGetApplicantByIdQuery } from "@/sections/applicant";
import ApplicantPreviewItem from "@/sections/applicant/items/ApplicantPreviewItem";
import { getRolesByPage } from "@/utils/role";
import { useRouter } from "next/router";
import React from "react";

Applicant.getLayout = function getLayout({ roles = [] }, page) {
  return <Layout roles={roles}>{page}</Layout>;
};

export async function getServerSideProps() {
  return {
    props: {
      roles: getRolesByPage(PAGES.Applicant),
    },
  };
}

function Applicant() {
  const { translate } = useLocales();
  const router = useRouter();
  const applicantId = router.query.slug;
  const organizationId = router.query.or;
  const { data: data } = useGetApplicantByIdQuery({
    applicantId,
  });

  return (
    <Page title={translate("Chi tiết ứng viên")}>
      <ApplicantPreviewItem data={data} ApplicantId={applicantId} OrganizationId={organizationId}/>
    </Page>
  );
}

export default Applicant;
