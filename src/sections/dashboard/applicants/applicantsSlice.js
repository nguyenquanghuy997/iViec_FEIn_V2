import { apiSlice } from '@/redux/api/apiSlice'

export const applicantsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllNewApplicants: builder.query({
      query: (params = {}) => ({
        url: ``,
        method: 'GET',
        params
      }),
    }),
  }),
})

export const { useGetAllNewApplicantsQuery } = applicantsSlice
