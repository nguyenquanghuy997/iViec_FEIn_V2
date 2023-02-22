import {apiSlice} from "@/redux/api/apiSlice";
import {
  API_ADD_REVIEW_FORM,
  API_DELETE_REVIEW_FORM,
  API_GET_ALL_APPLICANTS,
  API_GET_ALL_REVIEW_FORM_OWNER,
  API_GET_APPLICANT_SKILLS,
  API_GET_COLUMN_APPLICANTS,
  API_GET_FILTER_ALL_APPLICANTS,
  API_GET_LIST_JOB_SOURCE,
  API_GET_USER_FROM_ORGANIZATION,
  API_SET_DEFAULT_REVIEW_FORM,
  API_UPDATE_COLUMN_APPLICANTS,
  API_UPDATE_REVIEW_FORM,
} from "@/routes/api";
import * as qs from "qs";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["Applicant", "FilterApplicant"],
});

const ApplicantFormSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getListApplicants: builder.query({
      query: (params) => ({
        url: API_GET_ALL_APPLICANTS,
        method: 'GET',
        params
      }),
    }),
    getListColumnApplicants: builder.query({
      query: () => ({
        url: API_GET_COLUMN_APPLICANTS,
        method: 'GET',
      }),
    }),
    updateListColumnApplicants: builder.query({
      query: () => ({
        url: API_UPDATE_COLUMN_APPLICANTS,
        method: 'PATCH',
      }),
    }),
    getAllApplicantFormOwner: builder.query({
      query: () => ({
        url: API_GET_ALL_REVIEW_FORM_OWNER,
        method: "GET",
      }),
    }),
    setDefaultApplicantForm: builder.mutation({
      query: (data) => ({
        url: API_SET_DEFAULT_REVIEW_FORM,
        method: "POST",
        data: qs.stringify(data),
      }),
    }),
    addApplicantForm: builder.mutation({
      query: (data) => ({
        url: API_ADD_REVIEW_FORM,
        method: "POST",
        data: qs.stringify(data),
      }),
    }),
    updateApplicantForm: builder.mutation({
      query: (data) => ({
        url: API_UPDATE_REVIEW_FORM,
        method: "POST",
        data: qs.stringify(data),
      }),
    }),
    deleteApplicantForm: builder.mutation({
      query: (data) => ({
        url: API_DELETE_REVIEW_FORM,
        method: "POST",
        data: qs.stringify(data),
      }),
    }),

    // new
    // get all applicant with filter
    getAllFilterApplicant: builder.mutation({
      query: (data) => ({
        url: API_GET_FILTER_ALL_APPLICANTS,
        method: "POST",
        data,
      }),
      invalidatesTags: ['FilterApplicant']
    }),
    // get all skills
    getSkills: builder.query({
      query: () => ({
        url: API_GET_APPLICANT_SKILLS,
        method: "GET",
      }),
    }),
    // get all job source
    getAllJobSources: builder.query({
      query: () => ({
        url: API_GET_LIST_JOB_SOURCE,
        method: "GET",
      }),
    }),
    // get all user from organization
    getAllUserFromOrganization: builder.query({
      query: (params) => ({
        url: API_GET_USER_FROM_ORGANIZATION,
        method: "GET",
        params
      }),
    }),
  }),
});

export const {
  useGetListApplicantsQuery,
  useLazyGetListApplicantsQuery,
  useGetListColumnApplicantsQuery,
  useUpdateListColumnApplicantsQuery,
  useGetAllApplicantMutation,
  useGetAllApplicantFormOwnerQuery,
  useSetDefaultApplicantFormMutation,
  useAddApplicantFormMutation,
  useUpdateApplicantFormMutation,
  useDeleteApplicantFormMutation,
  useGetAllFilterApplicantMutation,
  // skills
  useGetSkillsQuery,
  // job sources
  useGetAllJobSourcesQuery,
  useLazyGetAllJobSourcesQuery,
  // user from organization
  useGetAllUserFromOrganizationQuery,
  useLazyGetAllUserFromOrganizationQuery,
} = ApplicantFormSlice;
