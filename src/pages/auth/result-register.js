// next
import NextLink from "next/link";
import { useRouter } from "next/router";

// @mui
import { Box, IconButton, Link, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

// component
import { LogoHeader } from "@/components/BaseComponents";
import Iconify from "@/components/Iconify";
import Page from "@/components/Page";

// guards
import GuestGuard from "@/guards/GuestGuard";

// routes
import { PATH_AUTH } from "@/routes/paths";

// sections
import { STYLE_CONSTANT } from "@/sections/auth/register/constants";
import { ImageIcon } from "@/sections/auth/register/ImageIcon";


const ResultRegister = () => {
  const router = useRouter();

  const handleGoToPageByUrl = (url = "") => {
    if (!url) return;
    router.push(url);
  };

  return (
    <GuestGuard>
      <Page title="Đăng ký thành công">
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
              px: 7.5,
              py: 5,
              bgcolor: STYLE_CONSTANT.COLOR_BACKGROUND,
              width: "560px",
              mb: 4.5,
              borderRadius: 0.75,
              boxShadow:
                "0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)",
              position: "relative",
            }}
          >
            {/* Back button */}
            <Stack
              sx={{
                position: "absolute",
                top: 8,
                left: 8,
              }}
            >
              <IconButton
                edge="end"
                onClick={() => handleGoToPageByUrl(PATH_AUTH.register)}
              >
                <Iconify icon="material-symbols:arrow-back" />
              </IconButton>
            </Stack>
            <Stack justifyContent="center" alignItems="center">
              {/* Image */}
              <Stack sx={{ mb: 5 }}>
                <ImageIcon />
              </Stack>
              {/* Content */}
              <Stack>
                <Typography
                  variant="h4"
                  width={STYLE_CONSTANT.WIDTH_FULL}
                  sx={{
                    textAlign: "center",
                    fontSize: STYLE_CONSTANT.FONT_XL,
                    fontWeight: STYLE_CONSTANT.FONT_BOLD,
                    mb: 1,
                    color: STYLE_CONSTANT.COLOR_TEXT_PRIMARY,
                  }}
                >
                  Đăng ký thành công
                </Typography>
                <Stack sx={{ mt: 1.5 }}>
                  <Typography
                    variant="body2"
                    align="center"
                    sx={{
                      fontSize: 13,
                      fontWeight: STYLE_CONSTANT.FONT_NORMAL,
                      color: STYLE_CONSTANT.COLOR_TEXT_PRIMARY,
                    }}
                  >
                    Vui lòng truy cập email
                    {router.query.email && (
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
                          {router.query.email}
                        </Link>
                      </NextLink>
                    )}{" "}
                    để kích hoạt tài khoản và bắt đầu trải nghiệm các tính năng
                    tuyển dụng từ iVIEC.
                  </Typography>
                  <Typography
                    variant="body2"
                    align="center"
                    sx={{
                      mt: 1.5,
                      color: STYLE_CONSTANT.COLOR_TEXT_PRIMARY,
                      fontSize: 13,
                      fontWeight: STYLE_CONSTANT.FONT_NORMAL,
                    }}
                  >
                    Cảm ơn bạn đã đồng hành cùng iVIEC Bussiness!
                  </Typography>
                </Stack>
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
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Page>
    </GuestGuard>
  );
};

export default ResultRegister;
