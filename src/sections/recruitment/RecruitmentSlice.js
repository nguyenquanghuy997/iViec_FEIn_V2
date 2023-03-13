import { apiSlice } from '@/redux/api/apiSlice'
import {
  API_GET_LIST_RECRUITMENT,
  API_GET_RECRUITMENT_BY_ORGANIZATION,
} from '@/routes/api'

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ['Recruitment'],
})

export const recruitmentSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getRecruitments: builder.query({
      query: (data) => ({
        url: API_GET_LIST_RECRUITMENT,
        method: "POST",
        data
      }),
    }),
    getListRecruitments: builder.query({
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
  useLazyGetRecruitmentsQuery,
  // get list recruitment
  useGetListRecruitmentsQuery,
  useLazyGetListRecruitmentsQuery,
  // get list recruitment by organization
  useFetRecruitmentByOrganizationQuery,
  useLazyGetRecruitmentByOrganizationQuery,
} = recruitmentSlice
