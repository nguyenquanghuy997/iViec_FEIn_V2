import {apiSlice} from "@/redux/api/apiSlice";
import {
  API_CREATE_CHILD_ORGANIZATION,
  API_DELETE_ORGANIZATION,
  API_GET_LIST_ROLE_GROUP,
  API_GET_ORGANIZATION_DETAIL_BY_ID,
  API_GET_ORGANIZATION_WITH_CHILD,
  API_UPDATE_ORGANIZATION
} from "@/routes/api";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["Organization"],
});

const OrganizationAPI = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getOrganizationsDataWithChild: builder.query({
      query: (params) => ({
        url: API_GET_ORGANIZATION_WITH_CHILD,
        method: 'GET',
        params
      }),
      providesTags: ['Organization']
    }),
    filterOrganizations: builder.query({
      query: (params) => ({
        url: API_GET_ORGANIZATION_WITH_CHILD,
        method: 'GET',
        params
      }),
    }),
    getOrganizationById: builder.query({
      query: (params) => ({
        url: API_GET_ORGANIZATION_DETAIL_BY_ID,
        method: 'GET',
        params
      }),
    }),
    createChildOrganization: builder.mutation({
      query: (data) => ({
        url: API_CREATE_CHILD_ORGANIZATION,
        method: 'POST',
        data: data
      }),
      invalidatesTags: ['Organization']
    }),
    updateOrganization: builder.mutation({
      query: (data) => ({
        url: API_UPDATE_ORGANIZATION,
        method: 'PATCH',
        data
      }),
      invalidatesTags: ['Organization']
    }),
    deleteOrganization: builder.mutation({
      query: (data) => ({
        url: `${API_DELETE_ORGANIZATION}/${data.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Organization']
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
  useGetOrganizationByIdQuery,
  useGetRoleGroupQuery,
} = OrganizationAPI;
