import { apiSlice } from "@/redux/api/apiSlice";
import {
  API_GET_ROLE,
  API_GET_LIST_ROLE_GROUP,
  API_GET_ALL_PIPELINE,
  API_ADD_ROLE_GROUP,
  API_REMOVE_ROLE_GROUP,
  API_UPDATE_ROLE_GROUP,
  API_GET_COLUMN_ROLE,
  API_UPDATE_COLUMN_ROLE
} from "@/routes/api";
import * as qs from "qs";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["RoleGroup", "GetColumn"],
});

const PipelineFormSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getRoleList: builder.query({
      query: () => ({
        url: API_GET_ROLE,
        method: "GET",
      }),
      providesTags: ["RoleGroup"],
    }),

    getRoleGroupList: builder.query({
      query: (params) => {
        const defaultParams = { pageIndex: 1, pageSize: 20 }
        return {
          url: API_GET_LIST_ROLE_GROUP,
          method: "GET",
          params: { ...defaultParams, ...params }
        }},
        providesTags: ["RoleGroup"],
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
      invalidatesTags: ["RoleGroup"],
    }),

    updateRolegroup: builder.mutation({
      query: (res) => ({
        url: `${API_UPDATE_ROLE_GROUP}/${res.id}`,
        method: "PATCH",
        data: res,
      }),
      invalidatesTags: ["RoleGroup"],
    }),

    deletePipeline: builder.mutation({
      query: (data) => ({
        url: API_REMOVE_ROLE_GROUP,
        method: "POST",
        data: qs.stringify(data),
      }),
      invalidatesTags: ["RoleGroup"],
    }),
    //settings
    getListColumns: builder.query({
      query: () => ({
        url: API_GET_COLUMN_ROLE,
        method: "GET",
      }),
      providesTags: ["GetColumn"],
    }),
    updateListColumns: builder.mutation({
      query: (data) => ({
        url: `${API_UPDATE_COLUMN_ROLE}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: ["GetColumn"],
    }),
  }),
});

export const {
  useGetRoleListQuery,
  useGetRoleGroupListQuery,
  useAddRoleGroupMutation,
  useUpdateRolegroupMutation,
  useGetListColumnsQuery,
  useUpdateListColumnsMutation
} = PipelineFormSlice;
