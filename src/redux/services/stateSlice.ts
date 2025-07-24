import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constants/api';

export const stateSlice = createApi({
    reducerPath: 'stateSlice',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + "/state", credentials: 'include' }),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({




        getStates: builder.query({
            query: ({ page, limit }) => ({
                url: `/getStates?page=${page}&limit=${limit}`,
                method: "GET",
            }),
        })



    }),
})

export const {
    useGetStatesQuery
} = stateSlice
