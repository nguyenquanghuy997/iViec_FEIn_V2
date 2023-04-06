import Page from "@/components/Page";
import Layout from "@/layouts";
import { RecruitmentItem } from "../../sections/recruitment/items/RecruitmentItem";
import { PERMISSION_PAGES } from "@/config";

Recruitment.getLayout = function getLayout(pageProps, page) {
    return <Layout permissions={PERMISSION_PAGES.recruitment} {...pageProps}>{page}</Layout>;
};

export default function Recruitment() {
    return (
            <Page title={"Tin tuyển dụng"}>
                <RecruitmentItem />
            </Page>
    );
}
