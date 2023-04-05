import { DOMAIN_SERVER_API } from "@/config";
import {
  API_GET_JOB_CATEGORIES,
  API_GET_COMPANY_INFOR,
  API_GET_PROVINCE,
  API_GET_DISTRICT,
  API_GET_COMPANY_INFOR_BY_IDS,
  API_UPDATE_COMPANY_INFOR,
  API_UPLOAD_IMAGE,
  API_UPDATE_ORGANIZATION_HUMAN,
  API_UPDATE_ORGANIZATION_BUSINESS,
  API_UPDATE_ORGANIZATION_PIPELINE,
  API_UPDATE_ORGANIZATION_ENDING,
  API_ADD_ORGANIZATION_BUSINESS,
} from "@/routes/api";
import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";

const axiosBaseQuery =
  () =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axios({
        baseURL: DOMAIN_SERVER_API,
        url,
        method,
        data,
        params,
        headers: {
          ...headers,
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
      return { data: result.data };
    } catch (axiosError) {
      return {
        error: {
          status: axiosError?.response?.status || axiosError?.code,
          data:
            axiosError.response?.data || axiosError?.data || axiosError.message,
        },
      };
    }
  };

export const companyServiceApi = createApi({
  reducerPath: "companyServiceApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["CompanyInfor"],
  endpoints: (builder) => ({
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
    }),
    getDistrictByProvinceId: builder.query({
      query: (provinceId) => ({
        url: `${API_GET_DISTRICT}`,
        method: "GET",
        params: { ProvinceId: provinceId },
      }),
    }),
    addOrganizationBusiness: builder.mutation({
      query: (rest) => ({
        url: API_ADD_ORGANIZATION_BUSINESS,
        method: "POST",
        data: rest,
      }),
      invalidatesTags: ["CompanyInfor"],
    }),
    uploadImageCompany: builder.mutation({
      query: (rest) => ({
        url: API_UPLOAD_IMAGE,
        method: "POST",
        data: rest,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    }),
    updateCompanyInfo: builder.mutation({
      query: (rest) => ({
        url: `${API_UPDATE_COMPANY_INFOR}/${rest.id}`,
        method: "PATCH",
        data: rest,
      }),
      invalidatesTags: ["CompanyInfor"],
    }),
    updateCompanyHuman: builder.mutation({
      query: (body) => ({
        url: API_UPDATE_ORGANIZATION_HUMAN,
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: ["CompanyInfor"],
    }),
    updateCompanyBusiness: builder.mutation({
      query: (body) => ({
        url: `${API_UPDATE_ORGANIZATION_BUSINESS}/${body.organizationId}`,
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: ["CompanyInfor"],
    }),
    updateCompanyPipeline: builder.mutation({
      query: (body) => ({
        url: API_UPDATE_ORGANIZATION_PIPELINE,
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: ["CompanyInfor"],
    }),
    updateCompanyEnding: builder.mutation({
      query: (body) => ({
        url: API_UPDATE_ORGANIZATION_ENDING,
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: ["CompanyInfor"],
    }),
  }),
});

export const {
  useGetCompanyInfoQuery,
  useGetJobCategoriesQuery,
  useGetProvinceQuery,
  useGetDistrictByProvinceIdQuery,
  useUpdateCompanyInfoMutation,
  useUploadImageCompanyMutation,
  useUpdateCompanyHumanMutation,
  useUpdateCompanyBusinessMutation,
  useUpdateCompanyPipelineMutation,
  useUpdateCompanyEndingMutation,
  useAddOrganizationBusinessMutation
} = companyServiceApi;
