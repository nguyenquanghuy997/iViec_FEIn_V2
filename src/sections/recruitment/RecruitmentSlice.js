import { apiSlice } from '@/redux/api/apiSlice'
import {
  API_GET_LIST_RECRUITMENT,
  API_GET_RECRUITMENT_BY_ORGANIZATION,
} from '@/routes/api'
import * as qs from "qs";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ['Recruitment'],
})

export const RecruitmentSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
})

export const {
  useGetListJobsMutation,
  // get list recruitment
  useGetListRecruitmentsQuery,
  useLazyGetListRecruitmentsQuery,
  // get list recruitment by organization
  useGetRecruitmentByOrganizationIdQuery,
  useLazyGetRecruitmentByOrganizationIdQuery,
  useLazyGetRecruitmentsQuery,
} = RecruitmentSlice;
