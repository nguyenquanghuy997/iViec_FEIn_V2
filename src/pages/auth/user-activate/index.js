import UserActiveSuccess from "@/sections/auth/user-activate/UserActiveSuccess";
import {LogoHeader} from "@/components/BaseComponents";
import {CardInfoBody, CardInfoLabel,} from "@/components/BaseComponents/CardInfo";
import Page from "@/components/Page";
import GuestGuard from "@/guards/GuestGuard";
import {PATH_PAGE} from "@/routes/paths";
import {useLazyConfirmEmailQuery} from "@/sections/auth/authSlice";
import NewPasswordForm from "@/sections/auth/new-password/NewPasswordForm";
import {BoxInnerStyle, BoxWrapperStyle} from "@/sections/auth/style";
import UserActiveFailure from "@/sections/auth/user-activate/UserActiveFailure";
import {Box, Stack} from "@mui/material";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

const UserActivePage = () => {
  const [statusActiveUser, setStatusActiveUser] = useState(false);
  const router = useRouter();
  const {query, asPath} = router;
  const {USER_NAME, OTPCode, SetPassword} = query;
  const [confirmEmail] = useLazyConfirmEmailQuery();

  const [, queryString = ""] = asPath.split("?");

  const queryObj = queryString.split("&").reduce((prev, curr) => {
    const [key, value] = curr.split("=");
    prev.set(key, value);
    return prev;
  }, new Map());

  useEffect(() => {
    if (!USER_NAME && !OTPCode) {
      return router.push(PATH_PAGE.page404);
    }
  }, [USER_NAME, OTPCode]);

  useEffect(() => {
    async function fetchConfirmEmail() {
      if (Number(SetPassword) === 0 && USER_NAME && OTPCode) {
        try {
          await confirmEmail({email: decodeURI(queryObj.get('USER_NAME')), token: decodeURI(queryObj.get('OTPCode'))}).unwrap();
          setStatusActiveUser(true);
        } catch (error) {
          if (error.status == 'AUE_05') {
            setStatusActiveUser(false);
          } else {
            setStatusActiveUser(false);
          }
        }
      }
    }

    fetchConfirmEmail();
  }, [SetPassword, USER_NAME, OTPCode]);

  return (
      <GuestGuard>
        <Page
            title={
              Number(SetPassword) === 0
                  ? "Kích hoạt tài khoản"
                  : Number(SetPassword) === 1
                      ? "Thiết lập mật khẩu mới"
                      : "Kích hoạt tài khoản"
            }
        >
          <LogoHeader/>
          <Box sx={{...BoxWrapperStyle}}>
            {
              Number(SetPassword) === 1 ?
                  <Box sx={{...BoxInnerStyle, minHeight: "784px"}}>
                    <Stack justifyContent="center" alignItems="center">
                      <CardInfoBody>
                        <CardInfoLabel label="Thiết lập mật khẩu mới" sx={{textAlign: "left", mb: 5}}/>
                        <NewPasswordForm userName={decodeURI(queryObj.get('USER_NAME'))} otpCode={decodeURI(queryObj.get('OTPCode'))}/>
                      </CardInfoBody>
                    </Stack>
                  </Box> :
                  <Box>
                    {statusActiveUser ? <UserActiveSuccess USER_NAME={decodeURI(queryObj.get('USER_NAME'))}/> : <UserActiveFailure/>}
                  </Box>
            }
          </Box>
        </Page>
      </GuestGuard>
  );
};

export default UserActivePage;
