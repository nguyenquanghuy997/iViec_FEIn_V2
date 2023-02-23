import React from 'react'
import SettingLayout from "@/layouts/setting";
import {getRolesByPage} from "@/utils/role";
import {PAGES} from "@/config";
import Page from  '@/components/Page'
import {RecruitmentContent} from "@/sections/recruitment/RecruitmentContent";

const RecruitmentProcess = () => {
    return (
        <Page title="Quy trình tuyển dụng">
            <RecruitmentContent />
        </Page>
    )
}

export async function getStaticProps() {
    return {
        props: {
            roles: getRolesByPage(PAGES.Jobs),
        },
    };
}

RecruitmentProcess.getLayout = function getLayout({roles = []}, page) {
    return (
        <SettingLayout roles={roles}>
            {page}
        </SettingLayout>
    );
};

export default RecruitmentProcess;