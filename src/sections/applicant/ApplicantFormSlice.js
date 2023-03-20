import {apiSlice} from "@/redux/api/apiSlice";
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
  API_UPDATE_APPLICANT,
  API_GET_APPLICANT_BY_PIPELINESTETEID,
  API_GET_LIST_RECRUITMENT,
  API_GET_ADD_APPLICANT_TO_RECRUITMENT
} from "@/routes/api";
import {convertArrayToObject} from '@/utils/help'
const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["GetColumnApplicants", "GetListsApplicants"],
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
    updateApplicant: builder.mutation({
      query: (data) => ({
        url: `${API_UPDATE_APPLICANT}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      providesTags: ["UpdateColumnApplicants"],
      invalidatesTags: ["GetColumnApplicants"],
    }),
    getApplicantById: builder.query({
      query: ({applicantId}) => ({
        url: `${API_GET_APPLICANTS_BY_ID}?Id=${applicantId}`,
        method: "GET",
      }),
    }),
    getRecruitmentsByApplicant: builder.query({
      query: (params) => ({
        url: API_GET_RECRUITMENTS_BY_APPLICANT,
        method: "GET",
        params,
      }),
    }),
    getRecruitmentPipelineStatesByRecruitment1: builder.query({
      query: (id) => ({
        url: `${API_GET_RECRUITMENT_PIPELINE_STATES_BY_RECRUITMENT}?RecruitmentId=${id}`,
        method: "GET",
      }),
    }),
    getRecruitments: builder.query({
      query: (data) => ({
        url: API_GET_LIST_RECRUITMENT,
        method: "POST",
        data
      }),
    }),
    getRecruitmentPipelineStatesByRecruitment2: builder.query({
      query: (params) => ({
        url: API_GET_RECRUITMENT_PIPELINE_STATES_BY_RECRUITMENT,
        method: "GET",
        params,
      }),
      // transformResponse: (response) => {
      //   const presponseModified = convertArrayToObject(response.items, 'id');
      //   return presponseModified;
      // },
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
    getApplicantByPipelineStateId: builder.query({
      query: (PipelineStateId) => ({
        url: `${API_GET_APPLICANT_BY_PIPELINESTETEID}?PipelineStateId=${PipelineStateId}`,
        method: "GET",
      }),
    }),
    getRecruitmentPipelineStatesByRecruitment: builder.query({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        console.log('data',_arg)
        const listPipeline = await fetchWithBQ({
          url: API_GET_RECRUITMENT_PIPELINE_STATES_BY_RECRUITMENT,
          method: "GET",
          params:{"RecruitmentId":_arg},
        })

        let data=await Promise.all(listPipeline.data.items.map(async(item)=>{
             const listTask = await fetchWithBQ({
            url: `${API_GET_APPLICANT_BY_PIPELINESTETEID}?PipelineStateId=${item.id}`,
            method: "GET",
          })
          
          let newItem ={
            id:item.id,
            pipelineStateType:item.pipelineStateType,
            items:listTask.data.items
          }
          return newItem
        })
        )
        const presponseModified = convertArrayToObject(data, 'id');

        return {data:presponseModified}
      },
    }),
    updateApplicantRecruitmentToNextState: builder.mutation({
      query: (data) => ({
        url: API_UPDATE_APPLICANT_RECRUITMENT_TO_NEXT_STATE,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["GetListsApplicants"],
    }),
    addApplicantRecruitment: builder.mutation({
      query: (data) => ({
        url: API_GET_ADD_APPLICANT_TO_RECRUITMENT,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["GetListsApplicants"],
    }),
    // new
    // get all applicant with filter
    getAllFilterApplicant: builder.query({
      query: (data) => ({
        url: API_GET_FILTER_ALL_APPLICANTS,
        method: "POST",
        data,
      }),
      providesTags: ["GetListsApplicants"],
    }),
    getRecruitmentByOrganizationId: builder.query({
      query: (params) => ({
        url: API_GET_RECRUITMENT_BY_ORGANIZATION,
        method: "GET",
        params,
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
        return response?.items.map((item) => ({
          ...item,
          value: item.id,
          name: item?.lastName,
          label: item?.lastName,
        }));
      },
    }),
  }),
});

export const {
  useGetRecruitmentsQuery,
  useGetListApplicantsQuery,
  useGetRecruitmentPipelineStatesByRecruitment1Query,
  useGetRecruitmentPipelineStatesByRecruitment2Query,
  useGetListColumnApplicantsQuery,
  useUpdateListColumnApplicantsMutation,
  useGetAllFilterApplicantQuery,
  useLazyGetAllFilterApplicantQuery,
  useGetRecruitmentByOrganizationIdQuery,
  // skills
  useGetSkillsQuery,
  // job sources
  useGetAllJobSourcesQuery,
  // user from organization
  useGetAllUserFromOrganizationQuery,
  useUpdateApplicantMutation,
  useLazyGetAllUserFromOrganizationQuery,
  useGetApplicantByIdQuery,
  useGetRecruitmentsByApplicantQuery,
  useGetApplicantCurrentStateWithRecruitmentStatesMutation,
  useGetApplicantRecruitmentMutation,
  useUpdateApplicantRecruitmentToNextStateMutation,
  useAddApplicantRecruitmentMutation,
  useGetRecruitmentPipelineStatesByRecruitmentQuery,
  useGetApplicantByPipelineStateIdQuery,
} = ApplicantFormSlice;
