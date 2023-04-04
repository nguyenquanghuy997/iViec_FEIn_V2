import { apiSlice } from "@/redux/api/apiSlice";
import {
  API_ADD_REVIEW_FORM,
  API_DELETE_REVIEW_FORM,
  API_GET_ALL_REVIEW_FORM,
  API_GET_REVIEW_FORM_BY_ID,
  API_SET_DEFAULT_REVIEW_FORM,
  API_UPDATE_REVIEW_FORM,
  API_UPDATE_STATUS_REVIEW_FORM,
} from "@/routes/api";
import * as qs from "qs";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["ReviewForm"],
});

const evaluationFormSlice = apiWithTag.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    //Danh sách
    getAllReviewForm: builder.query({
      query: (params) => ({
        url: `${API_GET_ALL_REVIEW_FORM}?${qs.stringify(params, {arrayFormat: 'repeat'})}`,
        method: "GET",
      }),
      // transformResponse: (response) => response,
      providesTags:["ReviewForm"],
    }),
    getReviewFormById: builder.query({
      query: (params) => ({
        url: API_GET_REVIEW_FORM_BY_ID,
        method: 'GET',
        params
      }),
    }),
    setDefaultReviewForm: builder.mutation({
      query: (data) => ({
        url: API_SET_DEFAULT_REVIEW_FORM,
        method: "POST",
        data: qs.stringify(data),
      }),
    }),
    updateStatusReviewForm: builder.mutation({
      query: (data) => ({
        url: API_UPDATE_STATUS_REVIEW_FORM,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["ReviewForm"],
    }),
    addReviewForm: builder.mutation({
      query: (data) => ({
        url: API_ADD_REVIEW_FORM,
        method: "POST",
        data: data
      }),
      invalidatesTags: ["ReviewForm"],
    }),
    updateReviewForm: builder.mutation({
      query: (data) => ({
        url: `${API_UPDATE_REVIEW_FORM}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: ["ReviewForm"],
    }),
    deleteReviewForm: builder.mutation({
      query: (data) => ({
        url: API_DELETE_REVIEW_FORM,
        method: "DELETE",
        data: data
      }),
      invalidatesTags: ["ReviewForm"],
    }),
  }),
});

export const {
  useGetAllReviewFormQuery,
  useGetReviewFormByIdQuery,
  useUpdateStatusReviewFormMutation,
  useSetDefaultReviewFormMutation,
  useAddReviewFormMutation,
  useUpdateReviewFormMutation,
  useDeleteReviewFormMutation,
} = evaluationFormSlice;
