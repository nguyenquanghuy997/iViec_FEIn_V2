import { memo } from 'react'

// @mui
import { Stack } from '@mui/material'
import { styled } from '@mui/material/styles'

// components
import { NavVertical } from '@/components/nav-section'

import { headerMenuConfig } from './NavConfig'

const RootStyle = styled('div')(() => ({
    width: '100%',
    padding: 0,
}))

const NavbarMenu = () => {
    return (
        <RootStyle>
            <Stack sx={{ px: 0 }}>
                <NavVertical navConfig={headerMenuConfig} />
            </Stack>
        </RootStyle>
    )
}

export default memo(NavbarMenu)