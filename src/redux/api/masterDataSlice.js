import qs from 'query-string';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from "@/redux/api/apiSlice";

import {
  API_GET_PROVINCE,
  API_GET_DISTRICT,
  API_GET_DISTRICT_DETAIL,
} from "@/routes/api";

export const masterDataSlice = createApi({
  reducerPath: 'masterDataApi',
  tagTypes: ['MasterData'],
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    // Danh sách tỉnh thành
    getProvinces: builder.query({
      query: (data) => ({
        url: API_GET_PROVINCE + '?' + qs.stringify(data),
      }),
      providesTags: [{ type: 'MasterData', id: 'PROVINCES' }],
    }),

    // Danh sách quận/huyện
    getDistricts: builder.query({
      query: (params = {}) => ({
        url: API_GET_DISTRICT + '?' + qs.stringify(params),
      }),
      providesTags: [{ type: 'MasterData', id: 'DISTRICTS' }],
    }),

    getDistrict: builder.query({
      query: (id) => ({
        url: API_GET_DISTRICT_DETAIL + '?Id=' + id,
      }),
    })
  }),
});

export const {
  useGetProvincesQuery,
  useGetDistrictsQuery,
  useGetDistrictQuery,
} = masterDataSlice;