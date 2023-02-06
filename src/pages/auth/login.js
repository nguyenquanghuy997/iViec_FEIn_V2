import NextLink from "next/link";

import { Box, Stack, Typography, Link } from "@mui/material";

import { LogoHeader } from "@/components/BaseComponents";
import Page from "@/components/Page";
// guards
import GuestGuard from "@/guards/GuestGuard";
import { PATH_AUTH } from "@/routes/paths";
// sections
import { LoginForm } from "@/sections/auth/login";
import { STYLE_CONSTANT } from "@/sections/auth/register/constants";

export default function Login() {
  return (
    <GuestGuard>
      <Page title="Đăng nhập">
        <LogoHeader />
        <Box
          mt={"36px"}
          mb={"36px"}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            sx={{
              padding: 7.5,
              bgcolor: STYLE_CONSTANT.COLOR_BACKGROUND,
              width: "560px",
              mb: 4.5,
              borderRadius: 0.75,
              boxShadow:
                "0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)",
            }}
          >
            <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
              <Typography
                variant="h4"
                sx={{
                  fontSize: STYLE_CONSTANT.FONT_2XL,
                  fontWeight: STYLE_CONSTANT.FONT_BOLD,
                  width: STYLE_CONSTANT.WIDTH_FULL,
                  color: STYLE_CONSTANT.COLOR_TEXT_PRIMARY,
                }}
              >
                Đăng nhập
              </Typography>
            </Stack>
            <LoginForm />
            <Stack sx={{ mt: "214px" }}>
              <Typography
                variant="body2"
                align="center"
                sx={{
                  mt: 2,
                  color: "#8A94A5",
                  fontSize: STYLE_CONSTANT.FONT_SM,
                  fontWeight: STYLE_CONSTANT.FONT_NORMAL,
                }}
              >
                Bạn chưa có tài khoản nhà tuyển dụng?
              </Typography>
              <Typography
                variant="body2"
                align="center"
                sx={{
                  mt: 1.5,
                }}
              >
                <NextLink href={PATH_AUTH.register} passHref>
                  <Link
                    variant="subtitle2"
                    sx={{
                      color: "#1976D2",
                      fontSize: STYLE_CONSTANT.FONT_SM,
                      fontWeight: STYLE_CONSTANT.FONT_SEMIBOLD,
                    }}
                  >
                    Đăng ký miễn phí
                  </Link>
                </NextLink>
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Page>
    </GuestGuard>
  );
}
