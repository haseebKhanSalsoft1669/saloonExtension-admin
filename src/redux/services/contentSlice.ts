import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constants/api';
import { prepareHeaders } from '../prepareHeaders';

export type ContentItem = {
    _id: string;
    title: string;
    desc: string;
    content_image?: string;
    createdAt?: string;
    updatedAt?: string;
};

type PaginatedResponse = {
    contents: ContentItem[];
    total?: number;
    page?: number;
    limit?: number;
};

export const contentSlice = createApi({
    reducerPath: 'contentSlice',
    tagTypes: ['content', 'contentItem'],
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + '/content', credentials: 'include', prepareHeaders }),
    refetchOnMountOrArgChange: true,
    endpoints: (builder) => ({
        addContent: builder.mutation<ContentItem, Partial<ContentItem> | FormData>({
            query: (body) => ({
                url: '/add-content',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['content'],
        }),

        getAllContents: builder.query<PaginatedResponse | { contents: ContentItem[] }, { page?: number; limit?: number; keyword?: string } | void>({
            query: (args) => {
                const params: any = {};
                if (args?.page) params.page = args.page;
                if (args?.limit) params.limit = args.limit;
                if (args?.keyword) params.keyword = args.keyword;
                return {
                    url: '/get-all-contents',
                    method: 'GET',
                    params,
                };
            },
            transformResponse: (response: any) => {
                let contents: any[] = [];
                if (Array.isArray(response)) contents = response;
                else if (Array.isArray(response?.contents)) contents = response.contents;
                else if (Array.isArray(response?.data?.contents)) contents = response.data.contents;
                const normalized = contents.map((c) => ({ ...c, _id: c?._id ?? c?.id }));
                if (response && !Array.isArray(response)) {
                    const base = response.contents ? response : response.data ? response.data : {};
                    return { ...base, contents: normalized };
                }
                return { contents: normalized };
            },
            providesTags: ['content'],
        }),

        getContentById: builder.query<ContentItem, string>({
            query: (id) => ({
                url: `/get-content/${id}`,
                method: 'GET',
            }),
            providesTags: (_res, _err, id) => [{ type: 'contentItem', id }],
            transformResponse: (response: any) => {
                if (response?.content) return response.content;
                if (response?.data?.content) return response.data.content;
                if (response?.data) return response.data;
                return response;
            },
        }),

        updateContent: builder.mutation<any, { id: string; body: Partial<ContentItem> | FormData }>({
            query: ({ id, body }) => ({
                url: `/edit-content/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: (_res, _err, { id }) => ['content', { type: 'contentItem', id } as any],
        }),

        deleteContent: builder.mutation<any, string>({
            query: (id) => ({
                url: `/delete-content/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['content'],
        }),
    }),
});

export const {
    useAddContentMutation,
    useGetAllContentsQuery,
    useGetContentByIdQuery,
    useUpdateContentMutation,
    useDeleteContentMutation,
} = contentSlice;


