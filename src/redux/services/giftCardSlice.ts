import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constants/api';
import { prepareHeaders } from '../prepareHeaders';

export type GiftCard = {
    _id: string;
    title: string;
    desc: string;
    price_or_points: number;
    start_date: string;
    expire_date: string;
    discount: number;
    limit: number;
    createdAt?: string;
    updatedAt?: string;
};

type GiftListResponse = { giftcards: GiftCard[] };

export const giftCardSlice = createApi({
    reducerPath: 'giftCardSlice',
    tagTypes: ['gift', 'giftItem'],
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + '/giftcard', credentials: 'include', prepareHeaders }),
    refetchOnMountOrArgChange: true,
    endpoints: (builder) => ({
        addGift: builder.mutation<GiftCard, Partial<GiftCard>>({
            query: (body) => ({ url: '/add-giftcard', method: 'POST', body }),
            invalidatesTags: ['gift'],
        }),
        getAllGifts: builder.query<GiftListResponse, void | { page?: number; limit?: number; keyword?: string }>({
            query: (args) => {
                const params = args && Object.keys(args).length ? args : undefined;
                return { url: '/get-all-giftcard', method: 'GET', params };
            },
            transformResponse: (response: any) => {
                let list: any[] = [];
                if (Array.isArray(response)) list = response;
                else if (Array.isArray(response?.giftcards)) list = response.giftcards;
                else if (Array.isArray(response?.giftcard)) list = response.giftcard;
                else if (Array.isArray(response?.data?.giftcards)) list = response.data.giftcards;
                else if (Array.isArray(response?.data?.giftcard)) list = response.data.giftcard;
                else {
                    const container = response?.data ?? response;
                    if (container && typeof container === 'object') {
                        const firstArray = Object.values(container).find((v) => Array.isArray(v));
                        if (Array.isArray(firstArray)) list = firstArray as any[];
                    }
                }
                const normalized = list.map((g) => ({ ...g, _id: g?._id ?? g?.id }));
                return { giftcards: normalized } as GiftListResponse;
            },
            providesTags: ['gift'],
        }),
        getGiftById: builder.query<GiftCard, string>({
            query: (id) => ({ url: `/get-giftcard-by-id/${id}`, method: 'GET' }),
            transformResponse: (response: any) => response?.giftcard ?? response?.data?.giftcard ?? response?.data ?? response,
            providesTags: (_r, _e, id) => [{ type: 'giftItem', id }],
        }),
        updateGift: builder.mutation<any, { id: string; body: Partial<GiftCard> }>({
            query: ({ id, body }) => ({ url: `/update-giftcard/${id}`, method: 'PUT', body }),
            invalidatesTags: (_r, _e, { id }) => ['gift', { type: 'giftItem', id } as any],
        }),
        deleteGift: builder.mutation<any, string>({
            query: (id) => ({ url: `/delete-giftcard/${id}`, method: 'DELETE' }),
            invalidatesTags: ['gift'],
        }),
    }),
});

export const {
    useAddGiftMutation,
    useGetAllGiftsQuery,
    useGetGiftByIdQuery,
    useUpdateGiftMutation,
    useDeleteGiftMutation,
} = giftCardSlice;


