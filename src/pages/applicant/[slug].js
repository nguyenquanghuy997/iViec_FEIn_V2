import React, { useEffect } from 'react'

import { useRouter } from 'next/router'

// @mui
import { Container, Grid } from '@mui/material'

// components
import LoadingScreen from '@/components/LoadingScreen'
import Page from '@/components/Page'
// config
import { PAGES } from '@/config'
// hooks
import useLocales from '@/hooks/useLocales'
import useResponsive from '@/hooks/useResponsive'
import useSettings from '@/hooks/useSettings'
// layouts
import Layout from '@/layouts'
import Page404 from '@/pages/404'
import { useDispatch, useSelector } from '@/redux/store'
// routes
import { PATH_DASHBOARD } from '@/routes/paths'
import {
  getAssignUser,
  getJobDetail,
} from '@/sections/jobdetail/jobDetailSlice'
// utils
import { getRolesByPage } from '@/utils/role'
import ApplicantPreviewItem from '@/sections/applicant/items/ApplicantPreviewItem'
import { NavGoBack } from '@/components/DesignSystem'

Applicant.getLayout = function getLayout({ roles = [] }, page) {
  return <Layout roles={roles}>{page}</Layout>
}

export async function getServerSideProps() {
  return {
    props: {
      roles: getRolesByPage(PAGES.Applicant),
    },
  }
}

function Applicant() {
  const { themeStretch } = useSettings()
  const { translate } = useLocales()
  const router = useRouter()
  const jobId = router.query.slug
  // const { currentRole } = useRole()

  const stateJob = useSelector((state) => state.applicant)
  const { jobDetail } = stateJob
  const { data: job, isLoading } = jobDetail
  const dispatch = useDispatch()
  const smDown = useResponsive('down', 'sm')
  useEffect(() => {
    dispatch(getJobDetail({ jobId }))
    dispatch(getAssignUser({ jobId }))
  }, [dispatch, jobId])

  // const { data: candidateJob } = useGetCandidateJobQuery({
  //   jobId,
  //   currentRole,
  // })



  // const { data: assignListUser } = useGetAssignListUserQuery({ currentRole })


  if (isLoading) return <LoadingScreen />

  if (!job) return <Page404 />

  return (
    <Page title={translate('Chi tiết ứng viên')}>
      <Container
        maxWidth={themeStretch ? false : 'xl'}
        sx={{ ...(smDown && { padding: 0 }) }}
      >
        <NavGoBack link={PATH_DASHBOARD.dashboard} name={"Trở về danh sách ứng viên"}></NavGoBack>

        <Grid>
          <Grid item xs={12} md={5}>
            <ApplicantPreviewItem
              // listCandidate={candidateJob?.data?.list}
              // assignListUser={assignListUser?.data?.user}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  )
}

export default Applicant
