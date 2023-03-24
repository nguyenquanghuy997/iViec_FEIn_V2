import {Box, Drawer, Grid, IconButton, Typography} from "@mui/material";
import Content from "@/components/BaseComponents/Content";
import {BoxFlex} from "@/sections/emailform/style";
import CloseIcon from "@/assets/CloseIcon";
import {JobDescriptionBox} from "@/sections/recruitment/style";
import PreviewJobDescription from "@/sections/recruitment/modals/preview/PreviewJobDescription";
import PreviewJobHeader from "@/sections/recruitment/modals/preview/PreviewJobHeader";
import PreviewJobCompanyIntro from "@/sections/recruitment/modals/preview/PreviewJobCompanyIntro";
import PreviewJobFunction from "@/sections/recruitment/modals/preview/PreviewJobFunction";
import Breadcrumbs from "@/components/Breadcrumbs";
import {useGetRecruitmentBySlugQuery} from "@/sections/recruitment";
import {useGetOrganizationPreviewQuery} from "@/sections/organization/override/OverrideOrganizationSlice";

const links = [
  {
    name: "Trang chủ",
    href: "#",
  },
  {
    name: "Việc làm",
    href: "#",
  },
];

const RecruitmentPreview = ({data, open, onClose}) => {
  console.log(data)
  const { data: Recruitment = {} } = useGetRecruitmentBySlugQuery(data?.slug, { skip: !data?.slug })
  const { data: Organization = {} } = useGetOrganizationPreviewQuery(data?.organizationId, { skip: !data?.organizationId})

  return (
      <Drawer
          open={open}
          onClose={onClose}
          anchor="right"
          PaperProps={{
            sx: {
              width: {lg: '100%'},
              zIndex: 9999,
              position: 'fixed',
              height: 'calc(100% - 64px)',
              top: '64px',
              right: 0,
            }
          }}
          componentsProps={{
            backdrop: {
              sx: {
                background: 'transparent !important',
                boxShadow: 'none !important'
              }
            }
          }}
      >
        {/*   Header   */}
        <Box sx={{boxShadow: "0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)",}}>
          <Content style={{paddingTop: '20px', paddingBottom: '20px'}}>
            <BoxFlex>
              <Typography variant="body1" sx={{color: '#172B4D', fontSize: 16, fontWeight: 600}}>
                Xem trước tin tuyển dụng
              </Typography>
              <IconButton onClick={onClose}>
                <CloseIcon/>
              </IconButton>
            </BoxFlex>
          </Content>
        </Box>
        <img alt="Header" src={'/assets/header_preview.png'} />
        {/*  content  */}
        <Grid container sx={{background: '#EDEDED'}}>
          <Content>
            <Breadcrumbs links={[...links, {name: Recruitment?.name}]} sx={{ mt: 0 }} />
            <PreviewJobHeader Recruitment={Recruitment} Organization={Organization} />
            <Grid container>
              <Grid item md={8}>
                <JobDescriptionBox className="job-description-box">
                  {/* Preview Job Header */}
                  <PreviewJobDescription Recruitment={Recruitment}/>
                  <PreviewJobFunction />
                </JobDescriptionBox>
              </Grid>
              {/* Company Intro */}
              <Grid item md={4} sx={{pl: 2}}>
                <Box>
                  <PreviewJobCompanyIntro Organization={Organization} />
                </Box>
              </Grid>
            </Grid>
          </Content>
        </Grid>
        <img alt="Footer" src={'/assets/footer_preview.png'} />
      </Drawer>
  )
}
export default RecruitmentPreview;