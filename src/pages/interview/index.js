// components
import { InterviewTimeline } from "../../sections/interview/InterviewTimeline";
import Page from "@/components/Page";
import { PAGES } from "@/config";
import Layout from "@/layouts";
import { getRolesByPage } from "@/utils/role";
import React from "react";

Interview.getLayout = function getLayout({ roles = [] }, page) {
  return <Layout roles={roles}>{page}</Layout>;
};

export async function getStaticProps() {
  return {
    props: {
      roles: getRolesByPage(PAGES.Interview),
    },
  };
}

export default function Interview() {
  return (
    <Page title="Lịch phỏng vấn">
      <InterviewTimeline />
    </Page>
  );
}
