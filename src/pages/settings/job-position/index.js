import React from 'react'
import SettingLayout from "@/layouts/setting";
import {getRolesByPage} from "@/utils/role";
import {PAGES} from "@/config";
import Page from  '@/components/Page'
import {JobPositionContent} from "@/sections/job-position/JobPositionContent";

const JobPosition = () => {
    return (
        <Page title="Vị trí công việc">
            <JobPositionContent />
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

JobPosition.getLayout = function getLayout({roles = []}, page) {
    return (
        <SettingLayout roles={roles}>
            {page}
        </SettingLayout>
    );
};

export default JobPosition;