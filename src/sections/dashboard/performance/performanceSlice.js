import { apiSlice } from '@/redux/api/apiSlice'

export const performanceSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDataPerformance: builder.query({
      query: (data) => ({
        url: ``,
        method: 'POST',
        data: JSON.stringify(data.body),
      }),
    }),
  }),
})

export const { useGetDataPerformanceQuery } = performanceSlice
