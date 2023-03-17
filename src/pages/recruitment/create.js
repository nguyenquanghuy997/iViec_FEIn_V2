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

CreateRecruitment.getLayout = function getLayout({roles = []}, page) {
  return <Layout roles={roles}>{page}</Layout>
}

export async function getStaticProps() {
  return {
    props: {
      roles: getRolesByPage(PAGES.Jobs),
    },
  }
}

export default function CreateRecruitment() {
  return (
      <Page title='Đăng tin tuyển dụng'>
        <RecruitmentCreateContent />
      </Page>
  )
}
