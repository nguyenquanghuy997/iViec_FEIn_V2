import Logo from "@/components/Logo";
import Page from "@/components/Page";
// guards
import GuestGuard from "@/guards/GuestGuard";
// routes
import { PATH_AUTH } from "@/routes/paths";
// sections
import { RegisterFormInfo } from "@/sections/auth/register";
// @mui
import { Box, Container, Link, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import NextLink from "next/link";
import * as React from "react";

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 540,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

export default function Register() {
  return (
    <GuestGuard>
      <Page title="Register">
        <RootStyle>
          <Container>
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
              <Box sx={{ mb: 5, display: "flex", alignItems: "center" }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h4" gutterBottom>
                    Đăng kí
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 3 }}>
                    Doanh nghiệp của bạn có tài khoản?{" "}
                    <NextLink href={PATH_AUTH.login} passHref>
                      <Link variant="subtitle2">Đăng Nhập</Link>
                    </NextLink>
                  </Typography>
                </Box>
              </Box>
              <RegisterFormInfo />
            </ContentStyle>
          </Container>
        </RootStyle>
      </Page>
    </GuestGuard>
  );
}
