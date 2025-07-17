import { api } from '../operations.js';

export const bonusApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    bonus: builder.query({
      query: ({ page = 1, limit = 30, sort = '-id' }) => {
        const params = new URLSearchParams({ page, limit, sort });
        return {
          url: `/bonus?${params.toString()}`,
        };
      },
      providesTags: ['bonus'],
      transformResponse: (response) => response,
    }),
    deleteBonus: builder.mutation({
      query: (id) => ({
        url: `/bonus/${parseInt(id)}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['bonus'],
    }),
    createBonus: builder.mutation({
      query: ({ data }) => ({
        url: '/bonus',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['bonus'],
      transformResponse: (response, meta, arg) => response.data,
    }),
    currentBonus: builder.query({
      query: (id) => ({
        url: `/bonus/${parseInt(id)}`,
      }),
      providesTags: ['currentBonus'],
      transformResponse: (response, meta, arg) => response.data,
    }),
    updateBonus: builder.mutation({
      query: ({ data }) => {
        return {
          url: `/bonus/${parseInt(data.id)}`,
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['bonus', 'currentBonus'],
      transformResponse: (response, meta, arg) => response.data,
    }),
  }),
});

export const {
  useBonusQuery,
  useDeleteBonusMutation,
  useCreateBonusMutation,
  useCurrentBonusQuery,
  useUpdateBonusMutation,
} = bonusApiSlice;
