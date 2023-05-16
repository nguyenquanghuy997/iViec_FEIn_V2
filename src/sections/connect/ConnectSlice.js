import { apiSlice } from "@/redux/api/apiSlice";
import { API_GET_INTERNAL_ACCOUNT, API_SET_ACTIVE_ACCOUNT } from "@/routes/api";
import * as qs from "qs";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["connect"],
});

const connectSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getInternalAccount: builder.query({
      query: (params) => ({
        url: `${API_GET_INTERNAL_ACCOUNT}?${qs.stringify(params)}`,
        method: "GET",
      }),
    }),
    setActiveInternalAccount: builder.mutation({
      query: (params) => ({
        url: `${API_SET_ACTIVE_ACCOUNT}/${params.id}`,
        method: "PATCH",
        data: params
      }),
    }),
  }),
});

export const {
  useLazyGetInternalAccountQuery,
  useSetActiveInternalAccountMutation,
} = connectSlice;
