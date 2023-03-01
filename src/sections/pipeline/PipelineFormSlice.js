import { apiSlice } from "@/redux/api/apiSlice";
import {
  API_GET_ALL_PIPELINE,
  API_ADD_PIPELINE,
  API_UPDATE_PIPELINE,
  API_DELETE_PIPELINE
} from "@/routes/api";
import * as qs from "qs";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["CompanyInfor"],
});

const PipelineFormSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    
    getAllFilterPipeline: builder.mutation({
      query: () => ({
        url: API_GET_ALL_PIPELINE,
        method: "GET",
       
      }),
    }),
    addPipeline: builder.mutation({
      query: (data) => ({
        url: API_ADD_PIPELINE,
        method: "POST",
        data: qs.stringify(data),
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
  useGetAllFilterPipelineMutation,
  useAddPipelineMutation,
  useUpdatePipelineMutation,
  useDeletePipelineMutation,
} = PipelineFormSlice;
