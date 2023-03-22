import { apiSlice } from '@/redux/api/apiSlice'
import {
  API_CREATE_RECRUITMENT,
  API_GET_LIST_RECRUITMENT,
  API_GET_RECRUITMENT_BY_ID,
  API_UPDATE_RECRUITMENT_DRAFT,
  API_UPDATE_RECRUITMENT_OFFICIAL,
  API_CREATE_APPLICANT_RECRUITMENT,
} from '@/routes/api'

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ['RECRUITMENT'],
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
      providesTags: (result, error, id) => [{ type: 'RECRUITMENT', id }],
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
  }),
})

export const {
  useGetRecruitmentByIdQuery,
  useCreateApplicantRecruitmentMutation,
  useLazyGetRecruitmentsQuery,
  useCreateRecruitmentMutation,
  useUpdateRecruitmentOfficialMutation,
  useUpdateRecruitmentDraftMutation,
} = RecruitmentSlice;
