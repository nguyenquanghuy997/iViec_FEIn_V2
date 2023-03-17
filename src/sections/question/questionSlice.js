import { apiSlice } from "@/redux/api/apiSlice";
import {
  API_GET_QUESTION,
  API_GET_QUESTIONS,
  API_CREATE_QUESTION,
  API_PATCH_QUESTIONS,
} from "@/routes/api";

const apiWithTag = apiSlice.enhanceEndpoints({});

const questionSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getQuestionById: builder.query({
      query: ({ questionId }) => ({
        url: `${API_GET_QUESTION}/${questionId}`,
        method: "GET",
      }),
    }),
    getAllQuestion: builder.query({
      query: () => ({
        url: API_GET_QUESTIONS,
        method: "GET",
      }),
    }),
    createQuestion: builder.mutation({
      query: ({ data }) => ({
        url: API_CREATE_QUESTION,
        method: "POST",
        data: data,
      }),
    }),
    editQuestion: builder.query({
      query: ({ data }) => ({
        url: API_PATCH_QUESTIONS,
        method: "PATCH",
        data: data,
      }),
    }),
  }),
});

export const {
  useGetQuestionByIdQuery,
  useGetAllQuestionQuery,
  useCreateQuestionMutation,
  useEditQuestionQuery,
} = questionSlice;
