// import { useMemo } from 'react'

// @mui
import { Box } from '@mui/material'

// components
import { RHFSearchTextField } from '@/components/hook-form'
// config
// import { ROLE } from '@/config'
// import useRole from '@/hooks/useRole'
// redux
// import { useGetAdminUserListQuery } from '@/redux/api/apiSlice'

// import { PAGINATION_TYPE } from './config'

export default function NotificationTableToolbar() {
  // const { currentRole } = useRole()
  // const { data: { data: { user: adminUserList = [] } = {} } = {} } =
  //   useGetAdminUserListQuery({ currentRole })

  // const users = useMemo(
  //   () =>
  //     adminUserList
  //       .filter((user) => [ROLE.LEADER, ROLE.MEMBER].includes(user.Role.name))
  //       .map(({ id: userId, name: displayName }) => ({
  //         value: userId,
  //         label: displayName,
  //       })),
  //   [adminUserList]
  // )

  return (
    <Box
      sx={{
        py: 2.5,
        px: 3,
        display: 'grid',
        gridTemplateColumns: {
          xl: 'repeat(4, 250px)',
          md: 'repeat(4, 190px)',
          sm: 'repeat(2, 240px)',
          xs: '1fr',
        },
        gap: {
          xl: 2,
          xs: 1,
        },
      }}
    >
      {/* <RHFBasicSelect
        label='User'
        name='userId'
        options={users}
        hasBlankOption
      /> */}
      {/* <RHFBasicSelect
        label='Number Page'
        name='type'
        options={PAGINATION_TYPE}
        hasBlankOption ={false}
      /> */}
      <RHFSearchTextField name='hashtagName' placeholder={'Search Hashtag '}/>
      {/* <RHFDatePicker name='timeStart' label='Time start Card' /> */}
      {/* <RHFDatePicker name='timeEnd' label='Time end Card' /> */}
    </Box>
  )
}
