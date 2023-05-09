import Content from "@/components/BaseComponents/Content";
import Breadcrumbs from "@/components/Breadcrumbs";
import Iconify from "@/components/Iconify";
import { useGetOrganizationPreviewQuery } from "@/sections/organization/override/OverrideOrganizationSlice";
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
const Preview = ({ data, open, onClose }) => {
  const { data: Organization = {}, isLoading } = useGetOrganizationPreviewQuery(
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
      <Box
        sx={{
          boxShadow:
            "0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)",
        }}
      >
        <Content style={{ paddingTop: "20px", paddingBottom: "20px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="body1"
              sx={{ color: "#172B4D", fontSize: 16, fontWeight: 600 }}
            >
              Xem trước tin tuyển dụng
            </Typography>
            <ButtonIcon
              sx={{
                textTransform: "none",
                background: "#E53935",
                "&:hover": {
                  background: "#E53935",
                },
              }}
              onClick={onClose}
              icon={
                <Iconify
                  icon={"ic:baseline-close"}
                  width={20}
                  height={20}
                  color="#FDFDFD"
                />
              }
            />
          </Box>
        </Content>
      </Box>
      <img alt="Header" src={"/assets/header_preview.png"} />
      <Grid container sx={{ background: "#EDEDED" }}>
        <Content>
          <Breadcrumbs
            links={[...links, { name: data?.name }]}
            sx={{ mt: 0 }}
          />
          <PreviewJobHeader Recruitment={data} Organization={Organization} />
          <Grid container>
            <Grid item md={8}>
              <JobDescriptionBox className="job-description-box">
                <PreviewJobDescription Recruitment={data} />
                <PreviewJobFunction />
              </JobDescriptionBox>
            </Grid>
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
export default Preview;
