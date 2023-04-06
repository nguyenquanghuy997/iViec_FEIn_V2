
import Page from "@/components/Page";
import { PERMISSION_PAGES } from "@/config";
import SettingLayout from "@/layouts/setting";
import {
  EvaluationItem,
} from "@/sections/evaluationform";
import PageWrapper from "@/components/PageWrapper";

Setting.getLayout = function getLayout(pageProps, page) {
  return (
    <SettingLayout permissions={PERMISSION_PAGES.evaluationTemplate} {...pageProps}>
      {page}
    </SettingLayout>
  );
};

export default function Setting() {

  return (
    <PageWrapper title={"Quy trình tuyển dụng"}>
      <Page>
        <EvaluationItem />
      </Page>
    </PageWrapper>
  );
}
