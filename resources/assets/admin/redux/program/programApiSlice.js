import { api } from '../operations.js';

export const programApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    program: builder.query({
      query: ({ page = 1, limit = 30, sort = '-id' }) => {
        const params = new URLSearchParams({ page, limit, sort });
        return {
          url: `/program?${params.toString()}`,
        };
      },
      providesTags: ['program'],
      transformResponse: (response) => response,
    }),
    deleteProgram: builder.mutation({
      query: (id) => ({
        url: `/program/${parseInt(id)}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['program'],
    }),
    createProgram: builder.mutation({
      query: ({ data }) => ({
        url: '/program',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['program'],
      transformResponse: (response, meta, arg) => response.data,
    }),
    currentProgram: builder.query({
      query: (id) => ({
        url: `/program/${parseInt(id)}`,
      }),
      providesTags: ['currentProgram'],
      transformResponse: (response, meta, arg) => response.data,
    }),
    updateProgram: builder.mutation({
      query: ({ data }) => {
        return {
          url: `/program/${parseInt(data.id)}`,
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['program', 'currentProgram'],
      transformResponse: (response, meta, arg) => response.data,
    }),
  }),
});

export const {
  useProgramQuery,
  useDeleteProgramMutation,
  useCreateProgramMutation,
  useCurrentProgramQuery,
  useUpdateProgramMutation,
} = programApiSlice;
