import { apiSlice } from "@/redux/api/apiSlice";
import {
  API_GET_ALL_PIPELINE,
  API_ADD_ROLE_GROUP,
  API_UPDATE_PIPELINE,
  API_DELETE_PIPELINE, API_GET_ALL_PIPELINE_BY_ORGANIZATION, API_GET_ALL_RECRUITMENT_STEP_PIPELINE,
} from "@/routes/api";
import * as qs from "qs";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["Pipeline"],
});

const PipelineFormSlice = apiWithTag.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({  
    //Danh sách vị trí
    getAllPipeline: builder.query({
      query: (params) => {
        const defaultParams = { PageSize: 20 };
        return {
          url: API_GET_ALL_PIPELINE,
          method: "GET",
          params: {...defaultParams, ...params},
        }
      },
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

    // filter người tạo
    // getApplicantUsersOnJobtype: builder.query({
    //   query: (params) => ({
    //     url: API_GET_APPLICANT_USERS_ON_JOBTYPE,
    //     method: "GET",
    //     params,
    //   }),
    // }),

    addPipeline: builder.mutation({
      query: (data) => ({
        url: API_ADD_ROLE_GROUP,
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
  useGetAllPipelineQuery,
  useGetAllPipelineByOrganizationQuery,
  useLazyGetAllPipelineQuery,
  useAddPipelineMutation,
  useUpdatePipelineMutation,
  useDeletePipelineMutation,
  useGetAllStepOfPipelineQuery,
} = PipelineFormSlice;
