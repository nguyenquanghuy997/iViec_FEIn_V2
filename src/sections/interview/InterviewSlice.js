import { DOMAIN_SERVER_API } from "@/config";
import {
  API_POST_BOOK_CALENDAR,
  API_GET_ALL_REVIEW_FORM,
  API_GET_CALENDAR,
  API_GET_CALENDAR_DETAIL,
  API_UPDATE_CALENDAR,
  API_GET_APPLICANT_BY_PIPELINES_STATE,
  API_GET_RELATE_CALENDAR,
  API_DELETE_CALENDAR,
  API_GET_RECRUITMENT_PERSON_IN_CHARGE_IDS,
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
    getRelateCalendar: builder.query({
      query: (params) => ({
        url: API_GET_RELATE_CALENDAR,
        method: "GET",
        params,
      }),
      providesTags: ["BookCalendar"],
    }),

    getCalendar: builder.query({
      query: (params) => ({
        url: API_GET_CALENDAR,
        method: "GET",
        params
      }),
      providesTags: ["BookCalendar"],
    }),

    getReviewForm: builder.query({
      query: () => ({
        url: API_GET_ALL_REVIEW_FORM,
        method: "GET",
      }),
      providesTags: ["BookCalendar"],
    }),
    getRecruitmentPersonInChargeIds: builder.query({
      query: (params) => ({
        url: `${API_GET_RECRUITMENT_PERSON_IN_CHARGE_IDS}?RecruitmentId=${params}`, 
        method: "GET",
      }),
      providesTags: ["BookCalendar"],
    }),

    getDetailCalendars: builder.query({
      query: (params) => ({
        url: API_GET_CALENDAR_DETAIL,
        method: "GET",
        params,
      }),
      providesTags: ["BookCalendar"],
    }),
    getApplicantByPipeLine: builder.query({
      query: (params) => ({
        url: API_GET_APPLICANT_BY_PIPELINES_STATE,
        mehtod: "GET",
        params,
      }),
      providesTags: ["BookCalendar"],
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
        data: res
      }),
      invalidatesTags: ["BookCalendar"],
    }),
    deleteCalendar: builder.mutation({
      query: (data) => ({
        url: API_DELETE_CALENDAR,
        method: "DELETE",
        data: data,
      }),
      invalidatesTags: ["BookCalendar"],
    }),
  }),
});

export const {
  useAddCalendarMutation,
  useGetReviewFormQuery,
  useLazyGetRelateCalendarQuery,
  useGetCalendarQuery,
  useGetDetailCalendarsQuery,
  useGetApplicantByPipeLineQuery,
  useUpdateCalendarMutation,
  useDeleteCalendarMutation,
  useGetRecruitmentPersonInChargeIdsQuery
} = calendarServiceApi;
