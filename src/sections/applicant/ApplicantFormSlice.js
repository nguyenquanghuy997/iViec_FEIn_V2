import { apiSlice } from "@/redux/api/apiSlice";
import {
  API_GET_ALL_APPLICANTS,
  API_GET_APPLICANTS_BY_ID,
  API_GET_COLUMN_APPLICANTS,
  API_GET_RECRUITMENTS_BY_APPLICANT,
  API_UPDATE_COLUMN_APPLICANTS,
} from "@/routes/api";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["Applicant"],
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
    getApplicantById: builder.query({
      query: ({ applicantId }) => ({
        url: `${API_GET_APPLICANTS_BY_ID}?Id=${applicantId}`,
        method: 'GET',
      }),
    }),
    getRecruitmentsByApplicant: builder.query({
      query: (params) => ({
        url: API_GET_RECRUITMENTS_BY_APPLICANT,
        method: 'GET',
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
  useGetApplicantByIdQuery,
  useGetRecruitmentsByApplicantQuery
} = ApplicantFormSlice;

// export const getJobDetail = createAsyncThunk(
//   'jobDetail/getJobDetail',
//   async ({ jobId }) => {
//     const url = `${API_LIST_JOBS}/${jobId}`
//     const response = await _getApi(url)

//     return response?.data?.success ? response.data : []
//   }
// )