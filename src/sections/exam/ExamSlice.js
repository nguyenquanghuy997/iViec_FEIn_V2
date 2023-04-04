import { apiSlice } from "@/redux/api/apiSlice";
import {API_GET_EXAMINATION, API_GET_EXAMINATION_BY_ID} from "@/routes/api";

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
      transformResponse: (response) => {
        return response?.items.map(item => ({
          value: item.id,
          label: item.name,
        }))
      },
    }),
    getExaminationById: builder.query({
      query: (params) => ({
        url: API_GET_EXAMINATION_BY_ID,
        method: "GET",
        params
      }),
    }),
  }),
});

export const {
  useGetAllExaminationQuery,
  useGetExaminationByIdQuery,
} = examinationSlice;
