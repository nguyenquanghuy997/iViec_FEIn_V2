import {apiSlice} from "@/redux/api/apiSlice";
import {
    API_CREATE_QUESTION,
    API_CREATE_QUESTION_GROUP,
    API_GET_EXAMINATION,
    API_GET_EXAMINATION_BY_ID,
    API_GET_QUESTIONS,
    API_GET_QUESTION_GROUP,
    API_GET_QUESTION_VISIBLE,
    API_REMOVE_QUESTION_GROUP,
    API_UPDATE_ACTIVE_QUESTION_GROUP,
    API_UPDATE_QUESTION,
    API_UPDATE_QUESTION_GROUP,
    API_UPDATE_QUESTION_VISIBLE,
    API_GET_COLUMN_EXAMS,
    API_UPDATE_COLUMN_EXAMS,
    API_UPDATE_STATUS_EXAM,
    API_CREATE_EXAM,
    API_UPDATE_EXAM,
    API_DELETE_EXAMS,
    API_REMOVE_QUESTION,
    API_UPDATE_ACTIVE_QUESTION,
} from "@/routes/api";
import * as qs from "qs";

const apiWithTag = apiSlice.enhanceEndpoints({
    addTagTypes: ["EXAMINATION", "GetColumn"],
});

const examinationSlice = apiWithTag.injectEndpoints({
            endpoints: (builder) => ({
                getAllExamination: builder.query({
                    query: (params) => {
                        const defaultParams = {PageIndex: 1, PageSize: 10}
                        return {
                            url: API_GET_EXAMINATION,
                            method: "GET",
                            params: {...defaultParams, ...params}
                        }
                    },
                    providesTags: [{type: "EXAMINATION", id: "GetColumn"}]
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
                getListColumnExams: builder.query({
                    query: () => ({
                        url: API_GET_COLUMN_EXAMS,
                        method: "GET",
                    }),
                    providesTags: [{type: 'EXAMINATION', id: 'LIST_COLUMN'}],
                }),
                updateListColumnExams: builder.mutation({
                    query: (data = {}) => {
                        const {id, ...restData} = data;
                        return {
                            url: `${API_UPDATE_COLUMN_EXAMS}/${id}`,
                            method: "PATCH",
                            data: restData,
                        };
                    },
                    invalidatesTags: ["EXAMINATION"],
                }),
                updateStatusExam: builder.mutation({
                    query: (data) => ({
                        url: API_UPDATE_STATUS_EXAM,
                        method: "PATCH",
                        data: data,
                    }),
                    invalidatesTags: ["EXAMINATION"],
                }),
                createExam: builder.mutation({
                    query: (data) => ({
                        url: API_CREATE_EXAM,
                        method: "POST",
                        data,
                    }),
                    invalidatesTags: ["EXAMINATION"]
                }),
                updateExam: builder.mutation({
                    query: (data) => ({
                        url: `${API_UPDATE_EXAM}/${data.id}`,
                        method: "PATCH",
                        data,
                    }),
                    invalidatesTags: ["EXAMINATION"]
                }),
                deleteExam: builder.mutation({
                    query: (data) => ({
                        url: API_DELETE_EXAMS,
                        method: "DELETE",
                        data: data
                    }),
                    invalidatesTags: ["EXAMINATION"],
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
                        let {id, ...restData} = data;
                        return {
                            url: `${API_UPDATE_QUESTION_VISIBLE}/${id}`,
                            method: "PATCH",
                            data: restData,
                        };
                    },
                    invalidatesTags: [{type: "QUESTION", id: "LIST_COLUMN"}],
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
        }
    )
;

export const {
    useGetAllExaminationQuery,
    useGetExaminationByIdQuery,
    useLazyGetQuestionGroupQuery,
    useGetQuestionGroupQuery,
    useCreateQuestionGroupMutation,
    useUpdateQuestionGroupMutation,
    useUpdateActiveQuestionGroupMutation,
    useRemoveQuestionGroupMutation,
    useLazyGetQuestionsQuery,
    useCreateQuestionMutation,
    useUpdateQuestionMutation,
    useGetListQuestionColumnsQuery,
    useUpdateQuestionColumnsMutation,
    useGetListColumnExamsQuery,
    useUpdateListColumnExamsMutation,
    useUpdateStatusExamMutation,
    useCreateExamMutation,
    useUpdateExamMutation,
    useDeleteExamMutation,
    useUpdateActiveQuestionMutation,
    useRemoveQuestionMutation
} = examinationSlice;
