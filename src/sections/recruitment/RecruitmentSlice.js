import { apiSlice } from '@/redux/api/apiSlice'
import {
  API_GET_LIST_RECRUITMENT, API_GET_RECRUITMENT_BY_ORGANIZATION,
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
    getRecruitments: builder.query({
      query: (params) => ({
        url: API_GET_LIST_RECRUITMENT,
        method: 'GET',
        params
      }),
    }),
    getRecruitmentByOrganization: builder.query({
      query: (params) => ({
        url: API_GET_RECRUITMENT_BY_ORGANIZATION,
        method: 'GET',
        params
      }),
    }),

  }),
})

export const {
  useGetListJobsMutation,
  // get list recruitment
  useGetRecruitmentsQuery,
  useLazyGetRecruitmentsQuery,
  // get list recruitment by organization
  useFetRecruitmentByOrganizationQuery,
  useLazyGetRecruitmentByOrganizationQuery
} = recruitmentSlice
