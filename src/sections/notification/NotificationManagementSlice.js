import { apiSlice } from "@/redux/api/apiSlice";
import {
  API_GET_ALL_NOTIFICATION_MANAGEMENT,
  API_GET_NOTIFICATION_MANAGEMENT,
  API_GET_VISIBLE_NOTIFICATION_MANAGEMENT,
  API_UPDATE_NOTIFICATION_MANAGEMENT,
  API_UPDATE_STATUS_NOTIFICATION_MANAGEMENT,
  API_UPDATE_VISIBLE_NOTIFICATION_MANAGEMENT
} from "@/routes/api";
import * as qs from "qs";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["notifcationManager", "GetColumnNotification"],
});

const notificationSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotifcations: builder.query({
      query: (params) => ({
        url: `${API_GET_ALL_NOTIFICATION_MANAGEMENT}?${qs.stringify(params, {arrayFormat: 'repeat'})}`,
        method: "GET",
      }),
      providesTags: ["notifcationManager"]
    }),
    getNotifcationManagement: builder.query({
      query: (data) => ({
        url: `${API_GET_NOTIFICATION_MANAGEMENT}?${qs.stringify(data)}`,
        method: "GET",
      }),
    }),
    updateNotification: builder.mutation({
      query: (data) => ({
        url: `${API_UPDATE_NOTIFICATION_MANAGEMENT}/${data.id}`,
        method: "PATCH",
        data
      }),
      invalidatesTags: ["notifcationManager"]
    }),
    getListNotificationColumns: builder.query({
      query: () => ({
        url: API_GET_VISIBLE_NOTIFICATION_MANAGEMENT,
        method: "GET",
      }),
      providesTags: ["GetColumnNotification"],
    }),
    updateListNotificationColumns: builder.mutation({
      query: (data) => {
        const { id, ...restData } = data;
        return {
          url: `${API_UPDATE_VISIBLE_NOTIFICATION_MANAGEMENT}/${id}`,
          method: "PATCH",
          data: restData,
        }
      },
      invalidatesTags: ["GetColumnNotification"],
    }),
    updateStatusNotification: builder.mutation({
      query: (data) => ({
        url: API_UPDATE_STATUS_NOTIFICATION_MANAGEMENT,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["notifcationManager"],
    }),
  }),
});

export const {
  useGetAllNotifcationsQuery,
  useGetNotifcationManagementQuery,
  useGetListNotificationColumnsQuery,
  useUpdateNotificationMutation,
  useUpdateListNotificationColumnsMutation,
  useUpdateStatusNotificationMutation,
} = notificationSlice;
