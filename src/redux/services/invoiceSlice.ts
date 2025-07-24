import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constants/api';
import { prepareHeaders } from '../prepareHeaders';


export const invoiceSlice = createApi({
    reducerPath: 'invoiceSlice',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + "/invoice", credentials: 'include' ,prepareHeaders}),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({




        getInvoices: builder.query({
            query: ({ page, limit }) => ({
                url: `/getInvoices?page=${page}&limit=${limit}`,
                method: "GET",
            }),
        })



    }),
})

export const {
    useGetInvoicesQuery
} = invoiceSlice
