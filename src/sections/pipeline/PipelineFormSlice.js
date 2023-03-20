import { apiSlice } from "@/redux/api/apiSlice";
import {
  API_GET_ALL_PIPELINE,
  API_UPDATE_PIPELINE,
  API_DELETE_PIPELINE, API_GET_ALL_PIPELINE_BY_ORGANIZATION, API_GET_ALL_RECRUITMENT_STEP_PIPELINE, API_ADD_PIPELINE, API_GET_EXAMINATION, API_GET_PIPELINE_BY_ID, API_SET_ORGANIZATION_PIPELINE_ACTIVE,
} from "@/routes/api";
import * as qs from "qs";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["Pipeline","GetAllPipeline"],
});

const PipelineFormSlice = apiWithTag.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({  
    //Danh sách vị trí
    // getAllPipeline: builder.query({
    //   query: (params) => {
    //     const defaultParams = { PageSize: 20 };
    //     return {
    //       url: API_GET_ALL_PIPELINE,
    //       method: "GET",
    //       params: {...defaultParams, ...params},
    //     }
    //   },
    // }),
    getAllPipeline: builder.query({
      query: (params) => ({
        url: API_GET_ALL_PIPELINE,
        method: "GET",
        params
      }),
    }),

    getPipelineById: builder.query({
      query: (params) => ({
        url: API_GET_PIPELINE_BY_ID,
        method: 'GET',
        params
      }),
    }),

    getAllPipelineByOrganization: builder.query({
      query: (params) => {
        const defaultParams = { PageSize: 20 };
        return {
          url: API_GET_ALL_PIPELINE_BY_ORGANIZATION,
          method: "GET",
          params: {...defaultParams, ...params},
        }
      },
    }),
    getAllStepOfPipeline: builder.query({
      query: (params) => {
        return {
          url: API_GET_ALL_RECRUITMENT_STEP_PIPELINE,
          method: "GET",
          params,
        }
      },
    }),
    getAllExam: builder.query({
      query: (params) => {
        return {
          url: API_GET_EXAMINATION,
          method: "GET",
          params,
        }
      },
    }),
    // filter người tạo
    // getApplicantUsersOnJobtype: builder.query({
    //   query: (params) => ({
    //     url: API_GET_APPLICANT_USERS_ON_JOBTYPE,
    //     method: "GET",
    //     params,
    //   }),
    // }),
    updateStatusPipeline: builder.mutation({
      query: (data) => ({
        url: API_SET_ORGANIZATION_PIPELINE_ACTIVE,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["GetAllPipeline"],
    }),
    addPipeline: builder.mutation({
      query: (data) => ({
        url: API_ADD_PIPELINE,
        method: "POST",
        data: data,
      }),
    }),
    updatePipeline: builder.mutation({
      query: (data) => ({
        url: API_UPDATE_PIPELINE,
        method: "POST",
        data: qs.stringify(data),
      }),
    }),
    deletePipeline: builder.mutation({
      query: (data) => ({
        url: API_DELETE_PIPELINE,
        method: "POST",
        data: qs.stringify(data),
      }),
    }),
  }),
});

export const {
  useLazyGetAllPipelineQuery,
  useGetPipelineByIdQuery,
  useGetAllPipelineByOrganizationQuery,
  useGetAllStepOfPipelineQuery,
  useGetAllExamQuery,
  useUpdateStatusPipelineMutation,
  useAddPipelineMutation,
  useUpdatePipelineMutation,
  useDeletePipelineMutation,

} = PipelineFormSlice;
