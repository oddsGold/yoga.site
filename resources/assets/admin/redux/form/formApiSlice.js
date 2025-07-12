import { api } from '../operations.js';

export const formApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    formInfo: builder.query({
      query: ({ page = 1, limit = 30, sort = '-id' }) => {
        const params = new URLSearchParams({ page, limit, sort });
        return {
          url: `/form/presentation?${params.toString()}`,
        };
      },
      providesTags: ['form'],
      transformResponse: (response) => response,
    }),
    deleteForm: builder.mutation({
      query: (id) => ({
        url: `/form/presentation/${parseInt(id)}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['form'],
    }),
  }),
});

export const {
  useFormInfoQuery,
  useDeleteFormMutation
} = formApiSlice;
