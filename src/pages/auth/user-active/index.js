// next
import { IconRegisterSuccess } from "@/assets/icon_register_success";
// component
import { LogoHeader } from "@/components/BaseComponents";
import {
  CardInfoBody,
  CardInfoIcon,
  CardInfoLabel,
  CardSubInfoLabel,
} from "@/components/BaseComponents/CardInfo";
import Iconify from "@/components/Iconify";
import Page from "@/components/Page";
// guards
import GuestGuard from "@/guards/GuestGuard";
// routes
import { PATH_AUTH, PATH_PAGE } from "@/routes/paths";
import NewPasswordForm from "@/sections/auth/new-password/NewPasswordForm";
// import { useLazyConfirmEmailQuery } from "@/sections/auth/authSlice";
import { STYLE_CONSTANT } from "@/sections/auth/register/constants";
import { BoxInnerStyle, BoxWrapperStyle } from "@/sections/auth/style";
// sections
import { LoadingButton } from "@mui/lab";
// @mui
import { Box, IconButton, Link, Stack } from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const UserActivePage = () => {
  const router = useRouter();
  const { USER_NAME, OTPCode, setpassword } = router.query;

  useEffect(() => {
    if (!USER_NAME && !OTPCode) {
      router.push(PATH_PAGE.page404);
    }
  }, [USER_NAME, OTPCode]);

  return (
    <GuestGuard>
      <Page
        title={
          parseInt(setpassword) === 0
            ? "Kích hoạt tài khoản"
            : parseInt(setpassword) === 1
            ? "Thiết lập mật khẩu mới"
            : "Kích hoạt tài khoản"
        }
      >
        <LogoHeader />
        <Box sx={{ ...BoxWrapperStyle }}>
          {parseInt(setpassword) === 0 && (
            <Box sx={{ ...BoxInnerStyle }}>
              <Stack sx={{ position: "absolute", top: 8, left: 8 }}>
                <IconButton
                  edge="end"
                  onClick={() => router.push(PATH_AUTH.register)}
                >
                  <Iconify icon="material-symbols:arrow-back" />
                </IconButton>
              </Stack>
              <Stack justifyContent="center" alignItems="center">
                <CardInfoIcon>
                  <IconRegisterSuccess sx={{ mb: 5 }} />
                </CardInfoIcon>
                <CardInfoBody>
                  <CardInfoLabel label="Kích hoạt tài khoản thành công" />
                  <CardSubInfoLabel sx={{ mt: 1.5 }}>
                    Bạn đã có thể đăng nhập bằng email
                    {USER_NAME && OTPCode && parseInt(setpassword) === 0 ? (
                      <>
                        {" "}
                        <NextLink href={PATH_AUTH.register}>
                          <Link
                            style={{
                              color: STYLE_CONSTANT.COLOR_PRIMARY,
                              fontStyle: "italic",
                              fontWeight: STYLE_CONSTANT.FONT_SEMIBOLD,
                              textDecoration: "none",
                              pointerEvents: "none",
                            }}
                          >
                            {USER_NAME}
                          </Link>
                        </NextLink>{" "}
                      </>
                    ) : (
                      " bạn vừa đăng ký "
                    )}
                    để bắt đầu trải nghiệm các tính năng tuyển dụng từ iVIEC.
                  </CardSubInfoLabel>
                  <CardSubInfoLabel sx={{ mt: 1.5 }}>
                    Cảm ơn bạn đã đồng hành cùng iVIEC Bussiness!
                  </CardSubInfoLabel>
                  <Stack sx={{ mt: 4.5, width: STYLE_CONSTANT.WIDTH_FULL }}>
                    <LoadingButton
                      fullWidth
                      size="large"
                      variant="contained"
                      onClick={() => router.push(PATH_AUTH.login)}
                      sx={{
                        backgroundColor: STYLE_CONSTANT.COLOR_PRIMARY,
                        textTransform: "none",
                        borderRadius: 0.75,
                        fontWeight: STYLE_CONSTANT.FONT_SEMIBOLD,
                      }}
                    >
                      Trở về trang đăng nhập
                    </LoadingButton>
                  </Stack>
                </CardInfoBody>
              </Stack>
            </Box>
          )}
          {parseInt(setpassword) === 1 && (
            <Box sx={{ ...BoxInnerStyle, minHeight: "784px" }}>
              <Stack justifyContent="center" alignItems="center">
                <CardInfoBody>
                  <CardInfoLabel
                    label="Thiết lập mật khẩu mới"
                    sx={{ textAlign: "left", mb: 5 }}
                  />
                  <NewPasswordForm userName={USER_NAME} otpCode={OTPCode} />
                </CardInfoBody>
              </Stack>
            </Box>
          )}
        </Box>
      </Page>
    </GuestGuard>
  );
};

export default UserActivePage;
