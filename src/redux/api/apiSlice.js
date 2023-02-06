import { createApi } from '@reduxjs/toolkit/query/react'

import {
  API_ADMIN_SEARCH_LIST_JOB,
  API_ADMIN_USER_LIST,
  API_ALL_SKILL,
} from '@/routes/api'
import axiosInstance from '@/utils/axios'

const axiosBaseQuery =
  () =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axiosInstance({ url, method, data, params })
      return { data: result.data }
    } catch (axiosError) {
      return {
        error: {
          status: axiosError?.response?.status || axiosError?.code,
          data:
            axiosError.response?.data || axiosError?.data || axiosError.message,
        },
      }
    }
  }

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getAdminUserList: builder.query({
      query: (queries = {}) => ({
        url: `${API_ADMIN_USER_LIST}?${queries}`,
        method: 'POST',
      }),
    }),
    getAdminSearchListJobs: builder.query({
      query: (queries = {}) => ({
        url: `${API_ADMIN_SEARCH_LIST_JOB}?${queries}`,
        method: 'GET',
      }),
    }),
    getListSkills: builder.query({
      query: (queries = {}) => ({
        url: `${API_ALL_SKILL}?${queries}`,
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useGetAdminUserListQuery,
  useGetAdminSearchListJobsQuery,
  useGetListSkillsQuery,
} = apiSlice
