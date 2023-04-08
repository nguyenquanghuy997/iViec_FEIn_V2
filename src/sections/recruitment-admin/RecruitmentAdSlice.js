import { apiSlice } from "@/redux/api/apiSlice";
import {
  API_GET_INTERNAL_GET_WAITING_APPROVAL_RECRUITMANT,
  API_GET_ORGANIZATION_WITH_CHILD,
  API_GET_RECRUITMENT_BY_ID,
  API_GET_USER_FROM_ORGANIZATION,
  API_INTERNAL_APPROVAL_RECRUITMANT,
  API_REJECT_RECRUITMENT,
} from "@/routes/api";
import * as qs from "qs";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["RecruitmentAd", "GetRecruitmentAd"],
});

export const RecruitmentAdSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getRecruitmentAd: builder.query({
      query: (params) => ({
        url: `${API_GET_INTERNAL_GET_WAITING_APPROVAL_RECRUITMANT}?${qs.stringify(
          params,
          { arrayFormat: "repeat" }
        )}`,
        method: "GET",
      }),
      providesTags: ["GetRecruitmentAd"],
    }),
    getRecruitmentAdById: builder.query({
      query: (params) => ({
        url: API_GET_RECRUITMENT_BY_ID,
        method: "GET",
        params,
      }),
    }),
    //filter
    getOrganizationsDataWithChild: builder.query({
      query: (params) => ({
        url: API_GET_ORGANIZATION_WITH_CHILD,
        method: "GET",
        params,
      }),
      providesTags: ["RecruitmentAd"],
    }),
    getAllUserFromOrganization: builder.query({
      query: (params) => ({
        url: API_GET_USER_FROM_ORGANIZATION,
        method: "GET",
        params,
      }),
      transformResponse: (response) => {
        return response?.items.map((item) => ({
          ...item,
          value: item.id,
          name: `${item?.lastName} ${item?.firstName}`,
          label: `${item?.lastName} ${item?.firstName}`,
        }));
      },
    }),
    addInternalApprovalRecruitments: builder.mutation({
      query: (data) => ({
        url: API_INTERNAL_APPROVAL_RECRUITMANT,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["GetRecruitmentAd"],
    }),
    rejectRecruitment: builder.mutation({
      query: (data) => ({
        url: `${API_REJECT_RECRUITMENT}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: ["GetRecruitmentAd"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useLazyGetRecruitmentAdQuery,
  useGetRecruitmentAdQuery,
  useGetRecruitmentAdByIdQuery,
  useGetOrganizationsDataWithChildQuery,
  useGetAllUserFromOrganizationQuery,
  useAddInternalApprovalRecruitmentsMutation,
  useRejectRecruitmentMutation,
} = RecruitmentAdSlice;
