// // next
// import NextLink from 'next/link'
// import SvgIcon from "@/components/SvgIcon";
// @mui
// import {Box} from '@mui/material'
import GuestGuard from "@/guards/GuestGuard";
import { Box, Stack, Typography } from "@mui/material";
// import { styled } from '@mui/material/styles'

// components
import Page from '@/components/Page'
// layouts
import Layout from '@/layouts'
// routes
// import { PATH_AUTH } from '@/routes/paths'
// sections
import { ResetPasswordForm } from '@/sections/auth/reset-password'
// import Logo from "@/components/Logo";
import {
  LogoHeader
} from "@/components/BaseComponents";
import IconForgotPassword from '@/assets/icon_forgot_password'
// const ContentStyle = styled('div')(({ theme }) => ({
//   maxWidth: 480,
//   margin: 'auto',
//   minHeight: '100vh',
//   display: 'flex',
//   justifyContent: 'center',
//   flexDirection: 'column',
//   padding: theme.spacing(12, 0),
// }))

ResetPassword.getLayout = function getLayout(data, page) {
  return (
    <Layout variant='logoOnly' {...data}>
      {page}
    </Layout>
  )
}

export default function ResetPassword() {
  return (
    <GuestGuard>

   
    <Page title='Reset Password'>
    <Box
  position="fixed"
  top={0}
  height="100px"
  width="100%"
>
<LogoHeader />
</Box>
<Box marginTop="136px">
<Box    display="flex"
          justifyContent="center"
          alignItems="center">
          <Box sx={{ maxHeight: 'calc(100% - 96px)',padding: "36px", bgcolor: '#FDFDFD', boxShadow: "0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)" }}>
     
            <Stack display="flex"
                justifyContent="center"
                alignItems="center" sx={{ mb: 2 }}>
          <IconForgotPassword/>
              <Typography variant="h4" gutterBottom>
                Quên mật khẩu
              </Typography>
            </Stack>
            <ResetPasswordForm />
  
          </Box>

        </Box>
</Box>
   

    </Page>
    </GuestGuard>
  )
}
