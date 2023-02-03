import { apiSlice } from "@/redux/api/apiSlice";
import {
  API_FORGET_PASSWORD,
  API_GET_DISTRICT,
  API_GET_PROVINCE,
  API_REGISTER,
} from "@/routes/api";

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
  useGetProvinceQuery,
  useLazyGetProvinceQuery,
  useGetDistrictByProvinceIdQuery,
  useLazyGetDistrictByProvinceIdQuery,
} = authSlice;
