import { api } from '../operations.js';

export const dashboardApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    news: builder.query({
      query: () => {
        return {
          url: `/news`,
        };
      },
      providesTags: ['news'],
      transformResponse: (response) => response,
    })
  }),
});

export const {
  useNewsQuery
} = dashboardApiSlice;
