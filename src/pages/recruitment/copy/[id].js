// @mui
// components
import Page from '@/components/Page'
// config
import {PAGES} from '@/config'
// hooks
// layouts
import Layout from '@/layouts'
// routes
// utils
import {getRolesByPage} from '@/utils/role'
import RecruitmentCreateContent from "@/sections/recruitment-create/RecruitmentCreateContent";
import {useRouter} from "next/router";
import {useGetRecruitmentByIdQuery} from "@/sections/recruitment";

CreateRecruitment.getLayout = function getLayout({roles = []}, page) {
    return <Layout roles={roles}>{page}</Layout>
}

export async function getServerSideProps() {
    return {
        props: {
            roles: getRolesByPage(PAGES.Jobs),
        },
    }
}

export default function CreateRecruitment() {
    const router = useRouter();
    const {query} = router;

    const { data: Recruitment = {}, isLoading } = useGetRecruitmentByIdQuery({ Id: query.id })

    if (isLoading) return <div>Loading...</div>

    return (
        <Page title='Sao chép tin tuyển dụng'>
            <RecruitmentCreateContent Recruitment={Recruitment} />
        </Page>
    )
}
