import { useState } from 'react'

// @mui
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

import PropTypes from 'prop-types'

// config
import { HEADER, NAVBAR, DASHBOARD_CONTENT_WIDTH } from '@/config'
// guards
import RoleBasedGuard from '@/guards/RoleBasedGuard'
// hooks
import useCollapseDrawer from '@/hooks/useCollapseDrawer'
import useResponsive from '@/hooks/useResponsive'
import useSettings from '@/hooks/useSettings'

//
import InstructionPopover from '../InstructionPopover'
import NavbarVertical from './navbar/NavbarVertical'

import DashboardAppBar from './header/AppBar'

const MainStyle = styled('main', {
  shouldForwardProp: (prop) => prop !== 'collapseClick',
})(({ collapseClick, theme }) => ({
  flexGrow: 1,
  paddingBottom: 24,
  [theme.breakpoints.up('lg')]: {
    paddingTop: HEADER.DASHBOARD_DESKTOP_HEIGHT,
    width: '100%',
    maxWidth: DASHBOARD_CONTENT_WIDTH,
    margin: '0 auto',
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    transition: theme.transitions.create('margin-left', {
      duration: theme.transitions.duration.shorter,
    }),
    ...(collapseClick && {
      marginLeft: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
    }),
  },
}))

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string), // Example ['Admin', 'Leader']
}

export default function DashboardLayout({ roles, children }) {
  const { collapseClick, isCollapse } = useCollapseDrawer()

  const { themeLayout } = useSettings()

  const isDesktop = useResponsive('up', 'lg')

  const [open, setOpen] = useState(false)

  const verticalLayout = themeLayout === 'vertical'

  if (verticalLayout) {
    return (
      <>
        <DashboardAppBar
          onOpenSidebar={() => setOpen(true)}
          verticalLayout={verticalLayout}
        />

        {/* {isDesktop ? (
          <NavbarHorizontal />
        ) : (
          <NavbarVertical
            isOpenSidebar={open}
            onCloseSidebar={() => setOpen(false)}
          />
        )} */}

          {!isDesktop && verticalLayout && <NavbarVertical
            isOpenSidebar={open}
            onCloseSidebar={() => setOpen(false)}
          />}

<MainStyle collapseClick={collapseClick} style={{ position: 'relative' }}>
        {!roles || !Array.isArray(roles) ? (
          children
        ) : (
          <RoleBasedGuard roles={roles}>{children}</RoleBasedGuard>
        )}

        <InstructionPopover />
      </MainStyle>
      </>
    )
  }

  return (
    <Box
      sx={{
        display: { lg: 'flex' },
        minHeight: { lg: 1 },
      }}
    >
      <DashboardAppBar
        isCollapse={isCollapse}
        onOpenSidebar={() => setOpen(true)}
      />
      <MainStyle collapseClick={collapseClick} style={{ position: 'relative' }}>
        {!roles || !Array.isArray(roles) ? (
          children
        ) : (
          <RoleBasedGuard roles={roles}>{children}</RoleBasedGuard>
        )}

        <InstructionPopover />
      </MainStyle>
    </Box>
  )
}
