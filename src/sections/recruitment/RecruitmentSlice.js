import { apiSlice } from '@/redux/api/apiSlice'
import {
  API_CREATE_RECRUITMENT,
  API_GET_LIST_RECRUITMENT, API_GET_RECRUITMENT_BY_ID,
} from '@/routes/api'

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ['Recruitment'],
})

export const RecruitmentSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getRecruitmentById: builder.query({
      query: (params) => ({
        url: API_GET_RECRUITMENT_BY_ID,
        method: "GET",
        params
      }),
    }),
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
    createRecruitment: builder.mutation({
      query: (data) => ({
        url: API_CREATE_RECRUITMENT,
        method: 'POST',
        data
      }),
    }),
    updateRecruitment: builder.mutation({
      query: (data) => ({
        url: API_CREATE_RECRUITMENT,
        method: 'POST',
        data
      }),
    }),
  }),
})

export const {
  useGetRecruitmentByIdQuery,
  useGetListJobsMutation,
  // get list recruitment
  useGetListRecruitmentsQuery,
  useLazyGetListRecruitmentsQuery,
  // get list recruitment by organization
  useGetRecruitmentByOrganizationIdQuery,
  useLazyGetRecruitmentByOrganizationIdQuery,
  useLazyGetRecruitmentsQuery,
  useCreateRecruitmentMutation,
} = RecruitmentSlice;
