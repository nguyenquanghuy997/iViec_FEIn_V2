import { apiSlice } from "@/redux/api/apiSlice";
import { API_FORGET_PASSWORD, API_REGISTER } from "@/routes/api";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["Auth"],
});

export const authSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: API_FORGET_PASSWORD,
        method: "POST",
        data,
      }),
      invalidatesTags: ["ForgotPassword"],
    }),
    register: builder.mutation({
      query: (data) => ({
        url: API_REGISTER,
        method: "POST",
        data,
      }),
      invalidatesTags: ["Register"],
    }),
  }),
});

export const { useForgotPasswordMutation, useRegisterMutation } = authSlice;
