import NewPasswordForm from "@/sections/auth/new-password/NewPasswordForm";
import {useRouter} from "next/router";
import Page from "@/components/Page";
import {LogoHeader} from "@/components/BaseComponents";
import {Box, Stack} from "@mui/material";
import {BoxInnerStyle, BoxWrapperStyle} from "@/sections/auth/style";
import {CardInfoBody, CardInfoLabel} from "@/components/BaseComponents/CardInfo";
import GuestGuard from "@/guards/GuestGuard";
import {NewPasswordSuccess} from "@/sections/auth/new-password";

const UserActivePage = () => {
  const router = useRouter();
  const {query, asPath} = router;
  const {status} = query;

  const [, queryString = ""] = asPath.split("?");

  const queryObj = queryString.split("&").reduce((prev, curr) => {
    const [key, value] = curr.split("=");
    prev.set(key, value);
    return prev;
  }, new Map());

  return (
      <GuestGuard>
        <Page title={status === 'success' ? "Thiết lập mật khẩu thành công" : "Thiết lập mật khẩu mới"}>
          <LogoHeader/>
          <Box sx={{...BoxWrapperStyle}}>
            {
              status === 'success' ? <NewPasswordSuccess/> : (
                  <Box sx={{...BoxInnerStyle, minHeight: "784px"}}>
                    <Stack justifyContent="center" alignItems="center">
                      <CardInfoBody>
                        <CardInfoLabel
                            label="Thiết lập mật khẩu mới"
                            sx={{textAlign: "left", mb: 5}}
                        />
                        <NewPasswordForm userName={decodeURI(queryObj.get('USER_NAME'))} otpCode={decodeURI(queryObj.get('OTPCode'))}/>
                      </CardInfoBody>
                    </Stack>
                  </Box>
              )
            }
          </Box>
        </Page>
      </GuestGuard>
  );
};

export default UserActivePage;
