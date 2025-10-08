import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constants/api';
import { prepareHeaders } from '../prepareHeaders';

export const communitySlice = createApi({
    reducerPath: 'communitySlice',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + "/posts", credentials: 'include', prepareHeaders }),

    endpoints: (builder) => ({
         getAllPosts: builder.query({
            query: ({ page, limit , keyword}) => ({
                url: `/get-all-post`,
                method: "GET",
                 params: {
                    page,
                    limit,
                    keyword
                }
                
            }),
        })


    }),
})

export const {
    useGetAllPostsQuery
} = communitySlice
