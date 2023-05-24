import { apiSlice } from "@/redux/api/apiSlice";
import {
    API_GET_QUESTION_GROUP,
} from "@/routes/api";
import * as qs from "qs";

const apiWithTag = apiSlice.enhanceEndpoints({
    addTagTypes: ["EXAMINATION", "GetColumn"],
});

const examFormSlice = apiWithTag.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getQuestionGroup: builder.query({
            query: (params = {}) => ({
                url: `${API_GET_QUESTION_GROUP}?${qs.stringify(params)}`,
                method: "GET",
            }),
        }),
    }),
})


export const {
    useGetQuestionGroupQuery
} = examFormSlice;
