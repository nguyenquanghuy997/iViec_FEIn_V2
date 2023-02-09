import { apiSlice } from "@/redux/api/apiSlice";
import {
  API_CONFIRM_EMAIL,
  API_FORGET_PASSWORD,
  API_CHANGE_PASSWORD_WITH_TOKEN,
  API_GET_DISTRICT,
  API_GET_PROVINCE,
  API_REGISTER,
  API_USER_INFO,
} from "@/routes/api";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["Auth"],
});


export const authSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    // get current user login
    getCurrentUser: builder.query({
      query: () => ({
        url: API_USER_INFO,
        method: "GET",
      }),
      invalidatesTags: ["ForgotPassword"],
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: API_FORGET_PASSWORD,
        method: "POST",
        data,
      }),
      invalidatesTags: ["ForgotPassword"],
    }),
    // REGISTER ORGANIZATION
    register: builder.mutation({
      query: (data) => ({
        url: API_REGISTER,
        method: "POST",
        data,
      }),
      invalidatesTags: ["Register"],
    }),
    // CONFIRM EMAIL
    confirmEmail: builder.query({
      query: (data) => ({
        url: API_CONFIRM_EMAIL,
        method: "GET",
        params: { Email: data.email, Token: data.token },
      }),
      invalidatesTags: ["ConfirmEmail"],
    }),
    // CHANGE PASSWORD WITH TOKEN
    changePasswordWithToken: builder.mutation({
      query: (data) => ({
        url: API_CHANGE_PASSWORD_WITH_TOKEN,
        method: "POST",
        data,
      }),
      invalidatesTags: ["ChangePasswordWithToken"],
    }),
    // get province & district
    getProvince: builder.query({
      query: () => ({
        url: `${API_GET_PROVINCE}`,
        method: "GET",
      }),
      invalidatesTags: ["Provinces"],
    }),
    getDistrictByProvinceId: builder.query({
      query: (provinceId) => ({
        url: `${API_GET_DISTRICT}`,
        method: "GET",
        params: { ProvinceId: provinceId },
      }),
      invalidatesTags: ["Districts"],
    }),
  }),
});

export const {
  useForgotPasswordMutation,
  useRegisterMutation,
  useConfirmEmailQuery,
  useLazyConfirmEmailQuery,
  useGetProvinceQuery,
  useLazyGetProvinceQuery,
  useGetDistrictByProvinceIdQuery,
  useLazyGetDistrictByProvinceIdQuery,
  useChangePasswordWithTokenMutation,
  useGetCurrentUserQuery,
  useLazyGetCurrentUserQuery
} = authSlice;
