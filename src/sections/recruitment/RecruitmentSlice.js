import { apiSlice } from '@/redux/api/apiSlice'
import {
  API_CREATE_RECRUITMENT,
  API_GET_LIST_RECRUITMENT,
  API_GET_RECRUITMENT_BY_ID,
  API_UPDATE_RECRUITMENT_DRAFT,
  API_UPDATE_RECRUITMENT_OFFICIAL,
  API_CREATE_APPLICANT_RECRUITMENT, API_CLOSE_RECRUITMENT, API_REMOVE_RECRUITMENT, API_GET_RECRUITMENT_BY_SLUG, API_GET_COLUMN_RECRUITMENT, API_UPDATE_COLUMN_RECRUITMENT,
} from '@/routes/api'

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ['RECRUITMENT', 'GetColumn'],
})

export const RecruitmentSlice = apiWithTag.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getRecruitments: builder.query({
      query: (data) => ({
        url: API_GET_LIST_RECRUITMENT,
        method: "POST",
        data
      }),
      providesTags: [{ type: 'RECRUITMENT', id: 'LIST' }]
    }),
    getRecruitmentById: builder.query({
      query: (params) => ({
        url: API_GET_RECRUITMENT_BY_ID,
        method: 'GET',
        params
      }),
      providesTags: (result, error, id) => [{ type: 'RECRUITMENT', id }],
    }),
    // Lấy việc làm theo slug
    getRecruitmentBySlug: builder.query({
      query: (slug) => ({
        url: API_GET_RECRUITMENT_BY_SLUG + '?Slug=' + slug,
        method: 'GET',
      }),
      providesTags: [{ type: 'RECRUITMENT', id: 'SLUG' }],
    }),

    createRecruitment: builder.mutation({
      query: (data) => ({
        url: API_CREATE_RECRUITMENT,
        method: 'POST',
        data
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'RECRUITMENT', id: arg.recruitmentId }]
    }),
    createApplicantRecruitment: builder.mutation({
      query: (data) => ({
        url: API_CREATE_APPLICANT_RECRUITMENT,
        method: 'POST',
        data
      }),
    }),
    updateRecruitmentOfficial: builder.mutation({
      query: (data) => ({
        url: `${API_UPDATE_RECRUITMENT_OFFICIAL}/${data?.id}`,
        method: 'PATCH',
        data
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'RECRUITMENT', id: arg.id }]
    }),
    updateRecruitmentDraft: builder.mutation({
      query: (data) => ({
        url: `${API_UPDATE_RECRUITMENT_DRAFT}/${data?.id}`,
        method: 'PATCH',
        data
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'RECRUITMENT', id: arg.id }]
    }),
    // đóng tin
    closeRecruitment: builder.mutation({
      query: (data) => ({
        url: API_CLOSE_RECRUITMENT,
        method: 'PATCH',
        data
      }),
      invalidatesTags: [{ type: 'RECRUITMENT', id: 'LIST' }]
    }),
    // xóa tin
    deleteRecruitment: builder.mutation({
      query: (data) => ({
        url: API_REMOVE_RECRUITMENT,
        method: 'DELETE',
        data
      }),
      invalidatesTags: [{ type: 'RECRUITMENT', id: 'LIST' }]
    }),
    //settings
    getListColumns: builder.query({
      query: () => ({
        url: API_GET_COLUMN_RECRUITMENT,
        method: "GET",
      }),
      providesTags: ["GetColumn"],
    }),
    updateListColumns: builder.mutation({
      query: (data) => ({
        url: `${API_UPDATE_COLUMN_RECRUITMENT}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: ["GetColumn"],
    }),
  }),
})

export const {
  useGetRecruitmentByIdQuery,
  useGetRecruitmentBySlugQuery,
  useCreateApplicantRecruitmentMutation,
  useLazyGetRecruitmentsQuery,
  useGetRecruitmentsQuery,
  useCreateRecruitmentMutation,
  useUpdateRecruitmentOfficialMutation,
  useUpdateRecruitmentDraftMutation,
  useCloseRecruitmentMutation,
  useDeleteRecruitmentMutation,
  useGetListColumnsQuery,
  useUpdateListColumnsMutation
} = RecruitmentSlice;
