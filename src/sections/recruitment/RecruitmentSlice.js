import {apiSlice} from "@/redux/api/apiSlice";
import {
  API_GET_LIST_RECRUITMENT,
  API_GET_RECRUITMENT_BY_ORGANIZATION
} from "@/routes/api";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["Recruitment"],
});

const RecruitmentSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getRecruitments: builder.query({
      query: (params) => ({
        url: API_GET_LIST_RECRUITMENT,
        method: 'GET',
        params
      }),
      providesTags: ['Recruitment']
    }),
    getRecruitmentByOrganization: builder.query({
      query: (params) => ({
        url: API_GET_RECRUITMENT_BY_ORGANIZATION,
        method: 'GET',
        params
      }),
      providesTags: ['Recruitment']
    }),
  })
});

export const {
  // get list recruitment
  useGetRecruitmentsQuery,
  useLazyGetRecruitmentsQuery,
  // get list recruitment by organization
  useFetRecruitmentByOrganizationQuery,
  useLazyGetRecruitmentByOrganizationQuery
} = RecruitmentSlice;
