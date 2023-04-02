import { apiSlice } from '@/redux/api/apiSlice'

export const activeJobSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobsByStatus: builder.query({
      query: (params = {}) => ({
        url: ``,
        method: 'GET',
        params
      }),
    }),
  }),
})

export const { useGetJobsByStatusQuery } = activeJobSlice
