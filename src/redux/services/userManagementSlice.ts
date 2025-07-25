import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constants/api';

export const userManagementSlice = createApi({
    reducerPath: 'userManagementSlice',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + "/admin/user-management", credentials: 'include' }),
    tagTypes: ['userManagement'],
    endpoints: (builder) => ({

        getAllusers: builder.query({
            query: ({ page, limit, keyword }) => ({
                url: `/get-all-users?page=${page}&limit=${limit}&keyword=${keyword}`,
                method: "GET",
            }),
        }),

        getUserById: builder.query({
            query: ({ id }) => ({
                url: `/get-user-by-id/${id}`,
                method: "GET",
            }),
            providesTags: ['userManagement'],
            transformResponse: (response: any) => response.user
        }),

        toggleUserStatus: builder.mutation({
            query: ({ id }) => ({
                url: `/toggle-user-status/${id}`,
                method: "PUT",
            }),
            invalidatesTags: ['userManagement'],
        })


    }),
})

export const {
    useGetAllusersQuery,
    useGetUserByIdQuery,
    useToggleUserStatusMutation
} = userManagementSlice
