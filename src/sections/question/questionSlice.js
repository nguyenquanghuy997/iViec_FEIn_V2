import { apiSlice } from "@/redux/api/apiSlice";

const apiWithTag = apiSlice.enhanceEndpoints({});

const questionSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getQuestionById: builder.query({
      query: ({ questionId }) => ({
        url: ``,
        method: "GET",
        params: { Id: questionId }
      }),
    }),
    getAllQuestion: builder.query({
      query: () => ({
        url: '',
        method: "GET",
      }),
    }),
    createQuestion: builder.mutation({
      query: ({ data }) => ({
        url: '',
        method: "POST",
        data: data,
      }),
    }),
    editQuestion: builder.query({
      query: ({ data }) => ({
        url: '',
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
