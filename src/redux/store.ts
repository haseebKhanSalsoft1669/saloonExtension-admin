import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./services/apiSlice";
import { verifySlice } from "./services/verifySlice";
import { orderSlice } from "./services/orderSlice";
import { userManagementSlice } from "./services/userManagementSlice";
import { categorySlice } from "./services/categorySlice";
import { productSlice } from "./services/productSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // Add API slice reducer
    [verifySlice.reducerPath]: verifySlice.reducer,
    [orderSlice.reducerPath]: orderSlice.reducer,
    [userManagementSlice.reducerPath]: userManagementSlice.reducer,
    [categorySlice.reducerPath]: categorySlice.reducer,
    [productSlice.reducerPath]: productSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware).concat(verifySlice.middleware).concat(orderSlice.middleware).concat(userManagementSlice.middleware).concat(categorySlice.middleware).concat(productSlice.middleware), // Add RTK Query middleware
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
