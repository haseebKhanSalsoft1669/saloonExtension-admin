import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "../prepareHeaders";
import { BASE_URL } from "../../constants/api";


export const fuelSlice = createApi({
    reducerPath: "fuelSlice",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + "/fuel", prepareHeaders }),

    endpoints: (builder) => ({
        getFuelTypes: builder.query({
            query: () => "/getFuelTypes",
        }),
    }),
});

export const { useGetFuelTypesQuery } = fuelSlice;


