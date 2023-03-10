import { apiSlice } from '@/redux/api/apiSlice'
import {
  API_LIST_JOBS,
} from '@/routes/api'

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ['Job'],
})

export const recruitmentSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getListJobs: builder.mutation({
      query: (data) => ({
        url: API_LIST_JOBS,
        method: "POST",
        data,
      }),
    }),
  }),
})

export const {
  useGetListJobsMutation,
} = recruitmentSlice
