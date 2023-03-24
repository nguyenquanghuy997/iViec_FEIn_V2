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
  const router = useRouter();
  const {query} = router;

  console.log(query)

  return (
      <Page title='Sao chép tin tuyển dụng'>
        <RecruitmentCreateContent
            type="copy"
            Recruitment={{
              name: query?.name,
              recruitmentAddressIds: typeof query?.recruitmentAddressIds === 'string' ? [query?.recruitmentAddressIds] : query?.recruitmentAddressIds,
              organizationId: query?.organizationId,
              jobPositionId: query?.jobPositionId,
              address: query?.address,
              recruitmentJobCategoryIds: typeof query?.recruitmentJobCategoryIds === 'string' ? [query?.recruitmentJobCategoryIds] : query?.recruitmentJobCategoryIds,
              recruitmentWorkingForms: typeof query?.recruitmentWorkingForms === 'string' ? [{ workingForm: Number(query?.recruitmentWorkingForms) }] : query?.recruitmentWorkingForms?.map(item => ({workingForm: Number(item)})),
              workExperience: query?.workExperience ? Number(query?.workExperience) : 0,
              numberPosition: query?.numberPosition ? Number(query?.numberPosition) : 1,
              sex: query?.sex ? Number(query?.sex) : 0,
              workingLanguageId: query?.workingLanguageId,
            }}/>
      </Page>
  )
}
