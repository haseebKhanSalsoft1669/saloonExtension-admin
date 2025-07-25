import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constants/api';

export const productSlice = createApi({
    reducerPath: 'productSlice',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + "/products", credentials: 'include' }),
    refetchOnMountOrArgChange: true,
    tagTypes: ['product' , "update"],
    endpoints: (builder) => ({

        addProduct: builder.mutation({
            query: (body) => ({
                url: "/add-product",
                method: "POST",
                body,
            }),
        }),
        getAllProducts: builder.query({
            query: ({ page, limit, keyword }) => ({
                url: "/get-all-products",
                method: "GET",
                params: {
                    page,
                    limit,
                    keyword
                }
            }),
            providesTags: ['product'],
        }),

        getProductById: builder.query({
            query: ({ id }) => ({
                url: `/get-product-by-id/${id}`,
                method: "GET",
            }),
            providesTags: ['update'],
            transformResponse: (response: any) => response.product
        }),

        updateProduct: builder.mutation({
            query: ({ id, body }) => ({
                url: `/update-product/${id}`,
                method: "PUT",
                body,
            }),
           invalidatesTags: ['update'],
        }),

        deleteProduct: builder.mutation({
            query: ({ id }) => ({
                url: `/delete-product/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['product'],
        })

    }),
})

export const {
    useAddProductMutation,
    useGetAllProductsQuery,
    useGetProductByIdQuery,
    useUpdateProductMutation,
    useDeleteProductMutation
} = productSlice
