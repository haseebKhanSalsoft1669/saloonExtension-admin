import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constants/api';
import { prepareHeaders } from '../prepareHeaders';

export const orderSlice = createApi({
    reducerPath: 'orderSlice',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + "/order", credentials: 'include', prepareHeaders }),

    endpoints: (builder) => ({

        addOrder: builder.mutation({
            query: (body) => ({
                url: "/addOrder",
                method: "POST",
                body,
            }),
        }),

        getorderById: builder.query({
            query: ({ id }) => ({
                url: `/getOrder/${id}`,
                method: "GET",
            }),
        }),

        getOrderByUser: builder.query({
            query: ({ page, limit }) => ({
                url: `/getOrderByUser?page=${page}&limit=${limit}`,
                method: "GET",
            }),
        })



    }),
})

export const {
    useAddOrderMutation,
    useGetorderByIdQuery,
    useGetOrderByUserQuery
} = orderSlice
