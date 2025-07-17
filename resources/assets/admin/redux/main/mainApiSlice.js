import { api } from '../operations.js';

export const mainApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    main: builder.query({
      query: ({ page = 1, limit = 30, sort = '-id' }) => {
        const params = new URLSearchParams({ page, limit, sort });
        return {
          url: `/main?${params.toString()}`,
        };
      },
      providesTags: ['main'],
      transformResponse: (response) => response,
    }),
    deleteMain: builder.mutation({
      query: (id) => ({
        url: `/main/${parseInt(id)}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['main'],
    }),
    createMain: builder.mutation({
      query: ({ data }) => ({
        url: '/main',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['main'],
      transformResponse: (response, meta, arg) => response.data,
    }),
    currentMain: builder.query({
      query: (id) => ({
        url: `/main/${parseInt(id)}`,
      }),
      providesTags: ['currentMain'],
      transformResponse: (response, meta, arg) => response.data,
    }),
    updateMain: builder.mutation({
      query: ({ data }) => {
        return {
          url: `/main/${parseInt(data.id)}`,
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['main', 'currentMain'],
      transformResponse: (response, meta, arg) => response.data,
    }),
  }),
});

export const {
  useMainQuery,
  useDeleteMainMutation,
  useCreateMainMutation,
  useCurrentMainQuery,
  useUpdateMainMutation,
} = mainApiSlice;
