import { apiSlice } from '@/redux/api/apiSlice'
import {
  API_CREATE_RECRUITMENT,
  API_GET_LIST_RECRUITMENT,
  API_GET_RECRUITMENT_BY_ID,
} from '@/routes/api'

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ['Recruitment'],
})

export const RecruitmentSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getRecruitments: builder.query({
      query: (data) => ({
        url: API_GET_LIST_RECRUITMENT,
        method: "POST",
        data
      }),
    }),
    getRecruitmentById: builder.query({
      query: (params) => ({
        url: API_GET_RECRUITMENT_BY_ID,
        method: 'GET',
        params
      }),
    }),
    createRecruitment: builder.mutation({
      query: (data) => ({
        url: API_CREATE_RECRUITMENT,
        method: 'POST',
        data
      }),
    }),
  }),
})

export const {
  useLazyGetRecruitmentsQuery,
  useGetRecruitmentByIdQuery,
  useCreateRecruitmentMutation,
} = RecruitmentSlice
