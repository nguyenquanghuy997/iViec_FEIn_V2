import { apiSlice } from '@/redux/api/apiSlice'

export const memberActivitiesSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllMemberLastLogin: builder.query({
      query: (params = {}) => ({
        url: ``,
        method: 'GET',
        params
      }),
    }),
  }),
})

export const { useGetAllMemberLastLoginQuery } = memberActivitiesSlice
