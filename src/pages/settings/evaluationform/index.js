
import Page from "@/components/Page";
import { PAGES } from "@/config";
import SettingLayout from "@/layouts/setting";
import {
  EvaluationItem,
} from "@/sections/evaluationform";
import { getRolesByPage } from "@/utils/role";
import PageWrapper from "@/components/PageWrapper";

Setting.getLayout = function getLayout({ roles = [] }, page) {
  return (
    <SettingLayout roles={roles}>
      {page}
    </SettingLayout>
  );
};

export async function getStaticProps() {
  return {
    props: {
      roles: getRolesByPage(PAGES.Industry),
    },
  };
}

export default function Setting() {

  return (
    <PageWrapper title={"Quy trình tuyển dụng"}>
      <Page>
        <EvaluationItem />
      </Page>
    </PageWrapper>
  );
}
