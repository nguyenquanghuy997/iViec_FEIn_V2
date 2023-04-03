import { apiSlice } from "@/redux/api/apiSlice";
import {
  API_GET_ORGANIZATION,
} from "@/routes/api";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["Report"],
});

export const reportSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    // Lấy danh sách phòng ban
    getOrganization: builder.query({
      query: () => ({
        url: API_GET_ORGANIZATION,
        method: "GET",
      }),
    }),

    // Báo cáo kết quả tuyển dụng
    reportRecurimentChart: builder.mutation({
      query: (data) => ({
        url: '',
        method: "POST",
        data,
      }),
      invalidatesTags: ["Report"],
    }),
    reportRecurimentTable: builder.mutation({
      query: (data) => ({
        url: '',
        method: "POST",
        data,
      }),
      invalidatesTags: ["Report"],
    }),
    reportRecurimentItemChart: builder.mutation({
      query: (data) => ({
        url: '',
        method: "POST",
        data,
      }),
      invalidatesTags: ["Report"],
    }),
    reportRecurimentItemTable: builder.mutation({
      query: (data) => ({
        url: '',
        method: "POST",
        data,
      }),
      invalidatesTags: ["Report"],
    }),

    // Báo cáo tỷ lệ chuyển đổi ứng viên
    reportConversionChart: builder.mutation({
      query: (data) => ({
        url: '',
        method: "POST",
        data,
      }),
      invalidatesTags: ["Report"],
    }),
    reportConversionTable: builder.mutation({
      query: (data) => ({
        url: '',
        method: "POST",
        data,
      }),
      invalidatesTags: ["Report"],
    }),
    reportConversionItemChart: builder.mutation({
      query: (data) => ({
        url: '',
        method: "POST",
        data,
      }),
      invalidatesTags: ["Report"],
    }),
    reportConversionItemTable: builder.mutation({
      query: (data) => ({
        url: '',
        method: "POST",
        data,
      }),
      invalidatesTags: ["Report"],
    }),

    // Báo cáo ứng viên theo thời gian
    reportOverTimeChart: builder.mutation({
      query: (data) => ({
        url: '',
        method: "POST",
        data,
      }),
      invalidatesTags: ["Report"],
    }),
    reportOverTimeTable: builder.mutation({
      query: (data) => ({
        url: '',
        method: "POST",
        data,
      }),
      invalidatesTags: ["Report"],
    }),
    reportOverTimeItemChart: builder.mutation({
      query: (data) => ({
        url: '',
        method: "POST",
        data,
      }),
      invalidatesTags: ["Report"],
    }),
    reportOverTimeItemTable: builder.mutation({
      query: (data) => ({
        url: '',
        method: "POST",
        data,
      }),
      invalidatesTags: ["Report"],
    }),

    // Báo cáo theo dõi tin tuyển dụng
    reportTrackingChart: builder.mutation({
      query: (data) => ({
        url: '',
        method: "POST",
        data,
      }),
      invalidatesTags: ["Report"],
    }),
    reportTrackingTable: builder.mutation({
      query: (data) => ({
        url: '',
        method: "POST",
        data,
      }),
      invalidatesTags: ["Report"],
    }),
    reportTrackingItemChart: builder.mutation({
      query: (data) => ({
        url: '',
        method: "POST",
        data,
      }),
      invalidatesTags: ["Report"],
    }),
    reportTrackingItemTable: builder.mutation({
      query: (data) => ({
        url: '',
        method: "POST",
        data,
      }),
      invalidatesTags: ["Report"],
    }),
  }),
});

export const {
  // Lấy danh sách phòng ban
  useGetOrganizationQuery,

  // Báo cáo kết quả tuyển dụng
  useReportRecurimentChartMutation,
  useReportRecurimentTableMutation,
  useReportRecurimentItemChartMutation,
  useReportRecurimentItemTableMutation,

  // Báo cáo tỷ lệ chuyển đổi ứng viên
  useReportConversionChartMutation,
  useReportConversionTableMutation,
  useReportConversionItemChartMutation,
  useReportConversionItemTableMutation,

  // Báo cáo ứng viên theo thời gian
  useReportOverTimeChartMutation,
  useReportOverTimeTableMutation,
  useReportOverTimeItemChartMutation,
  useReportOverTimeItemTableMutation,

  // Báo cáo theo dõi tin tuyển dụng
  useReportTrackingChartMutation,
  useReportTrackingTableMutation,
  useReportTrackingItemChartMutation,
  useReportTrackingItemTableMutation,
} = reportSlice;
