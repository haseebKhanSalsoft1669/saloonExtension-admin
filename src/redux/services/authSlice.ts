import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constants/api';
import { prepareHeaders } from '../prepareHeaders';
import { loginSuccess, logout, setError } from '../slices/authSlice';
import { LoginResponse } from '../slices/authSlice';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + "/auth", credentials: 'include', prepareHeaders }),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, { email: string; password: string }>({
            query: (body) => ({
                url: "/login",
                method: "POST",
                body: { ...body, role: "admin" },
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(loginSuccess(data));
                } catch {
                    dispatch(setError('Login failed. Please check your credentials.'));
                }
            },
        }),

        register: builder.mutation({
            query: (body) => ({
                url: "/register",
                method: "POST",
                body: { ...body, role: "admin" },
            }),
        }),

        logout: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "POST",
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(logout());
                } catch {
                    // Even if logout API fails, clear local state
                    dispatch(logout());
                }
            },
        }),

        updateProfile: builder.mutation({
            query: (body) => ({
                url: "/updateProfile",
                method: "PUT",
                body,
            }),
        }),

        forgetPassword: builder.mutation({
            query: (body) => ({
                url: "/forgot-password",
                method: "POST",
                body: { ...body, role: "admin" },
            }),
        }),
        verifyOtp: builder.mutation({
            query: (body) => ({
                url: "/verify-otp",
                method: "POST",
                body: { ...body, role: "admin" },
            }),
        }),

        resetPassword: builder.mutation({
            query: (body) => ({
                url: "/reset-password",
                method: "POST",
                body: { ...body, role: "admin" },
            }),
        }),



    }),
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useUpdateProfileMutation,
    useForgetPasswordMutation,
    useVerifyOtpMutation,
    useResetPasswordMutation
} = authApi
