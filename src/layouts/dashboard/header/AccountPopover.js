import { AvatarDS } from "@/components/DesignSystem";
import MenuPopover from "@/components/MenuPopover";
// components
import {DOMAIN_SERVER_API} from "@/config";
// hooks
import useAuth from "@/hooks/useAuth";
import useIsMountedRef from "@/hooks/useIsMountedRef";
import useLocales from "@/hooks/useLocales";
import {PATH_DASHBOARD} from "@/routes/paths";
import styled from "@emotion/styled";
// @mui
import {
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
import {useSnackbar} from "notistack";
import {useState} from "react";

const TypographyStyle = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    color: 'black'
  },
}));

export default function AccountPopover() {
  const { translate } = useLocales();
  const { logout, user } = useAuth();

  const MENU_OPTIONS = [
    {
      label: "home",
      linkTo: "/",
    },
    {
      label: "setting",
      linkTo: PATH_DASHBOARD.profile.root + user?.id,
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
          {user && `${user?.lastName||''} ${user?.firstName}`}
        </TypographyStyle>
        <TypographyStyle variant="body2" sx={{ fontSize: 12, fontWeight: 400, color: '#E7E9ED' }} noWrap>
          {user && user?.email}
        </TypographyStyle>
      </Stack>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '& .MuiBadge-root':{
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
        {Object.keys(user.linkAvatar).length === 0 ? (
          <AvatarDS
            sx={{ borderRadius: '10px',  marginRight:0 }}
            src={`${DOMAIN_SERVER_API}/${user?.linkAvatar}`}
            name={user?.firstName}
          />
        ) : (
          <AvatarDS
            sx={{ borderRadius: '10px', marginRight:0 }}
            name={user?.firstName}
            alt={user?.firstName}
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
            {user && `${user?.lastName || ""} ${user?.firstName}`}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {user && user?.email}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {user?.role}
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
