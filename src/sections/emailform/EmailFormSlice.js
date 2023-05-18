import { apiSlice } from "@/redux/api/apiSlice";
import {
  API_CREATE_EMAIL_TEMPLATE,
  API_DELETE_EMAIL_TEMPLATE,
  API_GET_EMAIL_TEMPLATE,
  API_UPDATE_EMAIL_TEMPLATE,
} from "@/routes/api";
import * as qs from "qs";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["emailProcess"],
});

const emailFormSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getAllEmailTemplate: builder.query({
      query: (params) => ({
        url: `${API_GET_EMAIL_TEMPLATE}?${qs.stringify(params, {
          arrayFormat: "repeat",
        })}`,
        method: "GET",
      }),
      providesTags: ["emailProcess"],
    }),
    addEmailTemplate: builder.mutation({
      query: (data) => ({
        url: API_CREATE_EMAIL_TEMPLATE,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["emailProcess"],
    }),
    updateEmailTemplate: builder.mutation({
      query: (data) => ({
        url: `${API_UPDATE_EMAIL_TEMPLATE}/${data.id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["emailProcess"],
    }),
    deleteEmailTemplate: builder.mutation({
      query: (ids) => ({
        url: `${API_DELETE_EMAIL_TEMPLATE}`,
        method: "DELETE",
        data: ids,
      }),
      invalidatesTags: ["emailProcess"],
    }),
  }),
});

export const {
  useGetAllEmailTemplateQuery,
  useAddEmailTemplateMutation,
  useUpdateEmailTemplateMutation,
  useDeleteEmailTemplateMutation,
} = emailFormSlice;
