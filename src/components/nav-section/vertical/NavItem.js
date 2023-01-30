// next
import NextLink from 'next/link'

// @mui
import {
  Badge,
  Box,
  Link,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material'

import PropTypes from 'prop-types'

//
import Iconify from '@/components/Iconify'
// hooks
import useLocales from '@/hooks/useLocales'
import useNotification from '@/hooks/useNotification'

import { isExternalLink } from '..'
import {
  ListItemStyle as ListItem,
  ListItemIconStyle,
  ListItemTextStyle,
} from './style'

NavItemRoot.propTypes = {
  active: PropTypes.bool,
  open: PropTypes.bool,
  isCollapse: PropTypes.bool,
  onOpen: PropTypes.func,
  item: PropTypes.shape({
    children: PropTypes.array,
    icon: PropTypes.any,
    info: PropTypes.any,
    path: PropTypes.string,
    title: PropTypes.string,
    disabled: PropTypes.bool,
    caption: PropTypes.string,
    roles: PropTypes.arrayOf(PropTypes.string),
  }),
}

export function NavItemRoot({
  item,
  isCollapse,
  open = false,
  active,
  onOpen,
}) {
  const { translate } = useLocales()
  const { title, path, icon, info, children, disabled, caption, roles } = item

  const { totalUnreadNoti } = useNotification()

  const renderContent = (
    <>
      {icon &&
        (title.includes('notification') ? (
          <Badge badgeContent={totalUnreadNoti} color='error' sx={{ mr: 2.25 }}>
            <Iconify icon='eva:bell-fill' width={20} height={20} />
          </Badge>
        ) : (
          <ListItemIconStyle>{icon}</ListItemIconStyle>
        ))}
      <ListItemTextStyle
        disableTypography
        primary={translate(title)}
        secondary={
          <Tooltip title={translate(caption) || ''} arrow>
            <Typography
              noWrap
              variant='caption'
              component='div'
              sx={{ textTransform: 'initial', color: 'text.secondary' }}
            >
              {translate(caption)}
            </Typography>
          </Tooltip>
        }
        isCollapse={isCollapse}
      />
      {!isCollapse && (
        <>
          {info && info}
          {children && <ArrowIcon open={open} />}
        </>
      )}
    </>
  )

  if (children) {
    return (
      <ListItem
        onClick={onOpen}
        activeRoot={active}
        disabled={disabled}
        roles={roles}
      >
        {renderContent}
      </ListItem>
    )
  }

  return isExternalLink(path) ? (
    <ListItem
      component={Link}
      href={path}
      target='_blank'
      rel='noopener'
      disabled={disabled}
      roles={roles}
    >
      {renderContent}
    </ListItem>
  ) : (
    <NextLink href={path} passHref>
      <ListItem activeRoot={active} disabled={disabled} roles={roles}>
        {renderContent}
      </ListItem>
    </NextLink>
  )
}

NavItemSub.propTypes = {
  active: PropTypes.bool,
  open: PropTypes.bool,
  onOpen: PropTypes.func,
  item: PropTypes.shape({
    children: PropTypes.array,
    info: PropTypes.any,
    path: PropTypes.string,
    title: PropTypes.string,
    disabled: PropTypes.bool,
    caption: PropTypes.bool,
    roles: PropTypes.arrayOf(PropTypes.string),
  }),
}

export function NavItemSub({ item, open = false, active = false, onOpen }) {
  const { translate } = useLocales()
  const { title, path, info, children, disabled, caption, roles } = item

  const renderContent = (
    <>
      <DotIcon active={active} />
      <ListItemText
        disableTypography
        primary={translate(title)}
        secondary={
          <Tooltip title={translate(caption) || ''} arrow>
            <Typography
              noWrap
              variant='caption'
              component='div'
              sx={{ textTransform: 'initial', color: 'text.secondary' }}
            >
              {translate(caption)}
            </Typography>
          </Tooltip>
        }
      />
      {info && info}
      {children && <ArrowIcon open={open} />}
    </>
  )

  if (children) {
    return (
      <ListItem
        onClick={onOpen}
        activeSub={active}
        subItem
        disabled={disabled}
        roles={roles}
      >
        {renderContent}
      </ListItem>
    )
  }

  return isExternalLink(path) ? (
    <ListItem
      component={Link}
      href={path}
      target='_blank'
      rel='noopener'
      subItem
      disabled={disabled}
      roles={roles}
    >
      {renderContent}
    </ListItem>
  ) : (
    <NextLink href={path} passHref>
      <ListItem activeSub={active} subItem disabled={disabled} roles={roles}>
        {renderContent}
      </ListItem>
    </NextLink>
  )
}

DotIcon.propTypes = {
  active: PropTypes.bool,
}

export function DotIcon({ active }) {
  return (
    <ListItemIconStyle>
      <Box
        component='span'
        sx={{
          width: 4,
          height: 4,
          borderRadius: '50%',
          bgcolor: 'text.disabled',
          transition: (theme) =>
            theme.transitions.create('transform', {
              duration: theme.transitions.duration.shorter,
            }),
          ...(active && {
            transform: 'scale(2)',
            bgcolor: 'primary.main',
          }),
        }}
      />
    </ListItemIconStyle>
  )
}

ArrowIcon.propTypes = {
  open: PropTypes.bool,
}

export function ArrowIcon({ open }) {
  return (
    <Iconify
      icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
      sx={{ width: 16, height: 16, ml: 1 }}
    />
  )
}
