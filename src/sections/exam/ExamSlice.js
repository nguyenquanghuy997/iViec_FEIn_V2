import { apiSlice } from "@/redux/api/apiSlice";
import {
  API_GET_QUESTION_GROUP,
  API_REMOVE_QUESTION_GROUP,
  API_UPDATE_ACTIVE_QUESTION_GROUP,
} from "@/routes/api";
import * as qs from "qs";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["EXAMINATION"],
});

const examinationSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getQuestionGroup: builder.query({
      query: (params = {}) => ({
        url: `${API_GET_QUESTION_GROUP}?${qs.stringify(params)}`,
        method: "GET",
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
  }),
});

export const {
  useLazyGetQuestionGroupQuery,
  useUpdateActiveQuestionGroupMutation,
  useRemoveQuestionGroupMutation,
} = examinationSlice;
