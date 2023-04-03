import {IconRegisterSuccess} from "@/assets/icon_register_success";
import {CardInfoBody, CardInfoIcon, CardInfoLabel, CardSubInfoLabel,} from "@/components/BaseComponents/CardInfo";
import {PATH_DASHBOARD} from "@/routes/paths";
import {STYLE_CONSTANT} from "@/sections/auth/register/constants";
import {BoxInnerStyle} from "@/sections/auth/style";
import {LoadingButton} from "@mui/lab";
import {Box, Stack} from "@mui/material";
import {useRouter} from "next/router";

const NewPasswordSuccess = () => {
  const router = useRouter();
  const handleGoToPageByUrl = (url = "") => {
    if (!url) return;
    return router.push(url);
  };
  return (
      <Box sx={{ ...BoxInnerStyle }}>
        <Stack justifyContent="center" alignItems="center">
          {/* Image */}
          <CardInfoIcon>
            <IconRegisterSuccess sx={{ mb: 5 }} />
          </CardInfoIcon>
          {/* Content */}
          <CardInfoBody>
            <CardInfoLabel label="Đổi mật khẩu thành công" />
            <CardSubInfoLabel sx={{ mt: 1.5 }}>
              Cảm ơn bạn đã đồng hành cùng iVIEC Bussiness!
            </CardSubInfoLabel>
            <Stack sx={{ mt: 4.5, width: STYLE_CONSTANT.WIDTH_FULL }}>
              <LoadingButton
                  fullWidth
                  size="large"
                  variant="contained"
                  onClick={() => handleGoToPageByUrl(PATH_DASHBOARD.root)}
                  sx={{
                    backgroundColor: STYLE_CONSTANT.COLOR_PRIMARY,
                    textTransform: "none",
                    borderRadius: 0.75,
                    fontWeight: STYLE_CONSTANT.FONT_SEMIBOLD,
                  }}
              >
                Trở về trang chủ
              </LoadingButton>
            </Stack>
          </CardInfoBody>
        </Stack>
      </Box>
  );
};

export default NewPasswordSuccess;
