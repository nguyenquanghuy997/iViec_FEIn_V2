import { apiSlice } from "@/redux/api/apiSlice";
import {
  API_GET_ROLE,
  API_GET_LIST_ROLE_GROUP,
  API_GET_ALL_PIPELINE,
  API_ADD_ROLE_GROUP,
  API_REMOVE_ROLE_GROUP,
  API_UPDATE_ROLE_GROUP,
  API_GET_COLUMN_ROLE,
  API_UPDATE_COLUMN_ROLE,
  API_GET_ROLE_GROUP,
  API_SET_ACTIVE_ROLE_GROUP,
} from "@/routes/api";
import * as qs from "qs";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["RoleGroup", "GetColumn"],
});

const PipelineFormSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getRoleList: builder.query({
      query: (params = {}) => ({
        url: API_GET_ROLE + '?' + qs.stringify(params),
        method: "GET",
      }),
      providesTags: ["ActionList"],
    }),

    getRoleGroupList: builder.query({
      query: (params) => {
        const defaultParams = { PageIndex: 1, PageSize: 10 }
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
      query: (data = {}) => {
        const { id, ...rest } = data;
        return {
          url: `${API_UPDATE_ROLE_GROUP}/${id}`,
          method: "PATCH",
          data: rest,
        }
      },
      invalidatesTags: ["RoleGroup"],
    }),

    // Lưu vai trò (create/update)
    saveRoleGroup: builder.mutation({
      query: (data) => {
        const { id, ...restData } = data;
        return {
          url: id ? (API_UPDATE_ROLE_GROUP + '/' + id) : API_ADD_ROLE_GROUP,
          method: id ? 'PATCH' : 'POST',
          data: restData,
        };
      },
      invalidatesTags: (result, error, { id }) => {
        return error ? [] : [
          { type: 'RoleGroup' },
          ...(id ? [{ type: 'RoleGroup', id: 'ROLE_' + id }] : []),
        ];
      },
    }),

    // Chi tiết vai trò theo ID
    getRoleDetail: builder.query({
      query: (id) => ({
        url: API_GET_ROLE_GROUP,
        method: 'GET',
        params: { RoleGroupId: id },
      }),
      providesTags: (result, error, id) => {
        return error ? [] : [{ type: 'RoleGroup', id: 'ROLE_' + id }];
      },
    }),

    removeRoleGroup: builder.mutation({
      query: (ids) => ({
        url: API_REMOVE_ROLE_GROUP,
        method: "DELETE",
        data: {
          roleGroupIds: ids,
        },
      }),
      invalidatesTags: ["RoleGroup"],
    }),

    // Update status role group
    setStatusRoleGroup: builder.mutation({
      query: (data) => {
        return {
          url: API_SET_ACTIVE_ROLE_GROUP,
          method: 'PATCH',
          data,
        };
      },
      invalidatesTags: ['RoleGroup'],
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
      query: (data) => {
        const { id, ...restData } = data;
        return {
          url: `${API_UPDATE_COLUMN_ROLE}/${id}`,
          method: "PATCH",
          data: restData,
        }
      },
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
  useUpdateListColumnsMutation,
  useSaveRoleGroupMutation,
  useGetRoleDetailQuery,
  useLazyGetRoleDetailQuery,
  useRemoveRoleGroupMutation,
  useSetStatusRoleGroupMutation,
} = PipelineFormSlice;
