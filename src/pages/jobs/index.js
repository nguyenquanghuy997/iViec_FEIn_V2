// components
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Iconify from "@/components/Iconify";
import Page from "@/components/Page";
import PageWrapper from "@/components/PageWrapper";
// config
import {PAGES} from "@/config";
// hooks
import useLocales from "@/hooks/useLocales";
// layouts
import Layout from "@/layouts";
// routes
import {PATH_DASHBOARD} from "@/routes/paths";
import ListJobTable from "@/sections/job/ListJobTable";
import JobModal from "@/sections/job/jobform/JobModal";
// utils
import {getRolesByPage} from "@/utils/role";
// @mui
import {Button} from "@mui/material";
import React, {useCallback, useState} from "react";
import Content from "@/components/BaseComponents/Content";

Jobs.getLayout = function getLayout({ roles = [] }, page) {
  return <Layout roles={roles}>{page}</Layout>;
};

export async function getStaticProps() {
  return {
    props: {
      roles: getRolesByPage(PAGES.Jobs),
    },
  };
}

export default function Jobs() {
  const { translate } = useLocales();
  const [isOpen, setIsOpen] = useState(false);
  // const { isDirectorRole, isLeaderRole, isMemberRole } = useRole()

  // const hasPermission = isDirectorRole || isLeaderRole || isMemberRole

  const handleOpenJobForm = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleCloseJobForm = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <PageWrapper title={translate("nav.jobs")}>
      <Page title={translate("nav.jobs")}>
        <Content>
          <HeaderBreadcrumbs
            heading={translate("pages.jobs.heading")}
            links={[
              {
                name: translate("nav.dashboard"),
                href: PATH_DASHBOARD.dashboard,
              },
              { name: translate("pages.jobs.heading") },
            ]}
            action={
              <Button
                variant="contained"
                startIcon={<Iconify icon={"eva:plus-fill"} />}
                onClick={handleOpenJobForm}
              >
                {translate("pages.jobs.newJob")}
              </Button>
            }
          />

          <>
            <ListJobTable />
            <JobModal isOpen={isOpen} onClose={handleCloseJobForm} />
          </>
        </Content>
      </Page>
    </PageWrapper>
  );
}
