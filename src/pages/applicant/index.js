import Page from "@/components/Page";
import PageWrapper from "@/components/PageWrapper";
import {PAGES} from "@/config";
import Layout from "@/layouts";
import {ApplicantItem} from "@/sections/applicant";
import ApplicantHeader from "@/sections/applicant/ApplicantHeader";
import {getRolesByPage} from "@/utils/role";
import {useState} from "react";


Setting.getLayout = function getLayout({roles = []}, page) {
    return <Layout roles={roles}>{page}</Layout>;
};

const columns = [
    {name: "education", type: "text", placeholder: "Tìm kiếm...", label: "Học vấn"},
    // { name: "step", type: "select" },
    {name: "date", type: "date", placeholder: "Tìm kiếm...", label: "Ngày sinh"},
    {name: "gender", type: "radio"},
];

export async function getStaticProps() {
    return {
        props: {
            roles: getRolesByPage(PAGES.Industry),
        },
    };
}

export default function Setting() {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenFilterForm = () => {
        setIsOpen(true);
    };

    const handleCloseFilterForm = () => {
        setIsOpen(false);
    };

    return (
        <PageWrapper title={"Ứng viên"}>
            <ApplicantHeader
                columns={columns}
                isOpen={isOpen}
                onOpenFilterForm={handleOpenFilterForm}
                onCloseFilterForm={handleCloseFilterForm}
            />
            <Page>
                <ApplicantItem/>
            </Page>
        </PageWrapper>
    );
}
