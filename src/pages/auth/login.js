import { LogoHeader } from "@/components/BaseComponents";
import Page from "@/components/Page";
// guards
import GuestGuard from "@/guards/GuestGuard";
import { PATH_AUTH } from "@/routes/paths";
// sections
import { LoginForm } from "@/sections/auth/login";
import { STYLE_CONSTANT } from "@/sections/auth/register/constants";
import { BoxInnerStyle, BoxWrapperStyle } from "@/sections/auth/style";
import { Box, Stack, Typography, Link } from "@mui/material";
import NextLink from "next/link";

export default function Login() {
  return (
    <GuestGuard>
      <Page title="Đăng nhập">
        <LogoHeader />
        <Box sx={{ ...BoxWrapperStyle }}>
          <Box sx={{ ...BoxInnerStyle, minHeight: "784px" }}>
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
