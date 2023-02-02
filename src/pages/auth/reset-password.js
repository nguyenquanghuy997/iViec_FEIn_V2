// next
// import NextLink from 'next/link'

// @mui
import {Box} from '@mui/material'
// import { Button, Container, Typography ,Box} from '@mui/material'
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
    <Page title='Reset Password'>
       <LogoHeader />
       <Box sx={{ padding: "36px", bgcolor: '#FDFDFD', boxShadow: "0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)" }}>
       <ResetPasswordForm />
       </Box>
      {/* <Container>

        <ContentStyle sx={{ textAlign: 'center' }}>
        <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingBottom: 20,
                }}
              >
                <Logo />
                <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
                  IVIEC
                </Typography>
              </div>
          <Typography variant='h3' paragraph>
            QUÊN MẬT KHẨU
          </Typography>

          <Typography sx={{ color: 'text.secondary', mb: 5 }}>
          Nhập email và hệ thống sẽ gửi link tạo mật khẩu mới!
          </Typography>

          <ResetPasswordForm />

          <NextLink href={PATH_AUTH.login} passHref>
            <Button fullWidth size='large' sx={{ mt: 1 }}>
              Quay Lại
            </Button>
          </NextLink>
        </ContentStyle>
      </Container> */}
    </Page>
  )
}
