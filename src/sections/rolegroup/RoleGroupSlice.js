import { apiSlice } from "@/redux/api/apiSlice";
import {
  API_GET_ROLE,
  API_GET_LIST_ROLE_GROUP,
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
    getRoleList: builder.query({
      query: () => ({
        url: API_GET_ROLE,
        method: "GET",
      }),
    }),

    getRoleGroupList: builder.query({
      query: () => ({
        url: API_GET_LIST_ROLE_GROUP,
        method: "GET",
      }),
    }),
    getAllFilterPipeline: builder.mutation({
      query: () => ({
        url: API_GET_ALL_PIPELINE,
        method: "GET",
      }),
    }),
    addRoleGroup: builder.mutation({
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
  useGetRoleListQuery,
  useGetRoleGroupListQuery,
  useGetAllFilterPipelineMutation,
  useAddRoleGroupMutation,
  useUpdatePipelineMutation,
  useDeletePipelineMutation,
} = PipelineFormSlice;
