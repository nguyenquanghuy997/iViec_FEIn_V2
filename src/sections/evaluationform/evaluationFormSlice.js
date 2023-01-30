import { apiSlice } from "@/redux/api/apiSlice";
import {
  API_ADD_REVIEW_FORM,
  API_DELETE_REVIEW_FORM,
  API_GET_ALL_REVIEW_FORM,
  API_GET_ALL_REVIEW_FORM_OWNER,
  API_SET_DEFAULT_REVIEW_FORM,
  API_UPDATE_REVIEW_FORM,
} from "@/routes/api";
import * as qs from "qs";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["CompanyInfor"],
});

const evaluationFormSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviewForm: builder.mutation({
      query: (data) => ({
        url: API_GET_ALL_REVIEW_FORM,
        method: "POST",
        data: qs.stringify(data),
      }),
    }),
    getAllReviewFormOwner: builder.query({
      query: () => ({
        url: API_GET_ALL_REVIEW_FORM_OWNER,
        method: "GET",
      }),
    }),
    setDefaultReviewForm: builder.mutation({
      query: (data) => ({
        url: API_SET_DEFAULT_REVIEW_FORM,
        method: "POST",
        data: qs.stringify(data),
      }),
    }),
    addReviewForm: builder.mutation({
      query: (data) => ({
        url: API_ADD_REVIEW_FORM,
        method: "POST",
        data: qs.stringify(data),
      }),
    }),
    updateReviewForm: builder.mutation({
      query: (data) => ({
        url: API_UPDATE_REVIEW_FORM,
        method: "POST",
        data: qs.stringify(data),
      }),
    }),
    deleteReviewForm: builder.mutation({
      query: (data) => ({
        url: API_DELETE_REVIEW_FORM,
        method: "POST",
        data: qs.stringify(data),
      }),
    }),
  }),
});

export const {
  useGetAllReviewFormMutation,
  useGetAllReviewFormOwnerQuery,
  useSetDefaultReviewFormMutation,
  useAddReviewFormMutation,
  useUpdateReviewFormMutation,
  useDeleteReviewFormMutation,
} = evaluationFormSlice;
