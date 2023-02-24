import Page from "@/components/Page";
import PageWrapper from "@/components/PageWrapper";
import {PAGES} from "@/config";
import Layout from "@/layouts";
import {ApplicantItem} from "@/sections/applicant";
import {getRolesByPage} from "@/utils/role";

Applicant.getLayout = function getLayout({roles = ['ADMIN']}, page) {
    return <Layout roles={roles}>{page}</Layout>;
};

export default function Applicant() {
    return (
        <PageWrapper title={"Ứng viên"}>
            <Page title={"Ứng viên"}>
                <ApplicantItem />
            </Page>
        </PageWrapper>
    );
}

export async function getStaticProps() {
    return {
        props: {
            roles: getRolesByPage(PAGES.Industry),
        },
    };
}