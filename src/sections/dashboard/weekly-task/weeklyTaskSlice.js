import { apiSlice } from '@/redux/api/apiSlice'

export const weeklyTaskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllWeeklyTasks: builder.mutation({
      query: (payload) => ({
        url: ``,
        method: 'POST',
        data: payload?.body,
      }),
    }),
    updateWeeklyTask: builder.mutation({
      query: (payload) => ({
        url: ``,
        method: 'PATCH',
        data: payload?.body,
      }),
    }),
    createWeeklyTask: builder.mutation({
      query: (payload) => ({
        url: ``,
        method: 'POST',
        data: payload?.body,
      }),
    }),
    getTaskUserList: builder.query({
      query: (queries = {}) => ({
        url: ``,
        method: 'GET',
        params: queries
      }),
    }),
  }),
})

export const {
  useGetAllWeeklyTasksMutation,
  useUpdateWeeklyTaskMutation,
  useCreateWeeklyTaskMutation,
  useGetTaskUserListQuery,
} = weeklyTaskApiSlice
