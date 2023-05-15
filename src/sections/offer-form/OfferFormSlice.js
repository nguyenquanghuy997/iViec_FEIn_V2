import { apiSlice } from "@/redux/api/apiSlice";
import {
  API_CREATE_OFFER_TEMPLATE, API_DELETE_OFFER_TEMPLATE,
  API_GET_OFFER_TEMPLATE, API_GET_OFFER_TEMPLATE_DEFAULT,
  API_GET_OFFER_TEMPLATES, API_GET_ORGANIZATION_USERS, API_SEND_OFFER_TEMPLATE, API_UPDATE_ACTIVE_OFFER_TEMPLATE,
  API_UPDATE_OFFER_TEMPLATE,
  API_UPLOAD_FILE_OFFER
} from "@/routes/api";
import * as qs from "qs";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["offerProcess"],
});

const offerFormSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getAllOfferTemplate: builder.query({
      query: (params) => ({
        url: `${API_GET_OFFER_TEMPLATES}?${qs.stringify(params, {arrayFormat: 'repeat'})}`,
        method: "GET",
      }),
      providesTags: ["offerProcess"]
    }),
    getAllOrganizationUser: builder.query({
      query: () => ({
        url: `${API_GET_ORGANIZATION_USERS}`,
        method: "GET",
      }),
    }),
    getPreviewOfferTemplate: builder.query({
      query: (data) => ({
        url: `${API_GET_OFFER_TEMPLATE}?${qs.stringify(data)}`,
        method: "GET",
      }),
      keepUnusedDataFor: 1,
    }),
    getDefaultOfferTemplate: builder.query({
      query: (data) => ({
        url: `${API_GET_OFFER_TEMPLATE_DEFAULT}?${qs.stringify(data)}`,
        method: "GET",
      }),
      keepUnusedDataFor: 1,
    }),
    deleteOfferTemplate: builder.mutation({
      query: (ids) => ({
        url: `${API_DELETE_OFFER_TEMPLATE}`,
        method: "DELETE",
        data: ids
      }),
      invalidatesTags: ["offerProcess"]
    }),
    addOfferTemplate: builder.mutation({
      query: (data) => ({
        url: API_CREATE_OFFER_TEMPLATE,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["offerProcess"]
    }),
    sendOfferTemplate: builder.mutation({
      query: (data) => ({
        url: API_SEND_OFFER_TEMPLATE,
        method: "POST",
        data: data,
      }),
    }),
    updateOfferTemplate: builder.mutation({
      query: (data) => ({
        url: `${API_UPDATE_OFFER_TEMPLATE}/${data.id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["offerProcess"]
    }),
    updateActiveOfferTemplate: builder.mutation({
      query: (data) => ({
        url: `${API_UPDATE_ACTIVE_OFFER_TEMPLATE}/${data.id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["offerProcess"]
    }),
    uploadImageOffer: builder.mutation({
      query: (rest) => ({
        url: API_UPLOAD_FILE_OFFER,
        method: "POST",
        data: rest,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    }),
  }),
});

export const {
  useGetAllOfferTemplateQuery,
  useGetPreviewOfferTemplateQuery,
  useGetDefaultOfferTemplateQuery,
  useGetAllOrganizationUserQuery,
  useLazyGetPreviewOfferTemplateQuery,
  useAddOfferTemplateMutation,
  useSendOfferTemplateMutation,
  useUploadImageOfferMutation,
  useUpdateOfferTemplateMutation,
  useDeleteOfferTemplateMutation,
  useUpdateActiveOfferTemplateMutation,
} = offerFormSlice;
