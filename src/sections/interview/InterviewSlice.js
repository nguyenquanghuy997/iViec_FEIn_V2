import { DOMAIN_SERVER_API } from "@/config";
import {
  API_POST_BOOK_CALENDAR,
  API_GET_REVIEW_FORM,
  API_GET_APPLICANT,
  API_GET_CALENDAR,
  API_GET_CALENDAR_DETAIL,
  API_UPDATE_CALENDAR,
} from "@/routes/api";
import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";

const axiosBaseQuery =
  () =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axios({
        baseURL: DOMAIN_SERVER_API,
        url,
        method,
        data,
        params,
        headers: {
          ...headers,
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
      return { data: result.data };
    } catch (axiosError) {
      return {
        error: {
          status: axiosError?.response?.status || axiosError?.code,
          data:
            axiosError.response?.data || axiosError?.data || axiosError.message,
        },
      };
    }
  };

export const calendarServiceApi = createApi({
  reducerPath: "calendarServiceApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["BookCalendar"],
  endpoints: (builder) => ({
    getApplicant: builder.query({
      query: (params) => ({
        url: API_GET_APPLICANT,
        method: "GET",
        params,
      }),
    }),
    getCalendar: builder.query({
      query: () => ({
        url: API_GET_CALENDAR,
        method: "GET",
      }),
    }),
    getReviewForm: builder.query({
      query: () => ({
        url: API_GET_REVIEW_FORM,
        method: "GET",
      }),
    }),
    getDetailCalendars: builder.query({
      query: (params) => ({
        url: API_GET_CALENDAR_DETAIL,
        method: "GET",
        params
      }),
    }),
    addCalendar: builder.mutation({
      query: (data) => ({
        url: API_POST_BOOK_CALENDAR,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["BookCalendar"],
    }),
    updateCalendar: builder.mutation({
      query: (res) => ({
        url: `${API_UPDATE_CALENDAR}/${res.id}`,
        method: "PATCH",
      }),
    }),
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
  useGetReviewFormQuery,
  useGetApplicantQuery,
  useGetCalendarQuery,
  useGetDetailCalendarsQuery,
  useUpdateCalendarMutation,
} = calendarServiceApi;
