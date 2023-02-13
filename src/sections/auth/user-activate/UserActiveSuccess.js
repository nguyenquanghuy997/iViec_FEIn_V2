// next
import { IconRegisterSuccess } from "@/assets/icon_register_success";
import {
  CardInfoBody,
  CardInfoIcon,
  CardInfoLabel,
  CardSubInfoLabel,
} from "@/components/BaseComponents/CardInfo";
import Iconify from "@/components/Iconify";
// routes
import { PATH_AUTH } from "@/routes/paths";
import { STYLE_CONSTANT } from "@/sections/auth/register/constants";
import { BoxInnerStyle } from "@/sections/auth/style";
// sections
import { LoadingButton } from "@mui/lab";
// @mui
import { Box, IconButton, Link, Stack } from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/router";

const UserActiveSuccess = ({ USER_NAME }) => {
  const router = useRouter();
  return (
    <Box sx={{ ...BoxInnerStyle }}>
      <Stack sx={{ position: "absolute", top: 8, left: 8 }}>
        <IconButton edge="end" onClick={() => router.push(-1)}>
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
            {USER_NAME ? (
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
  );
};

export default UserActiveSuccess;
