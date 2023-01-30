import { apiSlice } from "@/redux/api/apiSlice";
import { API_CHANGE_PASSWORD, API_USER_INFO } from "@/routes/api";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["CompanyInfor"],
});

export const changePasswordSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: API_USER_INFO,
        method: "GET",
      }),
    }),
    updatePW: builder.mutation({
      query: (data) => ({
        url: API_CHANGE_PASSWORD,
        method: "POST",
        data,
      }),
    }),
  }),
});

export const { useGetProfileQuery, useUpdatePWMutation } = changePasswordSlice;
