import {
  API_CREATE_CHILD_ORGANIZATION, API_DELETE_ORGANIZATION,
  API_GET_ORGANIZATION_DETAIL_BY_ID,
  API_GET_ORGANIZATION_WITH_CHILD,
  API_UPDATE_ORGANIZATION
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
  tagTypes: ['GetOrganization'],
  endpoints: (build) => ({
    getListOrganizationWithChild: build.query({
      query: () => ({
        url: API_GET_ORGANIZATION_WITH_CHILD,
        method: 'GET',
      }),
      providesTags: ['GetOrganization']
    }),
    getOrganizationById: build.query({
      query: (params) => ({
        url: API_GET_ORGANIZATION_DETAIL_BY_ID,
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
      invalidatesTags: ['GetOrganization']
    }),
    updateOrganization: build.mutation({
      query: (data) => ({
        url: API_UPDATE_ORGANIZATION,
        method: 'PATCH',
        data: data,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }),
      invalidatesTags: ['GetOrganization']
    }),
    deleteOrganization: build.mutation({
      query: (data) => ({
        url: `${API_DELETE_ORGANIZATION}/${data.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['GetOrganization']
    }),
  }),
})

export const {
  useGetListOrganizationWithChildQuery,
  useCreateChildOrganizationMutation,
  useDeleteOrganizationMutation,
  useGetOrganizationByIdQuery,
  useUpdateOrganizationMutation} = organizationServiceApi;