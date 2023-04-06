import Page from "@/components/Page";
import Layout from "@/layouts";
import { PERMISSION_PAGES } from "@/config";
import { RecruitmentAdItem } from "../../sections/recruitment-admin/items/RecruitmentAdItem";


RecruitmentAdmin.getLayout = function getLayout(pageProps, page) {
    return <Layout permissions={PERMISSION_PAGES.approveRecruitment} {...pageProps}>{page}</Layout>;
};

export default function RecruitmentAdmin() {
    return (
            <Page title={"Duyệt tin"}>
                <RecruitmentAdItem />
            </Page>
    );
}
