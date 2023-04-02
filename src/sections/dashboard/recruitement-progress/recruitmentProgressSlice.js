import { apiSlice } from '@/redux/api/apiSlice'
export const recruitmentProgressApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRecruitmentProgress: builder.query({
      query: (queries = {}) => ({
        url: ``,
        method: 'GET',
        params: queries
      }),
    }),
  }),
})

export const { useGetAllRecruitmentProgressQuery } = recruitmentProgressApiSlice
