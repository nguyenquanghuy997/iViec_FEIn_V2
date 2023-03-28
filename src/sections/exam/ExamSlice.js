import { apiSlice } from "@/redux/api/apiSlice";
import { API_GET_EXAMINATION } from "@/routes/api";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ['EXAMINATION']
});

const examinationSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getAllExamination: builder.query({
      query: () => ({
        url: API_GET_EXAMINATION,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllExaminationQuery,
} = examinationSlice;
