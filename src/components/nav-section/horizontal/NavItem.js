import { forwardRef } from 'react'

// next
import NextLink from 'next/link'

// @mui
import { Box, Link } from '@mui/material'

import PropTypes from 'prop-types'

//
import Iconify from '@/components/Iconify'
import { ICON } from '@/config'

import { isExternalLink } from '..'
import { ListItemStyle as ListItem } from './style'

export const NavItemRoot = forwardRef(
  ({ item, active, open, onMouseEnter, onMouseLeave }, ref) => {
    const { title, path, icon, children, disabled, roles } = item

    if (children) {
      return (
        <ListItem
          ref={ref}
          open={open}
          activeRoot={active}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          disabled={disabled}
          roles={roles}
        >
          <NavItemContent icon={icon} title={title} children={children} />
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
        <NavItemContent icon={icon} title={title} children={children} />
      </ListItem>
    ) : (
      <NextLink href={path} passHref>
        <ListItem activeRoot={active} disabled={disabled} roles={roles}>
          <NavItemContent icon={icon} title={title} children={children} />
        </ListItem>
      </NextLink>
    )
  }
)

NavItemRoot.propTypes = {
  active: PropTypes.bool,
  open: PropTypes.bool,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  item: PropTypes.shape({
    children: PropTypes.array,
    icon: PropTypes.any,
    path: PropTypes.string,
    title: PropTypes.string,
    disabled: PropTypes.bool,
    roles: PropTypes.arrayOf(PropTypes.string),
  }),
}

export const NavItemSub = forwardRef(
  ({ item, active, open, onMouseEnter, onMouseLeave }, ref) => {
    const { title, path, icon, children, disabled, roles } = item

    if (children) {
      return (
        <ListItem
          ref={ref}
          subItem
          disableRipple
          open={open}
          activeSub={active}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          disabled={disabled}
          roles={roles}
        >
          <NavItemContent
            icon={icon}
            title={title}
            children={children}
            subItem
          />
        </ListItem>
      )
    }

    return isExternalLink(path) ? (
      <ListItem
        subItem
        href={path}
        disableRipple
        rel='noopener'
        target='_blank'
        component={Link}
        disabled={disabled}
        roles={roles}
      >
        <NavItemContent icon={icon} title={title} children={children} subItem />
      </ListItem>
    ) : (
      <NextLink href={path} passHref>
        <ListItem
          disableRipple
          activeSub={active}
          subItem
          disabled={disabled}
          roles={roles}
        >
          <NavItemContent
            icon={icon}
            title={title}
            children={children}
            subItem
          />
        </ListItem>
      </NextLink>
    )
  }
)

NavItemSub.propTypes = {
  active: PropTypes.bool,
  open: PropTypes.bool,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  item: PropTypes.shape({
    children: PropTypes.array,
    icon: PropTypes.any,
    path: PropTypes.string,
    title: PropTypes.string,
    disabled: PropTypes.bool,
    roles: PropTypes.arrayOf(PropTypes.string),
  }),
}

NavItemContent.propTypes = {
  children: PropTypes.array,
  icon: PropTypes.any,
  subItem: PropTypes.bool,
  title: PropTypes.string,
}

export default function NavItemContent({ icon, title, children, subItem }) {
  return (
    <>
      {icon && (
        <Box
          component='span'
          sx={{
            width: 16,
            height: 16,
            '& svg': { width: '100%', height: '100%' },
          }}
        >
          {icon}
        </Box>
      )}
      {title}

      {children && (
        <Iconify
          icon={subItem ? 'eva:chevron-right-fill' : 'eva:chevron-down-fill'}
          sx={{
            ml: 0.5,
            width: ICON.NAVBAR_ITEM_HORIZONTAL,
            height: ICON.NAVBAR_ITEM_HORIZONTAL,
          }}
        />
      )}
    </>
  )
}
