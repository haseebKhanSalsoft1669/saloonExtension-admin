import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constants/api';

export const productSlice = createApi({
    reducerPath: 'productSlice',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + "/products", credentials: 'include' }),
    tagTypes: ['product'],
    endpoints: (builder) => ({

        addProduct: builder.mutation({
            query: (body) => ({
                url: "/add-product",
                method: "POST",
                body,
            }),
        }),


    }),
})

export const {
    useAddProductMutation
} = productSlice
