import { apiSlice } from "@/redux/api/apiSlice";
import {
  API_GET_ALL_APPLICANTS,
  API_ADD_REVIEW_FORM,
  API_DELETE_REVIEW_FORM,
  API_GET_ALL_REVIEW_FORM_OWNER,
  API_GET_ALL_SEARCH,
  API_SET_DEFAULT_REVIEW_FORM,
  API_UPDATE_REVIEW_FORM,
} from "@/routes/api";
import * as qs from "qs";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["Applicant"],
});

const ApplicantFormSlice = apiWithTag.injectEndpoints({
  
  endpoints: (builder) => ({
    getListApplicants: builder.query({
      query: () => ({
        url: API_GET_ALL_APPLICANTS,
        method: 'GET',
      }),
    }),
    getAllApplicant: builder.mutation({
      query: (data) => ({
        url: API_GET_ALL_SEARCH,
        method: "POST",
        data: qs.stringify(data),
      }),
    }),
    getAllApplicantFormOwner: builder.query({
      query: () => ({
        url: API_GET_ALL_REVIEW_FORM_OWNER,
        method: "GET",
      }),
    }),
    setDefaultApplicantForm: builder.mutation({
      query: (data) => ({
        url: API_SET_DEFAULT_REVIEW_FORM,
        method: "POST",
        data: qs.stringify(data),
      }),
    }),
    addApplicantForm: builder.mutation({
      query: (data) => ({
        url: API_ADD_REVIEW_FORM,
        method: "POST",
        data: qs.stringify(data),
      }),
    }),
    updateApplicantForm: builder.mutation({
      query: (data) => ({
        url: API_UPDATE_REVIEW_FORM,
        method: "POST",
        data: qs.stringify(data),
      }),
    }),
    deleteApplicantForm: builder.mutation({
      query: (data) => ({
        url: API_DELETE_REVIEW_FORM,
        method: "POST",
        data: qs.stringify(data),
      }),
    }),
  }),
});

export const {
  useGetListApplicantsQuery,
  useGetAllApplicantMutation,
  useGetAllApplicantFormOwnerQuery,
  useSetDefaultApplicantFormMutation,
  useAddApplicantFormMutation,
  useUpdateApplicantFormMutation,
  useDeleteApplicantFormMutation,
} = ApplicantFormSlice;
