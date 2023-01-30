import { apiSlice } from "@/redux/api/apiSlice";
import {
  API_ADMIN_ALL_NOTIFY,
  API_GET_LIST_NOTIFICATION,
  API_MASK_READ_NOTIFICATION,
} from "@/routes/api";
import qs from "query-string";

export const notificationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminAllNotify: builder.query({
      query: (queries = {}) => ({
        url: `${API_ADMIN_ALL_NOTIFY}?${qs.stringify(queries)}`,
        method: "GET",
      }),
    }),
    getAllNotification: builder.mutation({
      query: (data) => ({
        url: API_GET_LIST_NOTIFICATION,
        method: "POST",
        data,
      }),
    }),
    maskReadNotification: builder.mutation({
      query: (id) => ({
        url: API_MASK_READ_NOTIFICATION + id,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetAdminAllNotifyQuery,
  useGetAllNotificationMutation,
  useMaskReadNotificationMutation,
} = notificationApiSlice;
