// @mui
import { Button, Popover } from '@mui/material'
import { styled } from '@mui/material/styles'

// config
import { NAVBAR } from '@/config'

export const ListItemStyle = styled(Button, {
  shouldForwardProp: (prop) =>
    prop !== 'activeRoot' &&
    prop !== 'activeSub' &&
    prop !== 'subItem' &&
    prop !== 'open',
})(({ activeRoot, activeSub, subItem, open, theme }) => {
  const activeRootStyle = {
    color: NAVBAR.DASHBOARD_MENU_ITEM_ACTIVE_COLOR,
    backgroundColor: NAVBAR.DASHBOARD_MENU_ITEM_BG_COLOR,
  }

  return {
    ...theme.typography.body2,
    margin: theme.spacing(0, 0.5),
    padding: theme.spacing(1, 2),
    borderRadius: theme.spacing(0.75),
    color: NAVBAR.DASHBOARD_MENU_ITEM_COLOR,
    fontWeight: NAVBAR.MENU_ITEM_WEIGHT_SEMIBOLD,
    textTransform: 'none',
    height: NAVBAR.DASHBOARD_ITEM_HORIZONTAL_MENU_HEIGHT,
    '&:hover': {
      color: NAVBAR.DASHBOARD_MENU_ITEM_ACTIVE_COLOR,
      backgroundColor: NAVBAR.DASHBOARD_MENU_ITEM_BG_COLOR,
    },
    // activeRoot
    ...(activeRoot && {
      ...theme.typography.subtitle2,
      ...activeRootStyle,
      '&:hover': { ...activeRootStyle },
    }),
    // activeSub
    ...(activeSub && {
      ...theme.typography.subtitle2,
      color: theme.palette.text.primary,
    }),
    // subItem
    ...(subItem && {
      width: '100%',
      margin: 0,
      paddingRight: 0,
      paddingLeft: theme.spacing(1),
      justifyContent: 'space-between',
    }),
    // open
    ...(open &&
      !activeRoot && {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.action.hover,
    }),
  }
})

export const PaperStyle = styled(Popover)(({ theme }) => ({
  pointerEvents: 'none',
  '& .MuiPopover-paper': {
    width: 160,
    pointerEvents: 'auto',
    padding: theme.spacing(1),
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    boxShadow: theme.customShadows.dropdown,
  },
}))
