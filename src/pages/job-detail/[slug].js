import Page from "@/components/Page";
import { PAGES } from "@/config";
import useLocales from "@/hooks/useLocales";
import Layout from "@/layouts";
// import { useGetApplicantByIdQuery } from "@/sections/applicant";
import JobDetailTable from "@/sections/jobdetail/JobDetailTable";
import { getRolesByPage } from "@/utils/role";
// import { useRouter } from "next/router";
import React from "react";

JobDetail.getLayout = function getLayout({ roles = [] }, page) {
  return <Layout roles={roles}>{page}</Layout>;
};

export async function getServerSideProps() {
  return {
    props: {
      roles: getRolesByPage(PAGES.Applicant),
    },
  };
}

function JobDetail() {
  const { translate } = useLocales();
  // const router = useRouter();
  // const applicantId = router.query.slug;
  return (
    <Page title={translate("Chi tiết tin")}>
      <JobDetailTable/>
    </Page>
  );
}

export default JobDetail;
