import Page from "@/components/Page";
// guards
import GuestGuard from "@/guards/GuestGuard";
import { PATH_AUTH } from "@/routes/paths";
// sections
import { LoginForm } from "@/sections/auth/login";
import { Box, Stack, Typography,Link } from "@mui/material";
// import { styled } from "@mui/material/styles";
import {
  LogoHeader
} from "@/components/BaseComponents";

import NextLink from "next/link";

// import Logo from '../../theme/Logo'
// import { BlockContent } from '@/components/upload'
// import { isBlock } from 'typescript'
// const RootStyle = styled("div")(({ theme }) => ({
//   [theme.breakpoints.up("md")]: {
//     display: "flex",
//   },
// }));

// const ContentStyle = styled("div")(({ theme }) => ({
//   maxWidth: 480,
//   margin: "auto",
//   minHeight: "80vh",
//   display: "flex",
//   justifyContent: "center",
//   flexDirection: "column",
//   padding: theme.spacing(12, 0),
// }));

export default function Login() {
  return (
    <GuestGuard>
      <Page title="Login">
        <LogoHeader />
        <Box mt={"36px"}   display="flex"
          justifyContent="center"
          alignItems="center"

      > 
                
            <Box sx={{ padding: 10,paddingLeft: 12,bgcolor: '#FDFDFD',boxShadow:"0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)" }}>
              <Stack direction="row" alignItems="center"  sx={{ mb: 4 }}>
              <Typography variant="h4" gutterBottom>
                    ĐĂNG NHẬP
                  </Typography>
              </Stack>
              <LoginForm   />
              <Box sx={{ mt: 20 }} 
      > 
          <Typography variant="body2" align="center" sx={{ mt: 4 }}>
          Bạn chưa có tài khoản nhà tuyển dụng?
              </Typography>
              <Typography variant="body2" align="center" sx={{ mt: 4 }}>
         
                <NextLink href={PATH_AUTH.register} passHref>
                  <Link variant="subtitle2">Đăng ký ngay!</Link>
                </NextLink>
              </Typography>
              </Box>
            </Box>
            
            </Box>

      </Page>
    </GuestGuard>
  );
}
