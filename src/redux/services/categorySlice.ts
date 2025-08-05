import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constants/api';
import { prepareHeaders } from '../prepareHeaders';

export const categorySlice = createApi({
    reducerPath: 'categorySlice',
    tagTypes: ['category'],
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + "/category", credentials: 'include', prepareHeaders }),
    refetchOnMountOrArgChange: true,

    endpoints: (builder) => ({

        addCategory: builder.mutation({
            query: (body) => ({
                url: "/add-category",
                method: "POST",
                body,
            }),
        }),
        getAllCategories: builder.query({
            query: ({ page, limit, keyword ,xpro}) => ({
                url: "/get-all-categories",
                method: "GET",
                params: {
                    page,
                    limit,
                    keyword,
                    xpro
                }
            }),
            providesTags: ['category'],
        }),

        getCategoryById: builder.query({
            query: ({ id }) => ({
                url: `/get-category-by-id/${id}`,
                method: "GET",
            }),
            transformResponse: (response: any) => response.category

        }),

        updateCategory: builder.mutation({
            query: ({ id, values }) => ({
                url: `/update-category/${id}`,
                method: "PUT",
                body: { ...values },
            }),
        }),

        deleteCategory: builder.mutation({
            query: ({ id }) => ({
                url: `/delete-category/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['category'],
        }),

    }),
})

export const {
    useAddCategoryMutation,
    useGetAllCategoriesQuery,
    useGetCategoryByIdQuery,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation
} = categorySlice
