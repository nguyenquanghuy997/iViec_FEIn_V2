import Page from "@/components/Page";
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
            roles: getRolesByPage(PAGES.Recruitment),
        },
    };
}
export default function Recruitment() {
    return (
            <Page title={"Tin tuyển dụng"}>
                <RecruitmentItem />
            </Page>
    );
}
