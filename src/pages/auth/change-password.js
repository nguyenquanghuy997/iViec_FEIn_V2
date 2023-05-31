import {LogoHeader} from "@/components/BaseComponents";
import Page from "@/components/Page";
import {STYLE_CONSTANT} from "@/sections/auth/register/constants";
import {BoxInnerStyle, BoxWrapperStyle} from "@/sections/auth/style";
import {Box, Stack, Typography} from "@mui/material";
import LogoOnlyLayout from "@/layouts/LogoOnlyLayout";
import ChangePasswordForm from "@/sections/auth/change-password/ChangePasswordForm";
import {useRouter} from "next/router";
import ChangePasswordSuccess from "@/sections/auth/change-password/ChangePasswordSuccess";
import palette from "@/theme/palette";

ChangePassword.getLayout = function getLayout(pageProps, page) {
  return <LogoOnlyLayout {...pageProps}>{page}</LogoOnlyLayout>
}

export default function ChangePassword() {
  const router = useRouter();
  const {query} = router;
  const {status} = query;

  return (
      <Page title="Đổi mật khẩu">
        <LogoHeader/>
        <Box sx={{...BoxWrapperStyle, backgroundColor: palette.light.common.bgrMaster, paddingBlock: "36px", marginBlock: 0, height: "calc(100vh - 101px)", alignItems: "start" }}>
          {
            status === 'success' ? <ChangePasswordSuccess /> : (
                <Box sx={{...BoxInnerStyle, marginBottom: 0, height: "100%" }}>
                  <Stack direction="row" alignItems="center" sx={{mb: 5}}>
                    <Typography
                        variant="h4"
                        sx={{
                          fontSize: STYLE_CONSTANT.FONT_2XL,
                          fontWeight: STYLE_CONSTANT.FONT_BOLD,
                          width: STYLE_CONSTANT.WIDTH_FULL,
                          color: STYLE_CONSTANT.COLOR_TEXT_PRIMARY,
                        }}
                    >
                      Đổi mật khẩu
                    </Typography>
                  </Stack>
                  <ChangePasswordForm/>
                </Box>
            )
          }
        </Box>
      </Page>
  );
}
