// next
// components
import { LogoHeader } from "@/components/BaseComponents";
import { View } from "@/components/FlexStyled";
import Page from "@/components/Page";
// guards
import GuestGuard from "@/guards/GuestGuard";
// routes
import { PATH_AUTH } from "@/routes/paths";
// sections
import { RegisterFormInfo } from "@/sections/auth/register";
import { STYLE_CONSTANT } from "@/sections/auth/register/constants";
// @mui
import { Box, Link, Stack, Typography } from "@mui/material";
import NextLink from "next/link";

export default function Register() {
  return (
    <GuestGuard>
      <View bgColor={STYLE_CONSTANT.COLOR_BG_GRAY}>
        <Page title="Đăng ký">
          <LogoHeader />
          <Box
            mt={"36px"}
            mb={"36px"}
            position="relative"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              sx={{
                padding: 7.5,
                bgcolor: STYLE_CONSTANT.COLOR_BACKGROUND,
                minWidth: "1020px",
                borderRadius: "6px",
                mb: 4.5,
                boxShadow:
                  "0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)",
              }}
            >
              <Stack>
                <Typography
                  variant="h4"
                  width={STYLE_CONSTANT.WIDTH_FULL}
                  sx={{
                    fontSize: STYLE_CONSTANT.FONT_2XL,
                    fontWeight: STYLE_CONSTANT.FONT_BOLD,
                    mb: 1,
                    color: STYLE_CONSTANT.COLOR_TEXT_PRIMARY,
                  }}
                >
                  Đăng ký tài khoản doanh nghiệp
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: 13,
                    fontWeight: STYLE_CONSTANT.FONT_NORMAL,
                    width: STYLE_CONSTANT.WIDTH_FULL,
                  }}
                >
                  Bạn đã có tài khoản iVIEC Bussiness?
                  <NextLink href={PATH_AUTH.login} passHref>
                    <Link
                      variant="subtitle2"
                      sx={{
                        marginLeft: 1.25,
                        fontWeight: STYLE_CONSTANT.FONT_SEMIBOLD,
                        color: STYLE_CONSTANT.COLOR_PRIMARY,
                        fontSize: STYLE_CONSTANT.FONT_SM,
                      }}
                    >
                      Đăng nhập ngay!
                    </Link>
                  </NextLink>
                </Typography>
              </Stack>
              <RegisterFormInfo />
            </Box>
          </Box>
        </Page>
      </View>
    </GuestGuard>
  );
}
