import { api } from '../operations.js';

export const rolesApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    roles: builder.query({
      query: ({ page = 1, limit = 30 }) => ({
        url: `/roles?page=${page}&limit=${limit}`,
      }),
      providesTags: ['roles'],
      transformResponse: (response) => response,
    }),
    deleteRole: builder.mutation({
      query: (id) => ({
        url: `/roles/${parseInt(id)}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['roles'],
    }),
    resources: builder.query({
      query: () => ({
        url: '/resources',
      }),
      transformResponse: (response, meta, arg) => response.data,
    }),
    createRole: builder.mutation({
      query: ({ data }) => ({
        url: '/roles',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['roles'],
      transformResponse: (response, meta, arg) => response.data,
    }),
    currentRole: builder.query({
      query: (id) => ({
        url: `/roles/${parseInt(id)}`,
      }),
      providesTags: ['currentRole'],
      transformResponse: (response, meta, arg) => response.data,
    }),
    updateRole: builder.mutation({
      query: ({ data }) => {
        return {
          url: `/roles/${parseInt(data.id)}`,
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['roles', 'currentRole'],
      transformResponse: (response, meta, arg) => response.data,
    }),
    addOption: builder.mutation({
      query: (newOption) => ({
        url: '/add-option',
        method: 'POST',
        body: newOption,
      }),
    }),
  }),
});

export const {
  useRolesQuery,
  useDeleteRoleMutation,
  useResourcesQuery,
  useCreateRoleMutation,
  useCurrentRoleQuery,
  useUpdateRoleMutation,
  useAddOptionMutation,
} = rolesApiSlice;
