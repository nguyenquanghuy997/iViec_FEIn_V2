import { axiosBaseQuery } from "@/redux/api/apiSlice";
import {
  API_ADD_APPLICANT_REVIEW,
  API_APPLICANT_REVIEW_FORM,
  API_CHECK_REVIEW,
  API_DELETE_APPLICANT,
  API_GET_ADD_APPLICANT_TO_RECRUITMENT,
  API_GET_ALL_APPLICANTS,
  API_GET_APPLICANTS_BY_ID,
  API_GET_APPLICANT_BY_PIPELINESTETEID,
  API_GET_APPLICANT_CURRENT_STAGE_WITH_RECRUITMENT_STATES,
  API_GET_APPLICANT_RECRUITMENT,
  API_GET_APPLICANT_SKILLS,
  API_GET_COLUMN_APPLICANTS,
  API_GET_FILTER_ALL_APPLICANTS,
  API_GET_LIST_JOB_SOURCE,
  API_GET_LIST_RECRUITMENT,
  API_GET_RECRUITMENTS_BY_APPLICANT,
  API_GET_RECRUITMENT_BY_ORGANIZATION,
  API_GET_RECRUITMENT_PIPELINE_STATES_BY_RECRUITMENT,
  API_GET_USER_FROM_ORGANIZATION,
  API_UPDATE_APPLICANT,
  API_UPDATE_APPLICANT_RECRUITMENT_TO_NEXT_STATE,
  API_UPDATE_COLUMN_APPLICANTS,
} from "@/routes/api";
import { convertArrayToObject, toRequestFilterData } from "@/utils/helper";
import { createApi } from "@reduxjs/toolkit/query/react";
import qs from "query-string";

export const ApplicantFormSlice = createApi({
  reducerPath: "applicantApi",
  tagTypes: ["APPLICANT"],
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getListApplicants: builder.query({
      query: (params) => ({
        url: API_GET_ALL_APPLICANTS,
        method: "GET",
        params,
      }),
      providesTags: [{ type: "APPLICANT", id: "LIST" }],
    }),
    getListColumnApplicants: builder.query({
      query: () => ({
        url: API_GET_COLUMN_APPLICANTS,
        method: "GET",
      }),
      providesTags: [{ type: "APPLICANT", id: "LIST_COLUMN" }],
    }),
    updateListColumnApplicants: builder.mutation({
      query: (data = {}) => {
        let { id, ...restData } = data;
        return {
          url: `${API_UPDATE_COLUMN_APPLICANTS}/${id}`,
          method: "PATCH",
          data: restData,
        };
      },
      invalidatesTags: [{ type: "APPLICANT", id: "LIST_COLUMN" }],
    }),
    updateApplicant: builder.mutation({
      query: (data) => ({
        url: `${API_UPDATE_APPLICANT}/${data.id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [
        { type: "APPLICANT", id: "LIST_FILTER" },
        { type: "APPLICANT", id: "ID" },
      ],
    }),
    getApplicantById: builder.query({
      query: ({ applicantId }) => ({
        url: `${API_GET_APPLICANTS_BY_ID}?Id=${applicantId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 1,
      providesTags: [{ type: "APPLICANT", id: "ID" }],
    }),
    getRecruitmentsByApplicant: builder.query({
      query: (params) => ({
        url: API_GET_RECRUITMENTS_BY_APPLICANT,
        method: "GET",
        params,
      }),
      providesTags: [{ type: "APPLICANT", id: "RECRUITMENT_APPLICANT" }],
    }),
    getRecruitments: builder.query({
      query: (data) => ({
        url: API_GET_LIST_RECRUITMENT,
        method: "POST",
        data,
      }),
    }),
    getRecruitmentPipelineStatesByRecruitments: builder.query({
      query: (params) => ({
        url: API_GET_RECRUITMENT_PIPELINE_STATES_BY_RECRUITMENT,
        method: "GET",
        params,
      }),
      providesTags: [{ type: "APPLICANT", id: "RECRUITMENT_PIPELINE" }],
    }),
    getApplicantCurrentStateWithRecruitmentStates: builder.query({
      query: (params) => ({
        url: API_GET_APPLICANT_CURRENT_STAGE_WITH_RECRUITMENT_STATES,
        method: "GET",
        params,
      }),
      providesTags: [
        { type: "APPLICANT", id: "APPLICANT_STATE_WITH_RECRUITMENT_STATE" },
      ],
    }),
    getApplicantRecruitment: builder.query({
      query: (params) => ({
        url: API_GET_APPLICANT_RECRUITMENT,
        method: "GET",
        params,
      }),
      transformResponse: (response) => {
        response.events = response.events.reverse();
        return response;
      },
      providesTags: [{ type: "APPLICANT", id: "LOG_APPLICANT" }],
    }),
    getApplicantByPipelineStateId: builder.query({
      query: (PipelineStateId) => ({
        url: `${API_GET_APPLICANT_BY_PIPELINESTETEID}?PipelineStateId=${PipelineStateId}`,
        method: "GET",
      }),
    }),
    getRecruitmentPipelineStatesByRecruitment: builder.query({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const listPipeline = await fetchWithBQ({
          url: API_GET_RECRUITMENT_PIPELINE_STATES_BY_RECRUITMENT,
          method: "GET",
          params: { RecruitmentId: _arg },
        });

        let data = await Promise.all(
          listPipeline.data.items.map(async (item) => {
            const listTask = await fetchWithBQ({
              url: `${API_GET_APPLICANT_BY_PIPELINESTETEID}?PipelineStateId=${item.id}`,
              method: "GET",
            });

            let newItem = {
              id: item.id,
              pipelineStateType: item.pipelineStateType,
              items: listTask.data.items,
            };
            return newItem;
          })
        );
        const presponseModified = convertArrayToObject(data, "id");

        return { data: presponseModified };
      },
      providesTags: [{ type: "APPLICANT", id: "LIST_APPLICANT_PIPELINE" }],
    }),
    updateApplicantRecruitmentToNextState: builder.mutation({
      query: (data) => ({
        url: API_UPDATE_APPLICANT_RECRUITMENT_TO_NEXT_STATE,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [
        { type: "APPLICANT", id: "LIST_FILTER" },
        { type: "APPLICANT", id: "LOG_APPLICANT" },
        { type: "APPLICANT", id: "APPLICANT_STATE_WITH_RECRUITMENT_STATE" },
        { type: "APPLICANT", id: "APPLICANT_REVIEW" },
        { type: "APPLICANT", id: "LIST_APPLICANT_PIPELINE" },
      ],
    }),
    addApplicantReview: builder.mutation({
      query: (data) => ({
        url: API_ADD_APPLICANT_REVIEW,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [{ type: "APPLICANT", id: "LOG_APPLICANT" }],
    }),
    addApplicantRecruitment: builder.mutation({
      query: (data) => ({
        url: API_GET_ADD_APPLICANT_TO_RECRUITMENT,
        method: "POST",
        data: data,
      }),
      providesTags: [{ type: "APPLICANT", id: "LIST_FILTER" }],
    }),
    // new
    // get all applicant with filter
    getAllFilterApplicant: builder.query({
      query: (data = {}) => {
        let reqData = { ...data };
        const aryFields = [
          "livingAddressProvinceIds",
          "livingAddressDistrictIds",
          "homeTowerProvinceIds",
          "homeTowerDistrictIds",
          "applicantSkillIds",
          "yearsOfExperience",
          "sexs",
          "maritalStatuses",
          "expectWorkingAddressProvinceIds",
          "expectWorkingAddressDistrictIds",
          "organizationIds",
          "recruitmentIds",
          "ownerIds",
          "councilIds",
          "creatorIds",
          "recruitmentPipelineStates",
          "jobCategoryIds",
          "jobSourceIds",
        ];

        aryFields.map((f) => {
          if (typeof data[f] !== "undefined" && !Array.isArray(data[f])) {
            reqData[f] = [data[f]];
          }
        });

        reqData.pageSize = reqData.PageSize || 10;
        reqData.pageIndex = reqData.PageIndex || 1;
        delete reqData.PageSize;
        delete reqData.PageIndex;

        return {
          url: API_GET_FILTER_ALL_APPLICANTS,
          method: "POST",
          data: toRequestFilterData(reqData),
        };
      },
      providesTags: [{ type: "APPLICANT", id: "LIST_FILTER" }],
    }), // 1
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
    // mẫu đánh giá theo ứng viên
    getApplicantReviewForm: builder.query({
      query: (data) => ({
        url: API_APPLICANT_REVIEW_FORM + "?" + qs.stringify(data),
      }),
      providesTags: [{ type: "APPLICANT", id: "APPLICANT_REVIEW" }],
    }),

    deleteApplicants: builder.mutation({
      query: (data) => ({
        url: API_DELETE_APPLICANT,
        method: "DELETE",
        data: data,
      }),
      invalidatesTags: [{ type: "APPLICANT", id: "LIST_FILTER" }],
    }),

    // mẫu đánh giá theo ứng viên
    getCheckReview: builder.query({
      query: (data) => ({
        url: API_CHECK_REVIEW + "?" + qs.stringify(data),
      }),
      providesTags: [{ type: "APPLICANT", id: "APPLICANT_REVIEW" }],
    }),
  }),
});

export const {
  useGetRecruitmentsQuery,
  useGetRecruitmentPipelineStatesByRecruitmentsQuery,
  useLazyGetRecruitmentPipelineStatesByRecruitmentsQuery,
  useGetListColumnApplicantsQuery,
  useUpdateListColumnApplicantsMutation,
  useGetAllFilterApplicantQuery,
  useGetAllUserFromOrganizationQuery,
  useUpdateApplicantMutation,
  useLazyGetAllUserFromOrganizationQuery,
  useGetApplicantByIdQuery,
  useGetRecruitmentsByApplicantQuery,
  useGetApplicantCurrentStateWithRecruitmentStatesQuery,
  useGetApplicantRecruitmentQuery,
  useUpdateApplicantRecruitmentToNextStateMutation,
  useAddApplicantRecruitmentMutation,
  useGetRecruitmentPipelineStatesByRecruitmentQuery,
  useUpdateApplicantFormMutation,
  useGetApplicantReviewFormQuery,
  useDeleteApplicantsMutation,
  useGetCheckReviewQuery,
  useAddApplicantReviewMutation,
  useGetAllJobSourcesQuery,
} = ApplicantFormSlice;
