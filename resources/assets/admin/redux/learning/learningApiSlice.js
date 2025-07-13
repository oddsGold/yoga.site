import { api } from '../operations.js';

export const learningApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
      learning: builder.query({
      query: ({ page = 1, limit = 30, sort = '-id' }) => {
        const params = new URLSearchParams({ page, limit, sort });
        return {
          url: `/learning?${params.toString()}`,
        };
      },
      providesTags: ['learning'],
      transformResponse: (response) => response,
    }),
    deleteLearning: builder.mutation({
      query: (id) => ({
        url: `/learning/${parseInt(id)}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['learning'],
    }),
    createLearning: builder.mutation({
      query: ({ data }) => ({
        url: '/learning',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['learning'],
      transformResponse: (response, meta, arg) => response.data,
    }),
    currentLearning: builder.query({
      query: (id) => ({
        url: `/learning/${parseInt(id)}`,
      }),
      providesTags: ['currentLearning'],
      transformResponse: (response, meta, arg) => response.data,
    }),
    updateLearning: builder.mutation({
      query: ({ data }) => {
        return {
          url: `/learning/${parseInt(data.id)}`,
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['learning', 'currentLearning'],
      transformResponse: (response, meta, arg) => response.data,
    }),
  }),
});

export const {
  useLearningQuery,
  useDeleteLearningMutation,
  useCreateLearningMutation,
  useCurrentLearningQuery,
  useUpdateLearningMutation,
} = learningApiSlice;
