import { apiSlice } from "@/redux/api/apiSlice";
import {
  API_ADD_JOBTYPE,
  API_DELETE_JOBTYPE,
  API_GET_APPLICANT_USERS_ON_JOBTYPE, API_GET_DETAIL_JOB_POSITION,
  API_GET_PAGING_JOBTYPE,
  API_GET_PREVIEW_JOBTYPE,
  API_UPDATE_JOBTYPE,
  API_UPDATE_STATUS_JOBTYPE,
} from "@/routes/api";
import * as qs from "qs";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["JobPosition", "Filter"],
});

const evaluationFormSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    //Danh sách vị trí
    getAllJobType: builder.query({
      query: (params) => ({
        url: `${API_GET_PAGING_JOBTYPE}?${qs.stringify(params, {arrayFormat: 'repeat'})}`,
        method: "GET",
      }),
    }),
    getJobPositionById: builder.query({
      query: (params) => ({
        url: API_GET_DETAIL_JOB_POSITION,
        method: "GET",
        params
      }),
    }),

    // filter người tạo
    getApplicantUsersOnJobtype: builder.query({
      query: (params) => ({
        url: API_GET_APPLICANT_USERS_ON_JOBTYPE,
        method: "GET",
        params,
      }),
    }),

    updateStatusJobType: builder.mutation({
      query: (data) => ({
        url: API_UPDATE_STATUS_JOBTYPE,
        method: "POST",
        data: qs.stringify(data),
      }),
    }),
    getPreviewJobType: builder.mutation({
      query: (data) => ({
        url: API_GET_PREVIEW_JOBTYPE,
        method: "POST",
        data: qs.stringify(data),
      }),
    }),
    deleteJobType: builder.mutation({
      query: (data) => ({
        url: API_DELETE_JOBTYPE,
        method: "POST",
        data: qs.stringify(data),
      }),
    }),
    addJobType: builder.mutation({
      query: (data) => ({
        url: API_ADD_JOBTYPE,
        method: "POST",
        data: data,
      }),
    }),
    updateJobType: builder.mutation({
      query: (data) => ({
        url: API_UPDATE_JOBTYPE,
        method: "POST",
        data: data,
      }),
    }),
  }),
});

export const {
  useGetAllJobTypeQuery,
  useGetJobPositionByIdQuery,
  useLazyGetAllJobTypeQuery,
  useLazyGetApplicantUsersOnJobtypeQuery,
  useUpdateStatusJobTypeMutation,
  useGetPreviewJobTypeMutation,
  useDeleteJobTypeMutation,
  useAddJobTypeMutation,
  useUpdateJobTypeMutation,
} = evaluationFormSlice;
