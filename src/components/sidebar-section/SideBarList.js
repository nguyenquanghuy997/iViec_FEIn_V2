import { useState } from 'react'

import { useRouter } from 'next/router'

// @mui
import { Collapse, List } from '@mui/material'

import PropTypes from 'prop-types'

import { getActive } from '@/components/nav-section'
//
import { SideBarItemRoot, SideBarItemSub } from './SideBarItem'

SideBarListRoot.propTypes = {
  isCollapse: PropTypes.bool,
  list: PropTypes.object,
}

export function SideBarListRoot({ list, isCollapse }) {
  const { pathname, asPath } = useRouter()

  const active = getActive(list.path, pathname, asPath)

  const [open, setOpen] = useState(active)

  const hasChildren = list.children

  if (hasChildren) {
    return (
      <>
        <SideBarItemRoot
          item={list}
          isCollapse={isCollapse}
          active={active}
          open={open}
          onOpen={() => setOpen(!open)}
        />

        {!isCollapse && (
          <Collapse in={open} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              {(list.children || []).map((item) => (
                <SideBarListSub key={item.title + item.path} list={item} />
              ))}
            </List>
          </Collapse>
        )}
      </>
    )
  }

  return <SideBarItemRoot item={list} active={active} isCollapse={isCollapse} />
}

SideBarListSub.propTypes = {
  list: PropTypes.object,
}

function SideBarListSub({ list }) {
  const { pathname, asPath } = useRouter()

  const active = getActive(list.path, pathname, asPath)

  const [open, setOpen] = useState(active)

  const hasChildren = list.children

  if (hasChildren) {
    return (
      <>
        <SideBarItemSub
          item={list}
          onOpen={() => setOpen(!open)}
          open={open}
          active={active}
        />

        <Collapse in={open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding sx={{ pl: 3 }}>
            {(list.children || []).map((item) => (
              <SideBarItemSub
                key={item.title + item.path}
                item={item}
                active={getActive(item.path, pathname, asPath)}
              />
            ))}
          </List>
        </Collapse>
      </>
    )
  }

  return <SideBarItemSub item={list} active={active} />
}
