import { apiSlice } from '@/redux/api/apiSlice'
import {
  API_CREATE_RECRUITMENT,
  API_GET_LIST_RECRUITMENT, API_GET_RECRUITMENT_BY_ID,
  API_GET_RECRUITMENT_BY_ORGANIZATION,
} from '@/routes/api'
import * as qs from "qs";

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
      query: (params) => ({
        url: `${API_GET_LIST_RECRUITMENT}?${qs.stringify(params, {arrayFormat: 'repeat'})}`,
        method: "POST",
      }),
    }),
    getListRecruitments: builder.query({
      query: (params) => ({
        url: API_GET_LIST_RECRUITMENT,
        method: 'GET',
        params
      }),
    }),
    getRecruitmentByOrganizationId: builder.query({
      query: (params) => ({
        url: API_GET_RECRUITMENT_BY_ORGANIZATION,
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
