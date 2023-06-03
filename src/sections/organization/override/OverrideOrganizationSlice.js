import {
  API_CREATE_CHILD_ORGANIZATION,
  API_DELETE_INVITE_USER,
  API_DELETE_MULTIPLE_ORGANIZATION,
  API_DELETE_ORGANIZATION,
  API_DELETE_SINGLE_USER_ORGANIZATION,
  API_DELETE_USER_ORGANIZATION,
  API_GET_ALL_ADMIN_ORGANIZATION,
  API_GET_LIST_USER_INVITE,
  API_GET_ORGANIZATION_DETAIL_BY_ID,
  API_GET_ORGANIZATION_DETAIL_BY_SLUG,
  API_GET_ORGANIZATION_PREVIEW,
  API_GET_ORGANIZATION_WITH_CHILD,
  API_GET_USER_FROM_ORGANIZATION,
  API_INVITE_USER,
  API_RESEND_INVITE_USER,
  API_SET_ACTIVE_ORGANIZATION,
  API_SET_ACTIVE_USER,
  API_UPDATE_ORGANIZATION,
  API_UPDATE_USER_ROLE_ORGANIZATION,
  API_USER_CONFIRM_INVITE
} from "@/routes/api";
import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from "@/redux/api/apiSlice";

export const organizationServiceApi = createApi({
  reducerPath: 'organizationServiceApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['ORGANIZATION'],
  endpoints: (build) => ({
    getListOrganizationWithChild: build.query({
      query: () => ({
        url: API_GET_ORGANIZATION_WITH_CHILD,
        method: 'GET',
      }),
      providesTags: [{type: 'ORGANIZATION', id: 'LIST'}]
    }),
    getOrganizationById: build.query({
      query: (params) => ({
        url: API_GET_ORGANIZATION_DETAIL_BY_ID,
        method: 'GET',
        params
      }),
      providesTags: [{type: 'ORGANIZATION', id: 'ID'}]
    }),
    getOrganizationBySlug: build.query({
      query: (slug) => ({
        url: API_GET_ORGANIZATION_DETAIL_BY_SLUG + '?Slug=' + slug,
        method: 'GET',
      }),
      providesTags: [{type: 'ORGANIZATION', id: 'SLUG'}]
    }),
    getOrganizationPreview: build.query({
      query: (slug) => ({
        url: API_GET_ORGANIZATION_PREVIEW + '?Id=' + slug,
        method: 'GET',
      }),
      providesTags: [{type: 'ORGANIZATION', id: 'PREVIEW'}]
    }),
    getAllApplicantUserOrganizationById: build.query({
      query: (params) => ({
        url: API_GET_USER_FROM_ORGANIZATION,
        method: 'GET',
        params
      }),
      providesTags: [{type: 'ORGANIZATION', id: 'ORGANIZATION_USER'}]
    }),
    getAllAdminByOrganizationId: build.query({
      query: (params) => ({
        url: API_GET_ALL_ADMIN_ORGANIZATION,
        method: 'GET',
        params
      }),
      providesTags: [{type: 'ORGANIZATION', id: 'ORGANIZATION_ADMIN'}]
    }),
    createChildOrganization: build.mutation({
      query: (data) => ({
        url: API_CREATE_CHILD_ORGANIZATION,
        method: 'POST',
        data: data
      }),
      invalidatesTags: [{type: 'ORGANIZATION', id: 'LIST'}, {type: 'ORGANIZATION', id: 'ID'}]
    }),
    updateOrganization: build.mutation({
      query: (data) => ({
        url: `${API_UPDATE_ORGANIZATION}/${data.organizationId}`,
        method: 'PATCH',
        data: data,
        headers: {
          "Content-Type": "application/json"
        }
      }),
      invalidatesTags: [{type: 'ORGANIZATION', id: 'LIST'}, {type: 'ORGANIZATION', id: 'ID'}]
    }),
    deleteOrganization: build.mutation({
      query: (data) => ({
        url: `${API_DELETE_ORGANIZATION}/${data.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{type: 'ORGANIZATION', id: 'LIST'}]
    }),
    deleteMultipleOrganization: build.mutation({
      query: (data) => ({
        url: API_DELETE_MULTIPLE_ORGANIZATION,
        method: 'DELETE',
        data
      }),
      invalidatesTags: [{type: 'ORGANIZATION', id: 'LIST'}]
    }),
    setActiveOrganization: build.mutation({
      query: (data) => ({
        url: API_SET_ACTIVE_ORGANIZATION,
        method: 'PATCH',
        data
      }),
      invalidatesTags: [{type: 'ORGANIZATION', id: 'LIST'}]
    }),
    // invite user
    inviteUser: build.mutation({
      query: (data) => ({
        url: API_INVITE_USER,
        method: 'POST',
        data
      }),
      invalidatesTags: [{ type: 'ORGANIZATION', id: 'INVITE' }]
    }),
    // confirm invite
    activeInviteUser: build.mutation({
      query: (data) => ({
        url: API_USER_CONFIRM_INVITE,
        method: 'POST',
        data
      }),
      invalidatesTags: [{ type: 'ORGANIZATION', id: 'INVITE' }]
    }),
    // get list user invite
    getListInviteUser: build.query({
      query: (params) =>  {
        const defaultParams = { PageIndex: 1, PageSize: 20 }
        return {
          url: API_GET_LIST_USER_INVITE,
          method: 'GET',
          params: { ...defaultParams, ...params }
        }
      },
      providesTags: [{ type: 'ORGANIZATION', id: 'INVITE' }]
    }),
    // resend email
    resendEmail: build.mutation({
      query: (data) =>  {
        return {
          url: API_RESEND_INVITE_USER,
          method: 'POST',
          data
        }
      },
      invalidatesTags: [{ type: 'ORGANIZATION', id: 'INVITE' }]
    }),
    // delete invite
    deleteInviteUser: build.mutation({
      query: (data) =>  {
        return {
          url: `${API_DELETE_INVITE_USER}`,
          method: 'DELETE',
          data
        }
      },
      invalidatesTags: [{ type: 'ORGANIZATION', id: 'INVITE' }]
    }),
    // update user
    updateRoleUser: build.mutation({
      query: (data) =>  {
        return {
          url: `${API_UPDATE_USER_ROLE_ORGANIZATION}`,
          method: 'POST',
          data
        }
      },
      invalidatesTags: [{type: 'ORGANIZATION', id: 'ORGANIZATION_USER'}]
    }),
    // delete user
    deleteUser: build.mutation({
      query: (data) =>  {
        return {
          url: `${API_DELETE_USER_ORGANIZATION}`,
          method: 'DELETE',
          data
        }
      },
      invalidatesTags: [{type: 'ORGANIZATION', id: 'ORGANIZATION_USER'}]
    }),
    deleteSingleUser: build.mutation({
      query: (data) =>  {
        return {
          url: `${API_DELETE_SINGLE_USER_ORGANIZATION}?userId=${data}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: [{type: 'ORGANIZATION', id: 'ORGANIZATION_USER'}]
    }),
    // active user
    activeUsers: build.mutation({
      query: (data) =>  {
        return {
          url: `${API_SET_ACTIVE_USER}`,
          method: 'PATCH',
          data
        }
      },
      invalidatesTags: [{type: 'ORGANIZATION', id: 'ORGANIZATION_USER'}]
    }),
  }),
})

export const {
  useGetListOrganizationWithChildQuery,
  useCreateChildOrganizationMutation,
  useDeleteOrganizationMutation,
  useGetOrganizationByIdQuery,
  useGetOrganizationPreviewQuery,
  useUpdateOrganizationMutation,
  useGetAllApplicantUserOrganizationByIdQuery,
  useGetAllAdminByOrganizationIdQuery,
  useDeleteMultipleOrganizationMutation,
  useSetActiveOrganizationMutation,
  useInviteUserMutation,
  useActiveInviteUserMutation,
  useGetListInviteUserQuery,
  useResendEmailMutation,
  useDeleteInviteUserMutation,
  useUpdateRoleUserMutation,
  useDeleteUserMutation,
  useDeleteSingleUserMutation,
  useActiveUsersMutation,
} = organizationServiceApi;