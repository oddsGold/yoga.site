import { api } from '../operations.js';
import { ENDPOINTS } from './../../components/utils/apiConstants.js';

export const downloadApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    images: builder.query({
      query: ({ page = 1, limit = 30, sort = '-id' }) => {
        const params = new URLSearchParams({ page, limit, sort });
        return {
          url: `/images?${params.toString()}`,
        };
      },
      providesTags: ['images'],
      transformResponse: (response) => response,
    }),
    [ENDPOINTS.UPLOAD]: builder.mutation({
      query: (formData) => {
        return {
          url: '/images',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['images'],
    }),
    deleteImage: builder.mutation({
      query: (id) => ({
        url: `/images/${parseInt(id)}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['images'],
    }),
    files: builder.query({
      query: ({ page = 1, limit = 30, sort = '-id' }) => {
        const params = new URLSearchParams({ page, limit, sort });
        return {
          url: `/files?${params.toString()}`,
        };
      },
      providesTags: ['files'],
      transformResponse: (response) => response,
    }),
    [ENDPOINTS.UPLOAD_FILE]: builder.mutation({
      query: (formData) => {
        return {
          url: '/files',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['files'],
    }),
    deleteFile: builder.mutation({
      query: (id) => ({
        url: `/files/${parseInt(id)}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['files'],
    }),
  }),
});

export const {
  useImagesQuery,
  useUploadMutation,
  useDeleteImageMutation,
  useFilesQuery,
  useUploadFileMutation,
  useDeleteFileMutation,
} = downloadApiSlice;
