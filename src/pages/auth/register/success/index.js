// next
import { IconRegisterSuccess } from "@/assets/icon_register_success";
// component
import { LogoHeader } from "@/components/BaseComponents";
import { CardInfoBody, CardInfoIcon, CardInfoLabel, CardSubInfoLabel } from "@/components/BaseComponents/CardInfo";
import Iconify from "@/components/Iconify";
import Page from "@/components/Page";
// guards
import GuestGuard from "@/guards/GuestGuard";
// routes
import { PATH_AUTH } from "@/routes/paths";
import { STYLE_CONSTANT } from "@/sections/auth/register/constants";
// sections
import { LoadingButton } from "@mui/lab";
// @mui
import { Box, IconButton, Link, Stack } from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/router";

const BoxWrapperStyle = {
  mt: "36px",
  mb: "36px",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

const BoxInnerStyle = {
  px: 7.5,
  py: 5,
  bgcolor: STYLE_CONSTANT.COLOR_BACKGROUND,
  width: "560px",
  mb: 4.5,
  borderRadius: 0.75,
  boxShadow: "0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)",
  position: "relative",
}

const SuccessRegister = () => {
  const router = useRouter();

  const handleGoToPageByUrl = (url = "") => {
    if (!url) return;
    router.push(url);
  };

  return (
    <GuestGuard>
      <Page title="Đăng ký">
        <LogoHeader />
        <Box sx={{ ...BoxWrapperStyle }} >
          <Box sx={{ ...BoxInnerStyle }}>
            {/* Back button */}
            <Stack sx={{ position: "absolute", top: 8, left: 8 }}>
              <IconButton edge="end" onClick={() => handleGoToPageByUrl(PATH_AUTH.register)}>
                <Iconify icon="material-symbols:arrow-back" />
              </IconButton>
            </Stack>
            <Stack justifyContent="center" alignItems="center">
              {/* Image */}
              <CardInfoIcon>
                <IconRegisterSuccess sx={{ mb: 5 }} />
              </CardInfoIcon>
              {/* Content */}
              <CardInfoBody>
                <CardInfoLabel label="Đăng ký thành công" />
                <CardSubInfoLabel sx={{ mt: 1.5 }}>
                  Vui lòng truy cập email
                  {router.query.username ? (
                    <NextLink href={PATH_AUTH.register}>
                      <Link
                        style={{
                          padding: "0px 2px",
                          color: STYLE_CONSTANT.COLOR_PRIMARY,
                          fontStyle: "italic",
                          fontWeight: STYLE_CONSTANT.FONT_SEMIBOLD,
                          textDecoration: "none",
                          pointerEvents: "none",
                        }}
                      >
                        {router.query.username}
                      </Link>
                    </NextLink>
                  ) : ' bạn vừa đăng ký '}
                  để kích hoạt tài khoản và bắt đầu trải nghiệm các tính năng
                  tuyển dụng từ iVIEC.
                </CardSubInfoLabel>
                <CardSubInfoLabel sx={{ mt: 1.5, }}>
                  Cảm ơn bạn đã đồng hành cùng iVIEC Bussiness!
                </CardSubInfoLabel>
                <Stack sx={{ mt: 4.5, width: STYLE_CONSTANT.WIDTH_FULL }}>
                  <LoadingButton
                    fullWidth
                    size="large"
                    variant="contained"
                    onClick={() => handleGoToPageByUrl(PATH_AUTH.login)}
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
        </Box>
      </Page>
    </GuestGuard>
  );
};

export default SuccessRegister;
