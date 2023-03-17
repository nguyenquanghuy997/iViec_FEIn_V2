import { apiSlice } from '@/redux/api/apiSlice'
import {
  API_GET_INTERNAL_GET_WAITING_APPROVAL_RECRUITMANT,
  API_GET_ORGANIZATION_WITH_CHILD,
  API_GET_RECRUITMENT_BY_ID,
  API_GET_USER_FROM_ORGANIZATION,
} from '@/routes/api'
import * as qs from "qs";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ['RecruitmentAd'],
})

export const RecruitmentAdSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getRecruitmentAd: builder.query({
      query: (params) => ({
        url: `${API_GET_INTERNAL_GET_WAITING_APPROVAL_RECRUITMANT}?${qs.stringify(params, {arrayFormat: 'repeat'})}`,
        method: "GET",
      }),
    }),
    getRecruitmentAdById: builder.query({
      query: (params) => ({
        url: API_GET_RECRUITMENT_BY_ID,
        method: 'GET',
        params
      }),
    }),
    //filter
    getOrganizationsDataWithChild: builder.query({
      query: (params) => ({
        url: API_GET_ORGANIZATION_WITH_CHILD,
        method: 'GET',
        params
      }),
      providesTags: ['RecruitmentAd']
    }),
    // get all user from organization
    getAllUserFromOrganization: builder.query({
      query: (params) => ({
        url: API_GET_USER_FROM_ORGANIZATION,
        method: "GET",
        params,
      }),
      transformResponse: (response) => {
        return response?.items.map(item => ({
          ...item,
          value: item.id,
          name: `${item?.lastName} ${item?.firstName}`,
          label: `${item?.lastName} ${item?.firstName}`,
        }))
      },
    }),
  }),
})

export const {
  useLazyGetRecruitmentAdQuery,
  useGetRecruitmentAdByIdQuery,
  useGetOrganizationsDataWithChildQuery,
  useGetAllUserFromOrganizationQuery
} = RecruitmentAdSlice
