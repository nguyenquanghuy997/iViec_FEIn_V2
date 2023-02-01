import Logo from "@/components/Logo";
import Page from "@/components/Page";
// guards
import GuestGuard from "@/guards/GuestGuard";
import { PATH_AUTH } from "@/routes/paths";
// sections
import { LoginForm } from "@/sections/auth/login";
import { Box, Container, Stack, Typography, Link } from "@mui/material";
import { styled } from "@mui/material/styles";
import NextLink from "next/link";

// import Logo from '../../theme/Logo'
// import { BlockContent } from '@/components/upload'
// import { isBlock } from 'typescript'

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

export default function Login() {
  return (
    <GuestGuard>
      <Page title="Login">
        <RootStyle>
   

          <Container maxWidth="sm">
            <ContentStyle>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingBottom: 20,
                }}
              >
                <Logo />
                <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
                  IVIEC
                </Typography>
              </div>

              <Stack direction="row" alignItems="center" sx={{ mb: 4 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h4" gutterBottom>
                    ĐĂNG NHẬP
                  </Typography>
                </Box>
              </Stack>
              <LoginForm />
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Doanh nghiệp của bạn chưa có tài khoản?{" "}
                <NextLink href={PATH_AUTH.register} passHref>
                  <Link variant="subtitle2">Đăng ký ngay!</Link>
                </NextLink>
              </Typography>
            </ContentStyle>
          </Container>
        </RootStyle>
      </Page>
    </GuestGuard>
  );
}
