import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "../prepareHeaders";
import { BASE_URL } from "../../constants/api";


export const locationSlice = createApi({
    reducerPath: "locationSlice",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + "/user", prepareHeaders }),

    endpoints: (builder) => ({
        getLocations: builder.query({
            query: () => "/getLocations",
        }),
    }),
});

export const { useGetLocationsQuery } = locationSlice;


