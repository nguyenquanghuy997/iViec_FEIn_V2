import Page from "@/components/Page";
// guards
import GuestGuard from "@/guards/GuestGuard";
import { PATH_AUTH } from "@/routes/paths";
// sections
import { LoginForm } from "@/sections/auth/login";
import { Box, Stack, Typography, Link } from "@mui/material";
import {
  LogoHeader
} from "@/components/BaseComponents";

import NextLink from "next/link";

export default function Login() {
  return (
    <GuestGuard>
      <Page title="Login">
        <LogoHeader />
        <Box mt={"36px"} mb={"36px"} display="flex"
          justifyContent="center"
          alignItems="center">
          <Box sx={{ padding: "36px", bgcolor: '#FDFDFD', boxShadow: "0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)" }}>
            <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
              <Typography variant="h4" gutterBottom>
                ĐĂNG NHẬP
              </Typography>
            </Stack>
            <LoginForm />
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Bạn chưa có tài khoản nhà tuyển dụng?
            </Typography>
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              <NextLink href={PATH_AUTH.register} passHref>
                <Link variant="subtitle2">Đăng ký ngay!</Link>
              </NextLink>
            </Typography>
          </Box>

        </Box>

      </Page>
    </GuestGuard>
  );
}
