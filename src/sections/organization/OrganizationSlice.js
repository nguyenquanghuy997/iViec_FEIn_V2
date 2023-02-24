import {apiSlice} from "@/redux/api/apiSlice";
import {
  API_GET_ORGANIZATION_WITH_CHILD
} from "@/routes/api";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["Organization"],
});

const OrganizationSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getOrganizationsDataWithChild: builder.query({
      query: (params) => ({
        url: API_GET_ORGANIZATION_WITH_CHILD,
        method: 'GET',
        params
      }),
    }),
  })
});

export const {
  useGetOrganizationsDataWithChildQuery,
  useLazyGetOrganizationsDataWithChildQuery
} = OrganizationSlice;
