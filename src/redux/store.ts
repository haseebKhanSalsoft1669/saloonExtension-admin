import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./services/apiSlice";
import { verifySlice } from "./services/verifySlice";
import { stateSlice } from "./services/stateSlice";
import { locationSlice } from "./services/locationSlice";
import { orderSlice } from "./services/orderSlice";
import { contactSlice } from "./services/contacySlice";
import { invoiceSlice } from "./services/invoiceSlice";
import { fuelSlice } from "./services/fuelSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // Add API slice reducer
    [verifySlice.reducerPath]: verifySlice.reducer,
    [stateSlice.reducerPath]: stateSlice.reducer,
    [locationSlice.reducerPath]: locationSlice.reducer,
    [orderSlice.reducerPath]: orderSlice.reducer,
    [contactSlice.reducerPath]: contactSlice.reducer,
    [invoiceSlice.reducerPath]: invoiceSlice.reducer,
    [fuelSlice.reducerPath]: fuelSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware).concat(verifySlice.middleware).concat(stateSlice.middleware).concat(locationSlice.middleware).concat(orderSlice.middleware).concat(contactSlice.middleware).concat(invoiceSlice.middleware).concat(fuelSlice.middleware), // Add RTK Query middleware
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
