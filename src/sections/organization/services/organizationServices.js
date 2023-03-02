import axiosInstance from "@/utils/axios";
import {API_GET_ORGANIZATION_WITH_CHILD, API_UPDATE_ORGANIZATION} from "@/routes/api";
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query'
import {DOMAIN_SERVER_API} from "@/config";

export const organizationServiceApi = createApi({
  reducerPath: 'organizationServiceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: DOMAIN_SERVER_API
  }),
  tagTypes: ['OrganizationList'],
  endpoints: (build) => ({
    getListOrganizationWithChild: build.query({
      query: () => ({
        url: API_GET_ORGANIZATION_WITH_CHILD,
        method: 'GET',
        // params
      }),
      providesTags: ['OrganizationList']
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
      invalidatesTags: ['OrganizationList']
    }),
  }),
})

export const {useGetListOrganizationWithChildQuery, useUpdateOrganizationMutation} = organizationServiceApi;

export const getListOrganization = () => {
  axiosInstance
      .get(API_GET_ORGANIZATION_WITH_CHILD, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        return response.data
      })
}
export const updateOrganization = (url, data) =>
    axiosInstance
        .patch(url, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          getListOrganization();
          return response.data
        })