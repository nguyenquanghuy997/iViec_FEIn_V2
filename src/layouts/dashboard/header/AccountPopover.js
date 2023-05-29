import { AvatarDS } from "@/components/DesignSystem";
import { Text, View } from "@/components/FlexStyled";
import MenuPopover from "@/components/MenuPopover";
import SvgIcon from "@/components/SvgIcon";
import { DOMAIN_SERVER_API } from "@/config";
import useAuth from "@/hooks/useAuth";
import useIsMountedRef from "@/hooks/useIsMountedRef";
import useLocales from "@/hooks/useLocales";
import { PATH_AUTH } from "@/routes/paths";
import styled from "@emotion/styled";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import { useState } from "react";

// const MENU_OPTIONS = [
//   {
//     label: "Thông tin công ty",
//     linkTo: "/",
//   },
//   {
//     label: "Đổi mật khẩu",
//     linkTo: PATH_AUTH.changePassword,
//   },
// ];

const TypographyStyle = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    color: "black",
  },
}));

export default function AccountPopover() {
  const theme = useTheme();
  const isMountedRef = useIsMountedRef();
  const { translate } = useLocales();
  const { user, company, logout } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = async () => {
    try {
      window.location.href = PATH_AUTH.login;
      await logout();
      if (isMountedRef.current) {
        handleClose();
      }
    } catch (error) {
      enqueueSnackbar("Unable to logout!", { variant: "error" });
    }
  };

  return (
    <>
      <Stack justifyContent="flex-end" sx={{ textAlign: "right" }}>
        <TypographyStyle
          variant="subtitle2"
          noWrap
          sx={{
            fontSize: 13,
            fontWeight: 700,
            color: theme.palette.common.neutral100,
          }}
        >
          {user && `${user?.lastName || ""} ${user?.firstName}`}
        </TypographyStyle>
        <TypographyStyle
          variant="body2"
          sx={{
            fontSize: 12,
            fontWeight: 400,
            color: theme.palette.common.neutral100,
          }}
          noWrap
        >
          {user && user?.email}
        </TypographyStyle>
      </Stack>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            "& .MuiBadge-root": {
              marginRight: 0,
            },
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "10px",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <AvatarDS
          sx={{ borderRadius: "10px", marginRight: 0 }}
          src={`${DOMAIN_SERVER_API}/Image/GetImage?imagePath=${company?.organizationInformation?.avatar}`}
          name={user?.firstName}
        />
      </IconButton>

      <MenuPopover
        disabledArrow
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: "16px",
          mt: 1.5,
          width: undefined,
          "& .MuiMenuItem-root": {
            typography: "body2",
            borderRadius: 0.75,
          },
        }}
      >
        <Stack flexDirection={"row"} alignItems={"center"}>
          <AvatarDS
            sx={{
              width: "60px",
              height: "60px",
              marginRight: "13px",
              borderRadius: "100px",
            }}
            src={`${DOMAIN_SERVER_API}/Image/GetImage?imagePath=${company?.organizationInformation?.avatar}`}
            name={user?.firstName}
          />

          <Box>
            <Typography variant="subtitle2" noWrap>
              {user && `${user?.lastName || ""} ${user?.firstName}`}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
              {user && user?.email}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
              {user?.role}
            </Typography>
          </Box>
        </Stack>

        <View flexRow atCenter mt={13} pv={16} ph={8} onPress={handleLogout}>
          <SvgIcon>
            {
              '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_8477_96487)"> <path d="M7.99992 14.6666C4.31792 14.6666 1.33325 11.682 1.33325 7.99998C1.33325 4.31798 4.31792 1.33331 7.99992 1.33331C9.03502 1.33254 10.056 1.57316 10.9819 2.03608C11.9077 2.49899 12.7128 3.17143 13.3333 3.99998H11.5266C10.7567 3.32115 9.80737 2.87889 8.79239 2.72625C7.77742 2.57361 6.73996 2.71708 5.80451 3.13946C4.86906 3.56183 4.07535 4.24516 3.51863 5.10744C2.96191 5.96972 2.66583 6.97433 2.66592 8.00072C2.666 9.02711 2.96225 10.0317 3.51911 10.8939C4.07598 11.756 4.8698 12.4392 5.80532 12.8615C6.74084 13.2837 7.77833 13.427 8.79327 13.2742C9.80822 13.1214 10.7575 12.6789 11.5273 12H13.3339C12.7134 12.8286 11.9082 13.5011 10.9822 13.964C10.0563 14.427 9.03514 14.6675 7.99992 14.6666ZM12.6666 10.6666V8.66665H7.33325V7.33331H12.6666V5.33331L15.9999 7.99998L12.6666 10.6666Z" fill="#5C6A82"/> </g> <defs> <clipPath id="clip0_8477_96487"> <rect width="16" height="16" fill="white"/> </clipPath> </defs> </svg>'
            }
          </SvgIcon>

          <Text ml={12}>{translate("Đăng xuất") || "Logout"}</Text>
        </View>
      </MenuPopover>
    </>
  );
}
