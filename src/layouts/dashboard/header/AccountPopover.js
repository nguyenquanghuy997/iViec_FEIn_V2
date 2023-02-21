import MenuPopover from "@/components/MenuPopover";
// components
import { DOMAIN_SERVER_API } from "@/config";
// hooks
import useAuth from "@/hooks/useAuth";
import useIsMountedRef from "@/hooks/useIsMountedRef";
import useLocales from "@/hooks/useLocales";
import { useSelector } from "@/redux/store";
import { PATH_DASHBOARD } from "@/routes/paths";
import { useLazyGetCurrentUserQuery } from "@/sections/auth/authSlice";
import styled from "@emotion/styled";
// @mui
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
// next
import NextLink from "next/link";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

const TypographyStyle = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    color: 'black'
  },
}));

export default function AccountPopover() {
  const { translate } = useLocales();
  const { logout } = useAuth();

  const [getCurrentUser, { data: currentUser }] = useLazyGetCurrentUserQuery();

  useEffect(() => {
    getCurrentUser().unwrap();
  }, [])

  const MENU_OPTIONS = [
    {
      label: "home",
      linkTo: "/",
    },
    {
      label: "setting",
      linkTo: PATH_DASHBOARD.profile.root + currentUser?.id,
    },
  ];
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(null);
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };
  const avatar = useSelector((state) => state.avatar);
  const handleLogout = async () => {
    try {
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
      <Stack justifyContent="flex-end" sx={{ textAlign: 'right' }}>
        <TypographyStyle variant="subtitle2" noWrap sx={{ fontSize: 13, fontWeight: 700, color: '#E7E9ED' }}>
          {currentUser && `${currentUser?.lastName} ${currentUser?.firstName}`}
        </TypographyStyle>
        <TypographyStyle variant="body2" sx={{ fontSize: 12, fontWeight: 400, color: '#E7E9ED' }} noWrap>
          {currentUser && currentUser?.email}
        </TypographyStyle>
      </Stack>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
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
        {Object.keys(avatar.avatar).length === 0 ? (
          <Avatar
            sx={{ borderRadius: '10px' }}
            src={`${DOMAIN_SERVER_API}/${currentUser?.linkAvatar}`}
            alt={currentUser?.displayName}
          />
        ) : (
          <Avatar
            sx={{ borderRadius: '10px' }}
            src={`${DOMAIN_SERVER_API}/${avatar?.avatar}`}
            alt={currentUser?.displayName}
          />
        )}
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          "& .MuiMenuItem-root": {
            typography: "body2",
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {currentUser && `${currentUser?.lastName} ${currentUser?.firstName}`}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {currentUser && currentUser?.email}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {currentUser?.role}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <NextLink key={option.label} href={option.linkTo} passHref>
              <MenuItem key={option.label} onClick={handleClose}>
                {translate(option.label) || option.label}
              </MenuItem>
            </NextLink>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          {translate("logout") || "Logout"}
        </MenuItem>
      </MenuPopover>
    </>
  );
}
