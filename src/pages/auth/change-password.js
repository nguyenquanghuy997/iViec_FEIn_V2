import {LogoHeader} from "@/components/BaseComponents";
import Page from "@/components/Page";
import {STYLE_CONSTANT} from "@/sections/auth/register/constants";
import {BoxInnerStyle, BoxWrapperStyle} from "@/sections/auth/style";
import {Box, Stack, Typography} from "@mui/material";
import {getRolesByPage} from "@/utils/role";
import {PAGES} from "@/config";
import LogoOnlyLayout from "@/layouts/LogoOnlyLayout";
import ChangePasswordForm from "@/sections/auth/change-password/ChangePasswordForm";
import {useRouter} from "next/router";
import ChangePasswordSuccess from "@/sections/auth/change-password/ChangePasswordSuccess";

ChangePassword.getLayout = function getLayout({roles = []}, page) {
  return <LogoOnlyLayout roles={roles}>{page}</LogoOnlyLayout>
}

export async function getStaticProps() {
  return {
    props: {
      roles: getRolesByPage(PAGES.Jobs),
    },
  }
}

export default function ChangePassword() {
  const router = useRouter();
  const {query} = router;
  const {status} = query;

  return (
      <Page title="Đổi mật khẩu">
        <LogoHeader/>
        <Box sx={{...BoxWrapperStyle}}>
          {
            status === 'success' ? <ChangePasswordSuccess /> : (
                <Box sx={{...BoxInnerStyle, minHeight: "784px"}}>
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
