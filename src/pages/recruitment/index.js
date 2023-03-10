import Page from "@/components/Page";
import PageWrapper from "@/components/PageWrapper";
import Layout from "@/layouts";
import { RecruitmentItem } from "../../sections/recruitment/items/RecruitmentItem";
import {getRolesByPage} from "@/utils/role";
import {PAGES} from "@/config";

Recruitment.getLayout = function getLayout({roles = ['ADMIN']}, page) {
    return <Layout roles={roles}>{page}</Layout>;
};
export async function getStaticProps() {
    return {
        props: {
            roles: getRolesByPage(PAGES.Industry),
        },
    };
}
export default function Recruitment() {
    return (
        <PageWrapper title={"Tin tuyển dụng"}>
            <Page title={"Tin tuyển dụng"}>
                <RecruitmentItem />
            </Page>
        </PageWrapper>
    );
}
