import { api } from '../operations.js';

export const socialLinksApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    links: builder.query({
      query: ({ page = 1, limit = 30, sort = '-id' }) => {
        const params = new URLSearchParams({ page, limit, sort });
        return {
          url: `/social?${params.toString()}`,
        };
      },
      providesTags: ['social'],
      transformResponse: (response) => response,
    }),
    currentLink: builder.query({
      query: (id) => ({
        url: `/social/${parseInt(id)}`,
      }),
      providesTags: ['currentLink'],
      transformResponse: (response, meta, arg) => response.data,
    }),
    updateSocial: builder.mutation({
      query: ({ data }) => {
        return {
          url: `/social/${parseInt(data.id)}`,
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['social', 'currentLink'],
      transformResponse: (response, meta, arg) => response.data,
    }),
  }),
});

export const {
  useLinksQuery,
  useCurrentLinkQuery,
  useUpdateSocialMutation,
} = socialLinksApiSlice;
