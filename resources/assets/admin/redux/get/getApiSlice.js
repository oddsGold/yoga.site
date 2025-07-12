import { api } from '../operations.js';

export const getApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
      get: builder.query({
      query: ({ page = 1, limit = 30, sort = '-id' }) => {
        const params = new URLSearchParams({ page, limit, sort });
        return {
          url: `/get?${params.toString()}`,
        };
      },
      providesTags: ['get'],
      transformResponse: (response) => response,
    }),
    deleteGet: builder.mutation({
      query: (id) => ({
        url: `/get/${parseInt(id)}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['get'],
    }),
    createGet: builder.mutation({
      query: ({ data }) => ({
        url: '/get',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['get'],
      transformResponse: (response, meta, arg) => response.data,
    }),
    currentGet: builder.query({
      query: (id) => ({
        url: `/get/${parseInt(id)}`,
      }),
      providesTags: ['currentGet'],
      transformResponse: (response, meta, arg) => response.data,
    }),
    updateGet: builder.mutation({
      query: ({ data }) => {
        return {
          url: `/get/${parseInt(data.id)}`,
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['get', 'currentGet'],
      transformResponse: (response, meta, arg) => response.data,
    }),
  }),
});

export const {
  useGetQuery,
  useDeleteGetMutation,
  useCreateGetMutation,
  useCurrentGetQuery,
  useUpdateGetMutation,
} = getApiSlice;
