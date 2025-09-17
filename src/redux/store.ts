import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./services/apiSlice";
import { verifySlice } from "./services/verifySlice";
import { orderSlice } from "./services/orderSlice";
import { userManagementSlice } from "./services/userManagementSlice";
import { categorySlice } from "./services/categorySlice";
import { productSlice } from "./services/productSlice";
import { contentSlice } from "./services/contentSlice";
import { couponSlice } from "./services/couponSlice";
import { authApi } from "./services/authSlice";
import { giftCardSlice } from "./services/giftCardSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer, // Add auth reducer
    [apiSlice.reducerPath]: apiSlice.reducer, // Add API slice reducer
    [authApi.reducerPath]: authApi.reducer, // Add auth API reducer
    [verifySlice.reducerPath]: verifySlice.reducer,
    [orderSlice.reducerPath]: orderSlice.reducer,
    [userManagementSlice.reducerPath]: userManagementSlice.reducer,
    [categorySlice.reducerPath]: categorySlice.reducer,
    [productSlice.reducerPath]: productSlice.reducer,
    [contentSlice.reducerPath]: contentSlice.reducer,
    [couponSlice.reducerPath]: couponSlice.reducer,
    [giftCardSlice.reducerPath]: giftCardSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware).concat(authApi.middleware).concat(verifySlice.middleware).concat(orderSlice.middleware).concat(userManagementSlice.middleware).concat(categorySlice.middleware).concat(productSlice.middleware).concat(contentSlice.middleware).concat(couponSlice.middleware).concat(giftCardSlice.middleware), // Add RTK Query middleware
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
