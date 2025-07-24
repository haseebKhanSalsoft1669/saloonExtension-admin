import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constants/api';
import { prepareHeaders } from '../prepareHeaders';

export const authSlice = createApi({
    reducerPath: 'authSlice',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + "/admin", credentials: 'include', prepareHeaders }),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: "/login",
                method: "POST",
                body,
            }),
        }),

        register: builder.mutation({
            query: (body) => ({
                url: "/register",
                method: "POST",
                body,
            }),
        }),

        updateProfile: builder.mutation({
            query: (body) => ({
                url: "/updateProfile",
                method: "PUT",
                body,
            }),
        }),

        getLocation: builder.query({
            query: () => ({
                url: "/getLocations",
                method: "GET",
            }),
        })

    }),
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useUpdateProfileMutation,
    useGetLocationQuery
} = authSlice
