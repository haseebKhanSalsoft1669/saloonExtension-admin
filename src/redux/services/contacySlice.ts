import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constants/api';
import { prepareHeaders } from '../prepareHeaders';

export const contactSlice = createApi({
    reducerPath: 'contactSlice',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + "/contactUs", credentials: 'include', prepareHeaders }),

    endpoints: (builder) => ({

        contactUs: builder.mutation({
            query: (body) => ({
                url: "/addContactUs",
                method: "POST",
                body,
            }),
        }),



    }),
})

export const {
    useContactUsMutation
} = contactSlice
