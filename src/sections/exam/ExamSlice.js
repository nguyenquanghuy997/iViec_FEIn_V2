import { apiSlice } from "@/redux/api/apiSlice";
import {
  API_CREATE_QUESTION,
  API_CREATE_QUESTION_GROUP,
  API_GET_EXAMINATION,
  API_GET_EXAMINATION_BY_ID,
  API_GET_QUESTIONS,
  API_GET_QUESTION_GROUP,
  API_GET_QUESTION_VISIBLE,
  API_REMOVE_QUESTION,
  API_REMOVE_QUESTION_GROUP,
  API_UPDATE_ACTIVE_QUESTION,
  API_UPDATE_ACTIVE_QUESTION_GROUP,
  API_UPDATE_QUESTION,
  API_UPDATE_QUESTION_GROUP,
  API_UPDATE_QUESTION_VISIBLE,
} from "@/routes/api";
import * as qs from "qs";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["EXAMINATION"],
});

const examinationSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getAllExamination: builder.query({
      query: () => ({
        url: API_GET_EXAMINATION,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response?.items.map((item) => ({
          value: item.id,
          label: item.name,
        }));
      },
    }),
    getExaminationById: builder.query({
      query: (params) => ({
        url: API_GET_EXAMINATION_BY_ID,
        method: "GET",
        params,
      }),
    }),
    getQuestionGroup: builder.query({
      query: (params = {}) => ({
        url: `${API_GET_QUESTION_GROUP}?${qs.stringify(params)}`,
        method: "GET",
      }),
    }),
    createQuestionGroup: builder.mutation({
      query: (data) => ({
        url: API_CREATE_QUESTION_GROUP,
        method: "POST",
        data,
      }),
    }),
    updateQuestionGroup: builder.mutation({
      query: (data) => ({
        url: `${API_UPDATE_QUESTION_GROUP}/${data.id}`,
        method: "PATCH",
        data,
      }),
    }),
    updateActiveQuestionGroup: builder.mutation({
      query: (data) => ({
        url: API_UPDATE_ACTIVE_QUESTION_GROUP,
        method: "POST",
        data,
      }),
    }),
    removeQuestionGroup: builder.mutation({
      query: (data) => ({
        url: API_REMOVE_QUESTION_GROUP,
        method: "delete",
        data,
      }),
    }),
    getQuestions: builder.query({
      query: (params) => ({
        url: API_GET_QUESTIONS,
        method: "GET",
        params,
      }),
    }),
    createQuestion: builder.mutation({
      query: (data) => ({
        url: API_CREATE_QUESTION,
        method: "POST",
        data,
      }),
    }),
    updateQuestion: builder.mutation({
      query: (data) => ({
        url: `${API_UPDATE_QUESTION}/${data.id}`,
        method: "PATCH",
        data,
      }),
    }),
    getListQuestionColumns: builder.query({
      query: () => ({
        url: API_GET_QUESTION_VISIBLE,
        method: "GET",
      }),
      providesTags: ["GetColumn"],
    }),
    updateQuestionColumns: builder.mutation({
      query: (data = {}) => {
        let { id, ...restData } = data;
        return {
          url: `${API_UPDATE_QUESTION_VISIBLE}/${id}`,
          method: "PATCH",
          data: restData,
        };
      },
      invalidatesTags: [{ type: "QUESTION", id: "LIST_COLUMN" }],
    }),
    updateActiveQuestion: builder.mutation({
      query: (data) => ({
        url: API_UPDATE_ACTIVE_QUESTION,
        method: "patch",
        data,
      }),
    }),
    removeQuestion: builder.mutation({
      query: (data) => ({
        url: API_REMOVE_QUESTION,
        method: "delete",
        data,
      }),
    }),
  }),
});

export const {
  useGetAllExaminationQuery,
  useGetExaminationByIdQuery,
  useLazyGetQuestionGroupQuery,
  useCreateQuestionGroupMutation,
  useUpdateQuestionGroupMutation,
  useUpdateActiveQuestionGroupMutation,
  useRemoveQuestionGroupMutation,
  useLazyGetQuestionsQuery,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useGetListQuestionColumnsQuery,
  useUpdateQuestionColumnsMutation,
  useUpdateActiveQuestionMutation,
  useRemoveQuestionMutation,
} = examinationSlice;
