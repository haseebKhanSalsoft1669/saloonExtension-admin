import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constants/api';
import { prepareHeaders } from '../prepareHeaders';

export type Coupon = {
    _id: string;
    title: string;
    desc: string;
    start_date: string; // YYYY-MM-DD
    expire_date: string; // YYYY-MM-DD
    discount: number;
    limit: number;
    price_or_points: number;
    createdAt?: string;
    updatedAt?: string;
};

type CouponListResponse = { coupons: Coupon[]; total?: number; page?: number; limit?: number };

export const couponSlice = createApi({
    reducerPath: 'couponSlice',
    tagTypes: ['coupon', 'couponItem'],
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + '/coupen', credentials: 'include', prepareHeaders }),
    refetchOnMountOrArgChange: true,
    endpoints: (builder) => ({
        addCoupon: builder.mutation<Coupon, Partial<Coupon>>({
            query: (body) => ({ url: '/add-coupen', method: 'POST', body }),
            invalidatesTags: ['coupon'],
        }),
        getAllCoupons: builder.query<CouponListResponse, { page?: number; limit?: number; keyword?: string } | void>({
            query: (args) => {
                const params = args && Object.keys(args).length ? args : undefined;
                return { url: '/get-all-coupen', method: 'GET', params };
            },
            transformResponse: (response: any) => {
                let coupons: any[] = [];
                if (Array.isArray(response)) coupons = response;
                else if (Array.isArray(response?.coupons)) coupons = response.coupons;
                else if (Array.isArray(response?.coupens)) coupons = response.coupens;
                else if (Array.isArray(response?.data?.coupons)) coupons = response.data.coupons;
                else if (Array.isArray(response?.data?.coupens)) coupons = response.data.coupens;
                else {
                    const container = response?.data ?? response;
                    if (container && typeof container === 'object') {
                        const firstArray = Object.values(container).find((v) => Array.isArray(v));
                        if (Array.isArray(firstArray)) coupons = firstArray as any[];
                    }
                }
                const normalized = coupons.map((c) => ({ ...c, _id: c?._id ?? c?.id }));
                if (response && !Array.isArray(response)) {
                    const base = response.coupons || response.coupens ? response : response.data ? response.data : {};
                    return { ...base, coupons: normalized } as CouponListResponse;
                }
                return { coupons: normalized } as CouponListResponse;
            },
            providesTags: ['coupon'],
        }),
        getCouponById: builder.query<Coupon, string>({
            query: (id) => ({ url: `/get-coupen-by-id/${id}`, method: 'GET' }),
            transformResponse: (response: any) => response?.coupon ?? response?.coupen ?? response?.data?.coupon ?? response?.data?.coupen ?? response?.data ?? response,
            providesTags: (_r, _e, id) => [{ type: 'couponItem', id }],
        }),
        updateCoupon: builder.mutation<any, { id: string; body: Partial<Coupon> }>({
            query: ({ id, body }) => ({ url: `/update-coupen/${id}`, method: 'PUT', body }),
            invalidatesTags: (_r, _e, { id }) => ['coupon', { type: 'couponItem', id } as any],
        }),
        deleteCoupon: builder.mutation<any, string>({
            query: (id) => ({ url: `/delete-coupen/${id}`, method: 'DELETE' }),
            invalidatesTags: ['coupon'],
        }),
    }),
});

export const {
    useAddCouponMutation,
    useGetAllCouponsQuery,
    useGetCouponByIdQuery,
    useUpdateCouponMutation,
    useDeleteCouponMutation,
} = couponSlice;


