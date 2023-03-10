import { apiSlice } from '@/redux/api/apiSlice'
import {
  API_GET_LIST_RECRUITMENT,
} from '@/routes/api'
import * as qs from "qs";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ['Recruitment'],
})

export const recruitmentSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getRecruitments: builder.query({
      query: (params) => ({
        url: `${API_GET_LIST_RECRUITMENT}?${qs.stringify(params, {arrayFormat: 'repeat'})}`,
        method: "POST",
      }),
    }),
  }),
})

export const {
  useLazyGetRecruitmentsQuery,
} = recruitmentSlice
