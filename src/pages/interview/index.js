// components
import { InterviewTimeline } from "../../sections/interview/InterviewTimeline";
import Page from "@/components/Page";
import { PERMISSION_PAGES } from "@/config";
import Layout from "@/layouts";
import React from "react";

Interview.getLayout = function getLayout(pageProps, page) {
  return <Layout permissions={PERMISSION_PAGES.interview} {...pageProps}>{page}</Layout>;
};

export default function Interview() {
  return (
    <Page title="Lịch phỏng vấn">
      <InterviewTimeline />
    </Page>
  );
}
