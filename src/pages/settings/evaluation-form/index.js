
import Page from "@/components/Page";
import { PERMISSION_PAGES } from "@/config";
import SettingLayout from "@/layouts/setting";
import PageWrapper from "@/components/PageWrapper";
import EvaluationItem from "@/sections/evaluationform/items/EvaluationItem";

Setting.getLayout = function getLayout(pageProps, page) {
  return (
    <SettingLayout permissions={PERMISSION_PAGES.evaluationTemplate} {...pageProps}>
      {page}
    </SettingLayout>
  );
};

export default function Setting() {

  return (
    <PageWrapper>
      <Page title={"Mẫu đánh giá"}>
        <EvaluationItem />
      </Page>
    </PageWrapper>
  );
}
