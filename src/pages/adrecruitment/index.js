import Page from "@/components/Page";
import Layout from "@/layouts";
import {getRolesByPage} from "@/utils/role";
import {PAGES} from "@/config";
import { RecruitmentAdItem } from "../../sections/recruitment-admin/items/RecruitmentAdItem";


RecruitmentAdmin.getLayout = function getLayout({roles = ['']}, page) {
    return <Layout roles={roles}>{page}</Layout>;
};
export async function getStaticProps() {
    return {
        props: {
            roles: getRolesByPage(PAGES.RecruitmentAd),
        },
    };
}
export default function RecruitmentAdmin() {
    return (
            <Page title={"Tin tuyển dụng"}>
                <RecruitmentAdItem />
            </Page>
    );
}
