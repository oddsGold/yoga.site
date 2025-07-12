import { api } from '../operations.js';

export const worthApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
      worth: builder.query({
      query: ({ page = 1, limit = 30, sort = '-id' }) => {
        const params = new URLSearchParams({ page, limit, sort });
        return {
          url: `/worth?${params.toString()}`,
        };
      },
      providesTags: ['worth'],
      transformResponse: (response) => response,
    }),
    deleteWorth: builder.mutation({
      query: (id) => ({
        url: `/worth/${parseInt(id)}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['worth'],
    }),
    createWorth: builder.mutation({
      query: ({ data }) => ({
        url: '/worth',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['worth'],
      transformResponse: (response, meta, arg) => response.data,
    }),
    currentWorth: builder.query({
      query: (id) => ({
        url: `/worth/${parseInt(id)}`,
      }),
      providesTags: ['currentWorth'],
      transformResponse: (response, meta, arg) => response.data,
    }),
    updateWorth: builder.mutation({
      query: ({ data }) => {
        return {
          url: `/worth/${parseInt(data.id)}`,
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['worth', 'currentWorth'],
      transformResponse: (response, meta, arg) => response.data,
    }),
  }),
});

export const {
  useWorthQuery,
  useDeleteWorthMutation,
  useCreateWorthMutation,
  useCurrentWorthQuery,
  useUpdateWorthMutation,
} = worthApiSlice;
