// next
import {IconRegisterSuccess} from "@/assets/icon_register_success";
import {CardInfoBody, CardInfoIcon, CardInfoLabel, CardSubInfoLabel,} from "@/components/BaseComponents/CardInfo";
import Iconify from "@/components/Iconify";
// routes
import {BoxInnerStyle} from "@/sections/auth/style";
// sections
// @mui
import {Box, IconButton, Stack} from "@mui/material";
import {useRouter} from "next/router";
import NewInivtePasswordForm from "@/sections/auth/user-invite-active/NewInvitePasswordForm";
import {PATH_AUTH} from "@/routes/paths";

const UserInviteActiveSuccess = ({ token }) => {
  const router = useRouter();
  return (
      <Box sx={{ ...BoxInnerStyle }}>
        <Stack sx={{ position: "absolute", top: 8, left: 8 }}>
          <IconButton edge="end" onClick={() => router.push(PATH_AUTH.login)}>
            <Iconify icon="material-symbols:arrow-back" />
          </IconButton>
        </Stack>
        <Stack justifyContent="center" alignItems="center">
          <CardInfoIcon>
            <IconRegisterSuccess sx={{ mb: 5 }} />
          </CardInfoIcon>
          <CardInfoBody>
            <CardInfoLabel label="Kích hoạt tài khoản thành công" />
            <CardSubInfoLabel sx={{ mt: 1.5 }}>
              Vui lòng thiết lập mật khẩu để bắt đầu trải nghiệm các tính năng tuyển dụng từ iVIEC.
            </CardSubInfoLabel>
            <NewInivtePasswordForm token={token} email='abc' />
          </CardInfoBody>
        </Stack>
      </Box>
  );
};

export default UserInviteActiveSuccess;
