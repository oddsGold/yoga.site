import { api } from '../operations.js';

export const usersApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    users: builder.query({
      query: ({ page = 1, limit = 30, sort = '-id' }) => {
        const params = new URLSearchParams({ page, limit, sort });
        return {
          url: `/users?${params.toString()}`,
        };
      },
      providesTags: ['users'],
      transformResponse: (response) => response,
    }),
    createUser: builder.mutation({
      query: ({ data }) => ({
        url: '/users',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['users'],
      transformResponse: (response, meta, arg) => response.data,
    }),
    currentUser: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
      }),
      providesTags: ['current'],
      transformResponse: (response, meta, arg) => response.data,
    }),
    updateUser: builder.mutation({
      query: ({ data }) => ({
        url: `/users/${parseInt(data.id)}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['users', 'current'],
      transformResponse: (response, meta, arg) => response.data,
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${parseInt(id)}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['users'],
    }),
    updateEmail: builder.mutation({
      query: ({ data }) => {
        return {
          url: 'account/email',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['account'],
    }),
    updatePassword: builder.mutation({
      query: ({ data }) => {
        return {
          url: 'account/password',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['account'],
    }),
  }),
});

export const {
  useUsersQuery,
  useCreateUserMutation,
  useCurrentUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useUpdateEmailMutation,
  useUpdatePasswordMutation,
} = usersApiSlice;
