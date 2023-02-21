import { apiSlice } from "@/redux/api/apiSlice";
import {
  API_GET_JOB_CATEGORIES,
  API_GET_COMPANY_INFOR,
  API_GET_PROVINCE,
  API_GET_DISTRICT,
} from "@/routes/api";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["CompanyInfor"],
});

export const companyInforSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    // Thông tin công ty
    // getBranchByUser: builder.query({
    //   query: () => ({
    //     url: API_USER_INFO,
    //     method: "GET",
    //   }),
    //   providesTags: ["branch_by_user"],
    // }),
    getCompanyInfo: builder.query({
      query: () => ({
        url: `${API_GET_COMPANY_INFOR}`,
        method: "GET",
      }),
    }),
    getJobCategories: builder.query({
      query: () => ({
        url: `${API_GET_JOB_CATEGORIES}`,
        method: "GET",
      }),
    }),
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
  // Thông tin công ty
  useGetCompanyInfoQuery,
  useGetJobCategoriesQuery,
  useLazyGetJobCategoriesQuery,
  useGetProvinceQuery,
  useLazyGetProvinceQuery,
  useGetDistrictByProvinceIdQuery,
  useLazyGetDistrictByProvinceIdQuery,
} = companyInforSlice;
