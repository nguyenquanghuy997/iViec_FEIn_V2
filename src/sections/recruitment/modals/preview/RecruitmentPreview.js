import Content from "@/components/BaseComponents/Content";
import Breadcrumbs from "@/components/Breadcrumbs";
import Iconify from "@/components/Iconify";
import { BoxFlex } from "@/sections/emailform/style";
import { useGetOrganizationPreviewQuery } from "@/sections/organization/override/OverrideOrganizationSlice";
import { useGetRecruitmentBySlugQuery } from "@/sections/recruitment";
import PreviewJobCompanyIntro from "@/sections/recruitment/modals/preview/PreviewJobCompanyIntro";
import PreviewJobDescription from "@/sections/recruitment/modals/preview/PreviewJobDescription";
import PreviewJobFunction from "@/sections/recruitment/modals/preview/PreviewJobFunction";
import PreviewJobHeader from "@/sections/recruitment/modals/preview/PreviewJobHeader";
import { JobDescriptionBox } from "@/sections/recruitment/style";
import { ButtonIcon } from "@/utils/cssStyles";
import {
  Box,
  Drawer,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import {useTheme} from "@mui/material/styles";

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

const Keyframes = styled(Drawer)({
  "@keyframes pulsate": {
    from: {
      top: "100%",
      opacity: 1,
      transform: "scale(1)",
      animationTimingFunction: "ease-out",
    },
    to: {
      top: 0,
    },
  },
  animation: "pulsate 0.5s ease",
});

const RecruitmentPreview = ({ data, open, onClose }) => {
  const { data: Recruitment = {}, isLoading } = useGetRecruitmentBySlugQuery(
    data?.slug,
    { skip: !data?.slug }
  );
  const theme = useTheme();
  const { data: Organization = {} } = useGetOrganizationPreviewQuery(
    data?.organizationId,
    { skip: !data?.organizationId }
  );

  if (isLoading) return null;

  return (
    <Keyframes
      open={open}
      onClose={onClose}
      anchor="right"
      PaperProps={{
        sx: {
          width: { lg: "100%" },
          zIndex: 9999,
          position: "fixed",
          height: "calc(100% - 64px)",
          top: "64px",
          right: 0,
        },
      }}
      componentsProps={{
        backdrop: {
          sx: {
            background: "transparent !important",
            boxShadow: "none !important",
          },
        },
      }}
    >
      {/*   Header   */}
      <Box
        sx={{
          boxShadow:
            "0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)",
        }}
      >
        <Content style={{ paddingTop: "20px", paddingBottom: "20px" }}>
          <BoxFlex>
            <Typography
              variant="body1"
              sx={{ color: theme.palette.common.neutral800, fontSize: 16, fontWeight: 600 }}
            >
              Xem trước tin tuyển dụng
            </Typography>
            <ButtonIcon
              sx={{
                textTransform: "none",
                background: theme.palette.common.red600,
                "&:hover": {
                  background: theme.palette.common.red600,
                },
              }}
              onClick={onClose}
              icon={
                <Iconify
                  icon={"ic:baseline-close"}
                  width={20}
                  height={20}
                  color={theme.palette.common.white}
                />
              }
            />
          </BoxFlex>
        </Content>
      </Box>
      <img alt="Header" src={"/assets/header_preview.png"} />
      {/*  content  */}
      <Grid container sx={{ background: "#EDEDED" }}>
        <Content>
          <Breadcrumbs
            links={[...links, { name: Recruitment?.name }]}
            sx={{ mt: 0 }}
          />
          <PreviewJobHeader
            Recruitment={Recruitment}
            Organization={Organization}
          />
          <Grid container>
            <Grid item md={8}>
              <JobDescriptionBox className="job-description-box">
                {/* Preview Job Header */}
                <PreviewJobDescription Recruitment={Recruitment} />
                <PreviewJobFunction />
              </JobDescriptionBox>
            </Grid>
            {/* Company Intro */}
            <Grid item md={4} sx={{ pl: 2 }}>
              <Box>
                <PreviewJobCompanyIntro Organization={Organization} />
              </Box>
            </Grid>
          </Grid>
        </Content>
      </Grid>
      <img alt="Footer" src={"/assets/footer_preview.png"} />
    </Keyframes>
  );
};
export default RecruitmentPreview;
