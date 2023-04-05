import { memo, useMemo } from 'react'
import { Stack } from '@mui/material'
import PropTypes from 'prop-types'
import useRole from '@/hooks/useRole'
import { NavListRoot } from './NavList'

const hideScrollbar = {
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  overflowY: 'scroll',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
}

NavVertical.propTypes = {
  navConfig: PropTypes.array,
}

function NavVertical({ navConfig }) {
  const { canAccess } = useRole()
  const navConfigBaseRole = useMemo(() => {
    return navConfig.map(group => {
      return {
        ...group,
        items: group.items.filter(({ permissions = [] }) => canAccess(permissions)),
      };
    });
  }, [navConfig]);

  return (
    <Stack
      direction='row'
      justifyContent='space-between'
      sx={{ bgcolor: 'transparent', borderRadius: 1, px: 0.5 }}
    >
      <Stack direction='row' sx={{ ...hideScrollbar, py: 1 }}>
        {navConfigBaseRole.map((group) => (
          <Stack key={group.subheader} direction='row' flexShrink={0}>
            {group.items.map((list) => (
              <NavListRoot key={list.title + list.path} list={list} />
            ))}
          </Stack>
        ))}
      </Stack>
    </Stack>
  )
}

export default memo(NavVertical)
