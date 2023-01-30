import { apiSlice } from "@/redux/api/apiSlice";
import {
  API_GET_BRANCH_BY_ID,
  API_GET_BRANCH_BY_USER,
  API_GET_JOB_CATEGORIES,
  API_GET_PROVINCE,
  API_UPDATE_BRANCH,
} from "@/routes/api";
import * as qs from "qs";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["CompanyInfor"],
});

export const companyInforSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    // Thông tin công ty
    getBranchByUser: builder.query({
      query: () => ({
        url: API_GET_BRANCH_BY_USER,
        method: "GET",
      }),
      providesTags: ["branch_by_user"],
    }),
    getBranchById: builder.mutation({
      query: (data) => ({
        url: API_GET_BRANCH_BY_ID + `/${data.ID}`,
        method: "POST",
      }),
    }),
    updateBranch: builder.mutation({
      query: (data) => ({
        url: API_UPDATE_BRANCH,
        method: "POST",
        data,
      }),
      invalidatesTags: ["branch_by_user"],
    }),

    // Lấy danh sách tỉnh / thành phố
    getProvice: builder.mutation({
      query: () => ({
        url: API_GET_PROVINCE,
        method: "POST",
        data: qs.stringify({
          PageIndex: 0,
          PageSize: 9999,
        }),
      }),
    }),

    // Lấy danh sách job category
    getJobCategories: builder.query({
      query: () => ({
        url: API_GET_JOB_CATEGORIES,
        method: "GET",
      }),
    }),
  }),
});

export const {
  // Thông tin công ty
  useGetBranchByUserQuery,
  useGetBranchByIdMutation,
  useUpdateBranchMutation,
  // Lấy danh sách tỉnh / thành phố
  useGetProviceMutation,
  // Lấy danh sách job category
  useGetJobCategoriesQuery,
} = companyInforSlice;
