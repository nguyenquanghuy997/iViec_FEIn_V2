import { apiSlice } from "@/redux/api/apiSlice";
import {
  API_GET_ALL_APPLICANTS,
  API_GET_APPLICANT_CURRENT_STAGE_WITH_RECRUITMENT_STATES,
  API_GET_APPLICANT_SKILLS,
  API_GET_APPLICANTS_BY_ID,
  API_GET_COLUMN_APPLICANTS,
  API_GET_FILTER_ALL_APPLICANTS,
  API_GET_LIST_JOB_SOURCE,
  API_GET_RECRUITMENT_PIPELINE_STATES_BY_RECRUITMENT,
  API_GET_RECRUITMENTS_BY_APPLICANT,
  API_GET_USER_FROM_ORGANIZATION,
  API_UPDATE_COLUMN_APPLICANTS,
  API_GET_APPLICANT_RECRUITMENT,
  API_UPDATE_APPLICANT_RECRUITMENT_TO_NEXT_STATE,
  API_GET_RECRUITMENT_BY_ORGANIZATION,
} from "@/routes/api";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["GetColumnApplicants"],
});

const ApplicantFormSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getListApplicants: builder.query({
      query: (params) => ({
        url: API_GET_ALL_APPLICANTS,
        method: "GET",
        params,
      }),
    }),
    getListColumnApplicants: builder.query({
      query: () => ({
        url: API_GET_COLUMN_APPLICANTS,
        method: "GET",
      }),
      providesTags: ["GetColumnApplicants"],
    }),
    updateListColumnApplicants: builder.mutation({
      query: (data) => ({
        url: `${API_UPDATE_COLUMN_APPLICANTS}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      providesTags: ["UpdateColumnApplicants"],
      invalidatesTags: ["GetColumnApplicants"],
    }),
    getApplicantById: builder.query({
      query: ({ applicantId }) => ({
        url: `${API_GET_APPLICANTS_BY_ID}?Id=${applicantId}`,
        method: "GET",
      }),
    }),
    getRecruitmentsByApplicant: builder.query({
      query: (params) => ({
        url: API_GET_RECRUITMENTS_BY_APPLICANT,
        method: 'GET',
        params
      }),
    }),
    getRecruitmentPipelineStatesByRecruitment: builder.query({
      query: (params) => ({
        url: API_GET_RECRUITMENT_PIPELINE_STATES_BY_RECRUITMENT,
        method: "GET",
        params,
      }),
    }),
    getApplicantCurrentStateWithRecruitmentStates: builder.mutation({
      query: (params) => ({
        url: API_GET_APPLICANT_CURRENT_STAGE_WITH_RECRUITMENT_STATES,
        method: "GET",
        params,
      }),
    }),
    getApplicantRecruitment: builder.mutation({
      query: (params) => ({
        url: API_GET_APPLICANT_RECRUITMENT,
        method: "GET",
        params,
      }),
      transformResponse: (response) => {
        response.events = response.events.reverse();
        return response;
      },
    }),
    updateApplicantRecruitmentToNextState: builder.mutation({
      query: (data) => ({
        url: API_UPDATE_APPLICANT_RECRUITMENT_TO_NEXT_STATE,
        method: "PATCH",
        data: data,
      }),
    }),

    // new
    // get all applicant with filter
    getAllFilterApplicant: builder.query({
      query: (data) => ({
        url: API_GET_FILTER_ALL_APPLICANTS,
        method: "POST",
        data,
      }),
    }),
    getRecruitmentByOrganization: builder.query({
      query: (params) => ({
        url: API_GET_RECRUITMENT_BY_ORGANIZATION,
        method: 'GET',
        params
      }),
    }),
    // get all skills
    getSkills: builder.query({
      query: () => ({
        url: API_GET_APPLICANT_SKILLS,
        method: "GET",
      }),
    }),
    // get all job source
    getAllJobSources: builder.query({
      query: () => ({
        url: API_GET_LIST_JOB_SOURCE,
        method: "GET",
      }),
    }),
    // get all user from organization
    getAllUserFromOrganization: builder.query({
      query: (params) => ({
        url: API_GET_USER_FROM_ORGANIZATION,
        method: "GET",
        params,
      }),
      transformResponse: (response) => {
        return response?.items.map(item => ({
          ...item,
          value: item.id,
          name: `${item?.lastName} ${item?.firstName}`,
          label: `${item?.lastName} ${item?.firstName}`,
        }))
      },
    }),
  }),
});

export const {
  useGetListColumnApplicantsQuery,
  useUpdateListColumnApplicantsMutation,
  useGetAllFilterApplicantQuery,
  useGetRecruitmentByOrganizationQuery,
  // skills
  useGetSkillsQuery,
  // job sources
  useGetAllJobSourcesQuery,
  // user from organization
  useGetAllUserFromOrganizationQuery,
  useLazyGetAllUserFromOrganizationQuery,
  useGetApplicantByIdQuery,
  useGetRecruitmentsByApplicantQuery,
  useGetApplicantCurrentStateWithRecruitmentStatesMutation,
  useGetApplicantRecruitmentMutation,
  useUpdateApplicantRecruitmentToNextStateMutation
} = ApplicantFormSlice;

// export const getJobDetail = createAsyncThunk(
//   'jobDetail/getJobDetail',
//   async ({ jobId }) => {
//     const url = `${API_LIST_JOBS}/${jobId}`
//     const response = await _getApi(url)

//     return response?.data?.success ? response.data : []
//   }
// )
