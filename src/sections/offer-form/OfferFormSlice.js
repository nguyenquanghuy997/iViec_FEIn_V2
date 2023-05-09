import { apiSlice } from "@/redux/api/apiSlice";
import {
  API_CREATE_OFFER_TEMPLATE,
  API_GET_OFFER_TEMPLATE,
  API_GET_OFFER_TEMPLATES,
  API_UPDATE_OFFER_TEMPLATE
} from "@/routes/api";
import * as qs from "qs";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["offerProcess"],
});

const offerFormSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getAllOfferTemplate: builder.query({
      query: (params) => ({
        url: `${API_GET_OFFER_TEMPLATE}}?${qs.stringify(params, {arrayFormat: 'repeat'})}`,
        method: "GET",
      }),
    }),
    getPreviewOfferTemplate: builder.query({
      query: (data) => ({
        url: `${API_GET_OFFER_TEMPLATES}?${qs.stringify(data)}`,
        method: "GET",
      }),
      providesTags: ["offerProcess"]
    }),
    // deleteOfferTemplate: builder.mutation({
    //   query: (id) => ({
    //     url: `${API_DELETE_APPROVE_PROCESS}/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["offerProcess"]
    // }),
    addOfferTemplate: builder.mutation({
      query: (data) => ({
        url: API_CREATE_OFFER_TEMPLATE,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["AllProcess"]
    }),
    updateOfferTemplate: builder.mutation({
      query: (data) => ({
        url: `${API_UPDATE_OFFER_TEMPLATE}/${data.id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["AllProcess"]
    }),
    // setApproveProcessAvailable: builder.mutation({
    //   query: (data) => ({
    //     url: `${API_SET_AVAILABLE_APPROVE_PROCESS}/${data.id}`,
    //     method: "PATCH",
    //     data,
    //   }),
    //   invalidatesTags: ["AllProcess"]
    // }),
  }),
});

export const {
  useGetAllOfferTemplateQuery,
  useGetPreviewOfferTemplateQuery,
  useAddOfferTemplateMutation,
  useUpdateOfferTemplateMutation,
} = offerFormSlice;
