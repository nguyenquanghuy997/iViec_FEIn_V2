import {apiSlice} from "@/redux/api/apiSlice";
import {
    API_CONFIRM_EMAIL,
    API_FORGET_PASSWORD,
    API_CHANGE_PASSWORD_WITH_TOKEN,
    API_REGISTER,
    API_USER_INFO,
    API_GET_APPLICATION_BY_ROLE_GROUP, API_USER_INVITE_SET_PASSWORD, API_CHANGE_PASSWORD,
} from "@/routes/api";

const apiWithTag = apiSlice.enhanceEndpoints({
    addTagTypes: ["Auth"],
});


export const authSlice = apiWithTag.injectEndpoints({
    endpoints: (builder) => ({
        // get current user login
        getCurrentUser: builder.query({
            query: () => ({
                url: API_USER_INFO,
                method: "GET",
            }),
        }),
        getApplicationByRoleGroup: builder.query({
            query: (params) => ({
                url: API_GET_APPLICATION_BY_ROLE_GROUP,
                method: "GET",
                params
            }),
        }),
        forgotPassword: builder.mutation({
            query: (data) => ({
                url: API_FORGET_PASSWORD,
                method: "POST",
                data,
            }),
        }),
        // REGISTER ORGANIZATION
        register: builder.mutation({
            query: (data) => ({
                url: API_REGISTER,
                method: "POST",
                data,
            }),
        }),
        // CONFIRM EMAIL
        confirmEmail: builder.query({
            query: (data) => ({
                url: API_CONFIRM_EMAIL,
                method: "GET",
                params: {Email: data.email, Token: data.token},
            }),
        }),
        // CHANGE PASSWORD WITH CURRENT USER LOGIN
        changePassword: builder.mutation({
            query: (data) => ({
                url: API_CHANGE_PASSWORD,
                method: "POST",
                data,
            }),
        }),
        // CHANGE PASSWORD WITH TOKEN
        changePasswordWithToken: builder.mutation({
            query: (data) => ({
                url: API_CHANGE_PASSWORD_WITH_TOKEN,
                method: "POST",
                data,
            }),
        }),
        userInviteSetPassword: builder.mutation({
            query: (data) => ({
                url: API_USER_INVITE_SET_PASSWORD,
                method: "PATCH",
                data,
            }),
        }),
    }),
    overrideExisting: true,
});

export const {
    useForgotPasswordMutation,
    useRegisterMutation,
    useLazyConfirmEmailQuery,
    useChangePasswordMutation,
    useChangePasswordWithTokenMutation,
    useGetApplicationByRoleGroupQuery,
    useUserInviteSetPasswordMutation
} = authSlice;
