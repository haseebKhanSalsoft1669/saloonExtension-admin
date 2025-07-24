import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constants/api';
import { prepareHeaders } from '../prepareHeaders';

export const verifySlice = createApi({
    reducerPath: 'verifySlice',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + "/verify", credentials: 'include' , prepareHeaders }),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({


        verifyEmail: builder.mutation({
            query: (body) => ({
                url: "/verifyEmail",
                method: "POST",
                body: {
                    ...body,
                    userType: "USER"
                }
            }),
        }),

        verifyOtp: builder.mutation({
            query: ({ code, email }) => ({
                url: "/verifyRecoverCode",
                method: "POST",
                body: {
                    code,
                    email,
                    userType: "USER",
                    verificationType: "VERIFICATION",
                }
            }),
        }),


        sendVerificationCode: builder.mutation({
            query: ({ email }) => ({
                url: "/sendVerificationCode",
                method: "POST",
                body: {
                    email,
                    userType: "ADMIN"
                }
            }),
        }),

        verifyCode: builder.mutation({
            query: ({ code, email }) => ({
                url: "/verifyRecoverCode",
                method: "POST",
                body: {
                    code,
                    email,
                    userType: "ADMIN",
                    verificationType: "RESET_PASSWORD",
                }
            }),
        }),

        resetPassword: builder.mutation({
            query: ({ code, email, password }) => ({
                url: "/resetPassword",
                method: "POST",
                body: {
                    code,
                    email,
                    password,
                    userType: "ADMIN",
                    verificationType: "RESET_PASSWORD",
                }
            }),
        }),

        ChangePassword: builder.mutation({
            query: ({ oldPassword, newPassword }) => ({
                url: "/changePassword",
                method: "POST",
                body: {
                    oldPassword,
                    newPassword,
                    type: "USER",
                }
            }),
        })




    }),
})

export const {
    useVerifyEmailMutation,
    useVerifyOtpMutation,
    useSendVerificationCodeMutation,
    useVerifyCodeMutation,
    useResetPasswordMutation,
    useChangePasswordMutation
} = verifySlice
