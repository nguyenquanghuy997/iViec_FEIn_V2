// next
import ResetPasswordSuccess from "@/sections/reset-password/ResetPasswordSuccess";
// component
import { LogoHeader } from "@/components/BaseComponents";
import {
  CardInfoBody,
  CardInfoLabel,
} from "@/components/BaseComponents/CardInfo";
import Page from "@/components/Page";
// guards
import GuestGuard from "@/guards/GuestGuard";
// routes
import { PATH_PAGE } from "@/routes/paths";
import { useLazyConfirmEmailQuery } from "@/sections/auth/authSlice";
import NewPasswordForm from "@/sections/auth/new-password/NewPasswordForm";
import { BoxInnerStyle, BoxWrapperStyle } from "@/sections/auth/style";
// import UserActiveFailure from "@/sections/user-activate/UserActiveFailure";
// @mui
import { Box, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ResetPasswordPage = () => {
  const [statusActiveUser, setStatusActiveUser] = useState(false);
  const router = useRouter();
  const { USER_NAME ,OTPCode} = router.query;
  const [confirmEmail] = useLazyConfirmEmailQuery();
  // let str = router.asPath;
  // const OTPCode = str.substring(str.indexOf('OTPCode') + 7);
  // console.log('OTPCode1',str)
  // console.log('OTPCode',OTPCode)
  useEffect(() => {
    if (!USER_NAME && !OTPCode) {
      router.push(PATH_PAGE.page404);
    }
  }, [USER_NAME, OTPCode]);

  useEffect(() => {
    async function fetchConfirmEmail() {
      if (USER_NAME && OTPCode) {
        try {
          console.log('USER_NAME',USER_NAME)
          console.log('USER_NAME',OTPCode)
          await confirmEmail({ email: USER_NAME, token: encodeURI(OTPCode) }).unwrap();
          setStatusActiveUser(true);
        } catch (e) {
          setStatusActiveUser(false);
        }
      }
    }
    fetchConfirmEmail();
  }, [ USER_NAME, OTPCode]);

  return (
    <GuestGuard>
      <Page
        title={
            "Đặt lại mật khẩu"
        }
      >
        <LogoHeader />
        <Box sx={{ ...BoxWrapperStyle }}>
          {
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
          }
          {statusActiveUser && (
            <ResetPasswordSuccess USER_NAME={USER_NAME} />
          )}
          {/* { statusActiveUser && (
            <UserActiveFailure />
          )} */}
        </Box>
      </Page>
    </GuestGuard>
  );
};

export default ResetPasswordPage;
