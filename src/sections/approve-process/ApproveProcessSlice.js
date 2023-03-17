import {apiSlice} from "@/redux/api/apiSlice";
import {
    API_CREATE_APPROVE_PROCESS,
    API_UPDATE_APPROVE_PROCESS,
    API_DELETE_APPROVE_PROCESS,
    API_GET_APPROVE_PROCESSES,
    API_GET_APPROVE_PROCESS
} from "@/routes/api";
import * as qs from "qs";
const apiWithTag = apiSlice.enhanceEndpoints({
    addTagTypes: ["ApprovalProcess", "Filter"],
});

const approveProcessFormSlice = apiWithTag.injectEndpoints({
    endpoints: (builder) => ({
        //Danh sách quy trình phê duyệt
        getAllApproveProcess: builder.query({
            query: (params) => ({
                url: `${API_GET_APPROVE_PROCESSES}?${qs.stringify(params, {arrayFormat: 'repeat'})}`,
                method: "GET",
            }),
            providesTags: ["AllProcess"]
        }),
        getPreviewApproveProcess: builder.query({
            query: (data) => ({
                url: `${API_GET_APPROVE_PROCESS}?${qs.stringify(data)}`,
                method: "GET",
            }),
        }),
        deleteApproveProcess: builder.mutation({
            query: (id) => ({
                url: `${API_DELETE_APPROVE_PROCESS}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["AllProcess"]
        }),
        addApproveProcess: builder.mutation({
            query: (data) => ({
                url: API_CREATE_APPROVE_PROCESS,
                method: "POST",
                data: data,
            }),
            invalidatesTags: ["AllProcess"]
        }),
        updateApproveProcess: builder.mutation({
            query: (data) => ({
                url: `${API_UPDATE_APPROVE_PROCESS}/${data.id}`,
                method: "PATCH",
                data,
            }),
            invalidatesTags: ["AllProcess"]
        }),
    }),
});

export const {
    useGetAllApproveProcessQuery,
    useGetPreviewApproveProcessQuery,
    useDeleteApproveProcessMutation,
    useAddApproveProcessMutation,
    useUpdateApproveProcessMutation,
} = approveProcessFormSlice;
