import { apiSlice } from "@/redux/api/apiSlice";
import {
  API_GET_ALL_PIPELINE,
  API_UPDATE_PIPELINE,
  API_DELETE_PIPELINE,
  API_GET_ALL_PIPELINE_BY_ORGANIZATION,
  API_GET_ALL_RECRUITMENT_STEP_PIPELINE,
  API_ADD_PIPELINE, API_GET_EXAMINATION,
  API_GET_PIPELINE_BY_ID,
  API_SET_ORGANIZATION_PIPELINE_ACTIVE,
  API_GET_COLUMN_PIPELINE,
  API_UPDATE_COLUMN_PIPELINE,
} from "@/routes/api";
import * as qs from "qs";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["Pipeline","GetAllPipeline"],
});

const PipelineFormSlice = apiWithTag.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({  
    getAllPipeline: builder.query({
      query: (params) => ({
        url: `${API_GET_ALL_PIPELINE}?${qs.stringify(params, {arrayFormat: 'repeat'})}`,
        method: "GET",
      }),
      providesTags:["GetAllPipeline"],
    }),
    getPipelineById: builder.query({
      query: (params) => ({
        url: API_GET_PIPELINE_BY_ID,
        method: 'GET',
        params
      }),
      providesTags:["GetAllPipeline"],
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
      invalidatesTags: ["GetAllPipeline"],
    }),
    updatePipeline: builder.mutation({
      query: (data) => ({
        url: `${API_UPDATE_PIPELINE}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: ["GetAllPipeline"],
    }),
    deletePipeline: builder.mutation({
      query: (data) => ({
        url: API_DELETE_PIPELINE,
        method: "DELETE",
        data: data
      }),
      invalidatesTags: ["GetAllPipeline"],
    }),
    getListPipelineColumns: builder.query({
      query: () => ({
        url: API_GET_COLUMN_PIPELINE,
        method: "GET",
      }),
      providesTags: ["GetColumn"],
    }),
    updateListPipelineColumns: builder.mutation({
      query: (data) => {
        const { id, ...restData } = data;
        return {
          url: `${API_UPDATE_COLUMN_PIPELINE}/${id}`,
          method: "PATCH",
          data: restData,
        };
      },
      invalidatesTags: ["GetColumn"],
    }),
  }),
});

export const {
  useGetAllPipelineQuery,
  useGetPipelineByIdQuery,
  useGetAllPipelineByOrganizationQuery,
  useGetAllStepOfPipelineQuery,
  useUpdateStatusPipelineMutation,
  useAddPipelineMutation,
  useUpdatePipelineMutation,
  useDeletePipelineMutation,
  useGetListPipelineColumnsQuery,
  useUpdateListPipelineColumnsMutation,
} = PipelineFormSlice;
