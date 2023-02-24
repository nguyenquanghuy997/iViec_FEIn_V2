import { apiSlice } from "@/redux/api/apiSlice";
import {
  API_GET_JOB_CATEGORIES,
  API_GET_COMPANY_INFOR,
  API_GET_PROVINCE,
  API_GET_DISTRICT,
  API_GET_COMPANY_INFOR_BY_IDS,
  API_UPDATE_COMPANY_INFOR,
  API_GET_IMAGE,
} from "@/routes/api";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["CompanyInfor"],
});

export const companyInforSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    // Thông tin công ty
    // getBranchByUser: builder.query({
    //   query: () => ({
    //     url: API_GET_COMPANY_INFOR_BY_IDS,
    //     method: "GET",
    //   }),
    //   providesTags: ["branch_by_user"],
    // }),
    getCompanyInfo: builder.query({
      query: () => ({
        url: `${API_GET_COMPANY_INFOR}`,
        method: "GET",
      }),
      providesTags: ["CompanyInfor"],
    }),
    getCompanyInfoIdS: builder.query({
      query: ({ Id }) => ({
        url: `${API_GET_COMPANY_INFOR_BY_IDS}/${Id}`,
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
    updateCompanyInfo: builder.mutation({
      query: (rest) => ({
        url: API_UPDATE_COMPANY_INFOR,
        method: "PATCH",
        data: rest,
        headers:{"Content-Type": "multipart/form-data"}
      }),
      
      prepareHeaders: (headers) => {
        headers.set("Content-Type", "multipart/form-data")
          return headers
      },
      invalidatesTags: ["CompanyInfor"],
    }),

    getImage: builder.query({
      query: (item) => ({
        url: `${API_GET_IMAGE}`,
        method: "GET",
        params: { imagePath: item },
      }),
    }),
  }),
});

export const {
  // Thông tin công ty
  useGetCompanyInfoQuery,
  useGetCompanyInfoIdSQuery,
  useGetJobCategoriesQuery,
  useLazyGetJobCategoriesQuery,
  useGetProvinceQuery,
  useLazyGetProvinceQuery,
  useGetDistrictByProvinceIdQuery,
  useLazyGetDistrictByProvinceIdQuery,
  useUpdateCompanyInfoMutation,
  useUploadImageMutation,
  useGetImageQuery,
} = companyInforSlice;
