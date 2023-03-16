import Page from "@/components/Page";
import { PAGES } from "@/config";
import useLocales from "@/hooks/useLocales";
import Layout from "@/layouts";
import { getRolesByPage } from "@/utils/role";
import React from "react";
import RecruitmentPreviewItem from "../../sections/recruitment/preview/RecruitmentPreviewItem";

RecruitmentPreview.getLayout = function getLayout({ roles = [] }, page) {
  return <Layout roles={roles}>{page}</Layout>;
};

export async function getServerSideProps() {
  return {
    props: {
      roles: getRolesByPage(PAGES.Recruitment),
    },
  };
}

function RecruitmentPreview() {
  const { translate } = useLocales();
  return (
    <Page title={translate("Chi tiết tin tuyển dụng")}>
      <RecruitmentPreviewItem/>
    </Page>
  );
}

export default RecruitmentPreview;
