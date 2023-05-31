import IconForgotPassword from "@/assets/icon_forgot_password";
import { LogoHeader } from "@/components/BaseComponents";
import {
  CardInfoBody,
  CardInfoIcon,
  CardInfoLabel,
} from "@/components/BaseComponents/CardInfo";
import Iconify from "@/components/Iconify";
import Page from "@/components/Page";
import GuestGuard from "@/guards/GuestGuard";
import Layout from "@/layouts";
import { PATH_AUTH } from "@/routes/paths";
import { ResetPasswordForm,ResetPasswordSuccess } from "@/sections/auth/reset-password";
import { BoxInnerStyle, BoxWrapperStyle } from "@/sections/auth/style";
import { Box, IconButton, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import palette from "@/theme/palette";

ResetPassword.getLayout = function getLayout(data, page) {
  return (
    <Layout variant="logoOnly" {...data}>
      {page}
    </Layout>
  );
};

export default function ResetPassword() {
  const [statusResetPass, setStatusResetPass] = useState(false); // false: failure, true: success
  const router = useRouter();

  const handleGoToPageByUrl = (url = "") => {
    if (!url) return;
    return router.push(url);
  };

  return (
    <GuestGuard>
      <Page title="Quên mật khẩu">
        <LogoHeader />
        <Box sx={{ ...BoxWrapperStyle, backgroundColor: palette.light.common.bgrMaster, paddingBlock: "36px", marginBlock: 0, height: "calc(100vh - 101px)", alignItems: "start" }}>
          {statusResetPass ? (
            <ResetPasswordSuccess />
          ) : (
            <Box sx={{ ...BoxInnerStyle, marginBottom: 0, height: "100%" }}>
              {/* Back button */}
              <Stack sx={{ position: "absolute", top: 8, left: 8 }}>
                <IconButton
                  edge="end"
                  onClick={() => handleGoToPageByUrl(PATH_AUTH.login)}
                >
                  <Iconify icon="material-symbols:arrow-back" />
                </IconButton>
              </Stack>
              <Stack justifyContent="center" alignItems="center">
                {/* Image */}
                <CardInfoIcon sx={{ mb: 5 }}>
                  <IconForgotPassword />
                </CardInfoIcon>
                {/* Content */}
                <CardInfoBody>
                  <CardInfoLabel label="Quên mật khẩu" />
                  <ResetPasswordForm setStatusResetPass={setStatusResetPass} />
                </CardInfoBody>
              </Stack>
            </Box>
          )}
        </Box>
      </Page>
    </GuestGuard>
  );
}
