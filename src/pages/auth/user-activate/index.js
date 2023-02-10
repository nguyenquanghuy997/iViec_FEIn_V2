// next
import UserActiveSuccess from "@/sections/auth/user-activate/UserActiveFailure";
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
import UserActiveFailure from "@/sections/auth/user-activate/UserActiveFailure";
// @mui
import { Box, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const UserActivePage = () => {
  const [statusActiveUser, setStatusActiveUser] = useState(false);
  const router = useRouter();
 
  const { USER_NAME,OTPCode, SetPassword } = router.query;
  const [confirmEmail] = useLazyConfirmEmailQuery();
  // let str = router.asPath;
  // const OTPCode = str.substring(str.indexOf('OTPCode') - 7);
  console.log('OTPCode',OTPCode)
  console.log('encodeURI',encodeURI(OTPCode))

  useEffect(() => {
    if (!USER_NAME && !OTPCode) {
      router.push(PATH_PAGE.page404);
    }
  }, [USER_NAME, OTPCode]);

  useEffect(() => {
    async function fetchConfirmEmail() {
      if (parseInt(SetPassword) === 0 && USER_NAME && OTPCode) {
        try {
          console.log('USER_NAME',USER_NAME)
          console.log('OTPCode',OTPCode)
          await confirmEmail({ email: USER_NAME, token: encodeURI(OTPCode) }).unwrap();
          setStatusActiveUser(true);
        } catch (e) {
          setStatusActiveUser(false);
        }
      }
    }
    fetchConfirmEmail();
  }, [SetPassword, USER_NAME, OTPCode]);

  return (
    <GuestGuard>
      <Page
        title={
          parseInt(SetPassword) === 0
            ? "Kích hoạt tài khoản"
            : parseInt(SetPassword) === 1
            ? "Thiết lập mật khẩu mới"
            : "Kích hoạt tài khoản"
        }
      >
        <LogoHeader />
        <Box sx={{ ...BoxWrapperStyle }}>
          {parseInt(SetPassword) === 1 && (
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
          {parseInt(SetPassword) === 0 && statusActiveUser && (
            <UserActiveSuccess USER_NAME={USER_NAME} />
          )}
          {parseInt(SetPassword) === 0 && !statusActiveUser && (
            <UserActiveFailure />
          )}
        </Box>
      </Page>
    </GuestGuard>
  );
};

export default UserActivePage;
