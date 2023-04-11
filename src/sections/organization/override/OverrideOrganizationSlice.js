import {
  API_CREATE_CHILD_ORGANIZATION,
  API_DELETE_INVITE_USER,
  API_DELETE_MULTIPLE_ORGANIZATION,
  API_DELETE_ORGANIZATION, API_DELETE_USER_ORGANIZATION,
  API_GET_ALL_ADMIN_ORGANIZATION,
  API_GET_LIST_USER_INVITE,
  API_GET_LIST_USER_ORGANIZATION,
  API_GET_ORGANIZATION_DETAIL_BY_ID,
  API_GET_ORGANIZATION_DETAIL_BY_SLUG,
  API_GET_ORGANIZATION_PREVIEW,
  API_GET_ORGANIZATION_WITH_CHILD,
  API_INVITE_USER,
  API_RESEND_INVITE_USER,
  API_SET_ACTIVE_ORGANIZATION, API_SET_ACTIVE_USER,
  API_UPDATE_ORGANIZATION, API_UPDATE_USER_ROLE_ORGANIZATION,
  API_USER_CONFIRM_INVITE
} from "@/routes/api";
import {createApi} from '@reduxjs/toolkit/query/react'
import axios from "axios";
import {DOMAIN_SERVER_API} from "@/config";
const axiosBaseQuery = () => async ({url, method, data, params, headers}) => {
  try {
    const result = await axios({
      baseURL: DOMAIN_SERVER_API,
      url,
      method,
      data,
      params,
      headers: {
        ...headers,
        Authorization: "Bearer " + localStorage.getItem('accessToken')
      }
    })
    return {data: result.data}
  } catch (axiosError) {
    return {
      error: {
        status: axiosError?.response?.status || axiosError?.code,
        data:
            axiosError.response?.data || axiosError?.data || axiosError.message,
      },
    }
  }
}

export const organizationServiceApi = createApi({
  reducerPath: 'organizationServiceApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Organization', 'OrganizationById', "INVITE", 'ORGANIZATION_USER','INVITE_USER'],
  endpoints: (build) => ({
    getListOrganizationWithChild: build.query({
      query: () => ({
        url: API_GET_ORGANIZATION_WITH_CHILD,
        method: 'GET',
      }),
      providesTags: ['Organization']
    }),
    getOrganizationById: build.query({
      query: (params) => ({
        url: API_GET_ORGANIZATION_DETAIL_BY_ID,
        method: 'GET',
        params
      }),
      providesTags: ['OrganizationById']
    }),
    getOrganizationBySlug: build.query({
      query: (slug) => ({
        url: API_GET_ORGANIZATION_DETAIL_BY_SLUG + '?Slug=' + slug,
        method: 'GET',
      }),
    }),
    getOrganizationPreview: build.query({
      query: (slug) => ({
        url: API_GET_ORGANIZATION_PREVIEW + '?Id=' + slug,
        method: 'GET',
      }),
    }),
    getAllApplicantUserOrganizationById: build.query({
      query: (params) => ({
        // url: API_GET_USER_FROM_ORGANIZATION,
        url: API_GET_LIST_USER_ORGANIZATION,
        method: 'GET',
        params
      }),
      providesTags: ['ORGANIZATION_USER']
    }),
    getAllAdminByOrganizationId: build.query({
      query: (params) => ({
        url: API_GET_ALL_ADMIN_ORGANIZATION,
        method: 'GET',
        params
      }),
    }),
    createChildOrganization: build.mutation({
      query: (data) => ({
        url: API_CREATE_CHILD_ORGANIZATION,
        method: 'POST',
        data: data
      }),
      invalidatesTags: ['Organization']
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
      invalidatesTags: ['Organization', 'OrganizationById']
    }),
    deleteOrganization: build.mutation({
      query: (data) => ({
        url: `${API_DELETE_ORGANIZATION}/${data.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Organization', 'OrganizationById']
    }),
    deleteMultipleOrganization: build.mutation({
      query: (data) => ({
        url: API_DELETE_MULTIPLE_ORGANIZATION,
        method: 'DELETE',
        data
      }),
      invalidatesTags: ['Organization', 'OrganizationById']
    }),
    setActiveOrganization: build.mutation({
      query: (data) => ({
        url: API_SET_ACTIVE_ORGANIZATION,
        method: 'PATCH',
        data
      }),
      invalidatesTags: ['Organization', 'OrganizationById']
    }),
    // invite user
    inviteUser: build.mutation({
      query: (data) => ({
        url: API_INVITE_USER,
        method: 'POST',
        data
      }),
      providesTags: ['INVITE_USER']
    }),
    // confirm invite
    activeInviteUser: build.mutation({
      query: (data) => ({
        url: API_USER_CONFIRM_INVITE,
        method: 'POST',
        data
      })
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
      providesTags: ['INVITE'],
      invalidatesTags: ['INVITE_USER']
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
      invalidatesTags: ['INVITE']
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
      invalidatesTags: ['INVITE']
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
      invalidatesTags: ['ORGANIZATION_USER']
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
      invalidatesTags: ['ORGANIZATION_USER']
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
      invalidatesTags: ['ORGANIZATION_USER']
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
  useActiveUsersMutation,
} = organizationServiceApi;