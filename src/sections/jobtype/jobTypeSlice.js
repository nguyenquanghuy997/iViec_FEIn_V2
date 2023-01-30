import { apiSlice } from "@/redux/api/apiSlice";
import {
  API_ADD_JOBTYPE,
  API_DELETE_JOBTYPE,
  API_GET_PAGING_JOBTYPE,
  API_GET_PREVIEW_JOBTYPE,
  API_UPDATE_JOBTYPE,
  API_UPDATE_STATUS_JOBTYPE,
} from "@/routes/api";
import * as qs from "qs";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["CompanyInfor"],
});

const evaluationFormSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getAllJobType: builder.mutation({
      query: (data) => ({
        url: API_GET_PAGING_JOBTYPE,
        method: "POST",
        data: qs.stringify(data),
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
        data: qs.stringify(data),
      }),
    }),
    updateJobType: builder.mutation({
      query: (data) => ({
        url: API_UPDATE_JOBTYPE,
        method: "POST",
        data: qs.stringify(data),
      }),
    }),
  }),
});

export const {
  useGetAllJobTypeMutation,
  useUpdateStatusJobTypeMutation,
  useGetPreviewJobTypeMutation,
  useDeleteJobTypeMutation,
  useAddJobTypeMutation,
  useUpdateJobTypeMutation,
} = evaluationFormSlice;
