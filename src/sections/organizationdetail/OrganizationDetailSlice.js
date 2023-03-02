import {apiSlice} from "@/redux/api/apiSlice";
import {
  API_GET_ORGANIZATION
} from "@/routes/api";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["OrganizationDetail"],
});

const OrganizationDetailAPI = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getOrganizationInfo: builder.query({
      query: () => ({
        url: API_GET_ORGANIZATION,
        method: 'GET',
      }),
    }),
  })
});
export const {
  useGetOrganizationInfoQuery,
} = OrganizationDetailAPI;
