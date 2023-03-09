import { apiSlice } from "@/redux/api/apiSlice";
import {
  API_GET_ALL_PIPELINE,
  API_ADD_ROLE_GROUP,
  API_UPDATE_PIPELINE,
  API_REMOVE_ROLE_GROUP
} from "@/routes/api";
import * as qs from "qs";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["CompanyInfor"],
});

const PipelineFormSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({  
    //Danh sách vị trí
    getAllPipeline: builder.query({
      query: (params) => ({
        url: API_GET_ALL_PIPELINE,
        method: "GET",
        params
      }),
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
        url: API_REMOVE_ROLE_GROUP,
        method: "POST",
        data: qs.stringify(data),
      }),
    }),
  }),
});

export const {
  useLazyGetAllPipelineQuery,
  useAddPipelineMutation,
  useUpdatePipelineMutation,
  useDeletePipelineMutation,
} = PipelineFormSlice;
