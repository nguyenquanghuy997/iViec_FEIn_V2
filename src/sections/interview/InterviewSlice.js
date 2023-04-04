import { apiSlice } from "@/redux/api/apiSlice";
import {
  API_POST_BOOK_CALENDAR
} from "@/routes/api";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["CompanyInfor"],
});

const PipelineFormSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    // getRoleList: builder.query({
    //   query: () => ({
    //     url: API_GET_ROLE,
    //     method: "GET",
    //   }),
    // }),

    // getRoleGroupList: builder.query({
    //   query: () => ({
    //     url: API_GET_LIST_ROLE_GROUP,
    //     method: "GET",
    //   }),
    // }),
    // getAllFilterPipeline: builder.mutation({
    //   query: () => ({
    //     url: API_GET_ALL_PIPELINE,
    //     method: "GET",
    //   }),
    // }),
    addCalendar: builder.mutation({
      query: (data) => ({
        url: API_POST_BOOK_CALENDAR,
        method: "POST",
        data: data,
      }),
    }),
    // updatePipeline: builder.mutation({
    //   query: (data) => ({
    //     url: API_UPDATE_PIPELINE,
    //     method: "POST",
    //     data: qs.stringify(data),
    //   }),
    // }),
    // deletePipeline: builder.mutation({
    //   query: (data) => ({
    //     url: API_REMOVE_ROLE_GROUP,
    //     method: "POST",
    //     data: qs.stringify(data),
    //   }),
    // }),
  }),
});

export const {
 useAddCalendarMutation,
} = PipelineFormSlice;
