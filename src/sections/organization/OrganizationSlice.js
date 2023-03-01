import {apiSlice} from "@/redux/api/apiSlice";
import {
  API_CREATE_CHILD_ORGANIZATION, API_GET_LIST_ROLE_GROUP,
  API_GET_ORGANIZATION_DETAIL_BY_ID,
  API_GET_ORGANIZATION_WITH_CHILD
} from "@/routes/api";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["Organization", 'GetOrganization'],
});

const OrganizationAPI = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getOrganizationsDataWithChild: builder.query({
      query: (params) => ({
        url: API_GET_ORGANIZATION_WITH_CHILD,
        method: 'GET',
        params
      }),
      providesTags: ['GetOrganization']
    }),
    filterOrganizations: builder.query({
      query: (params) => ({
        url: API_GET_ORGANIZATION_WITH_CHILD,
        method: 'GET',
        params
      }),
    }),
    getOrganizationBySlug: builder.query({
      query: (params) => ({
        url: API_GET_ORGANIZATION_DETAIL_BY_ID,
        method: 'GET',
        params
      }),
      providesTags: ['GetOrganization']
    }),
    createChildOrganization: builder.mutation({
      query: (data) => ({
        url: API_CREATE_CHILD_ORGANIZATION,
        method: 'POST',
        data: data
      }),
      invalidatesTags: ['GetOrganization']
    }),
    // role
    getRoleGroup: builder.query({
      query: (params) => ({
        url: API_GET_LIST_ROLE_GROUP,
        method: 'GET',
        params
      }),
    }),
  })
});
export const {
  useGetOrganizationsDataWithChildQuery,
  useCreateChildOrganizationMutation,
  useGetOrganizationBySlugQuery,
  useLazyGetOrganizationBySlugQuery,
  useGetRoleGroupQuery,
} = OrganizationAPI;
