import { apiSlice } from "@/redux/api/apiSlice";
import {
  API_ADD_JOBTYPE,
  API_DELETE_JOBTYPE,
  API_GET_APPLICANT_USERS_ON_JOBTYPE, API_GET_COLUMN_JOBTYPE, API_GET_DETAIL_JOB_POSITION,
  API_GET_PAGING_JOBTYPE,
  API_GET_PREVIEW_JOBTYPE,
  API_UPDATE_COLUMN_JOBTYPE,
  API_UPDATE_JOBTYPE,
  API_UPDATE_STATUS_JOBTYPE,
} from "@/routes/api";
import * as qs from "qs";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["JobPosition", "GetColumn"],
});

const evaluationFormSlice = apiWithTag.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    //Danh sách vị trí
    getAllJobType: builder.query({
      query: (params) => ({
        url: `${API_GET_PAGING_JOBTYPE}?${qs.stringify(params, {arrayFormat: 'repeat'})}`,
        method: "GET",
      }),
      providesTags:["JobPosition"],
    }),
    getJobPositionById: builder.query({
      query: (params) => ({
        url: API_GET_DETAIL_JOB_POSITION,
        method: "GET",
        params
      }),
      providesTags:["JobPosition"],
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
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["JobPosition"],
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
        method: "DELETE",
        data: data
      }),
      invalidatesTags: ["JobPosition"],
    }),
    addJobType: builder.mutation({
      query: (data) => ({
        url: API_ADD_JOBTYPE,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["JobPosition"],
    }),
    updateJobType: builder.mutation({
      query: (data) => ({
        url: `${API_UPDATE_JOBTYPE}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: ["JobPosition"],
    }),
    //settings
    getListColumns: builder.query({
      query: () => ({
        url: API_GET_COLUMN_JOBTYPE,
        method: "GET",
      }),
      providesTags: ["GetColumn"],
    }),
    updateListColumns: builder.mutation({
      query: (data) => ({
        url: `${API_UPDATE_COLUMN_JOBTYPE}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      providesTags: ["UpdateColumn"],
      invalidatesTags: ["GetColumn"],
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
  useGetListColumnsQuery,
  useUpdateListColumnsMutation
} = evaluationFormSlice;
